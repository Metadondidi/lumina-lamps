'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setStatus('success')
        setMessage('Merci ! Vous êtes inscrit(e) 🎉')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Une erreur est survenue')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Impossible de s\'inscrire')
    }
    
    // Réinitialiser après 5 secondes
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

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

        {/* Newsletter */}
        <div className="mb-16 pb-16 border-b border-sand">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-title text-charcoal mb-3">
              Restez inspiré(e)
            </h3>
            <p className="text-body text-stone mb-6">
              Recevez nos nouveautés, inspirations déco et offres exclusives
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-5 py-3 border border-sand bg-ivory text-body text-charcoal placeholder:text-stone focus:outline-none focus:border-charcoal transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 bg-charcoal text-ivory text-caption uppercase tracking-widest hover:bg-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Envoi...' : status === 'success' ? '✓ Inscrit' : 'S\'inscrire'}
              </button>
            </form>
            
            {message && (
              <p className={`mt-4 text-caption ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
