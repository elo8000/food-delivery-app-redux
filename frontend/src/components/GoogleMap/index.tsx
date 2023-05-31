import GoogleMapReact from "google-map-react"
import { ReactNode, useEffect } from "react"

export default function GoogleMap(props: {
  onClick?: (lat: number, lng: number) => void
  children?: ReactNode
}) {
  const defaultProps = {
    center: {
      lat: 49.98081,
      lng: 36.25272,
    },
    zoom: 11,
  }

  function handleApiLoaded(map: any, maps: any): void {
    console.log(map)
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "600px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDaoHl0JekUxZ8rKHyIHSnJ4ctrMtvPcqs" }}
        defaultCenter={defaultProps.center}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onClick={(e) => {
          if (props.onClick) props.onClick(e.lat, e.lng)
        }}
      />
    </div>
  )
}
