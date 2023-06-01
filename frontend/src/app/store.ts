import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import cartReducer from "../features/cart/cartSlice"
import userReducer from "../features/user/userSlice"
import api from "../api/api"
import googleMapsApi from "../api/googleApi"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
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
