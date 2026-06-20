export const ACCEPTED_OSM_VALUES = {
  ADMINISTRATIVE: 'administrative',
  ARCHIPELAGO: 'archipelago',
  CITY: 'city',
  COUNTY: 'county',
  COUNTRY: 'country',
  DISTRICT: 'district',
  ISLAND: 'island',
  LOCALITY: 'locality',
  MUNICIPALITY: 'municipality',
  PROVINCE: 'province',
  REGION: 'region',
  STATE: 'state',
  TERRITORY: 'territory',
  TOWN: 'town',
  VILLAGE: 'village'
} as const

export type OsmValue =
  (typeof ACCEPTED_OSM_VALUES)[keyof typeof ACCEPTED_OSM_VALUES]
