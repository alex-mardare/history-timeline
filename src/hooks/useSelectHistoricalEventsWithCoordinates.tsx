'use client'

import { notifications } from '@mantine/notifications'
import { PostgrestError } from '@supabase/supabase-js'
import { IconExclamationCircleFilled } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types'
import { calculateMapCenter } from '@/utils/mapUtils'
import { supabaseClient } from '@/utils/supabaseClient'

const useSelectHistoricalEventsWithCoordinates = () => {
  const [historicalEvents, setHistoricalEvents] = useState<HistoricalEvent[]>(
    []
  )
  const [error, setError] = useState<PostgrestError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { addHistoricalEventToMap, setEventsCalculatedCenter, setMapCenter } =
    useStateStore(
      useShallow((state) => ({
        addHistoricalEventToMap: state.addHistoricalEventToMap,
        setEventsCalculatedCenter: state.setEventsCalculatedCenter,
        setMapCenter: state.setMapCenter
      }))
    )

  useEffect(() => {
    async function selectHistoricalEvents() {
      setIsLoading(true)
      const { data, error } = await supabaseClient
        .from('historical_events')
        .select(
          `id, name, eventDate:event_date, eventTime:event_time, description, latitude, longitude, eventLocation:event_location,
                historicalEventCategory:historical_event_categories(name),
                historicalState:historical_states(name),
                presentCountry:present_countries(name)
                `
        )
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
      if (error) {
        setError(error)
        const handleNoData = () => {
          notifications.show({
            autoClose: 300000,
            color: 'red',
            icon: <IconExclamationCircleFilled />,
            message:
              'There was an issue loading the historical events. Please try again later.',
            position: 'top-right',
            title: 'Problems loading the data',
            withCloseButton: true
          })
        }
        handleNoData()
      } else {
        if (data) {
          data.forEach((event: HistoricalEvent) => {
            addHistoricalEventToMap(event)
          })
          setHistoricalEvents(data)

          const calculatedCenter = calculateMapCenter(data)
          setMapCenter(calculatedCenter)
          setEventsCalculatedCenter(calculatedCenter)
        }
      }
    }

    selectHistoricalEvents().finally(() => setIsLoading(false))
  }, [addHistoricalEventToMap, setEventsCalculatedCenter, setMapCenter])

  return { historicalEvents, isLoading, error }
}

export { useSelectHistoricalEventsWithCoordinates }
