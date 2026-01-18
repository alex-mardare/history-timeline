import React from 'react'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import { EventMarkers } from '@/app/EventMarkers'
import { EventsSearchBar } from '@/app/EventsSearch/EventsSearchBar'
import { MapController } from '@/app/MapController'
import { MAP_ZOOM_LEVEL } from '@/constants/constants'
import { HistoricalEvent } from '@/types/historicalEvent'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import styles from './EventsMap.module.css'
import { useStateStore } from '@/providers/storeProvider'

interface EventsMapContainerProps {
  historicalEvents: HistoricalEvent[]
}

function EventsMap({
  historicalEvents
}: EventsMapContainerProps): React.JSX.Element {
  const { mapCenter } = useStateStore((state) => state)
  return (
    <>
      <EventsSearchBar {...{ historicalEvents }} />
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
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
      </MapContainer>
    </>
  )
}

export default EventsMap
