import GoogleMapReact from "google-map-react"
import { useRef } from "react"

export default function GoogleMap(props: {
  onClick?: (lat: number, lng: number) => void
  markerLocations?: {
    position: {
      lat: number
      lng: number
    }
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
    /*
    const mapMarker = new maps.Marker({
      position: { lat: 100, lng: 100 },
      map,
      title: "Yo mama",
    })
    */
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "600px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDaoHl0JekUxZ8rKHyIHSnJ4ctrMtvPcqs" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onGoogleApiLoaded}
        onClick={(e) => {
          if (props.onClick) props.onClick(e.lat, e.lng)
          if (mapsRef.current) {
            const mapMarker = new mapsRef.current.Marker({
              position: { lat: e.lat, lng: e.lng },
              map: mapRef.current,
              title: "Yo mama",
            })
            console.log(mapMarker)
          }
        }}
      />
    </div>
  )
}
