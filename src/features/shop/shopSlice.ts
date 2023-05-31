export type ShopItem = {
  name: string
  id: number
  price: number
  imageUrl?: string
}

export type Shop = {
  name: string
  id: number
  items: ShopItem[]
}

export interface ShopState {
  shops: Shop[]
  activeShopId: number
}

const initialState: ShopState = {
  shops: [],
  activeShopId: 0,
}
