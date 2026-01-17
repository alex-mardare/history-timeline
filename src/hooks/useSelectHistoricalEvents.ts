'use client'

import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types/historicalEvent'
import { supabaseClient } from '@/utils/supabaseClient'

export const useSelectHistoricalEvents = () => {
  const [historicalEvents, setHistoricalEvents] = useState<HistoricalEvent[]>(
    []
  )
  const [error, setError] = useState<PostgrestError | null>(null)

  const { addHistoricalEventToMap } = useStateStore((state) => state)

  useEffect(() => {
    async function selectRows() {
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
      } else {
        if (data) {
          data.forEach((event: HistoricalEvent) => {
            addHistoricalEventToMap(event)
          })
          setHistoricalEvents(data)
        }
      }
    }

    selectRows()
  }, [addHistoricalEventToMap])

  return { historicalEvents, error }
}
