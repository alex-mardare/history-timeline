const PHOTON_LOCATION_TYPES = {
  CITY: 'city',
  COUNTY: 'county',
  STATE: 'state'
} as const

export type PhotonLocationType =
  (typeof PHOTON_LOCATION_TYPES)[keyof typeof PHOTON_LOCATION_TYPES]

export { PHOTON_LOCATION_TYPES }
