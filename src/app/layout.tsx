import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: {
    default: 'Lumina | Lampes Design Imprimées en 3D',
    template: '%s | Lumina'
  },
  description: 'Découvrez Lumina, une collection de lampes design imprimées en 3D à Marseille. Des pièces uniques qui allient technologie et artisanat pour illuminer votre intérieur.',
  keywords: ['lampes design', 'impression 3D', 'luminaires', 'décoration', 'Marseille', 'artisanat', 'made in France'],
  authors: [{ name: 'Lumina' }],
  creator: 'Lumina',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Lumina',
    title: 'Lumina | Lampes Design Imprimées en 3D',
    description: 'Des lampes d\'exception, imprimées en 3D avec passion à Marseille.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumina | Lampes Design Imprimées en 3D',
    description: 'Des lampes d\'exception, imprimées en 3D avec passion à Marseille.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
