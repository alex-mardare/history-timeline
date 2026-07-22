import { GeoJsonTypes } from 'geojson'

import { OsmValue, PhotonLocationType } from './enums'
import { NestedPosition, Position } from './mapInterfaces'

type osm_type = 'N' | 'R' | 'W'

interface Location {
  country: string
  id: number
  latitude: number
  longitude: number
  name: string
  osm_id: number
  osm_type: osm_type
  state: string
  type: string
}

interface LocationBoundary {
  coordinates: NestedPosition
  osm_id: number
  type: GeoJsonTypes
}

interface PhotonLocation {
  geometry: {
    coordinates: Position
  }
  properties: {
    county: string
    country: string
    name: string
    osm_id: number
    osm_type: osm_type
    osm_value: OsmValue
    state: string
    type: PhotonLocationType
  }
}

export type { Location, LocationBoundary, PhotonLocation }
