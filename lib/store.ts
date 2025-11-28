import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, ProductVariant, CartItem, WishlistItem, User, Address } from "./types"

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  addAddress: (address: Address) => void
  removeAddress: (addressId: string) => void
  setDefaultAddress: (addressId: string) => void
}

// Cart Store with localStorage persistence
// NOTE: For production, use secure cookies or server-side sessions
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.variant.id === variant.id,
          )

          if (existingIndex >= 0) {
            const newItems = [...state.items]
            newItems[existingIndex].quantity += quantity
            return { items: newItems }
          }

          return { items: [...state.items, { product, variant, quantity }] }
        })
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.product.id === productId && item.variant.id === variantId)),
        }))
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.variant.id === variantId ? { ...item, quantity } : item,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.variant.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    { name: "fruittura-cart" },
  ),
)

// Wishlist Store with localStorage persistence
export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({
            items: [...state.items, { product, addedAt: new Date() }],
          }))
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.product.id === productId)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    { name: "fruittura-wishlist" },
  ),
)

// Auth Store with localStorage persistence
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        set({ user, token, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },

      addAddress: (address) => {
        const currentUser = get().user
        if (currentUser) {
          const addresses = address.isDefault
            ? currentUser.addresses.map((a) => ({ ...a, isDefault: false }))
            : currentUser.addresses
          set({ user: { ...currentUser, addresses: [...addresses, address] } })
        }
      },

      removeAddress: (addressId) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              addresses: currentUser.addresses.filter((a) => a.id !== addressId),
            },
          })
        }
      },

      setDefaultAddress: (addressId) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              addresses: currentUser.addresses.map((a) => ({
                ...a,
                isDefault: a.id === addressId,
              })),
            },
          })
        }
      },
    }),
    { name: "fruittura-auth" },
  ),
)
