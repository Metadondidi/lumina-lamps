// Configuration des frais de livraison
export const SHIPPING_CONFIG = {
  // Seuil pour la livraison gratuite (en euros)
  freeShippingThreshold: 100,
  
  // Tarifs par zone
  rates: {
    france: {
      id: 'shipping_france',
      name: 'Livraison France métropolitaine',
      price: 990, // en centimes (9.90€)
      deliveryEstimate: '3-5 jours ouvrés',
      countries: ['FR']
    },
    europe: {
      id: 'shipping_europe',
      name: 'Livraison Europe',
      price: 2500, // en centimes (25€)
      deliveryEstimate: '5-10 jours ouvrés',
      countries: [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'DE',
        'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL',
        'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'GB', 'NO'
      ]
    }
  }
}

// Calculer les frais de livraison
export function calculateShipping(subtotalInCents: number, country: string): {
  amount: number
  label: string
  isFree: boolean
} {
  const subtotalInEuros = subtotalInCents / 100
  
  // Livraison gratuite au-dessus du seuil
  if (subtotalInEuros >= SHIPPING_CONFIG.freeShippingThreshold) {
    return {
      amount: 0,
      label: 'Livraison offerte',
      isFree: true
    }
  }
  
  // Déterminer la zone
  const isFrance = SHIPPING_CONFIG.rates.france.countries.includes(country)
  const isEurope = SHIPPING_CONFIG.rates.europe.countries.includes(country)
  
  if (isFrance) {
    return {
      amount: SHIPPING_CONFIG.rates.france.price,
      label: SHIPPING_CONFIG.rates.france.name,
      isFree: false
    }
  }
  
  if (isEurope) {
    return {
      amount: SHIPPING_CONFIG.rates.europe.price,
      label: SHIPPING_CONFIG.rates.europe.name,
      isFree: false
    }
  }
  
  // Par défaut, tarif Europe pour les autres pays
  return {
    amount: SHIPPING_CONFIG.rates.europe.price,
    label: 'Livraison internationale',
    isFree: false
  }
}

// Configuration Stripe
export const STRIPE_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Sx8hlCh464NIimlbK87MqwPEseoaXkVzUi6XiondNtYcAvIlOYfZGT54fZQ1o9uphMvHB5ayR7I4OD5KjCAsTaa00duTzgFhn',
  currency: 'eur',
  // Pays autorisés pour la livraison
  allowedCountries: [
    'FR', 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'DE',
    'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL',
    'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'GB', 'NO'
  ] as const
}
