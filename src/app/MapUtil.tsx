import { Coordinates } from '@/interfaces/coordinates'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

interface MapUtilProps {
  center: Coordinates
}

function MapUtil({ center }: MapUtilProps) {
  const map = useMap()

  useEffect(() => {
    map.setView(center ?? map.getCenter(), map.getZoom())
  }, [center, map])

  return null
}

export { MapUtil }
