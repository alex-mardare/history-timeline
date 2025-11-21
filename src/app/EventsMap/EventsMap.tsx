import React, { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet'

import { HistoricalEvent } from '@/interfaces/historicalEvent'
import { mapPopupIcon } from '@/constants/mapPopupIcon'

import 'leaflet/dist/leaflet.css'
import styles from './EventsMap.module.css'

interface EventsMapContainerProps {
  events: HistoricalEvent[]
}

function EventsMap({ events }: EventsMapContainerProps) {
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

  const MapResizer: React.FC = () => {
    const map = useMapEvents({})

    useEffect(() => {
      const timer = setTimeout(() => {
        map.invalidateSize()
      }, 100)

      const handleResize = () => map.invalidateSize()
      window.addEventListener('resize', handleResize)

      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', handleResize)
      }
    }, [map])

    return null
  }

  return (
    events.length > 0 && (
      <MapContainer
        center={[0, 0]}
        className={styles['events-map-container']}
        zoom={4}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {events.map((event: HistoricalEvent) => drawMapMarker(event))}
        <ZoomControl position="topright" />
        <MapResizer />
      </MapContainer>
    )
  )
}

export default EventsMap
