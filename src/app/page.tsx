'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { useSelectHistoricalEvents } from '@/hoooks/useSelectHistoricalEvents'
import { useStateStore } from '@/providers/storeProvider'
import { calculateMapCenter } from '@/utils/mapUtils'

const DynamicEventsMap = dynamic(
  () => import('@/app/EventsMap/EventsMap').then((module) => module.default),
  {
    ssr: false
  }
)

function Home() {
  const { mapCenter, setMapCenter } = useStateStore((state) => state)
  const { historicalEvents, error } = useSelectHistoricalEvents()

  useEffect(() => {
    setMapCenter(calculateMapCenter(historicalEvents))
  }, [historicalEvents, setMapCenter])

  return (
    error === null &&
    historicalEvents.length > 0 && (
      <DynamicEventsMap {...{ historicalEvents, mapCenter }} />
    )
  )
}

export default Home
