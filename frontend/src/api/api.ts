import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ShopItem } from "../features/shop/shopSlice"
import { CartState } from "../features/cart/cartSlice"

// Define a service using a base URL and expected endpoints
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_HOST || "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getShops: builder.query<{ id: number; name: string }[], void>({
      query: () => `/shopNames`,
    }),
    getShopItemsById: builder.query<ShopItem[], number>({
      query: (id) => `/shop/${id}/items`,
    }),
    getShopGeolocationById: builder.query<{ lat: number; lng: number }, number>(
      {
        query: (id) => `/shop/${id}/geolocation`,
      },
    ),
    checkout: builder.mutation<string, CartState>({
      query: (cart: CartState) => ({
        url: "/checkout",
        method: "POST",
        body: cart,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetShopsQuery,
  useGetShopItemsByIdQuery,
  useCheckoutMutation,
} = api
export default api
