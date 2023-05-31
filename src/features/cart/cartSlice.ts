import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface CartState {
  userId: number
  items: {
    id: number
    price: number //TODO: move to store
    count: number
  }[]
}
export type ItemAdditionPayload = {
  id: number
  price: number
}

const initialState: CartState = {
  userId: 1,
  items: [],
}

function saveStateToLocalStorage(state: CartState) {
  window.localStorage.setItem("cart", JSON.stringify(state))
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemAdditionPayload>) => {
      let item = state.items.find((element) => {
        return element.id === action.payload.id
      })
      if (item) {
        item.count++
      } else {
        state.items.push({
          id: action.payload.id,
          price: action.payload.price,
          count: 1,
        })
      }
      saveStateToLocalStorage(state)
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
      saveStateToLocalStorage(state)
    },
    setItemCount: (
      state,
      action: PayloadAction<{ id: number; count: number; price: number }>,
    ) => {
      let itemIndex = state.items.findIndex((item) => {
        return item.id === action.payload.id
      })
      if (itemIndex !== -1) {
        if (action.payload.count > 0) {
          state.items[itemIndex].count = action.payload.count
        } else {
          state.items.splice(itemIndex, 1)
        }
      } else {
        state.items.push(action.payload)
      }
      saveStateToLocalStorage(state)
    },
    emptyCart: (state, action: PayloadAction<void>) => {
      state.items = []
      saveStateToLocalStorage(state)
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload
      saveStateToLocalStorage(state)
    },
  },
})

export const { addItem, removeItem, setItemCount, emptyCart } =
  cartSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectItems = (state: RootState) => state.cart.items
export const selectCart = (state: RootState) => state.cart
export const selectTotalCartPrice = (state: RootState) => {
  let totalPrice = 0
  state.cart.items.forEach((item) => {
    totalPrice += item.price * item.count
  })
  return totalPrice
}
export const selectCartHasItems = (state: RootState) =>
  state.cart.items.length > 0

export default cartSlice.reducer
