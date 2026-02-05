# 🌟 Lumina - Site E-commerce Luxe

Site e-commerce pour lampes design imprimées en 3D, conçu avec Next.js 14 et Tailwind CSS.

## ✨ Fonctionnalités Principales

### 🎨 Personnalisation Gratuite
- **10 couleurs de chapeau** : Rose Poudré, Ambre Doré, Orange Soleil, Jaune Doux, Turquoise, Bleu Ciel, Bleu Profond, Blanc Glacier, Vert Sauge, Vert Menthe
- **7 couleurs de socle** : Bleu, Orange, Chocolat, Blanc, Gris Bleu, Olive, Jaune
- **Personnalisation 100% gratuite** (aucun supplément)
- **Mini-sélecteur rapide** sur les cartes produits

### 🛒 E-commerce Complet
- Panier intelligent avec persistance (localStorage)
- Gestion des personnalisations par produit
- Paiement Stripe intégré
- Calcul automatique livraison (gratuite > 150€)
- Délai de fabrication : **2-3 jours**

### ✉️ Newsletter
- Système simple de collecte d'emails
- Stockage en JSON local
- Validation des emails
- Interface dans le Footer

### 🎬 Animations
- **Lampes qui s'allument au scroll** : effet visuel sur la page collection
- Transitions fluides et élégantes
- Hover states sophistiqués

### 📱 Design Premium
- Minimaliste & luxueux
- 100% responsive (mobile-first)
- Typographie élégante
- Palette neutre raffinée

## 🚀 Installation & Démarrage

### 1. Cloner le projet
\`\`\`bash
git clone https://github.com/TON_USERNAME/lumina-lamps.git
cd lumina-lamps
\`\`\`

### 2. Installer les dépendances
\`\`\`bash
npm install
\`\`\`

### 3. Configurer les variables d'environnement
Créer un fichier \`.env.local\` à la racine :
\`\`\`env
# Clés Stripe (TEST)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Sx8hlCh464NIimlbK87MqwPEseoaXkVzUi6XiondNtYcAvIlOYfZGT54fZQ1o9uphMvHB5ayR7I4OD5KjCAsTaa00duTzgFhn
STRIPE_SECRET_KEY=sk_test_51Sx8hlCh464NIimlZGoCePoxN4YuVGwbsGlnksstmiSHN9sRuSHc4ApETynejRSJtVnJAn5yLRaXupk4e2Tqw4tk00EKVmMndD
\`\`\`

### 4. Lancer en développement
\`\`\`bash
npm run dev
\`\`\`

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📦 Déploiement sur Vercel

### Option A : Via GitHub (recommandé)

1. **Push sur GitHub**
\`\`\`bash
git init
git add .
git commit -m "Lumina e-commerce initial commit"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/lumina-lamps.git
git push -u origin main
\`\`\`

2. **Connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer "New Project"
   - Importer le repo GitHub
   - Ajouter les variables d'environnement :
     - \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\`
     - \`STRIPE_SECRET_KEY\`
   - Déployer

### Option B : Via CLI Vercel

\`\`\`bash
npm i -g vercel
vercel login
vercel
\`\`\`

Suivre les instructions et ajouter les variables d'environnement dans le dashboard Vercel.

## 🗂️ Structure du Projet

\`\`\`
lumina-lamps/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── api/               # API Routes
│   │   │   ├── checkout/      # Session Stripe
│   │   │   ├── newsletter/    # Inscription newsletter
│   │   │   └── webhook/       # Webhooks Stripe
│   │   ├── collection/        # Page collection
│   │   ├── contact/           # Page contact
│   │   ├── panier/           # Page panier
│   │   ├── product/[slug]/   # Pages produits dynamiques
│   │   └── styles/           # Pages styles
│   ├── components/            # Composants React
│   │   ├── CartDrawer.tsx    # Drawer panier
│   │   ├── Header.tsx        # En-tête
│   │   ├── Footer.tsx        # Pied de page + Newsletter
│   │   └── ProductCard.tsx   # Carte produit + mini-sélecteur
│   ├── context/
│   │   └── CartContext.tsx   # Context panier
│   ├── data/
│   │   └── products.ts       # Données produits (10 coloris)
│   └── lib/
│       └── shipping.ts       # Config livraison
├── public/
│   └── images/               # 20 images (allumée/éteinte × 10)
├── data/
│   └── newsletter.json       # Emails newsletter (gitignore)
└── .env.local                # Variables d'environnement (gitignore)
\`\`\`

## 🎨 Produits Disponibles

### Style Aurore (Teintes chaudes)
- Rose Poudré
- Ambre Doré
- Orange Soleil
- Jaune Doux

### Style Océan (Nuances bleues)
- Turquoise
- Bleu Ciel
- Bleu Profond

### Style Nature (Tons naturels)
- Blanc Glacier
- Vert Sauge
- Vert Menthe

**Prix unitaire** : 90€
**Personnalisation** : Gratuite
**Fabrication** : 2-3 jours

## 💳 Configuration Stripe

### Mode Test (actuellement configuré)
- Carte test : \`4242 4242 4242 4242\`
- Date : n'importe quelle date future
- CVC : \`123\`

### Passer en Production
1. Obtenir les clés LIVE sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. Remplacer les clés dans \`.env.local\`
3. Redéployer sur Vercel

## 📧 Newsletter

Les emails sont stockés dans \`data/newsletter.json\` :
\`\`\`json
{
  "subscribers": [
    {
      "email": "user@example.com",
      "subscribedAt": "2026-02-05T14:30:00.000Z",
      "source": "footer"
    }
  ]
}
\`\`\`

**⚠️ Important** : Ce fichier est en \`.gitignore\` pour protéger les données personnelles.

Pour exporter les emails :
\`\`\`bash
cat data/newsletter.json
\`\`\`

## 🎬 Animations Spéciales

### Scroll Reveal
Les lampes s'allument progressivement quand elles apparaissent à l'écran (Intersection Observer).

### Mini-sélecteur rapide
Sur hover d'une carte produit, un sélecteur de couleur de socle apparaît pour un ajout ultra-rapide au panier.

## 🛠️ Technologies Utilisées

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Stripe** (paiement)
- **React Context API** (state management)
- **Intersection Observer** (animations scroll)

## 📱 Responsive

- Mobile-first design
- Breakpoints : sm (640px), md (768px), lg (1024px)
- Grilles adaptatives

## 🔒 Sécurité

- Variables d'environnement pour les clés sensibles
- Validation emails côté serveur
- Protection CSRF via Stripe
- Données newsletter non commitées

## 📝 Licence

Ce projet est un site vitrine/e-commerce privé pour Lumina.

---

**Créé avec 💡 à Marseille**
