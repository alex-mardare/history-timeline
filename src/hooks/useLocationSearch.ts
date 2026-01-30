import { Dispatch, SetStateAction, useRef } from 'react'

import { ACCEPTED_OSM_TYPES, URL } from '@/constants/constants'
import type { Location, PhotonLocation } from '@/types/location'

export const useLocationSearch = (
  setLocations: Dispatch<SetStateAction<Location[]>>
) => {
  const abortControllerRef = useRef<AbortController | null>(null)

  const searchLocations = async (locationName: string) => {
    setLocations([])
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController
    try {
      const response = await fetch(
        URL.PHOTOM_KOMOOT + '?q=' + locationName + '&limit=10'
      )

      const data = await response.json()
      data.features.forEach((feature: PhotonLocation) => {
        if (
          ACCEPTED_OSM_TYPES.includes(feature.properties.osm_value) &&
          feature.properties.osm_type !== 'N'
        ) {
          setLocations((prevLocations: Location[]) => [
            ...prevLocations,
            {
              country: feature.properties.country,
              id: feature.properties.osm_id,
              latitude: feature.geometry.coordinates[1],
              longitude: feature.geometry.coordinates[0],
              name: feature.properties.name,
              state: feature.properties.state,
              type: feature.properties.osm_value
            }
          ])
        }
      })
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return { searchLocations }
}
