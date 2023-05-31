import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type GoogleGeocodeResponse = {
  results: {
    formatted_address: string
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
    place_id: string
  }[]
  status: "OK" | string
}

// Define a service using a base URL and expected endpoints
export const googleMapsApi = createApi({
  reducerPath: "googleMapsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://maps.googleapis.com/maps/api",
  }),
  endpoints: (builder) => ({
    getAddressByGeolocation: builder.query<
      GoogleGeocodeResponse,
      { lat: number; lng: number }
    >({
      query: ({ lat, lng }) =>
        `/geocode/json?latlng=${lat},${lng}&result_type=street_address&key=AIzaSyDaoHl0JekUxZ8rKHyIHSnJ4ctrMtvPcqs`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAddressByGeolocationQuery } = googleMapsApi
export default googleMapsApi
