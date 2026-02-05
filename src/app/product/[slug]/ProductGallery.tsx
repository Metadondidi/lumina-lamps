'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/data/products'

interface ProductGalleryProps {
  product: Product
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = [
    { src: product.images.off, alt: `${product.name} ${product.subtitle} éteinte`, label: 'Éteinte' },
    { src: product.images.on, alt: `${product.name} ${product.subtitle} allumée`, label: 'Allumée' }
  ]
  
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative aspect-[4/5] bg-cream overflow-hidden">
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          priority
          className="object-cover transition-opacity duration-500 ease-luxury"
        />
      </div>

      {/* Miniatures */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square bg-cream overflow-hidden transition-all duration-300 ${
              activeIndex === index 
                ? 'ring-2 ring-charcoal ring-offset-2' 
                : 'opacity-70 hover:opacity-100'
            }`}
            aria-label={`Voir l'image ${image.label}`}
            aria-current={activeIndex === index ? 'true' : 'false'}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
            {/* Label */}
            <span className="absolute bottom-2 left-2 bg-ivory/90 px-2 py-1 text-micro uppercase tracking-widest text-charcoal">
              {image.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
