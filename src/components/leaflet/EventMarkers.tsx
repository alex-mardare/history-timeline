import { EventMarkerMemo } from '@/components/leaflet/EventMarker'
import { HistoricalEvent } from '@/types'

interface EventMarkersComponentProps {
  historicalEvents: HistoricalEvent[]
}

const EventMarkers = ({ historicalEvents }: EventMarkersComponentProps) => {
  return (
    <>
      {historicalEvents.map((event: HistoricalEvent) => (
        <EventMarkerMemo key={event.id} {...{ event }} />
      ))}
    </>
  )
}

export { EventMarkers }
