import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { SHIPPING_CONFIG, STRIPE_CONFIG } from '@/lib/shipping'

// Prix de la personnalisation du socle (en centimes)
const CUSTOM_BASE_PRICE_CENTS = 1000 // 10€

// Initialiser Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Types pour les items du panier
interface CartItem {
  product: {
    id: string
    name: string
    subtitle: string
    price: number
    description: string
    images: {
      off: string
      on: string
    }
  }
  quantity: number
  customBase?: {
    id: string
    name: string
    hex: string
  } | null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, origin } = body as { items: CartItem[]; origin: string }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      )
    }

    // Calculer le sous-total (avec personnalisation)
    const subtotal = items.reduce((sum, item) => {
      const basePrice = item.product.price * 100
      const customBasePrice = item.customBase ? CUSTOM_BASE_PRICE_CENTS : 0
      return sum + (basePrice + customBasePrice) * item.quantity
    }, 0)

    // Créer les line items pour Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => {
        const basePrice = item.product.price * 100
        const customBasePrice = item.customBase ? CUSTOM_BASE_PRICE_CENTS : 0
        const totalUnitPrice = basePrice + customBasePrice

        // Créer le nom du produit avec info de personnalisation
        let productName = `${item.product.name} ${item.product.subtitle}`
        let productDescription = item.product.description

        if (item.customBase) {
          productName += ` (Socle ${item.customBase.name})`
          productDescription += ` • Socle personnalisé: ${item.customBase.name}`
        }

        return {
          price_data: {
            currency: STRIPE_CONFIG.currency,
            product_data: {
              name: productName,
              description: productDescription,
              images: [
                `${origin}${item.product.images.on}`,
                `${origin}${item.product.images.off}`,
              ],
            },
            unit_amount: totalUnitPrice,
          },
          quantity: item.quantity,
        }
      }
    )

    // Options de livraison dynamiques basées sur le sous-total
    const subtotalInEuros = subtotal / 100
    const isFreeShipping = subtotalInEuros >= SHIPPING_CONFIG.freeShippingThreshold

    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] = []

    if (isFreeShipping) {
      // Si livraison gratuite, on ajoute une seule option gratuite
      shippingOptions.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: STRIPE_CONFIG.currency,
          },
          display_name: '🎁 Livraison offerte',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 3,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      })
    } else {
      // Sinon, options France et Europe
      shippingOptions.push(
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: SHIPPING_CONFIG.rates.france.price,
              currency: STRIPE_CONFIG.currency,
            },
            display_name: SHIPPING_CONFIG.rates.france.name,
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: SHIPPING_CONFIG.rates.europe.price,
              currency: STRIPE_CONFIG.currency,
            },
            display_name: SHIPPING_CONFIG.rates.europe.name,
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 10,
              },
            },
          },
        }
      )
    }

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      shipping_options: shippingOptions,
      shipping_address_collection: {
        allowed_countries: STRIPE_CONFIG.allowedCountries as unknown as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      // Personnalisation de l'interface Stripe
      custom_text: {
        shipping_address: {
          message: 'Nous livrons uniquement en France et en Europe. Livraison offerte à partir de 100€.',
        },
        submit: {
          message: 'Nous vous enverrons un email de confirmation avec le suivi de votre commande.',
        },
      },
      // URLs de redirection
      success_url: `${origin}/commande/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
      // Métadonnées pour le suivi
      metadata: {
        order_source: 'lumina_website',
      },
      // Options d'affichage
      locale: 'fr',
      // Expiration de la session (30 minutes)
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Erreur Stripe:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création du paiement' },
      { status: 500 }
    )
  }
}
