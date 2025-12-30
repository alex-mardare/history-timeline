import { MAP_ZOOM_LEVEL } from '@/constants/constants'
import { HistoricalEvent } from '@/interfaces/historicalEvent'
import { MapCenter } from '@/interfaces/mapInterfaces'

const calculateMapCenter = (events: HistoricalEvent[]): MapCenter => {
  let mapCenterLatitude: number = 0
  let mapCenterLongitude: number = 0

  const coordinatesEvents = events.filter(
    (event: HistoricalEvent) => event.latitude && event.longitude
  )

  coordinatesEvents.map((event: HistoricalEvent) => {
    mapCenterLatitude += event.latitude ?? 0
    mapCenterLongitude += event.longitude ?? 0
  })

  return {
    lat: mapCenterLatitude / coordinatesEvents.length,
    lng: mapCenterLongitude / coordinatesEvents.length,
    zoom: MAP_ZOOM_LEVEL.DEFAULT_ZOOM_LEVEL
  }
}

export { calculateMapCenter }
