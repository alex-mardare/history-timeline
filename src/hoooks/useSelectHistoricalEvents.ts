'use client'

import { useEffect, useState } from 'react'
import { PostgrestError } from '@supabase/supabase-js'

import { supabaseClient } from '@/utils/supabaseClient'
import {
  HistoricalEvent,
  SupabaseHistoricalEvent,
} from '@/interfaces/historicalEvent'

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
        if (data) {
          const cleanHistoricalEvents: HistoricalEvent[] = data.map(
            (historicalEvent: SupabaseHistoricalEvent) => {
              return {
                description: historicalEvent.description,
                eventDate: historicalEvent.eventDate,
                eventLocation: historicalEvent.eventLocation,
                eventTime: historicalEvent.eventTime,
                historicalEventCategory:
                  historicalEvent.historicalEventCategory[0],
                historicalState: historicalEvent.historicalState[0],
                id: historicalEvent.id,
                latitude: historicalEvent.latitude,
                longitude: historicalEvent.longitude,
                name: historicalEvent.name,
                presentCountry: historicalEvent.presentCountry[0],
              }
            }
          )

          setHistoricalEvents(cleanHistoricalEvents)
        }
      }
    }

    selectRows()
  }, [])

  return { historicalEvents, error }
}
