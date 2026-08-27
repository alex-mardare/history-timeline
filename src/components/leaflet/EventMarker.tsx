import { Tooltip } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'
import { memo } from 'react'
import { Marker, Popup } from 'react-leaflet'

import { mapPopupIcon } from '@/components/leaflet/mapPopupIcon'
import { HistoricalEvent } from '@/types'
import { eventDateTimeFormatter } from '@/utils/formatter'

import styles from './EventMarker.module.css'

interface EventMarkerProps {
  event: HistoricalEvent
  setMarkerRef: (id: number, marker: L.Marker | null) => void
}

const markerIcon = mapPopupIcon()

function EventMarker({ event, setMarkerRef }: EventMarkerProps) {
  const displayEventDate = () => {
    if (event.eventDate === null) return null
    return (
      <span className={styles['popup-date']}>
        {eventDateTimeFormatter(event)}
      </span>
    )
  }

  const displayIconSection = () => {
    if (!event.realLocation) return null
    return (
      <Tooltip label="Real location" position="top">
        <div className={styles['popup-icon-badge']}>
          <IconMapPin />
        </div>
      </Tooltip>
    )
  }

  const displayHeaderSection = () => {
    return (
      <div className={styles['popup-header']}>
        <div className={styles['popup-header-text']}>
          <span className={styles['popup-title']}>{event.name}</span>
          {displayEventDate()}
        </div>
        {displayIconSection()}
      </div>
    )
  }

  return (
    <Marker
      icon={markerIcon}
      position={[event.latitude as number, event.longitude as number]}
      ref={(marker) => setMarkerRef(event.id, marker)}
    >
      <Popup>
        {displayHeaderSection()}
        {event.description}
      </Popup>
    </Marker>
  )
}

export const EventMarkerMemo = memo(EventMarker)
