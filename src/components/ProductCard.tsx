'use client'

import { useState } from 'react'
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
  const { addItem } = useCart()

  return (
    <article
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image avec switch on/off au hover */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[4/5] mb-4 overflow-hidden bg-cream"
      >
        {/* Image éteinte (visible par défaut) */}
        <Image
          src={product.images.off}
          alt={`${product.name} ${product.subtitle}`}
          fill
          priority={priority}
          className={`object-cover transition-opacity duration-700 ease-luxury ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Image allumée (visible au hover) */}
        <Image
          src={product.images.on}
          alt={`${product.name} ${product.subtitle} allumée`}
          fill
          className={`object-cover transition-opacity duration-700 ease-luxury ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Overlay subtil */}
        <div
          className={`absolute inset-0 bg-ink/10 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

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
          
          {/* Bouton ajouter au panier */}
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className={`text-caption uppercase tracking-widest transition-all duration-300 ${
              product.inStock
                ? 'text-charcoal hover:text-stone'
                : 'text-sand cursor-not-allowed'
            }`}
            aria-label={`Ajouter ${product.name} ${product.subtitle} au panier`}
          >
            <span
              className={`inline-block transition-transform duration-300 ${
                isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
              }`}
            >
              + Ajouter
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}
