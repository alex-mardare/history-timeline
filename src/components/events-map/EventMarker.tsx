import { memo } from 'react'
import { Marker, Popup } from 'react-leaflet'

import { EventCard } from '@/components/event-display/EventCard'
import { mapPopupIcon } from '@/components/events-map/mapPopupIcon'
import { HistoricalEvent } from '@/types'

interface EventMarkerProps {
  event: HistoricalEvent
  setMarkerRef: (id: number, marker: L.Marker | null) => void
}

const markerIcon = mapPopupIcon()

function EventMarker({ event, setMarkerRef }: EventMarkerProps) {
  return (
    <Marker
      icon={markerIcon}
      position={[event.latitude as number, event.longitude as number]}
      ref={(marker) => setMarkerRef(event.id, marker)}
    >
      <Popup closeButton={false}>
        <EventCard {...{ event }} />
      </Popup>
    </Marker>
  )
}

export const EventMarkerMemo = memo(EventMarker)
