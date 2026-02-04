'use client'

import { useState, FormEvent } from 'react'
import { useCart } from '@/context/CartContext'

export default function ContactPage() {
  const { items, totalPrice } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi (à remplacer par une vraie API)
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  // Message de confirmation
  if (isSubmitted) {
    return (
      <div className="page-enter pt-32 pb-24 md:pb-32">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10 text-ivory"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h1 className="font-display text-display-sm text-charcoal mb-4">
              Message envoyé
            </h1>
            <p className="text-body-lg text-stone mb-10">
              Merci pour votre message. Nous vous répondrons dans les plus brefs délais, 
              généralement sous 24 heures ouvrées.
            </p>
            <a href="/" className="btn-secondary">
              Retour à l&apos;accueil
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter pt-32 pb-24 md:pb-32">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Colonne gauche - Informations */}
          <div>
            <header className="mb-12">
              <p className="text-micro uppercase tracking-[0.3em] text-stone mb-4">
                Parlons-en
              </p>
              <h1 className="font-display text-display text-charcoal mb-6">
                Contact
              </h1>
              <p className="text-body-lg text-stone">
                Une question sur nos lampes ? Une commande en cours ? 
                Ou simplement envie de nous dire bonjour ? 
                Nous sommes à votre écoute.
              </p>
            </header>

            {/* Informations de contact */}
            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-micro uppercase tracking-[0.3em] text-stone mb-3">
                  Email
                </h3>
                <a
                  href="mailto:contact@lumina-lamps.fr"
                  className="text-body text-charcoal hover:text-stone transition-colors"
                >
                  contact@lumina-lamps.fr
                </a>
              </div>
              <div>
                <h3 className="text-micro uppercase tracking-[0.3em] text-stone mb-3">
                  Atelier
                </h3>
                <p className="text-body text-charcoal">
                  Marseille, France
                </p>
              </div>
              <div>
                <h3 className="text-micro uppercase tracking-[0.3em] text-stone mb-3">
                  Délai de réponse
                </h3>
                <p className="text-body text-charcoal">
                  Sous 24h ouvrées
                </p>
              </div>
            </div>

            {/* Récapitulatif panier si articles présents */}
            {items.length > 0 && (
              <div className="p-8 bg-cream">
                <h3 className="text-micro uppercase tracking-[0.3em] text-stone mb-4">
                  Votre sélection
                </h3>
                <ul className="space-y-3 mb-4">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex justify-between text-body"
                    >
                      <span className="text-charcoal">
                        {item.product.name} {item.product.subtitle}
                        {item.quantity > 1 && ` × ${item.quantity}`}
                      </span>
                      <span className="text-stone">
                        {item.product.price * item.quantity} €
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-sand flex justify-between">
                  <span className="text-body text-charcoal">Total</span>
                  <span className="font-display text-title text-charcoal">
                    {totalPrice} €
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Colonne droite - Formulaire */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Type de demande */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-micro uppercase tracking-[0.3em] text-stone mb-3"
                >
                  Objet
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full bg-transparent border border-sand px-4 py-3 text-body text-charcoal focus:border-charcoal focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239A9590'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
                >
                  <option value="">Sélectionnez un objet</option>
                  <option value="commande">
                    {items.length > 0 ? 'Finaliser ma commande' : 'Passer commande'}
                  </option>
                  <option value="information">Information produit</option>
                  <option value="personnalisation">Demande de personnalisation</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              {/* Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-micro uppercase tracking-[0.3em] text-stone mb-3"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full bg-transparent border border-sand px-4 py-3 text-body text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none transition-colors"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-micro uppercase tracking-[0.3em] text-stone mb-3"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full bg-transparent border border-sand px-4 py-3 text-body text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-micro uppercase tracking-[0.3em] text-stone mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border border-sand px-4 py-3 text-body text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Téléphone (optionnel) */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-micro uppercase tracking-[0.3em] text-stone mb-3"
                >
                  Téléphone <span className="text-stone/70">(optionnel)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full bg-transparent border border-sand px-4 py-3 text-body text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none transition-colors"
                  placeholder="+33 6 00 00 00 00"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-micro uppercase tracking-[0.3em] text-stone mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-transparent border border-sand px-4 py-3 text-body text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none transition-colors resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer le message'
                  )}
                </span>
              </button>

              {/* Note de confidentialité */}
              <p className="text-caption text-stone text-center">
                Vos données sont traitées de manière confidentielle et ne seront 
                jamais partagées avec des tiers.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
