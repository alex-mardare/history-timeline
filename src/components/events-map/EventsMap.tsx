import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { useEffect, useState } from 'react'
import { GeoJSON, MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useShallow } from 'zustand/shallow'

import { EventTooltip } from '@/components/event-display/EventTooltip'
import { EventMarkers } from '@/components/events-map/EventMarkers'
import { MapController } from '@/components/events-map/MapController'
import { EventsTimeline } from '@/components/events-timeline/EventsTimeline'
import { SearchArea } from '@/components/search-area/SearchArea'
import { MAP_ZOOM_LEVEL } from '@/constants'
import { useStateStore } from '@/providers/storeProvider'
import type { HistoricalEvent } from '@/types'

import styles from './EventsMap.module.css'

function EventsMap(): React.JSX.Element {
  const {
    activeEventId,
    countryHistoricalEvents,
    mapHistoricalEvents,
    locationBoundary,
    mapCenter
  } = useStateStore(
    useShallow((state) => ({
      activeEventId: state.activeEventId,
      countryHistoricalEvents: state.countryHistoricalEvents,
      mapHistoricalEvents: state.mapHistoricalEvents,
      locationBoundary: state.locationBoundary,
      mapCenter: state.mapCenter
    }))
  )
  const historicalEvents = Array.from(mapHistoricalEvents.values())
  const [activeEvent, setActiveEvent] = useState<HistoricalEvent | undefined>(
    undefined
  )

  useEffect(() => {
    setActiveEvent(countryHistoricalEvents.get(activeEventId))
  }, [activeEventId, countryHistoricalEvents])

  return (
    <>
      <SearchArea {...{ historicalEvents }} />
      <MapContainer
        center={[mapCenter?.lat, mapCenter?.long]}
        className={styles['events-map-container']}
        zoom={MAP_ZOOM_LEVEL.DEFAULT_ZOOM_LEVEL}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup
          chunkedLoading={true}
          maxClusterRadius={20}
          showCoverageOnHover={false}
        >
          <EventMarkers {...{ historicalEvents }} />
        </MarkerClusterGroup>
        <ZoomControl position="topright" />
        <MapController />
        {locationBoundary && (
          <GeoJSON
            data={locationBoundary}
            key={locationBoundary.osm_id}
            style={{
              color: '#228be6',
              weight: 3,
              opacity: 1,
              fillColor: '#228be6',
              fillOpacity: 0.35
            }}
          />
        )}
        {locationBoundary && (
          <EventsTimeline locationOsmId={locationBoundary.osm_id} />
        )}
        <EventTooltip event={activeEvent} />
      </MapContainer>
    </>
  )
}

export default EventsMap
