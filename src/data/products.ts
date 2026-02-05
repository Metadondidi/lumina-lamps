// Types
export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  description: string
  longDescription: string
  images: {
    off: string
    on: string
  }
  dimensions: {
    height: string
    diameter: string
  }
  material: string
  style: string
  styleSlug: string
  color: string
  inStock: boolean
  featured: boolean
}

export interface Style {
  slug: string
  name: string
  description: string
}

export interface BaseColor {
  id: string
  name: string
  hex: string
}

// Couleurs de socle disponibles pour la personnalisation
export const baseColors: BaseColor[] = [
  { id: 'bleu', name: 'Bleu', hex: '#2563EB' },
  { id: 'orange', name: 'Orange', hex: '#EA580C' },
  { id: 'chocolat', name: 'Chocolat', hex: '#78350F' },
  { id: 'blanc', name: 'Blanc', hex: '#FAF5F0' },
  { id: 'gris-bleu', name: 'Gris Bleu', hex: '#64748B' },
  { id: 'olive', name: 'Olive', hex: '#4D5D3D' },
  { id: 'jaune', name: 'Jaune', hex: '#EAB308' },
]

// Styles de lampes
export const styles: Style[] = [
  {
    slug: 'aurore',
    name: 'Aurore',
    description: 'Des teintes chaudes et lumineuses, inspirées des levers de soleil méditerranéens. Une invitation à la douceur et à la sérénité.'
  },
  {
    slug: 'ocean',
    name: 'Océan',
    description: 'Des nuances profondes et apaisantes, évoquant les eaux cristallines de la côte. Une immersion dans le calme et la fraîcheur.'
  },
  {
    slug: 'nature',
    name: 'Nature',
    description: 'Des tons organiques et équilibrés, pour une harmonie parfaite avec votre intérieur. Une connexion à l\'essentiel.'
  }
]

