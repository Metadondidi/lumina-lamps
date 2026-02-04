'use client'

import { useState } from 'react'
import { Product, BaseColor, baseColors } from '@/data/products'
import { useCart, CUSTOM_BASE_PRICE } from '@/context/CartContext'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [selectedBase, setSelectedBase] = useState<BaseColor | null>(null)
  const [isBaseOpen, setIsBaseOpen] = useState(false)

  const totalPrice = product.price + (selectedBase ? CUSTOM_BASE_PRICE : 0)

  const handleAddToCart = () => {
    if (!product.inStock) return
    
    setIsAdding(true)
    addItem(product, selectedBase)
    
    // Animation de feedback
    setTimeout(() => setIsAdding(false), 1000)
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full bg-sand text-stone px-10 py-4 text-caption uppercase tracking-widest cursor-not-allowed"
      >
        Bientôt disponible
      </button>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sélecteur de couleur de socle */}
      <div className="border border-sand p-4">
        <button
          onClick={() => setIsBaseOpen(!isBaseOpen)}
          className="w-full flex items-center justify-between"
        >
          <div>
            <p className="text-micro uppercase tracking-[0.2em] text-stone mb-1">
              Personnalisation du socle
            </p>
            <div className="flex items-center gap-2">
              {selectedBase ? (
                <>
                  <span
                    className="w-5 h-5 rounded-full border border-sand"
                    style={{ backgroundColor: selectedBase.hex }}
                  />
                  <span className="text-body text-charcoal">
                    {selectedBase.name} (+{CUSTOM_BASE_PRICE}€)
                  </span>
                </>
              ) : (
                <span className="text-body text-stone">
                  Standard (inclus)
                </span>
              )}
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 text-stone transition-transform duration-300 ${
              isBaseOpen ? 'rotate-180' : ''
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {/* Options de couleurs */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-luxury ${
            isBaseOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid grid-cols-4 gap-2">
            {/* Option standard */}
            <button
              onClick={() => {
                setSelectedBase(null)
                setIsBaseOpen(false)
              }}
              className={`flex flex-col items-center gap-1.5 p-2 border transition-all ${
                selectedBase === null
                  ? 'border-charcoal bg-cream'
                  : 'border-sand hover:border-stone'
              }`}
            >
              <div className="w-7 h-7 rounded-full border-2 border-dashed border-stone flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-stone">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-micro text-stone">Standard</span>
            </button>

            {/* Couleurs personnalisées */}
            {baseColors.map((color) => (
              <button
                key={color.id}
                onClick={() => {
                  setSelectedBase(color)
                  setIsBaseOpen(false)
                }}
                className={`flex flex-col items-center gap-1.5 p-2 border transition-all ${
                  selectedBase?.id === color.id
                    ? 'border-charcoal bg-cream'
                    : 'border-sand hover:border-stone'
                }`}
              >
                <span
                  className="w-7 h-7 rounded-full border border-sand shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-micro text-stone truncate w-full text-center">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prix total */}
      <div className="flex items-center justify-between">
        <span className="text-body text-stone">Prix total</span>
        <span className="font-display text-display-sm text-charcoal">
          {totalPrice} €
        </span>
      </div>

      {/* Bouton d'ajout */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`w-full btn-primary ${isAdding ? 'pointer-events-none' : ''}`}
      >
        <span className="flex items-center justify-center gap-3">
          {isAdding ? (
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
              Ajouté au panier
            </>
          ) : (
            'Ajouter au panier'
          )}
        </span>
      </button>
    </div>
  )
}
