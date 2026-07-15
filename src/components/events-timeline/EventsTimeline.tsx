import { Slider } from '@mantine/core'
import L from 'leaflet'
import { useEffect, useRef } from 'react'

import { useSelectHistoricalEventsByPresentCountry } from '@/hooks/useSelectHistoricalEventsByPresentCountry'
import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types'

import styles from './EventsTimeline.module.css'

interface EventsTimelineProps {
  locationOsmId: number
}

function EventsTimeline({ locationOsmId }: EventsTimelineProps) {
  const { setActiveEventId } = useStateStore((state) => state)

  const panelRef = useRef<HTMLDivElement>(null)

  const { historicalEvents, isLoading } =
    useSelectHistoricalEventsByPresentCountry(locationOsmId)
  let sliderHistoricalEvents = historicalEvents.map(
    (_: HistoricalEvent, index) => ({
      label: '',
      value: index + 1
    })
  )
  sliderHistoricalEvents = [{ label: '', value: 0 }, ...sliderHistoricalEvents]

  const onChange = (index: number) => {
    if (index === 0) {
      setActiveEventId(0)
    } else {
      setActiveEventId(historicalEvents[index - 1].id)
    }
  }

  useEffect(() => {
    const currentRef = panelRef.current

    if (!currentRef) return

    L.DomEvent.disableClickPropagation(currentRef)
    L.DomEvent.disableScrollPropagation(currentRef)
  }, [])

  return (
    <div ref={panelRef}>
      {!isLoading && (
        <Slider
          className={styles['events-timeline']}
          label={(index: number) => {
            if (index === 0) return null
            return historicalEvents[index - 1].eventDate
          }}
          marks={sliderHistoricalEvents}
          max={historicalEvents.length}
          onChange={onChange}
          restrictToMarks
        />
      )}
    </div>
  )
}

export { EventsTimeline }
