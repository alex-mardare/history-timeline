import { useCallback, useEffect, useRef } from 'react'

import { EventMarkerMemo } from '@/components/leaflet/EventMarker'
import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types'

interface EventMarkersProps {
  historicalEvents: HistoricalEvent[]
}

const EventMarkers = ({ historicalEvents }: EventMarkersProps) => {
  const activeEventId = useStateStore((state) => state.activeEventId)

  const markerRefs = useRef<{ [keys: string]: L.Marker }>({})

  useEffect(() => {
    Object.values(markerRefs.current).forEach((marker) => marker.closePopup())

    requestAnimationFrame(() => {
      const targetMarker = markerRefs.current[activeEventId]
      if (targetMarker) {
        targetMarker.openPopup()
      }
    })
  }, [activeEventId])

  const setMarkerRef = useCallback((id: number, marker: L.Marker | null) => {
    if (marker) {
      markerRefs.current[id] = marker
    } else {
      delete markerRefs.current[id]
    }
  }, [])

  return (
    <>
      {historicalEvents.map((event: HistoricalEvent) => (
        <EventMarkerMemo key={event.id} {...{ event, setMarkerRef }} />
      ))}
    </>
  )
}

export { EventMarkers }
