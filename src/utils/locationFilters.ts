import {
  ACCEPTED_OSM_VALUES,
  COUNTRIES,
  PHOTON_LOCATION_TYPES
} from '@/constants/constants'
import { Location, PhotonLocation } from '@/types/location'

const VIL_TOW_CIT_STA_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_MUN_CIT_STA_TER_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.MUNICIPALITY,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.TERRITORY,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_MUN_DIS_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.MUNICIPALITY,
  ACCEPTED_OSM_VALUES.DISTRICT,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_REG_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.REGION,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_PRO_STA_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.PROVINCE,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_CIT_LOC_STA_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.LOCALITY,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_COU_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.COUNTY,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_STA_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_MUN_STA_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.MUNICIPALITY,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_MUN_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.MUNICIPALITY,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_CIT_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const CIT_COU = [ACCEPTED_OSM_VALUES.CITY, ACCEPTED_OSM_VALUES.COUNTRY]

const VIL_CIT_STA_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_ISL_STA_COU_LOCATIONS = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.ISLAND,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_MUN_REG_COU_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.MUNICIPALITY,
  ACCEPTED_OSM_VALUES.REGION,
  ACCEPTED_OSM_VALUES.COUNTY,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_STA_REG_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.STATE,
  ACCEPTED_OSM_VALUES.REGION,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_CIT_DIS_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.CITY,
  ACCEPTED_OSM_VALUES.DISTRICT,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const VIL_TOW_COU = [
  ACCEPTED_OSM_VALUES.VILLAGE,
  ACCEPTED_OSM_VALUES.TOWN,
  ACCEPTED_OSM_VALUES.COUNTRY
]

const filterDuplicateLocations = (locations: Location[]): Location[] => {
  const priority = { R: 1, W: 2, N: 3 }
  return locations
    .sort(
      (a: Location, b: Location) => priority[a.osm_type] - priority[b.osm_type]
    )
    .filter(
      (currentLocation: Location, index: number, self: Location[]) =>
        index ===
        self.findIndex(
          (l: Location) =>
            l.name === currentLocation.name &&
            l.type === currentLocation.type &&
            l.country === currentLocation.country
        )
    )
}

