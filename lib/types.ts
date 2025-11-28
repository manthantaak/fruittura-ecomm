export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  categorySlug: string
  price: number
  originalPrice?: number
  images: string[]
  modelUrl?: string
  stock: number
  rating: number
  reviewCount: number
  isOrganic: boolean
  isFeatured: boolean
  variants: ProductVariant[]
  nutritionInfo?: NutritionInfo
  origin?: string
  shelfLife?: string
}

export interface ProductVariant {
  id: string
  name: string
  weight: string
  price: number
  stock: number
}

export interface NutritionInfo {
  calories: number
  protein: string
  fat: string
  carbs: string
  fiber: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface CartItem {
  product: Product
  variant: ProductVariant
  quantity: number
}

export interface WishlistItem {
  product: Product
  addedAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  addresses: Address[]
}

export interface Address {
  id: string
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  subtotal: number
  shipping: number
  discount: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  address: Address
  paymentMethod: string
  createdAt: Date
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
}
