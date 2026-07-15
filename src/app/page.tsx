'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { About } from '@/components/about/About'
import { useSelectHistoricalEventsWithCoordinates } from '@/hooks/useSelectHistoricalEventsWithCoordinates'
import { useStateStore } from '@/providers/storeProvider'
import { calculateMapCenter } from '@/utils/mapUtils'

const DynamicEventsMap = dynamic(
  () =>
    import('@/components/events-map/EventsMap').then(
      (module) => module.default
    ),
  {
    ssr: false
  }
)

function Home() {
  const { setEventsCalculatedCenter, setMapCenter } = useStateStore(
    (state) => state
  )
  const { historicalEvents, isLoading } =
    useSelectHistoricalEventsWithCoordinates()

  useEffect(() => {
    const calculatedCenter = calculateMapCenter(historicalEvents)
    setMapCenter(calculatedCenter)
    setEventsCalculatedCenter(calculatedCenter)
  }, [historicalEvents, setEventsCalculatedCenter, setMapCenter])

  return (
    <>
      {!isLoading && <DynamicEventsMap {...{ historicalEvents }} />}
      <About />
    </>
  )
}

export default Home
