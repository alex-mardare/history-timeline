import { useEffect, useMemo } from 'react'
import { useMap } from 'react-leaflet'

import { MapCenter } from '@/interfaces/mapInterfaces'

interface MapUtilProps {
  center: MapCenter
}

function MapUtil({ center }: MapUtilProps) {
  const map = useMap()
  const mapCenter = useMemo(() => {
    return center ? { lat: center.lat, lng: center.lng } : map.getCenter()
  }, [center, map])
  const mapZoom = useMemo(() => {
    return center ? center.zoom : map.getZoom()
  }, [center, map])

  useEffect(() => {
    map.setView(mapCenter, mapZoom)
  }, [mapCenter, mapZoom, map])

  return null
}

export { MapUtil }
