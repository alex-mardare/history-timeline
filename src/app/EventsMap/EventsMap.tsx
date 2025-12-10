import React from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl
} from 'react-leaflet'

import { EventsSearchBar } from '@/app/EventsSearch/EventsSearchBar'
import { mapPopupIcon } from '@/constants/mapPopupIcon'
import { HistoricalEvent } from '@/interfaces/historicalEvent'
import { MapResizer } from '@/utils/MapResizer'
import { calculateMapCenter } from '@/utils/mapUtils'

import 'leaflet/dist/leaflet.css'
import styles from './EventsMap.module.css'

interface EventsMapContainerProps {
  historicalEvents: HistoricalEvent[]
}

function EventsMap({
  historicalEvents
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
        center={calculateMapCenter(historicalEvents)}
        className={styles['events-map-container']}
        zoom={4}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {historicalEvents.map((event: HistoricalEvent) => drawMapMarker(event))}
        <ZoomControl position="topright" />
        <MapResizer />
      </MapContainer>
    </>
  )
}

export default EventsMap
