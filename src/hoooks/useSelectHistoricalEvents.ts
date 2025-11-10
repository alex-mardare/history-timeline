'use client'

import { useEffect, useState } from 'react'
import { PostgrestError } from '@supabase/supabase-js'

import { supabaseClient } from '@/utils/supabaseClient'
import { HistoricalEvent } from '@/interfaces/historicalEvent'

export const useSelectHistoricalEvents = () => {
  const [historicalEvents, setHistoricalEvents] = useState<HistoricalEvent[]>(
    []
  )
  const [error, setError] = useState<PostgrestError | null>(null)
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
      if (error) {
        setError(error)
      } else {
        setHistoricalEvents(data)
      }
    }

    selectRows()
  }, [])

  return { historicalEvents, error }
}
