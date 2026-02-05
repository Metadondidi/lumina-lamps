'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { styles, products, getProductsByStyle, Product } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function StylesContent() {
  const searchParams = useSearchParams()
  const styleParam = searchParams.get('style')
  
  const [activeStyle, setActiveStyle] = useState<string | null>(styleParam)

  // Mettre à jour quand le paramètre URL change
  useEffect(() => {
    setActiveStyle(styleParam)
  }, [styleParam])

  // Filtrer les produits selon le style sélectionné
  const filteredProducts = activeStyle
    ? getProductsByStyle(activeStyle)
    : products

  // Trouver le style actif pour l'affichage
  const currentStyle = activeStyle
    ? styles.find(s => s.slug === activeStyle)
    : null

  return (
    <>
      {/* Sélecteur de styles */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {styles.map((style) => {
            const styleProducts = getProductsByStyle(style.slug)
            const previewProduct = styleProducts[0]
            const isActive = activeStyle === style.slug

            return (
              <button
                key={style.slug}
                onClick={() => setActiveStyle(isActive ? null : style.slug)}
                className={`group relative aspect-[4/3] overflow-hidden transition-all duration-500 ${
                  isActive ? 'ring-2 ring-charcoal ring-offset-4' : ''
                }`}
              >
                {/* Image de fond */}
                {previewProduct && (
                  <Image
                    src={previewProduct.images.on}
                    alt={style.name}
                    fill
                    className={`object-cover transition-transform duration-700 ease-luxury ${
                      isActive ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />
                )}

                {/* Overlay */}
                <div className={`absolute inset-0 transition-colors duration-500 ${
                  isActive 
                    ? 'bg-ink/40' 
                    : 'bg-ink/30 group-hover:bg-ink/50'
                }`} />

                {/* Contenu */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="font-display text-display-sm text-ivory mb-2">
                    {style.name}
                  </h3>
                  <p className="text-caption text-ivory/80">
                    {styleProducts.length} pièce{styleProducts.length > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Indicateur actif */}
                {isActive && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-ivory rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-charcoal"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Description du style actif */}
      {currentStyle && (
        <div className="mb-12 p-8 bg-cream">
          <h2 className="font-display text-title text-charcoal mb-3">
            Collection {currentStyle.name}
          </h2>
          <p className="text-body text-stone">
            {currentStyle.description}
          </p>
        </div>
      )}

      {/* Compteur et reset */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-sand">
        <p className="text-caption text-stone">
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
          {currentStyle && ` dans ${currentStyle.name}`}
        </p>
        {activeStyle && (
          <button
            onClick={() => setActiveStyle(null)}
            className="text-caption text-charcoal hover:text-stone transition-colors underline"
          >
            Voir tous les produits
          </button>
        )}
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 3}
          />
        ))}
      </div>
    </>
  )
}
