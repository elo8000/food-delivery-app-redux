import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import cartReducer from "../features/cart/cartSlice"
import api from "../api/api"
import googleMapsApi from "../api/googleMapsApi"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    [api.reducerPath]: api.reducer,
    [googleMapsApi.reducerPath]: googleMapsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, googleMapsApi.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
