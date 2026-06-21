import { ACCEPTED_OSM_VALUES, PHOTON_LOCATION_TYPES } from '@/constants'

type OsmValue = (typeof ACCEPTED_OSM_VALUES)[keyof typeof ACCEPTED_OSM_VALUES]
type PhotonLocationType =
  (typeof PHOTON_LOCATION_TYPES)[keyof typeof PHOTON_LOCATION_TYPES]
type SearchType = 'event' | 'location'

export type { OsmValue, PhotonLocationType, SearchType }
