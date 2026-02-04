import { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export const metadata: Metadata = {
  title: 'Commande confirmée',
  description: 'Votre commande a été confirmée avec succès.',
}

// Initialiser Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

interface PageProps {
  searchParams: { session_id?: string }
}

async function getSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'shipping_details'],
    })
    return session
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error)
    return null
  }
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const sessionId = searchParams.session_id
  
  if (!sessionId) {
    return (
      <div className="page-enter pt-32 pb-24 min-h-screen">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="font-display text-display-sm text-charcoal mb-6">
              Session introuvable
            </h1>
            <p className="text-body-lg text-stone mb-10">
              Nous n&apos;avons pas pu trouver les détails de votre commande.
            </p>
            <Link href="/" className="btn-primary">
              <span>Retour à l&apos;accueil</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const session = await getSession(sessionId)

  if (!session || session.payment_status !== 'paid') {
    return (
      <div className="page-enter pt-32 pb-24 min-h-screen">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="font-display text-display-sm text-charcoal mb-6">
              Paiement non confirmé
            </h1>
            <p className="text-body-lg text-stone mb-10">
              Votre paiement n&apos;a pas encore été confirmé. 
              Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, contactez-nous.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                <span>Nous contacter</span>
              </Link>
              <Link href="/" className="btn-secondary">
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Extraire les informations de la commande
  const customerEmail = session.customer_details?.email
  const shippingDetails = session.shipping_details
  const lineItems = session.line_items?.data || []
  const amountTotal = session.amount_total ? session.amount_total / 100 : 0
  const shippingCost = session.shipping_cost?.amount_total 
    ? session.shipping_cost.amount_total / 100 
    : 0

  return (
    <div className="page-enter pt-32 pb-24">
      <div className="container-luxury">
        <div className="max-w-3xl mx-auto">
          {/* Header de confirmation */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h1 className="font-display text-display text-charcoal mb-4">
              Merci pour votre commande !
            </h1>
            <p className="text-body-lg text-stone">
              Votre commande a été confirmée et sera expédiée très prochainement.
            </p>
          </div>

          {/* Détails de la commande */}
          <div className="bg-cream p-8 md:p-10 mb-10">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-sand">
              <h2 className="font-display text-title text-charcoal">
                Récapitulatif
              </h2>
              <p className="text-caption text-stone">
                N° {session.id.slice(-8).toUpperCase()}
              </p>
            </div>

            {/* Articles */}
            <div className="space-y-4 mb-8 pb-8 border-b border-sand">
              {lineItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="text-body text-charcoal">
                      {item.description}
                    </p>
                    <p className="text-caption text-stone">
                      Quantité : {item.quantity}
                    </p>
                  </div>
                  <p className="text-body text-charcoal">
                    {item.amount_total ? (item.amount_total / 100).toFixed(2) : '0.00'} €
                  </p>
                </div>
              ))}
            </div>

            {/* Livraison */}
            <div className="flex justify-between mb-4">
              <span className="text-body text-stone">Livraison</span>
              <span className="text-body text-charcoal">
                {shippingCost === 0 ? 'Offerte' : `${shippingCost.toFixed(2)} €`}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between pt-4 border-t border-sand">
              <span className="text-body text-charcoal font-medium">Total payé</span>
              <span className="font-display text-display-sm text-charcoal">
                {amountTotal.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* Informations de livraison */}
          {shippingDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="text-micro uppercase tracking-[0.3em] text-stone mb-4">
                  Adresse de livraison
                </h3>
                <div className="text-body text-charcoal">
                  <p>{shippingDetails.name}</p>
                  <p>{shippingDetails.address?.line1}</p>
                  {shippingDetails.address?.line2 && (
                    <p>{shippingDetails.address.line2}</p>
                  )}
                  <p>
                    {shippingDetails.address?.postal_code}{' '}
                    {shippingDetails.address?.city}
                  </p>
                  <p>{shippingDetails.address?.country}</p>
                </div>
              </div>
              <div>
                <h3 className="text-micro uppercase tracking-[0.3em] text-stone mb-4">
                  Confirmation envoyée à
                </h3>
                <p className="text-body text-charcoal">{customerEmail}</p>
                <p className="text-caption text-stone mt-2">
                  Vous recevrez un email avec le suivi de votre colis dès son expédition.
                </p>
              </div>
            </div>
          )}

          {/* Message de remerciement */}
          <div className="text-center py-10 border-t border-sand">
            <p className="text-body text-stone mb-6">
              Une question ? Notre équipe est à votre disposition.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/collection" className="btn-primary">
                <span>Continuer mes achats</span>
              </Link>
              <Link href="/contact" className="btn-secondary">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
