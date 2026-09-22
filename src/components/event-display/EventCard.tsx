import { EventDetails } from '@/components/event-display/EventDetails'
import { HistoricalEvent } from '@/types'

import styles from './EventCard.module.css'

interface EventCardProp {
  event: HistoricalEvent | undefined
}

function EventCard({ event }: EventCardProp) {
  if (
    event === undefined ||
    (event.latitude !== null && event.longitude !== null)
  ) {
    return null
  }

  return (
    <div className={styles['event-tooltip-container']}>
      <div className={styles['event-tooltip-body']}>
        <EventDetails {...{ event }} />
      </div>
    </div>
  )
}

export { EventCard }
