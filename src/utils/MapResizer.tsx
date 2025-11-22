import { useEffect } from 'react'
import { useMapEvents } from 'react-leaflet'

const MapResizer: () => null = () => {
  const map = useMapEvents({})

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 100)

    const handleResize = () => map.invalidateSize()
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [map])

  return null
}

export { MapResizer }
