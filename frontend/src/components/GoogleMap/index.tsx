import GoogleMapReact from "google-map-react"
import { useRef } from "react"
import { Coordinates } from "../../utils/utilTypes"

export default function GoogleMap(props: {
  onClick?: (lat: number, lng: number) => void
  markerLocations: {
    position: Coordinates
    title: string
  }[]
}) {
  const defaultProps = {
    center: {
      lat: 49.98081,
      lng: 36.25272,
    },
    zoom: 11,
  }
  const mapRef = useRef<any>(null)
  const mapsRef = useRef<any>(null)

  const onGoogleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    mapRef.current = map
    mapsRef.current = maps
    const mapMarker = new maps.Marker({
      position: props.markerLocations[0].position,
      map,
      title: props.markerLocations[0].title,
    })
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY! }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onGoogleApiLoaded}
        onClick={(e) => {
          if (props.onClick) props.onClick(e.lat, e.lng)
        }}
      />
    </div>
  )
}
