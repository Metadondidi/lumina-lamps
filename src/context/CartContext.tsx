'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { Product, BaseColor } from '@/data/products'

// Types pour le panier
export interface CartItem {
  product: Product
  quantity: number
  customBase?: BaseColor | null  // Couleur de socle personnalisé
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, customBase?: BaseColor | null) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Clé pour le localStorage
const CART_STORAGE_KEY = 'lumina-cart'

// Prix de la personnalisation du socle (GRATUIT)
export const CUSTOM_BASE_PRICE = 0

// Générer un ID unique pour un item du panier
function getCartItemId(productId: string, customBaseId?: string | null): string {
  return customBaseId ? `${productId}-${customBaseId}` : productId
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Erreur lors du chargement du panier:', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  // Ajouter un produit au panier
  const addItem = useCallback((product: Product, customBase?: BaseColor | null) => {
    setItems(currentItems => {
      const cartItemId = getCartItemId(product.id, customBase?.id)
      const existingItem = currentItems.find(item => 
        getCartItemId(item.product.id, item.customBase?.id) === cartItemId
      )
      
      if (existingItem) {
        // Incrémenter la quantité si le produit existe déjà (même couleur de socle)
        return currentItems.map(item =>
          getCartItemId(item.product.id, item.customBase?.id) === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      // Ajouter le nouveau produit
      return [...currentItems, { product, quantity: 1, customBase: customBase || null }]
    })
    
    // Ouvrir le panier lors de l'ajout
    setIsCartOpen(true)
  }, [])

  // Retirer un produit du panier
  const removeItem = useCallback((cartItemId: string) => {
    setItems(currentItems => currentItems.filter(item => 
      getCartItemId(item.product.id, item.customBase?.id) !== cartItemId
    ))
  }, [])

  // Mettre à jour la quantité
  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId)
      return
    }

    setItems(currentItems =>
      currentItems.map(item =>
        getCartItemId(item.product.id, item.customBase?.id) === cartItemId
          ? { ...item, quantity }
          : item
      )
    )
  }, [removeItem])

  // Vider le panier
  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  // Gestion de l'état ouvert/fermé du panier
  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), [])

  // Calculs dérivés
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => {
    const basePrice = item.product.price
    const customBasePrice = item.customBase ? CUSTOM_BASE_PRICE : 0
    return sum + ((basePrice + customBasePrice) * item.quantity)
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart doit être utilisé dans un CartProvider')
  }
  return context
}
