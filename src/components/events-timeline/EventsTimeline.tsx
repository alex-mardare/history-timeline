import { Slider } from '@mantine/core'
import L from 'leaflet'
import { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/shallow'

import { useSelectHistoricalEventsByPresentCountry } from '@/hooks/useSelectHistoricalEventsByPresentCountry'
import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types'

import styles from './EventsTimeline.module.css'

interface EventsTimelineProps {
  locationOsmId: number
}

function EventsTimeline({ locationOsmId }: EventsTimelineProps) {
  const { activeEventId, setActiveEventId } = useStateStore(
    useShallow((state) => ({
      activeEventId: state.activeEventId,
      setActiveEventId: state.setActiveEventId
    }))
  )
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

  let currentSliderValue = 0
  const activeEventIdIndex = historicalEvents.findIndex(
    (event: HistoricalEvent) => event.id === activeEventId
  )
  if (activeEventIdIndex > -1) {
    currentSliderValue = activeEventIdIndex + 1
  }

  const onChange = (index: number) => {
    if (index === 0) {
      setActiveEventId(index)
    } else {
      setActiveEventId(historicalEvents[index - 1].id)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === 'ArrowRight' &&
      currentSliderValue < sliderHistoricalEvents.length - 1
    ) {
      onChange(currentSliderValue + 1)
    } else if (e.key === 'ArrowLeft' && currentSliderValue > 0) {
      onChange(currentSliderValue - 1)
    }
  }

  useEffect(() => {
    const currentRef = panelRef.current
    if (!currentRef) return

    const focusTimeout = setTimeout(() => {
      currentRef.focus()
    }, 50)

    L.DomEvent.disableClickPropagation(currentRef)
    L.DomEvent.disableScrollPropagation(currentRef)

    return () => clearTimeout(focusTimeout)
  }, [])

  return (
    <div onKeyDown={onKeyDown} ref={panelRef} tabIndex={0}>
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
          value={currentSliderValue}
        />
      )}
    </div>
  )
}

export { EventsTimeline }
