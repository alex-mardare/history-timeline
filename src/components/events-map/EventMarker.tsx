import { memo } from 'react'
import { Marker } from 'react-leaflet'

import { EventPopup } from '@/components/event-display/EventPopup'
import { mapPopupIcon } from '@/components/leaflet-icons/mapPopupIcon'
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
      <EventPopup {...{ event }} />
    </Marker>
  )
}

export const EventMarkerMemo = memo(EventMarker)
