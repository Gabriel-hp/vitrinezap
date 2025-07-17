export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  fullDescription: string
  images: string[]
  categories: string[]
  isPromo?: boolean
  discount?: number
  rating?: number
  sold?: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}
