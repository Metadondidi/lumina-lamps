import { Metadata } from 'next'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Découvrez notre collection complète de lampes design imprimées en 3D. Des pièces uniques aux lignes sculpturales, disponibles en plusieurs coloris.',
}

export default function CollectionPage() {
  return (
    <div className="page-enter pt-32 pb-24 md:pb-32">
      <div className="container-luxury">
        {/* Header de page */}
        <header className="max-w-2xl mb-16">
          <p className="text-micro uppercase tracking-[0.3em] text-stone mb-4">
            Notre collection
          </p>
          <h1 className="font-display text-display text-charcoal mb-6">
            Toutes nos lampes
          </h1>
          <p className="text-body-lg text-stone">
            Chaque pièce de notre collection est imprimée en 3D dans notre atelier 
            marseillais. Des créations uniques qui allient design contemporain 
            et savoir-faire artisanal.
          </p>
        </header>

        {/* Compteur de produits */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-sand">
          <p className="text-caption text-stone">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 3}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
