import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ShopItem } from "../utils/utilTypes"
import { CartState } from "../features/cart/cartSlice"
import { Coordinates, UserInfo } from "../utils/utilTypes"

// Define a service using a base URL and expected endpoints
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_HOST || "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getShops: builder.query<
      { id: number; name: string; lat: number; lng: number }[],
      void
    >({
      query: () => `/shops`,
    }),
    getShopItemsById: builder.query<ShopItem[], number>({
      query: (id) => `/shop/${id}/items`,
    }),
    getShopGeolocationById: builder.query<Coordinates, number>({
      query: (id) => `/shop/${id}/geolocation`,
    }),
    checkout: builder.mutation<string, { cart: CartState; user: UserInfo }>({
      query: (checkoutObj: { cart: CartState; user: UserInfo }) => ({
        url: "/checkout",
        method: "POST",
        body: checkoutObj,
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
