import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export type ShopItem = {
  name: string
  id: number
  imageUrl?: string
}

export type Shop = {
  name: string
  id: number
  items: ShopItem[]
}

export interface ShopState {
  shops: Shop[]
}

const initialState: ShopState = {
  shops: [],
}

export const shopSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addShop: (state, action: PayloadAction<Shop>) => {
      state.shops.push(action.payload)
    },
  },
})

export const { addShop } = shopSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectShops = (state: RootState) => state.shop.shops

export default shopSlice.reducer
