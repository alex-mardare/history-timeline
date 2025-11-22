'use client'

import dynamic from 'next/dynamic'

import { useSelectHistoricalEvents } from '@/hoooks/useSelectHistoricalEvents'

const DynamicEventsMap = dynamic(
  () => import('@/app/EventsMap/EventsMap').then((module) => module.default),
  {
    ssr: false,
  }
)

function Home() {
  const { historicalEvents, error } = useSelectHistoricalEvents()

  return (
    error === null &&
    historicalEvents.length > 0 && (
      <DynamicEventsMap events={historicalEvents} />
    )
  )
}

export default Home
