'use client'

import dynamic from 'next/dynamic'

import { About } from '@/components/about/About'
import { useSelectHistoricalEventsWithCoordinates } from '@/hooks/useSelectHistoricalEventsWithCoordinates'

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
  const { isLoading } = useSelectHistoricalEventsWithCoordinates()

  return (
    <>
      {!isLoading && <DynamicEventsMap />}
      <About />
    </>
  )
}

export default Home
