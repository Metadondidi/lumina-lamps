import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const NEWSLETTER_FILE = path.join(process.cwd(), 'data', 'newsletter.json')

// Interface pour les abonnés
interface NewsletterSubscriber {
  email: string
  subscribedAt: string
  source?: string
}

// S'assurer que le fichier existe
async function ensureFileExists() {
  try {
    await fs.access(NEWSLETTER_FILE)
  } catch {
    // Créer le dossier et le fichier s'ils n'existent pas
    const dir = path.dirname(NEWSLETTER_FILE)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(NEWSLETTER_FILE, JSON.stringify({ subscribers: [] }, null, 2))
  }
}

// Lire les abonnés
async function getSubscribers(): Promise<NewsletterSubscriber[]> {
  await ensureFileExists()
  const data = await fs.readFile(NEWSLETTER_FILE, 'utf-8')
  const json = JSON.parse(data)
  return json.subscribers || []
}

// Ajouter un abonné
async function addSubscriber(email: string, source?: string): Promise<boolean> {
  const subscribers = await getSubscribers()
  
  // Vérifier si l'email existe déjà
  if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
    return false // Déjà inscrit
  }
  
  // Ajouter le nouvel abonné
  subscribers.push({
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
    source: source || 'website'
  })
  
  // Sauvegarder
  await fs.writeFile(
    NEWSLETTER_FILE,
    JSON.stringify({ subscribers, lastUpdated: new Date().toISOString() }, null, 2)
  )
  
  return true
}

// API POST : Inscription à la newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body
    
    // Validation basique
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }
    
    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }
    
    // Ajouter l'abonné
    const added = await addSubscriber(email, source)
    
    if (!added) {
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { success: true, message: 'Inscription réussie' },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Erreur newsletter:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// API GET : Récupérer le nombre d'abonnés (optionnel, pour l'admin)
export async function GET() {
  try {
    const subscribers = await getSubscribers()
    return NextResponse.json({
      count: subscribers.length,
      message: 'Newsletter stats'
    })
  } catch (error) {
    console.error('Erreur lecture newsletter:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
