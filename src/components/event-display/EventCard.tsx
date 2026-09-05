import { Tooltip } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'

import { HistoricalEvent } from '@/types'
import { eventDateTimeFormatter } from '@/utils/formatter'

import styles from './EventCard.module.css'

interface EventCardProps {
  event: HistoricalEvent
}

function EventCard({ event }: EventCardProps) {
  const displaySubtitleSection = () => {
    if (event.eventDate === null) return null
    return (
      <div className={styles['popup-subtitle']}>
        <span>{eventDateTimeFormatter(event)}</span>
        <span>{event.eventLocation}</span>
      </div>
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
          {displaySubtitleSection()}
        </div>
        {displayIconSection()}
      </div>
    )
  }
  // recreate Popup from scratch
  return (
    <>
      {displayHeaderSection()}
      {event.description}
    </>
  )
}

export { EventCard }
