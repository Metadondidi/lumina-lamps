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
          Section Personnalisation
          ============================================ */}
      <section className="py-24 md:py-32 bg-champagne/30 border-y border-sand">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenu */}
            <div>
              <p className="text-micro uppercase tracking-[0.3em] text-stone mb-4">
                Personnalisation sur mesure
              </p>
              <h2 className="font-display text-display-sm text-charcoal mb-6">
                Votre lampe,<br />
                <em className="font-light">à votre image</em>
              </h2>
              <p className="text-body-lg text-stone leading-relaxed mb-8">
                Chaque intérieur est unique. C&apos;est pourquoi nous vous offrons 
                la possibilité de personnaliser entièrement votre lampe Lumina pour 
                qu&apos;elle s&apos;accorde parfaitement à votre décoration.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ivory border border-sand flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-charcoal">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-title text-charcoal mb-2">
                      Couleurs illimitées
                    </h3>
                    <p className="text-body text-stone">
                      Choisissez parmi 10 teintes exclusives pour le chapeau de votre lampe 
                      et 7 options pour le socle. Toutes les combinaisons sont possibles.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ivory border border-sand flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-charcoal">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-title text-charcoal mb-2">
                      Personnalisation gratuite
                    </h3>
                    <p className="text-body text-stone">
                      Contrairement à d&apos;autres créateurs, nous n&apos;appliquons aucun 
                      supplément pour la personnalisation. Votre vision, notre mission.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ivory border border-sand flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-charcoal">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-title text-charcoal mb-2">
                      Fabriqué en 2-3 jours
                    </h3>
                    <p className="text-body text-stone">
                      Votre lampe est imprimée sur commande dans notre atelier marseillais. 
                      Chaque pièce est unique et conçue spécialement pour vous.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link href="/collection" className="btn-primary">
                  <span>Créer ma lampe</span>
                </Link>
              </div>
            </div>

            {/* Visuel : Palette de couleurs */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Grande image */}
                <div className="col-span-2 relative aspect-[4/3]">
                  <Image
                    src="/images/IMG_3456.jpeg"
                    alt="Exemple de personnalisation Lumina"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Petites images */}
                <div className="relative aspect-square">
                  <Image
                    src="/images/IMG_3467.jpeg"
                    alt="Lampe Orange allumée"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square">
                  <Image
                    src="/images/IMG_3469.jpeg"
                    alt="Lampe Jaune allumée"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -top-6 -right-6 bg-ivory border-2 border-charcoal px-6 py-4 rotate-3 shadow-lg">
                <p className="font-display text-title text-charcoal">
                  Personnalisation
                </p>
                <p className="text-body text-stone">
                  100% gratuite
                </p>
              </div>
            </div>
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
                    2-3j
                  </p>
                  <p className="text-caption text-stone mt-1">
                    Fabrication
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
