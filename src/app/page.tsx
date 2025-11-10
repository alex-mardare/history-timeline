'use client'

import { useSelectHistoricalEvents } from '@/hoooks/useSelectHistoricalEvents'
import { HistoricalEvent } from '@/interfaces/historicalEvent'

export default function Home() {
  const { historicalEvents, error } = useSelectHistoricalEvents()

  const historicalEventDisplay = (event: HistoricalEvent) => {
    return <li key={event.id}>{event.name}</li>
  }

  return (
    error === null && <ul>{historicalEvents.map(historicalEventDisplay)}</ul>
  )
}
