import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

import { useStateStore } from '@/providers/storeProvider'

function MapController() {
  const map = useMap()
  const { mapCenter } = useStateStore((state) => state)

  useEffect(() => {
    if (mapCenter) {
      map.setView({ lat: mapCenter.lat, lng: mapCenter.lng }, mapCenter.zoom)
    }
  }, [mapCenter, map])

  return null
}

export { MapController }
