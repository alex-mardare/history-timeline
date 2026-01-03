import React from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import { EventsSearchBar } from '@/app/EventsSearch/EventsSearchBar'
import { MapUtil } from '@/app/MapUtil'
import { MAP_ZOOM_LEVEL } from '@/constants/constants'
import { mapPopupIcon } from '@/constants/mapPopupIcon'
import { HistoricalEvent } from '@/interfaces/historicalEvent'
import { MapCenter } from '@/interfaces/mapInterfaces'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import styles from './EventsMap.module.css'

interface EventsMapContainerProps {
  historicalEvents: HistoricalEvent[]
  mapCenter: MapCenter
}

function EventsMap({
  historicalEvents,
  mapCenter
}: EventsMapContainerProps): React.JSX.Element {
  const drawMapMarker = (event: HistoricalEvent) => {
    if (event.latitude && event.longitude) {
      return (
        <Marker
          key={event.id}
          icon={mapPopupIcon}
          position={[event.latitude, event.longitude]}
        >
          <Popup>
            <b>{event.name}</b>
            <br />
            {event.description}
          </Popup>
        </Marker>
      )
    }
  }

  return (
    <>
      <EventsSearchBar {...{ historicalEvents }} />
      <MapContainer
        center={mapCenter}
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
          {historicalEvents.map((event: HistoricalEvent) =>
            drawMapMarker(event)
          )}
        </MarkerClusterGroup>
        <ZoomControl position="topright" />
        <MapUtil center={mapCenter} />
      </MapContainer>
    </>
  )
}

export default EventsMap
