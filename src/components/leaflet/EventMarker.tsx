import { memo } from 'react'
import { Marker, Popup } from 'react-leaflet'

import { HistoricalEvent } from '@/types'

import { mapPopupIcon } from './mapPopupIcon'

interface EventMarkerProps {
  event: HistoricalEvent
}

const markerIcon = mapPopupIcon()

function EventMarker({ event }: EventMarkerProps) {
  return (
    <Marker
      icon={markerIcon}
      position={[event.latitude as number, event.longitude as number]}
    >
      <Popup>
        <b>{event.name}</b>
        <br />
        {event.description}
      </Popup>
    </Marker>
  )
}

export const EventMarkerMemo = memo(EventMarker)
