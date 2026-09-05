import { EventCard } from '@/components/event-display/EventCard'
import { HistoricalEvent } from '@/types'

import styles from './EventTooltip.module.css'

interface EventTooltipProp {
  event: HistoricalEvent | undefined
}

function EventTooltip({ event }: EventTooltipProp) {
  if (
    event === undefined ||
    (event.latitude !== null && event.longitude !== null)
  ) {
    return null
  }

  return (
    <div className={styles['event-tooltip-container']}>
      <div className={styles['event-tooltip-body']}>
        <EventCard {...{ event }} />
      </div>
    </div>
  )
}

export { EventTooltip }
