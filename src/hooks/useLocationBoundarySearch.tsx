import { notifications } from '@mantine/notifications'
import { IconCircleCheck } from '@tabler/icons-react'
import { useRef } from 'react'

import { Location } from '@/types'

const BOUDNARY_NOTIFICATION_ID = 'boundary-notification-id'

const useLocationBoundarySearch = () => {
  const abortControllerRef = useRef<AbortController | null>(null)

  const searchLocationBoundary = async (location: Location) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController
    try {
      notifications.show({
        autoClose: false,
        id: BOUDNARY_NOTIFICATION_ID,
        loading: true,
        message: `Loading historical events for ${location.name}`,
        position: 'top-right'
      })
      const response = await fetch(
        `/api/boundary?osmType=${location.osm_type}&osmId=${location.osm_id}`
      )

      const data = await response.json()
      notifications.update({
        autoClose: 1500,
        color: 'green',
        loading: false,
        icon: <IconCircleCheck />,
        id: BOUDNARY_NOTIFICATION_ID,
        message: `${location.name} historical events loaded`,
        position: 'top-right'
      })
      return data
    } catch (error) {
      console.error('Error loading the location GeoJSON:', error)
    }
  }

  return { searchLocationBoundary }
}

export { useLocationBoundarySearch }
