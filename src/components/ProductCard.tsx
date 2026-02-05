'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLit, setIsLit] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()
  const cardRef = useRef<HTMLDivElement>(null)

  // Animation scroll : allumer/éteindre selon la position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Lampe allumée quand elle est visible à 30%
          setIsLit(entry.isIntersecting && entry.intersectionRatio > 0.3)
        })
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.inStock) return
    
    setIsAdding(true)
    addItem(product, null) // Ajout direct en monochrome standard
    
    setTimeout(() => setIsAdding(false), 1500)
  }

  return (
    <article
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image avec switch on/off selon scroll ET hover */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[4/5] mb-4 overflow-hidden bg-cream"
      >
        {/* Image éteinte */}
        <Image
          src={product.images.off}
          alt={`${product.name} ${product.subtitle}`}
          fill
          priority={priority}
          className={`object-cover transition-opacity duration-700 ease-luxury ${
            isLit || isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Image allumée */}
        <Image
          src={product.images.on}
          alt={`${product.name} ${product.subtitle} allumée`}
          fill
          className={`object-cover transition-opacity duration-700 ease-luxury ${
            isLit || isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Overlay subtil */}
        <div
          className={`absolute inset-0 bg-ink/10 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Badge délai de fabrication */}
        {product.inStock && (
          <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-sm px-3 py-1.5 border border-sand">
            <span className="text-micro text-charcoal">
              Fabriqué sous 2-3 jours
            </span>
          </div>
        )}

        {/* Badge en stock */}
        {!product.inStock && (
          <div className="absolute top-4 left-4 bg-sand px-3 py-1">
            <span className="text-micro uppercase tracking-widest text-stone">
              Bientôt disponible
            </span>
          </div>
        )}
      </Link>

      {/* Informations produit */}
      <div className="space-y-1">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-display text-title text-charcoal">
            {product.name}
          </h3>
          <p className="text-body text-stone">
            {product.subtitle}
          </p>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <p className="text-body text-charcoal">
            {product.price} €
          </p>
          
          {/* Bouton ajouter direct */}
          {product.inStock && (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`text-caption uppercase tracking-widest transition-all duration-300 ${
                isAdding
                  ? 'text-charcoal'
                  : 'text-stone hover:text-charcoal'
              }`}
              aria-label={`Ajouter ${product.name} ${product.subtitle} au panier`}
            >
              {isAdding ? (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Ajouté ✓
                </span>
              ) : (
                '+ Ajouter'
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
