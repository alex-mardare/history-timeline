import { OsmValue } from '@/constants/osmValue'
import { PhotonLocationType } from '@/constants/photonLocationType'

type osm_type = 'N' | 'R' | 'W'

interface Location {
  country: string
  id: number
  latitude: number
  longitude: number
  name: string
  osm_type: osm_type
  state: string
  type: string
}

interface PhotonLocation {
  geometry: {
    coordinates: number[]
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

export type { Location, PhotonLocation }
