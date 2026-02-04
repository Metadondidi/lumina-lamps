'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { totalItems, openCart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Détection du scroll pour modifier le header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${
          isScrolled || isMobileMenuOpen
            ? 'bg-ivory/98 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-luxury">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-2xl md:text-3xl text-charcoal tracking-tight hover:opacity-70 transition-opacity duration-300"
            >
              Lumina
            </Link>

            {/* Navigation desktop */}
            <ul className="hidden md:flex items-center gap-10">
              <li>
                <Link
                  href="/collection"
                  className="link-underline text-caption uppercase tracking-widest text-charcoal"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/styles"
                  className="link-underline text-caption uppercase tracking-widest text-charcoal"
                >
                  Styles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="link-underline text-caption uppercase tracking-widest text-charcoal"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Bouton panier */}
              <button
                onClick={openCart}
                className="relative group"
                aria-label={`Panier (${totalItems} articles)`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-charcoal transition-transform duration-300 group-hover:scale-110"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal text-ivory text-xs flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Menu mobile toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 z-50"
                aria-label="Menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-px bg-charcoal transition-all duration-300 origin-center ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-px bg-charcoal transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-px bg-charcoal transition-all duration-300 origin-center ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu mobile fullscreen */}
      <div
        className={`fixed inset-0 z-40 bg-ivory transition-all duration-500 ease-luxury md:hidden ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-luxury pt-24 pb-10 h-full flex flex-col">
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                href="/collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-display-sm font-display text-charcoal block"
              >
                Collection
              </Link>
            </li>
            <li>
              <Link
                href="/styles"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-display-sm font-display text-charcoal block"
              >
                Styles
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-display-sm font-display text-charcoal block"
              >
                Contact
              </Link>
            </li>
          </ul>
          
          <div className="mt-auto pt-10 border-t border-sand">
            <p className="text-caption text-stone mb-2">Lumina</p>
            <p className="text-micro text-stone">
              Lampes artisanales imprimées en 3D à Marseille
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
