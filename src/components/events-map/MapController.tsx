import L from 'leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

import { useStateStore } from '@/providers/storeProvider'

function MapController() {
  const map = useMap()
  const { locationBoundary, mapCenter } = useStateStore((state) => state)

  useEffect(() => {
    if (!map) return
    else {
      if (locationBoundary) {
        try {
          const geoJsonLayer = L.geoJSON(locationBoundary)
          const geoJsonBounds = geoJsonLayer.getBounds()

          if (geoJsonBounds.isValid()) {
            map.fitBounds(geoJsonBounds, {
              animate: true
            })
          }
        } catch (error) {
          console.error('Could not draw the location on the map ', error)
        }
      } else if (mapCenter) {
        map.setView({ lat: mapCenter.lat, lng: mapCenter.lng }, mapCenter.zoom)
      }
    }
  }, [locationBoundary, mapCenter, map])

  return null
}

export { MapController }
