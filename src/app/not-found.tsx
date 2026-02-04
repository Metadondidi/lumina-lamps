import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-enter pt-32 pb-24 md:pb-32 min-h-screen flex items-center">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-[8rem] md:text-[12rem] text-sand leading-none mb-4">
            404
          </p>
          <h1 className="font-display text-display-sm text-charcoal mb-6">
            Page introuvable
          </h1>
          <p className="text-body-lg text-stone mb-10">
            La page que vous recherchez semble avoir disparu dans la lumière. 
            Retournez à la collection pour trouver votre bonheur.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              <span>Retour à l&apos;accueil</span>
            </Link>
            <Link href="/collection" className="btn-secondary">
              Voir la collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
