import React from 'react'
import { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl
} from 'react-leaflet'

import { EventsSearchBar } from '@/app/EventsSearch/EventsSearchBar'
import { MapUtil } from '@/app/MapUtil'
import { MAP_ZOOM_LEVEL } from '@/constants/constants'
import { mapPopupIcon } from '@/constants/mapPopupIcon'
import { HistoricalEvent } from '@/interfaces/historicalEvent'
import { useStateStore } from '@/providers/storeProvider'
import { calculateMapCenter } from '@/utils/mapUtils'

import 'leaflet/dist/leaflet.css'
import styles from './EventsMap.module.css'

interface EventsMapContainerProps {
  historicalEvents: HistoricalEvent[]
}

function EventsMap({
  historicalEvents
}: EventsMapContainerProps): React.JSX.Element {
  const { mapCenter, setMapCenter } = useStateStore((state) => state)
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

  useEffect(() => {
    setMapCenter(calculateMapCenter(historicalEvents))
  }, [historicalEvents, setMapCenter])

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
        {historicalEvents.map((event: HistoricalEvent) => drawMapMarker(event))}
        <ZoomControl position="topright" />
        <MapUtil center={mapCenter} />
      </MapContainer>
    </>
  )
}

export default EventsMap
