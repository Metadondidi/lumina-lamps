'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useCart } from '@/context/CartContext'
import { STRIPE_CONFIG, SHIPPING_CONFIG } from '@/lib/shipping'

// Charger Stripe une seule fois
const stripePromise = loadStripe(STRIPE_CONFIG.publicKey)

interface CheckoutButtonProps {
  className?: string
}

export default function CheckoutButton({ className = '' }: CheckoutButtonProps) {
  const { items, totalPrice, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isFreeShipping = totalPrice >= SHIPPING_CONFIG.freeShippingThreshold
  const amountToFreeShipping = SHIPPING_CONFIG.freeShippingThreshold - totalPrice

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      // Appeler notre API pour créer la session Stripe
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          origin: window.location.origin,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du paiement')
      }

      // Rediriger vers Stripe Checkout
      if (data.url) {
        // Utiliser la redirection directe (plus simple)
        window.location.href = data.url
      } else {
        // Alternative : utiliser le SDK Stripe
        const stripe = await stripePromise
        if (stripe && data.sessionId) {
          const { error: stripeError } = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          })
          if (stripeError) {
            throw new Error(stripeError.message)
          }
        }
      }
    } catch (err) {
      console.error('Erreur checkout:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Message livraison gratuite */}
      {!isFreeShipping && amountToFreeShipping > 0 && (
        <div className="bg-champagne/30 p-4 text-center">
          <p className="text-caption text-charcoal">
            🎁 Plus que <strong>{amountToFreeShipping.toFixed(2)} €</strong> pour la livraison offerte !
          </p>
        </div>
      )}

      {isFreeShipping && (
        <div className="bg-green-50 p-4 text-center">
          <p className="text-caption text-green-800">
            ✓ Livraison offerte pour votre commande
          </p>
        </div>
      )}

      {/* Bouton de paiement */}
      <button
        onClick={handleCheckout}
        disabled={isLoading || items.length === 0}
        className={`w-full btn-primary ${className} ${
          isLoading ? 'opacity-70 cursor-wait' : ''
        } ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Redirection vers le paiement...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Paiement sécurisé
            </>
          )}
        </span>
      </button>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 text-center">
          <p className="text-caption text-red-800">{error}</p>
        </div>
      )}

      {/* Logos paiement */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <span className="text-micro text-stone">Paiement sécurisé par</span>
        <svg className="h-6" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32c-1.18.66-2.86 1.12-4.9 1.12-4.54 0-6.96-2.89-6.96-7.24 0-4.02 2.32-7.38 6.16-7.38 3.82 0 6.51 2.8 6.51 8.58zm-8.06-2.55h4.37c0-1.68-.77-2.8-2.12-2.8-1.26 0-2.1 1.02-2.25 2.8zM38.56 20.32h-4.5V5.7h4.5v1.46c.95-1.12 2.32-1.82 3.9-1.82v4.37c-.37-.07-.77-.1-1.24-.1-1.21 0-2.32.55-2.66 1.33v9.38zM25.68 3.28h4.5v17.04h-4.5V3.28zM19.39 6.16c1.03 0 2.13.28 3.09.77l-1.18 3.34c-.62-.34-1.37-.54-2.06-.54-.99 0-1.58.47-1.58 1.24v9.35h-4.5V9.45c0-2.29 2.22-4.07 6.23-3.29zM1.61 7.98H4.6v5.53c0 1.4.59 2.06 1.72 2.06 1.08 0 1.89-.77 2.23-1.68V7.98h2.99v12.34H8.55v-1.3c-.95.99-2.25 1.66-3.78 1.66-2.54 0-4.16-1.66-4.16-4.59V7.98h1z" fill="#635BFF"/>
        </svg>
      </div>

      {/* Réassurance */}
      <p className="text-micro text-stone text-center">
        Paiement 100% sécurisé · Données chiffrées · CB, Visa, Mastercard, Apple Pay
      </p>
    </div>
  )
}
