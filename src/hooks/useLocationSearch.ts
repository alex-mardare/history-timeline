import { Dispatch, SetStateAction, useRef } from 'react'

import { URL } from '@/constants/constants'
import type { Location, PhotonLocation } from '@/types/location'
import { filterLocationTypeByCountry } from '@/utils/locationFilters'
import { mapPhotonLocation } from '@/utils/locationMapper'

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
        if (!!filterLocationTypeByCountry(feature)) {
          setLocations((prevLocations: Location[]) => [
            ...prevLocations,
            mapPhotonLocation(feature)
          ])
        }
      })
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return { searchLocations }
}