// Produits
export const products: Product[] = [
  // === STYLE AURORE ===
  {
    id: 'lumina-rose-poudre',
    slug: 'rose-poudre',
    name: 'Lumina',
    subtitle: 'Rose Poudré',
    price: 90,
    description: 'Une présence délicate aux reflets rosés, évoquant la douceur des aurores méditerranéennes.',
    longDescription: 'La Lumina Rose Poudré capture l\'essence des premiers rayons du soleil sur les façades ocres de Marseille. Son filament PLA translucide diffuse une lumière douce et enveloppante, créant une atmosphère intime et chaleureuse. Chaque strie imprimée en 3D joue avec la lumière, offrant un spectacle visuel unique selon l\'angle de vue.',
    images: {
      off: '/images/IMG_3452.jpeg',
      on: '/images/IMG_3453.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Aurore',
    styleSlug: 'aurore',
    color: '#E8B4A8',
    inStock: true,
    featured: true
  },
  {
    id: 'lumina-ambre-dore',
    slug: 'ambre-dore',
    name: 'Lumina',
    subtitle: 'Ambre Doré',
    price: 90,
    description: 'La chaleur captivante de l\'ambre, pour une lumière enveloppante et réconfortante.',
    longDescription: 'La Lumina Ambre Doré incarne la chaleur des couchers de soleil provençaux. Sa teinte dorée, obtenue par un filament PLA spécialement formulé, crée une ambiance cosy et sophistiquée. Allumée, elle transforme votre espace en un cocon de lumière chaude.',
    images: {
      off: '/images/IMG_3459.jpeg',
      on: '/images/IMG_3460.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Aurore',
    styleSlug: 'aurore',
    color: '#D4A574',
    inStock: true,
    featured: true
  },
  {
    id: 'lumina-orange-soleil',
    slug: 'orange-soleil',
    name: 'Lumina',
    subtitle: 'Orange Soleil',
    price: 90,
    description: 'L\'énergie vibrante du soleil méditerranéen capturée dans une lampe d\'exception.',
    longDescription: 'La Lumina Orange Soleil est un hommage aux teintes flamboyantes des crépuscules marseillais. Son orange vif et chaleureux illumine votre intérieur d\'une lumière dynamique et joyeuse. Une pièce audacieuse pour les amateurs de couleurs expressives.',
    images: {
      off: '/images/IMG_3466.jpeg',
      on: '/images/IMG_3467.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Aurore',
    styleSlug: 'aurore',
    color: '#F97316',
    inStock: true,
    featured: false
  },
  {
    id: 'lumina-jaune-doux',
    slug: 'jaune-doux',
    name: 'Lumina',
    subtitle: 'Jaune Doux',
    price: 90,
    description: 'Une lumière douce et apaisante aux teintes de miel et de soleil.',
    longDescription: 'La Lumina Jaune Doux évoque la douceur des matins ensoleillés. Sa teinte crème légèrement dorée diffuse une lumière délicate et sereine, parfaite pour créer une atmosphère zen et accueillante dans votre espace de vie.',
    images: {
      off: '/images/IMG_3468.jpeg',
      on: '/images/IMG_3469.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Aurore',
    styleSlug: 'aurore',
    color: '#FDE68A',
    inStock: true,
    featured: false
  },

  // === STYLE OCÉAN ===
  {
    id: 'lumina-turquoise',
    slug: 'turquoise',
    name: 'Lumina',
    subtitle: 'Turquoise',
    price: 90,
    description: 'L\'éclat vibrant des lagons, capturé dans une forme organique et envoûtante.',
    longDescription: 'La Lumina Turquoise évoque instantanément les eaux cristallines des calanques. Ce turquoise profond et lumineux apporte une touche de fraîcheur et d\'évasion à votre intérieur. La lumière filtrée à travers le PLA translucide crée des reflets aquatiques fascinants.',
    images: {
      off: '/images/IMG_3455.jpeg',
      on: '/images/IMG_3456.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Océan',
    styleSlug: 'ocean',
    color: '#40B5AD',
    inStock: true,
    featured: true
  },
  {
    id: 'lumina-bleu-ciel',
    slug: 'bleu-ciel',
    name: 'Lumina',
    subtitle: 'Bleu Ciel',
    price: 90,
    description: 'La sérénité d\'un ciel d\'été, dans une lumière douce et enveloppante.',
    longDescription: 'La Lumina Bleu Ciel capture l\'essence des journées méditerranéennes. Ce bleu aérien et délicat apporte légèreté et tranquillité à votre espace. Idéale pour une chambre ou un coin lecture, elle invite à la contemplation.',
    images: {
      off: '/images/IMG_3457.jpeg',
      on: '/images/IMG_3458.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Océan',
    styleSlug: 'ocean',
    color: '#7BA3C9',
    inStock: true,
    featured: false
  },
  {
    id: 'lumina-bleu-profond',
    slug: 'bleu-profond',
    name: 'Lumina',
    subtitle: 'Bleu Profond',
    price: 90,
    description: 'L\'intensité des abysses méditerranéens dans une lumière captivante.',
    longDescription: 'La Lumina Bleu Profond incarne la majesté des fonds marins. Son bleu intense et profond crée une ambiance mystérieuse et apaisante. Allumée, elle projette une lumière envoûtante qui transforme votre espace en un sanctuaire de calme.',
    images: {
      off: '/images/IMG_3461.jpeg',
      on: '/images/IMG_3462.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Océan',
    styleSlug: 'ocean',
    color: '#0EA5E9',
    inStock: true,
    featured: false
  },

  // === STYLE NATURE ===
  {
    id: 'lumina-blanc-glacier',
    slug: 'blanc-glacier',
    name: 'Lumina',
    subtitle: 'Blanc Glacier',
    price: 90,
    description: 'La pureté absolue d\'un blanc translucide aux reflets subtils et élégants.',
    longDescription: 'La Lumina Blanc Glacier est l\'expression même de la pureté. Son blanc immaculé s\'intègre harmonieusement dans tous les intérieurs, apportant une touche de sophistication minimaliste. La lumière diffusée est claire et apaisante, parfaite pour un espace contemporain.',
    images: {
      off: '/images/IMG_3470.jpeg',
      on: '/images/IMG_3471.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Nature',
    styleSlug: 'nature',
    color: '#E8ECF0',
    inStock: true,
    featured: false
  },
  {
    id: 'lumina-vert-sauge',
    slug: 'vert-sauge',
    name: 'Lumina',
    subtitle: 'Vert Sauge',
    price: 90,
    description: 'L\'équilibre parfait entre nature et sophistication, pour une ambiance zen.',
    longDescription: 'La Lumina Vert Sauge puise son inspiration dans la végétation des collines provençales. Ce vert doux et naturel crée une connexion apaisante avec la nature, transformant votre intérieur en un havre de paix verdoyant.',
    images: {
      off: '/images/IMG_3472.jpeg',
      on: '/images/IMG_3473.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Nature',
    styleSlug: 'nature',
    color: '#8B9B7A',
    inStock: true,
    featured: false
  },
  {
    id: 'lumina-vert-menthe',
    slug: 'vert-menthe',
    name: 'Lumina',
    subtitle: 'Vert Menthe',
    price: 90,
    description: 'La fraîcheur vivifiante de la menthe dans une lumière délicate et apaisante.',
    longDescription: 'La Lumina Vert Menthe apporte une touche de fraîcheur unique à votre intérieur. Son vert clair et lumineux évoque les jardins méditerranéens au petit matin. Une lampe qui respire la sérénité et la vitalité.',
    images: {
      off: '/images/IMG_3464.jpeg',
      on: '/images/IMG_3465.jpeg'
    },
    dimensions: {
      height: '28 cm',
      diameter: '22 cm'
    },
    material: 'PLA premium translucide',
    style: 'Nature',
    styleSlug: 'nature',
    color: '#6EE7B7',
    inStock: true,
    featured: true
  }
]

// Fonctions utilitaires
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByStyle(styleSlug: string): Product[] {
  return products.filter(p => p.styleSlug === styleSlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getRelatedProducts(product: Product, limit: number = 3): Product[] {
  return products
    .filter(p => p.styleSlug === product.styleSlug && p.id !== product.id)
    .slice(0, limit)
}
