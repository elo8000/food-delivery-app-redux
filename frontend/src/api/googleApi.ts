import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Coordinates } from "../utils/utilTypes"

export type GoogleGeocodeResponse = {
  results: {
    formatted_address: string
    geometry: {
      location: Coordinates
    }
    place_id: string
  }[]
  status: "OK" | string
}
export type GoogleRouteResponse = {
  routes: {
    distanceMeters: number
    duration: string
  }[]
}

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY //having google api key in frontend application is not safe by any means, but will do for now

// Define a service using a base URL and expected endpoints
export const googleMapsApi = createApi({
  reducerPath: "googleApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getAddressByGeolocation: builder.query<GoogleGeocodeResponse, Coordinates>({
      query: ({ lat, lng }) =>
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&key=${GOOGLE_API_KEY}`,
    }),
    getRoute: builder.query<
      GoogleRouteResponse,
      {
        origin: Coordinates
        destination: Coordinates
      }
    >({
      query: ({ origin, destination }) => {
        return {
          url: `https://routes.googleapis.com/directions/v2:computeRoutes?key=${GOOGLE_API_KEY}`,
          method: "POST",
          headers: [
            ["X-Goog-FieldMask", " routes.distanceMeters,routes.duration"],
          ],
          body: {
            origin: {
              location: {
                latLng: {
                  latitude: origin.lat,
                  longitude: origin.lng,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: destination.lat,
                  longitude: destination.lng,
                },
              },
            },
          },
        }
      },
    }),
  }),
})

/*


  */

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAddressByGeolocationQuery, useGetRouteQuery } =
  googleMapsApi
export default googleMapsApi
