import { memo } from 'react'
import { Marker, Popup } from 'react-leaflet'

import { mapPopupIcon } from '@/constants/mapPopupIcon'
import { HistoricalEvent } from '@/types/historicalEvent'

interface EventMarkersComponentProps {
  historicalEvents: HistoricalEvent[]
}

const EventMarkersComponent = ({
  historicalEvents
}: EventMarkersComponentProps) => {
  return (
    <>
      {historicalEvents.map((event: HistoricalEvent) => (
        <Marker
          key={event.id}
          icon={mapPopupIcon}
          position={[event.latitude as number, event.longitude as number]}
        >
          <Popup>
            <b>{event.name}</b>
            <br />
            {event.description}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export const EventMarkers = memo(EventMarkersComponent)
