import { HistoricalEvent } from '@/interfaces/historicalEvent'
import { LatLng } from 'leaflet'

const calculateMapCenter: (events: HistoricalEvent[]) => LatLng = (events) => {
  let mapCentreLatitude: number = 0
  let mapCentreLongitude: number = 0

  const coordinatesEvents = events.filter(
    (event: HistoricalEvent) => event.latitude && event.longitude
  )

  coordinatesEvents.map((event: HistoricalEvent) => {
    mapCentreLatitude += event.latitude ?? 0
    mapCentreLongitude += event.longitude ?? 0
  })

  return new LatLng(
    mapCentreLatitude / coordinatesEvents.length,
    mapCentreLongitude / coordinatesEvents.length
  )
}

export { calculateMapCenter }
