import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { GeoJSON, MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useShallow } from 'zustand/shallow'

import { MapController } from '@/components/events-map/MapController'
import { EventsTimeline } from '@/components/events-timeline/EventsTimeline'
import { EventMarkers } from '@/components/leaflet/EventMarkers'
import { SearchArea } from '@/components/search-area/SearchArea'
import { MAP_ZOOM_LEVEL } from '@/constants'
import { useStateStore } from '@/providers/storeProvider'

import styles from './EventsMap.module.css'

function EventsMap(): React.JSX.Element {
  const { historicalEventsMap, locationBoundary, mapCenter } = useStateStore(
    useShallow((state) => ({
      historicalEventsMap: state.historicalEventsMap,
      locationBoundary: state.locationBoundary,
      mapCenter: state.mapCenter
    }))
  )
  const historicalEvents = Array.from(historicalEventsMap.values())

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
      </MapContainer>
    </>
  )
}

export default EventsMap
