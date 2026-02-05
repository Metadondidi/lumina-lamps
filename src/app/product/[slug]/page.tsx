import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products, getProductBySlug, getProductsByStyle } from '@/data/products'
import ProductGallery from './ProductGallery'
import AddToCartButton from './AddToCartButton'
import ProductCard from '@/components/ProductCard'

// Génération des pages statiques
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Métadonnées dynamiques
export function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Metadata {
  const product = getProductBySlug(params.slug)
  
  if (!product) {
    return {
      title: 'Produit non trouvé'
    }
  }

  return {
    title: `${product.name} ${product.subtitle}`,
    description: product.description,
    openGraph: {
      title: `${product.name} ${product.subtitle} | Lumina`,
      description: product.description,
      images: [product.images.on],
    },
  }
}

export default function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Produits similaires (même style, excluant le produit actuel)
  const relatedProducts = getProductsByStyle(product.styleSlug)
    .filter(p => p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="page-enter pt-32 pb-24 md:pb-32">
      <div className="container-luxury">
        {/* Breadcrumb */}
        <nav className="mb-10" aria-label="Fil d'Ariane">
          <ol className="flex items-center gap-2 text-caption text-stone">
            <li>
              <Link href="/" className="hover:text-charcoal transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/collection" className="hover:text-charcoal transition-colors">
                Collection
              </Link>
            </li>
            <li>/</li>
            <li className="text-charcoal">
              {product.name} {product.subtitle}
            </li>
          </ol>
        </nav>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Galerie d'images */}
          <ProductGallery product={product} />

          {/* Informations produit */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            {/* Style/Catégorie */}
            <Link
              href={`/styles?style=${product.styleSlug}`}
              className="inline-block text-micro uppercase tracking-[0.3em] text-stone mb-4 hover:text-charcoal transition-colors"
            >
              {product.style}
            </Link>

            {/* Nom du produit */}
            <h1 className="font-display text-display text-charcoal mb-2">
              {product.name}
            </h1>
            <p className="text-title text-stone mb-6">
              {product.subtitle}
            </p>

            {/* Prix de base */}
            <p className="text-body text-stone mb-2">À partir de</p>
            <p className="font-display text-display-sm text-charcoal mb-8">
              {product.price} €
            </p>

            {/* Description courte */}
            <p className="text-body-lg text-stone mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Bouton Ajouter au panier */}
            <AddToCartButton product={product} />

            {/* Badge délai de fabrication */}
            <div className="mt-6 p-4 bg-champagne/20 border border-sand">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-charcoal flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-caption text-charcoal font-medium">
                    Fabrication sous 2-3 jours
                  </p>
                  <p className="text-micro text-stone">
                    Votre lampe est imprimée sur commande dans notre atelier marseillais
                  </p>
                </div>
              </div>
            </div>

            {/* Caractéristiques */}
            <div className="mt-10 pt-10 border-t border-sand space-y-4">
              <h3 className="text-micro uppercase tracking-[0.3em] text-stone mb-6">
                Caractéristiques
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-caption text-stone">Hauteur</p>
                  <p className="text-body text-charcoal">{product.dimensions.height}</p>
                </div>
                <div>
                  <p className="text-caption text-stone">Diamètre</p>
                  <p className="text-body text-charcoal">{product.dimensions.diameter}</p>
                </div>
                <div>
                  <p className="text-caption text-stone">Matériau</p>
                  <p className="text-body text-charcoal">{product.material}</p>
                </div>
                <div>
                  <p className="text-caption text-stone">Couleur</p>
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-4 h-4 rounded-full border border-sand"
                      style={{ backgroundColor: product.color }}
                    />
                    <p className="text-body text-charcoal">{product.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description longue */}
            <div className="mt-10 pt-10 border-t border-sand">
              <h3 className="text-micro uppercase tracking-[0.3em] text-stone mb-6">
                À propos
              </h3>
              <div className="text-body text-stone space-y-4 whitespace-pre-line">
                {product.longDescription}
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-sand">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-micro uppercase tracking-[0.3em] text-stone mb-2">
                  Collection {product.style}
                </p>
                <h2 className="font-display text-display-sm text-charcoal">
                  Vous aimerez aussi
                </h2>
              </div>
              <Link
                href={`/styles?style=${product.styleSlug}`}
                className="link-underline text-caption uppercase tracking-widest text-charcoal"
              >
                Voir tout
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