const filterLocationTypeByCountry = (location: PhotonLocation) => {
  switch (location.properties.country) {
    case 'Afghanistan':
    case 'Angola':
    case 'Armenia':
    case 'Austria':
    case 'Bahrain':
    case 'Bangladesh':
    case 'Belarus':
    case 'Benin':
    case 'Bhutan':
    case 'Bolivia':
    case 'Botswana':
    case 'Burundi':
    case 'Cameroon':
    case 'Central African Republic':
    case 'Chad':
    case 'Chile':
    case "Côte d'Ivoire":
    case 'Democratic Republic of the Congo':
    case 'Djibouti':
    case 'Eritrea':
    case 'Ethiopia':
    case 'Gabon':
    case 'Germany':
    case 'Ghana':
    case 'Greece':
    case 'Guinea':
    case 'Iraq':
    case 'Italy':
    case 'Jordan':
    case 'Kazakhstan':
    case 'Kuwait':
    case 'Laos':
    case 'Lebanon':
    case COUNTRIES.LESOTHO:
    case 'Liberia':
    case 'Libya':
    case 'Malaysia':
    case 'Mexico':
    case 'Mongolia':
    case 'Morocco':
    case 'Mozambique':
    case 'Nigeria':
    case 'North Korea':
    case 'Papua New Guinea':
    case 'Poland':
    case 'Qatar':
    case 'Russia':
    case 'Saudi Arabia':
    case 'South Africa':
    case 'South Sudan':
    case 'Spain':
    case 'Sudan':
    case 'Switzerland':
    case 'Tajikistan':
    case 'Tanzania':
    case 'Uganda':
    case 'Ukraine':
    case 'United Arab Emirates':
    case 'United Kingdom':
    case 'Uruguay':
    case 'Uzbekistan':
    case 'Venezuela':
    case 'Vietnam':
    case 'Yemen':
    case 'Zambia':
    case 'Zimbabwe': {
      if (VIL_TOW_CIT_STA_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.ALBANIA:
    case 'Azerbaijan':
    case COUNTRIES.BARBADOS:
    case COUNTRIES.CAPE_VERDE:
    case COUNTRIES.CYPRUS:
    case COUNTRIES.ESTONIA:
    case COUNTRIES.GRENADA:
    case COUNTRIES.ICELAND:
    case COUNTRIES.JAMAICA:
    case COUNTRIES.LIECHTENSTEIN:
    case COUNTRIES.MONTENEGRO:
    case COUNTRIES.NAURU:
    case COUNTRIES.PALESINE:
    case COUNTRIES.RWANDA:
    case COUNTRIES.SAO_TOME:
    case COUNTRIES.SEYCHELLES:
    case COUNTRIES.ST_VINCENT_GRENADINES: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.COUNTY) ||
        VIL_TOW_CIT_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case 'Algeria':
    case 'Antigua and Barbuda':
    case 'Belgium':
    case 'Belize':
    case 'Bosnia and Herzegovina':
    case 'Bulgaria':
    case 'Cambodia':
    case 'Comoros':
    case 'Cuba':
    case 'Czechia':
    case 'Denmark':
    case 'Dominica':
    case 'Dominican Republic':
    case 'East Timor':
    case 'Egypt':
    case 'Eswatini':
    case 'Fiji':
    case 'Finland':
    case 'Guatemala':
    case 'Guinea-Bissau':
    case 'Guyana':
    case 'Haiti':
    case 'Kenya':
    case 'Kiribati':
    case 'Lithuania':
    case 'Madagascar':
    case 'Malawi':
    case 'Maldives':
    case 'Mali':
    case 'Niger':
    case 'Palau':
    case 'Panama':
    case 'Philippines':
    case 'Saint Lucia':
    case 'Samoa':
    case 'Sierra Leone':
    case 'Slovakia':
    case 'Solomon Islands':
    case 'Somalia':
    case 'Sri Lanka':
    case 'Suriname':
    case 'The Gambia':
    case 'Togo':
    case 'Tonga':
    case 'Trinidad and Tobago':
    case 'Tunisia':
    case 'Vanuatu': {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.STATE) ||
        VIL_TOW_CIT_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case 'Andorra':
    case 'Malta':
    case 'The Bahamas': {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.CITY) ||
        VIL_TOW_CIT_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case 'Argentina':
    case 'Colombia':
    case 'Equatorial Guinea':
    case 'France':
    case 'Georgia':
    case 'India':
    case 'Indonesia':
    case 'Israel':
    case 'Mauritania':
    case 'Myanmar':
    case 'Namibia':
    case 'Pakistan':
    case 'Peru':
    case 'Syria':
    case 'United States': {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.STATE) ||
        VIL_TOW_CIT_STA_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case 'Australia':
    case 'Brazil':
    case 'Congo-Brazzaville':
    case 'Ecuador': {
      if (VIL_MUN_CIT_STA_TER_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.BRUNEI:
    case COUNTRIES.KOSOVO: {
      if (VIL_TOW_CIT_MUN_DIS_COU.includes(location.properties.osm_value)) {
        console.log(location)
        return location
      }
      break
    }
    case 'Burkina Faso':
    case 'Senegal':
    case COUNTRIES.ST_KITTS_NEVIS: {
      if (VIL_TOW_CIT_REG_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case 'Canada':
    case 'Costa Rica':
    case 'Iran':
    case COUNTRIES.JAPAN:
    case 'Kyrgyzstan':
    case COUNTRIES.OMAN:
    case 'Serbia':
    case 'South Korea':
    case 'Thailand':
    case 'Turkey':
    case 'Turkmenistan': {
      if (VIL_TOW_CIT_PRO_STA_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.CHINA: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.REGION &&
          location.properties.type === PHOTON_LOCATION_TYPES.COUNTY) ||
        (VIL_CIT_LOC_STA_COU.includes(location.properties.osm_value) &&
          location.properties.osm_type === 'R')
      ) {
        return location
      }
      break
    }
    case COUNTRIES.CROATIA:
    case COUNTRIES.HUNGARY:
    case COUNTRIES.IRELAND:
    case COUNTRIES.LUXEMBOURG:
    case COUNTRIES.ROMANIA:
    case COUNTRIES.TAIWAN: {
      if (VIL_TOW_CIT_COU_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.EL_SALVADOR: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.DISTRICT &&
          location.properties.type === PHOTON_LOCATION_TYPES.CITY) ||
        VIL_STA_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case COUNTRIES.MICRONESIA: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ISLAND &&
          location.properties.type === PHOTON_LOCATION_TYPES.CITY) ||
        VIL_TOW_CIT_STA_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case 'Honduras':
    case 'Nicaragua':
    case 'Slovenia': {
      if (VIL_MUN_STA_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.LATVIA: {
      if (VIL_TOW_CIT_MUN_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.MARSHALL_ISLANDS: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.STATE) ||
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ISLAND &&
          location.properties.type === PHOTON_LOCATION_TYPES.CITY) ||
        VIL_CIT_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case COUNTRIES.MAURITIUS: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.STATE) ||
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ISLAND &&
          location.properties.type === PHOTON_LOCATION_TYPES.STATE) ||
        VIL_TOW_CIT_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case 'Monaco': {
      if (CIT_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.NEPAL: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.CITY) ||
        VIL_CIT_STA_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case COUNTRIES.NETHERLANDS: {
      if (
        VIL_TOW_CIT_ISL_STA_COU_LOCATIONS.includes(
          location.properties.osm_value
        )
      ) {
        return location
      }
      break
    }
    case 'New Zealand': {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.STATE) ||
        VIL_TOW_CIT_REG_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case 'North Macedonia':
    case 'Singapore': {
      if (VIL_CIT_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.NORWAY: {
      if (VIL_TOW_MUN_REG_COU_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case 'Paraguay': {
      if (VIL_TOW_CIT_STA_REG_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.PORTUGAL: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ARCHIPELAGO &&
          location.properties.type === PHOTON_LOCATION_TYPES.STATE) ||
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.COUNTY) ||
        VIL_TOW_CIT_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case COUNTRIES.MOLDOVA: {
      if (VIL_TOW_CIT_DIS_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case 'San Marino': {
      if (VIL_TOW_CIT_COU.includes(location.properties.osm_value)) {
        return location
      }
      break
    }
    case COUNTRIES.SWEDEN: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.COUNTY) ||
        VIL_TOW_CIT_MUN_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    case COUNTRIES.TUVALU: {
      if (
        (location.properties.osm_value === ACCEPTED_OSM_VALUES.ADMINISTRATIVE &&
          location.properties.type === PHOTON_LOCATION_TYPES.CITY) ||
        VIL_TOW_COU.includes(location.properties.osm_value)
      ) {
        return location
      }
      break
    }
    default: {
      return null
    }
  }
}

export { filterDuplicateLocations, filterLocationTypeByCountry }
