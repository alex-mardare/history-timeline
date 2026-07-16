import { memo } from 'react'
import { Marker, Popup } from 'react-leaflet'

import { HistoricalEvent } from '@/types'
import { dateFormatter } from '@/utils/dateFormatter'

import { mapPopupIcon } from './mapPopupIcon'

interface EventMarkerProps {
  event: HistoricalEvent
  setMarkerRef: (id: number, marker: L.Marker | null) => void
}

const markerIcon = mapPopupIcon()

function EventMarker({ event, setMarkerRef }: EventMarkerProps) {
  const displayEventDate = () => {
    if (event.eventDate === null) {
      return <br />
    } else {
      return (
        <>
          <b>{dateFormatter(event.eventDate)}</b>
          <br />
          <br />
        </>
      )
    }
  }

  return (
    <Marker
      icon={markerIcon}
      position={[event.latitude as number, event.longitude as number]}
      ref={(marker) => setMarkerRef(event.id, marker)}
    >
      <Popup>
        <b>{event.name}</b>
        <br />
        {displayEventDate()}
        {event.description}
      </Popup>
    </Marker>
  )
}

export const EventMarkerMemo = memo(EventMarker)
