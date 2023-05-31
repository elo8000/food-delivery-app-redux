import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface CartState {
  userId: number
  shopId: number
  items: {
    id: number
    count: number
  }[]
}

const initialState: CartState = {
  userId: 1,
  shopId: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      let item = state.items.find((element) => {
        return element.id === action.payload
      })
      if (item) {
        item.count++
      } else {
        state.items.push({
          id: action.payload,
          count: 1,
        })
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      let itemIndex = state.items.findIndex((item) => {
        return item.id === action.payload
      })
      if (itemIndex !== -1) {
        if (state.items[itemIndex].count === 1) {
          state.items.splice(itemIndex, 1)
        } else {
          state.items[itemIndex].count--
        }
      }
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectItems = (state: RootState) => state.cart.items
export const selectShopId = (state: RootState) => state.cart.shopId
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer
