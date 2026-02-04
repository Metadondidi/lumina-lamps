import { Suspense } from 'react'
import { Metadata } from 'next'
import StylesContent from './StylesContent'

export const metadata: Metadata = {
  title: 'Styles',
  description: 'Explorez nos univers : Aurore, Océan et Nature. Trouvez le style qui résonne avec votre intérieur.',
}

// Loading fallback
function StylesLoading() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[1, 2, 3].map(i => (
          <div key={i} className="aspect-[4/3] bg-sand" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="space-y-4">
            <div className="aspect-[4/5] bg-sand" />
            <div className="h-4 bg-sand w-2/3" />
            <div className="h-4 bg-sand w-1/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StylesPage() {
  return (
    <div className="page-enter pt-32 pb-24 md:pb-32">
      <div className="container-luxury">
        {/* Header de page */}
        <header className="max-w-2xl mb-16">
          <p className="text-micro uppercase tracking-[0.3em] text-stone mb-4">
            Explorez par style
          </p>
          <h1 className="font-display text-display text-charcoal mb-6">
            Nos univers
          </h1>
          <p className="text-body-lg text-stone">
            Chaque style reflète une inspiration, une atmosphère. 
            Trouvez celui qui résonne avec votre intérieur.
          </p>
        </header>

        {/* Contenu avec Suspense pour useSearchParams */}
        <Suspense fallback={<StylesLoading />}>
          <StylesContent />
        </Suspense>
      </div>
    </div>
  )
}
