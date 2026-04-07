import {
  ACCEPTED_OSM_VALUES,
  COUNTRIES,
  PHOTON_LOCATION_TYPES
} from '@/constants/constants'
import { Location, PhotonLocation } from '@/types/location'

const mapPhotonLocation = (location: PhotonLocation) => {
  let state = ''
  switch (location.properties.country) {
    case COUNTRIES.ALBANIA:
    case COUNTRIES.BARBADOS:
    case COUNTRIES.BRUNEI:
    case COUNTRIES.CAPE_VERDE:
    case COUNTRIES.CROATIA:
    case COUNTRIES.CYPRUS:
    case COUNTRIES.ESTONIA:
    case COUNTRIES.GRENADA:
    case COUNTRIES.HUNGARY:
    case COUNTRIES.ICELAND:
    case COUNTRIES.IRELAND:
    case COUNTRIES.JAMAICA:
    case COUNTRIES.KOSOVO:
    case COUNTRIES.LESOTHO:
    case COUNTRIES.LIECHTENSTEIN:
    case COUNTRIES.LUXEMBOURG:
    case COUNTRIES.MOLDOVA:
    case COUNTRIES.MONTENEGRO:
    case COUNTRIES.NAURU:
    case COUNTRIES.NORWAY:
    case COUNTRIES.PALESINE:
    case COUNTRIES.ROMANIA:
    case COUNTRIES.RWANDA:
    case COUNTRIES.SAO_TOME:
    case COUNTRIES.SEYCHELLES:
    case COUNTRIES.ST_KITTS_NEVIS:
    case COUNTRIES.ST_VINCENT_GRENADINES:
    case COUNTRIES.SWEDEN:
    case COUNTRIES.TAIWAN: {
      state = location.properties.county
      break
    }
    case COUNTRIES.PORTUGAL: {
      if (location.properties.county !== undefined) {
        state = location.properties.county
      } else {
        state = location.properties.state
      }
      break
    }
    default: {
      state = location.properties.state
      break
    }
  }

  const locationType = () => {
    if (
      (location.properties.country === COUNTRIES.CHINA &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.REGION) ||
      (location.properties.country === COUNTRIES.EL_SALVADOR &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.DISTRICT) ||
      ((location.properties.country === COUNTRIES.JAPAN ||
        location.properties.country === COUNTRIES.OMAN) &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.PROVINCE &&
        location.properties.type === PHOTON_LOCATION_TYPES.CITY) ||
      ((location.properties.country === COUNTRIES.MARSHALL_ISLANDS ||
        location.properties.country === COUNTRIES.MICRONESIA) &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.ISLAND) ||
      ((location.properties.country === COUNTRIES.NEPAL ||
        location.properties.country === COUNTRIES.TUVALU) &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE)
    ) {
      return ACCEPTED_OSM_VALUES.CITY
    } else if (
      (location.properties.country === COUNTRIES.LATVIA &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.MUNICIPALITY) ||
      (location.properties.country === COUNTRIES.MAURITIUS &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.ISLAND) ||
      (location.properties.country === COUNTRIES.NETHERLANDS &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.ISLAND) ||
      (location.properties.country === COUNTRIES.PORTUGAL &&
        location.properties.osm_value === ACCEPTED_OSM_VALUES.ARCHIPELAGO) ||
      [
        ACCEPTED_OSM_VALUES.ADMINISTRATIVE,
        ACCEPTED_OSM_VALUES.COUNTY,
        ACCEPTED_OSM_VALUES.DISTRICT,
        ACCEPTED_OSM_VALUES.PROVINCE,
        ACCEPTED_OSM_VALUES.REGION,
        ACCEPTED_OSM_VALUES.TERRITORY
      ].includes(location.properties.osm_value)
    ) {
      return ACCEPTED_OSM_VALUES.STATE
    } else {
      return location.properties.osm_value
    }
  }

  return {
    country: location.properties.country,
    id: location.properties.osm_id,
    latitude: location.geometry.coordinates[1],
    longitude: location.geometry.coordinates[0],
    name: location.properties.name,
    osm_type: location.properties.osm_type,
    state: state,
    type: locationType()
  }
}

const mapLocationSubLabel = (location: Location) => {
  if (
    [
      ACCEPTED_OSM_VALUES.VILLAGE,
      ACCEPTED_OSM_VALUES.TOWN,
      ACCEPTED_OSM_VALUES.MUNICIPALITY,
      ACCEPTED_OSM_VALUES.CITY,
      ACCEPTED_OSM_VALUES.LOCALITY
    ].includes(location.type.toLowerCase())
  ) {
    return [location.state ?? null, location.country]
      .filter((loc) => !!loc)
      .join(', ')
  } else if (location.type.toLowerCase() === ACCEPTED_OSM_VALUES.STATE) {
    return location.country
  }
}

export { mapLocationSubLabel, mapPhotonLocation }
