'use client'

import dynamic from 'next/dynamic'

import { useSelectHistoricalEvents } from '@/hoooks/useSelectHistoricalEvents'

const DynamicEventsMap = dynamic(
  () => import('@/app/EventsMap/EventsMap').then((module) => module.default),
  {
    ssr: false,
  }
)

export default function Home() {
  const { historicalEvents, error } = useSelectHistoricalEvents()

  return error === null && <DynamicEventsMap events={historicalEvents} />
}
