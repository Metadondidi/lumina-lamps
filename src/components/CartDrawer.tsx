'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart, CUSTOM_BASE_PRICE } from '@/context/CartContext'
import { SHIPPING_CONFIG } from '@/lib/shipping'

// Générer l'ID unique d'un item
function getCartItemId(productId: string, customBaseId?: string | null): string {
  return customBaseId ? `${productId}-${customBaseId}` : productId
}

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems
  } = useCart()

  // Bloquer le scroll du body quand le panier est ouvert
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isCartOpen])

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeCart])

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="cart-drawer-overlay"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="cart-drawer fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sand">
          <h2 className="font-display text-title text-charcoal">
            Votre panier
            {totalItems > 0 && (
              <span className="text-stone text-body ml-2">
                ({totalItems})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:opacity-70 transition-opacity duration-300"
            aria-label="Fermer le panier"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-charcoal"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-16 h-16 text-sand mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p className="text-body text-stone mb-2">
                Votre panier est vide
              </p>
              <p className="text-caption text-stone mb-6">
                Découvrez notre collection
              </p>
              <Link
                href="/collection"
                onClick={closeCart}
                className="btn-secondary"
              >
                Voir la collection
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => {
                const itemId = getCartItemId(item.product.id, item.customBase?.id)
                const itemPrice = item.product.price + (item.customBase ? CUSTOM_BASE_PRICE : 0)
                
                return (
                  <li
                    key={itemId}
                    className="flex gap-4 pb-6 border-b border-sand last:border-0"
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={closeCart}
                      className="relative w-24 h-24 flex-shrink-0 bg-cream"
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
                        onClick={closeCart}
                        className="block"
                      >
                        <h3 className="font-display text-body text-charcoal">
                          {item.product.name}
                        </h3>
                        <p className="text-caption text-stone">
                          {item.product.subtitle}
                        </p>
                      </Link>

                      {/* Personnalisation du socle */}
                      {item.customBase && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <span
                            className="w-3 h-3 rounded-full border border-sand"
                            style={{ backgroundColor: item.customBase.hex }}
                          />
                          <span className="text-micro text-stone">
                            Socle {item.customBase.name}
                          </span>
                        </div>
                      )}

                      <p className="text-body text-charcoal mt-2">
                        {itemPrice} €
                      </p>

                      {/* Contrôles quantité */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-sand">
                          <button
                            onClick={() => updateQuantity(itemId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-stone hover:text-charcoal transition-colors"
                            aria-label="Réduire la quantité"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-caption">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-stone hover:text-charcoal transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(itemId)}
                          className="text-caption text-stone hover:text-charcoal transition-colors underline"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer avec total et CTA */}
        {items.length > 0 && (
          <div className="border-t border-sand p-6 space-y-4">
            {/* Message livraison gratuite */}
            {totalPrice < SHIPPING_CONFIG.freeShippingThreshold ? (
              <div className="bg-champagne/30 p-3 text-center">
                <p className="text-micro text-charcoal">
                  🎁 Plus que <strong>{(SHIPPING_CONFIG.freeShippingThreshold - totalPrice).toFixed(2)} €</strong> pour la livraison offerte
                </p>
              </div>
            ) : (
              <div className="bg-green-50 p-3 text-center">
                <p className="text-micro text-green-800">
                  ✓ Livraison offerte
                </p>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-body text-stone">Sous-total</span>
              <span className="font-display text-title text-charcoal">
                {totalPrice} €
              </span>
            </div>

            {/* Boutons */}
            <Link
              href="/panier"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              <span>Voir le panier & Commander</span>
            </Link>
            
            <button
              onClick={closeCart}
              className="w-full text-center text-caption text-stone hover:text-charcoal transition-colors"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  )
}
