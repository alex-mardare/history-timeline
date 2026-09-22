import { Popup } from 'react-leaflet'

import { EventDetails } from '@/components/event-display/EventDetails'
import { HistoricalEvent } from '@/types'

interface EventPopupProps {
  event: HistoricalEvent
}

function EventPopup({ event }: EventPopupProps) {
  return (
    <Popup closeButton={false}>
      <EventDetails {...{ event }} />
    </Popup>
  )
}

export { EventPopup }
