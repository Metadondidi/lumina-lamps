import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="page-enter">
      {/* ============================================
          Hero Section
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_3453.jpeg"
            alt="Lampe Lumina Rose allumée"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 via-transparent to-ivory/40" />
        </div>

        {/* Contenu hero */}
        <div className="container-luxury relative z-10 py-32">
          <div className="max-w-2xl">
            {/* Surtitre */}
            <p className="text-micro uppercase tracking-[0.3em] text-stone mb-6 opacity-0 animate-fade-in animate-stagger-1">
              Impression 3D · Marseille
            </p>

            {/* Titre principal */}
            <h1 className="font-display text-display-lg md:text-[5.5rem] text-charcoal leading-none mb-8 opacity-0 animate-fade-in animate-stagger-2">
              La lumière
              <br />
              <em className="font-light">réinventée</em>
            </h1>

            {/* Description */}
            <p className="text-body-lg text-stone max-w-md mb-10 opacity-0 animate-fade-in animate-stagger-3">
              Chaque lampe Lumina est une pièce unique, imprimée en 3D 
              avec passion dans notre atelier marseillais.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in animate-stagger-4">
              <Link href="/collection" className="btn-primary">
                <span>Découvrir la collection</span>
              </Link>
              <Link href="/styles" className="btn-secondary">
                Explorer les styles
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animate-stagger-6">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone to-transparent" />
        </div>
      </section>

      {/* ============================================
          Section Manifeste
          ============================================ */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-display-sm md:text-display text-charcoal mb-8">
              L&apos;art de la lumière
            </h2>
            <p className="text-body-lg text-stone leading-relaxed">
              Chez Lumina, nous croyons que chaque objet doit raconter une histoire. 
              Nos lampes naissent de la rencontre entre technologie de pointe et 
              sensibilité artisanale. Imprimées couche par couche, elles capturent 
              la lumière de manière unique, transformant chaque instant en un moment 
              d&apos;exception.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          Section Produits mis en avant
          ============================================ */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          {/* Header de section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-micro uppercase tracking-[0.3em] text-stone mb-2">
                Sélection
              </p>
              <h2 className="font-display text-display-sm text-charcoal">
                Pièces favorites
              </h2>
            </div>
            <Link
              href="/collection"
              className="link-underline text-caption uppercase tracking-widest text-charcoal"
            >
              Voir toute la collection
            </Link>
          </div>

          {/* Grille de produits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          Section Image pleine largeur
          ============================================ */}
      <section className="relative h-[60vh] md:h-[80vh]">
        <Image
          src="/images/IMG_3458.jpeg"
          alt="Lampe Lumina Bleu allumée"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        
        {/* Contenu overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container-luxury pb-16 md:pb-24">
            <blockquote className="max-w-xl">
              <p className="font-display text-display-sm md:text-display text-ivory mb-6">
                &ldquo;Un objet qui respire&rdquo;
              </p>
              <p className="text-body text-ivory/80">
                Le motif spiralé caractéristique capture et diffuse la lumière 
                de manière organique, créant une atmosphère vivante et apaisante.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================================
          Section Savoir-faire
          ============================================ */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-square">
              <Image
                src="/images/IMG_3473.jpeg"
                alt="Lampe Lumina Vert allumée - détail"
                fill
                className="object-cover"
              />
            </div>

            {/* Contenu */}
            <div className="lg:pl-8">
              <p className="text-micro uppercase tracking-[0.3em] text-stone mb-4">
                Notre savoir-faire
              </p>
              <h2 className="font-display text-display-sm text-charcoal mb-8">
                Technologie &<br />artisanat
              </h2>

              <div className="space-y-6 text-body text-stone">
                <p>
                  Chaque lampe Lumina est le fruit d&apos;un processus minutieux 
                  qui marie précision technologique et attention artisanale.
                </p>
                <p>
                  L&apos;impression 3D nous permet de créer des formes impossibles 
                  à réaliser avec les techniques traditionnelles, tout en garantissant 
                  une qualité irréprochable.
                </p>
                <p>
                  Fabriquées à Marseille, nos lampes portent en elles la lumière 
                  méditerranéenne qui inspire chacune de nos créations.
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-sand grid grid-cols-3 gap-8">
                <div>
                  <p className="font-display text-display-sm text-charcoal">
                    100%
                  </p>
                  <p className="text-caption text-stone mt-1">
                    Made in Marseille
                  </p>
                </div>
                <div>
                  <p className="font-display text-display-sm text-charcoal">
                    24h
                  </p>
                  <p className="text-caption text-stone mt-1">
                    Par pièce
                  </p>
                </div>
                <div>
                  <p className="font-display text-display-sm text-charcoal">
                    PLA
                  </p>
                  <p className="text-caption text-stone mt-1">
                    Éco-responsable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Section CTA Final
          ============================================ */}
      <section className="py-24 md:py-32 bg-charcoal">
        <div className="container-luxury text-center">
          <h2 className="font-display text-display-sm md:text-display text-ivory mb-6">
            Prêt à illuminer votre intérieur ?
          </h2>
          <p className="text-body-lg text-ivory/70 max-w-xl mx-auto mb-10">
            Découvrez l&apos;ensemble de notre collection et trouvez 
            la lampe qui vous correspond.
          </p>
          <Link
            href="/collection"
            className="inline-block bg-ivory text-charcoal px-10 py-4 text-caption uppercase tracking-widest hover:bg-cream transition-colors duration-300"
          >
            Explorer la collection
          </Link>
        </div>
      </section>
    </div>
  )
}
