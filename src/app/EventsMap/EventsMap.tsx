import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { GeoJSON, MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import { EventMarkers } from '@/app/EventsMap/EventMarkers'
import { MapController } from '@/app/MapController'
import { SearchArea } from '@/app/SearchArea/SearchArea'
import { MAP_ZOOM_LEVEL } from '@/constants/constants'
import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types'

import styles from './EventsMap.module.css'

interface EventsMapContainerProps {
  historicalEvents: HistoricalEvent[]
}

function EventsMap({
  historicalEvents
}: EventsMapContainerProps): React.JSX.Element {
  const { locationBoundary, mapCenter } = useStateStore((state) => state)

  return (
    <>
      <SearchArea {...{ historicalEvents }} />
      <MapContainer
        center={[mapCenter?.lat, mapCenter?.lng]}
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
      </MapContainer>
    </>
  )
}

export default EventsMap
