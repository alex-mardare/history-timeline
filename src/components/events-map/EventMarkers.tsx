import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import L from 'leaflet'
import { Marker, useMap } from 'react-leaflet'
import useSupercluster from 'use-supercluster'

import { EventPopup } from '@/components/event-display/EventPopup'
import { EventMarkerMemo } from '@/components/events-map/EventMarker'
import { clusterIcon } from '@/components/leaflet-icons/clusterIcon'
import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types'

import styles from './EventMarkers.module.css'

interface EventMarkersProps {
  historicalEvents: HistoricalEvent[]
}

const EventMarkers = ({ historicalEvents }: EventMarkersProps) => {
  const { activeEventId } = useStateStore(
    useShallow((state) => ({
      activeEventId: state.activeEventId
    }))
  )
  const map = useMap()
  const points = useMemo(
    () =>
      historicalEvents.map((event: HistoricalEvent) => ({
        geometry: {
          coordinates: [event.longitude, event.latitude],
          type: 'Point' as const
        },
        properties: {
          cluster: false,
          event,
          eventId: event.id
        },
        type: 'Feature' as const
      })),
    [historicalEvents]
  )

  const [bounds, setBounds] = useState<[number, number, number, number] | null>(
    null
  )
  const [zoom, setZoom] = useState<number>(map.getZoom())
  const updateMapState = () => {
    const mapBounds = map.getBounds()
    setBounds([
      mapBounds.getWest(),
      mapBounds.getSouth(),
      mapBounds.getEast(),
      mapBounds.getNorth()
    ])
    setZoom(map.getZoom())
  }
  const { clusters, supercluster } = useSupercluster({
    bounds: bounds ?? [0, 0, 0, 0],
    options: { radius: 40, maxZoom: 17 },
    points,
    zoom
  })
  const markerRefs = useRef<{ [keys: string]: L.Marker }>({})
  const setMarkerRef = useCallback((id: number, marker: L.Marker | null) => {
    if (marker) {
      markerRefs.current[id] = marker
    } else {
      delete markerRefs.current[id]
    }
  }, [])

  useEffect(() => {
    updateMapState()
    map.on('moveend zoomend', updateMapState)
    return () => {
      map.off('moveend zoomend', updateMapState)
    }
  }, [map])

  useEffect(() => {
    Object.values(markerRefs.current).forEach((marker) => marker.closePopup())

    requestAnimationFrame(() => {
      const targetMarker = markerRefs.current[activeEventId]
      if (targetMarker) {
        targetMarker.openPopup()
      }
    })
  }, [activeEventId])

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates
        const { cluster: isCluster, point_count } = cluster.properties

        if (isCluster) {
          const leaves = supercluster?.getLeaves(cluster.id, Infinity) ?? []
          const hasActiveEvent = leaves.some(
            (leaf) => leaf.properties.eventId === activeEventId
          )
          const activeEvent = leaves.find(
            (leaf) => leaf.properties.eventId === activeEventId
          )?.properties.event
          return (
            <Marker
              icon={clusterIcon(styles['marker-cluster'], point_count)}
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              ref={(marker) => {
                if (hasActiveEvent && marker) {
                  marker.openPopup()
                }
              }}
            >
              {hasActiveEvent && <EventPopup event={activeEvent} />}
            </Marker>
          )
        }

        const activeEvent = cluster.properties.event as HistoricalEvent
        return (
          <EventMarkerMemo
            event={activeEvent}
            key={activeEvent.id}
            {...{ setMarkerRef }}
          />
        )
      })}
    </>
  )
}

export { EventMarkers }
