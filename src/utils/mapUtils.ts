import { LatLng } from 'leaflet'

import { HistoricalEvent } from '@/interfaces/historicalEvent'

const calculateMapCenter = (events: HistoricalEvent[]): LatLng => {
  let mapCenterLatitude: number = 0
  let mapCenterLongitude: number = 0

  const coordinatesEvents = events.filter(
    (event: HistoricalEvent) => event.latitude && event.longitude
  )

  coordinatesEvents.map((event: HistoricalEvent) => {
    mapCenterLatitude += event.latitude ?? 0
    mapCenterLongitude += event.longitude ?? 0
  })

  return new LatLng(
    mapCenterLatitude / coordinatesEvents.length,
    mapCenterLongitude / coordinatesEvents.length
  )
}

export { calculateMapCenter }
