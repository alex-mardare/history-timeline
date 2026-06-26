import { useRef } from 'react'

import { Location } from '@/types'

const useLocationBoundarySearch = () => {
  const abortControllerRef = useRef<AbortController | null>(null)

  const searchLocationBoundary = async (location: Location) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController
    try {
      const response = await fetch(
        `/api/boundary?osmType=${location.osm_type}&osmId=${location.osm_id}`
      )

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error loading the location GeoJSON:', error)
    }
  }

  return { searchLocationBoundary }
}

export { useLocationBoundarySearch }
