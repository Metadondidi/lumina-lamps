'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart, CUSTOM_BASE_PRICE } from '@/context/CartContext'
import CheckoutButton from '@/components/CheckoutButton'
import { SHIPPING_CONFIG } from '@/lib/shipping'

// Générer l'ID unique d'un item
function getCartItemId(productId: string, customBaseId?: string | null): string {
  return customBaseId ? `${productId}-${customBaseId}` : productId
}

export default function PanierPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems
  } = useCart()

  // Calcul des frais de livraison estimés
  const isFreeShipping = totalPrice >= SHIPPING_CONFIG.freeShippingThreshold
  const estimatedShipping = isFreeShipping ? 0 : SHIPPING_CONFIG.rates.france.price / 100

  // Panier vide
  if (items.length === 0) {
    return (
      <div className="page-enter pt-32 pb-24 md:pb-32">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-20 h-20 text-sand mx-auto mb-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <h1 className="font-display text-display-sm text-charcoal mb-4">
              Votre panier est vide
            </h1>
            <p className="text-body-lg text-stone mb-10">
              Il semble que vous n&apos;avez pas encore choisi de lampe. 
              Découvrez notre collection pour illuminer votre intérieur.
            </p>
            <Link href="/collection" className="btn-primary">
              <span>Découvrir la collection</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter pt-32 pb-24 md:pb-32">
      <div className="container-luxury">
        {/* Header */}
        <header className="mb-12">
          <h1 className="font-display text-display text-charcoal mb-2">
            Votre panier
          </h1>
          <p className="text-body text-stone">
            {totalItems} article{totalItems > 1 ? 's' : ''}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Liste des produits */}
          <div className="lg:col-span-2">
            <div className="border-t border-sand">
              {items.map((item) => {
                const itemId = getCartItemId(item.product.id, item.customBase?.id)
                const itemPrice = item.product.price + (item.customBase ? CUSTOM_BASE_PRICE : 0)
                
                return (
                  <div
                    key={itemId}
                    className="flex gap-6 py-8 border-b border-sand"
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-cream"
                    >
                      <Image
                        src={item.product.images.off}
                        alt={`${item.product.name} ${item.product.subtitle}`}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="block"
                      >
                        <h2 className="font-display text-title text-charcoal">
                          {item.product.name}
                        </h2>
                        <p className="text-body text-stone mb-1">
                          {item.product.subtitle}
                        </p>
                        <p className="text-caption text-stone">
                          {item.product.style}
                        </p>
                      </Link>

                      {/* Personnalisation du socle */}
                      {item.customBase && (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-cream inline-flex">
                          <span
                            className="w-4 h-4 rounded-full border border-sand"
                            style={{ backgroundColor: item.customBase.hex }}
                          />
                          <span className="text-caption text-charcoal">
                            Socle {item.customBase.name} (+{CUSTOM_BASE_PRICE}€)
                          </span>
                        </div>
                      )}

                      {/* Prix unitaire */}
                      <p className="text-body text-charcoal mt-4">
                        {itemPrice} €
                      </p>

                      {/* Contrôles */}
                      <div className="flex items-center gap-6 mt-4">
                        {/* Quantité */}
                        <div className="flex items-center border border-sand">
                          <button
                            onClick={() => updateQuantity(itemId, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-stone hover:text-charcoal transition-colors"
                            aria-label="Réduire la quantité"
                          >
                            −
                          </button>
                          <span className="w-12 text-center text-body">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemId, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-stone hover:text-charcoal transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            +
                          </button>
                        </div>

                        {/* Supprimer */}
                        <button
                          onClick={() => removeItem(itemId)}
                          className="text-caption text-stone hover:text-charcoal transition-colors underline"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>

                    {/* Sous-total ligne */}
                    <div className="hidden md:block text-right">
                      <p className="font-display text-title text-charcoal">
                        {itemPrice * item.quantity} €
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Continuer les achats */}
            <div className="mt-8">
              <Link
                href="/collection"
                className="link-underline text-caption uppercase tracking-widest text-charcoal"
              >
                ← Continuer les achats
              </Link>
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-8 sticky top-32">
              <h3 className="font-display text-title text-charcoal mb-6">
                Récapitulatif
              </h3>

              {/* Détails */}
              <div className="space-y-4 pb-6 border-b border-sand">
                <div className="flex justify-between text-body">
                  <span className="text-stone">Sous-total</span>
                  <span className="text-charcoal">{totalPrice} €</span>
                </div>
                <div className="flex justify-between text-body">
                  <span className="text-stone">Livraison (France)</span>
                  <span className="text-charcoal">
                    {isFreeShipping ? (
                      <span className="text-green-700">Offerte</span>
                    ) : (
                      `${estimatedShipping.toFixed(2)} €`
                    )}
                  </span>
                </div>
                {!isFreeShipping && (
                  <p className="text-micro text-stone">
                    💡 Livraison offerte à partir de {SHIPPING_CONFIG.freeShippingThreshold} €
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between py-6 border-b border-sand">
                <span className="text-body text-charcoal">Total estimé</span>
                <span className="font-display text-display-sm text-charcoal">
                  {(totalPrice + estimatedShipping).toFixed(2)} €
                </span>
              </div>

              {/* Bouton Stripe Checkout */}
              <div className="mt-6">
                <CheckoutButton />
              </div>

              {/* Réassurance */}
              <div className="mt-8 pt-8 border-t border-sand space-y-4">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <div>
                    <p className="text-caption text-charcoal">Livraison soignée</p>
                    <p className="text-micro text-stone">Emballage premium sécurisé</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <div>
                    <p className="text-caption text-charcoal">Paiement sécurisé</p>
                    <p className="text-micro text-stone">Transactions protégées</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <div>
                    <p className="text-caption text-charcoal">Retours acceptés</p>
                    <p className="text-micro text-stone">14 jours pour changer d&apos;avis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
