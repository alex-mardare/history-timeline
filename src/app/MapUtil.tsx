import { useEffect, useMemo } from 'react'
import { useMapEvents } from 'react-leaflet'

import { useStateStore } from '@/providers/storeProvider'
import { MapCenter } from '@/types/mapInterfaces'

interface MapUtilProps {
  center: MapCenter
}

function MapUtil({ center }: MapUtilProps) {
  const { setMapCenter } = useStateStore((state) => state)
  const onMoveEnd = () => {
    const currentCenter = map.getCenter()
    const currentZoom = map.getZoom()
    if (
      center &&
      (currentCenter.lat !== center.lat ||
        currentCenter.lng !== center.lng ||
        currentZoom !== center.zoom)
    )
      setMapCenter({
        lat: currentCenter.lat,
        lng: currentCenter.lng,
        zoom: currentZoom
      })
  }

  const map = useMapEvents({
    moveend: onMoveEnd
  })

  const mapCenter = useMemo(() => {
    return center ? { lat: center.lat, lng: center.lng } : map.getCenter()
  }, [center, map])
  const mapZoom = useMemo(() => {
    return center ? center.zoom : map.getZoom()
  }, [center, map])

  useEffect(() => {
    if (!mapCenter) return

    const currentCenter = map.getCenter()
    const currentZoom = map.getZoom()
    if (
      currentCenter.lat !== mapCenter.lat ||
      currentCenter.lng !== mapCenter.lng ||
      currentZoom !== mapZoom
    ) {
      map.setView(mapCenter, mapZoom)
    }
  }, [center, map, mapCenter, mapZoom])

  return null
}

export { MapUtil }
