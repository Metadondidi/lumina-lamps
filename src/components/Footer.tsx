import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-cream border-t border-sand">
      <div className="container-luxury py-16 md:py-20">
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Colonne marque */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-display text-3xl text-charcoal tracking-tight"
            >
              Lumina
            </Link>
            <p className="mt-4 text-body text-stone max-w-sm">
              Des lampes d&apos;exception, imprimées en 3D avec passion à Marseille. 
              Chaque pièce est une œuvre unique qui illumine votre quotidien.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-micro uppercase tracking-widest text-stone mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collection"
                  className="text-body text-charcoal hover:text-stone transition-colors duration-300"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/styles"
                  className="text-body text-charcoal hover:text-stone transition-colors duration-300"
                >
                  Styles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-body text-charcoal hover:text-stone transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-micro uppercase tracking-widest text-stone mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-body text-charcoal">
              <li>Marseille, France</li>
              <li>
                <a
                  href="mailto:contact@lumina-lamps.fr"
                  className="hover:text-stone transition-colors duration-300"
                >
                  contact@lumina-lamps.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-sand pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-stone">
            © {currentYear} Lumina. Tous droits réservés.
          </p>
          <p className="text-caption text-stone">
            Design & fabrication artisanale
          </p>
        </div>
      </div>
    </footer>
  )
}
