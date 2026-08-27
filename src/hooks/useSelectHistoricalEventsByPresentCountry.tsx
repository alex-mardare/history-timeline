'use client'

import { notifications } from '@mantine/notifications'
import { PostgrestError } from '@supabase/supabase-js'
import { IconExclamationCircleFilled } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { HistoricalEvent } from '@/types'
import { supabaseClient } from '@/utils/supabaseClient'

const useSelectHistoricalEventsByPresentCountry = (locationOsmId: number) => {
  const [historicalEvents, setHistoricalEvents] = useState<HistoricalEvent[]>(
    []
  )
  const [error, setError] = useState<PostgrestError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function selectHistoricalEvents() {
      setIsLoading(true)
      const { data, error } = await supabaseClient
        .from('historical_events')
        .select(
          `id, name, eventDate:event_date, eventTime:event_time, description, latitude, longitude, eventLocation:event_location, realLocation:approximate_real_location,
          historicalEventCategory:historical_event_categories(name),
          historicalState:historical_states(name),
          presentCountry:present_countries!inner(name)`
        )
        .eq('present_countries.osm_id', locationOsmId)
        .order('event_date_sort_key', { ascending: true })
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
          setHistoricalEvents(data)
        }
      }
    }

    selectHistoricalEvents().finally(() => setIsLoading(false))
  }, [locationOsmId])

  return { historicalEvents, isLoading, error }
}

export { useSelectHistoricalEventsByPresentCountry }
