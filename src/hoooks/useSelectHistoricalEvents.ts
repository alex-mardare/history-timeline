'use client'

import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import {
  HistoricalEvent,
  SupabaseHistoricalEvent
} from '@/interfaces/historicalEvent'
import { useStateStore } from '@/providers/storeProvider'
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
      if (error) {
        setError(error)
      } else {
        if (data) {
          const cleanHistoricalEvents: HistoricalEvent[] = data.map(
            (historicalEvent: SupabaseHistoricalEvent) => {
              const cleanHistoricalEvent = {
                description: historicalEvent.description,
                eventDate: historicalEvent.eventDate,
                eventLocation: historicalEvent.eventLocation,
                eventTime: historicalEvent.eventTime,
                historicalEventCategory:
                  historicalEvent.historicalEventCategory?.[0] ?? null,
                historicalState: historicalEvent.historicalState?.[0] ?? null,
                id: historicalEvent.id,
                latitude: historicalEvent.latitude,
                longitude: historicalEvent.longitude,
                name: historicalEvent.name,
                presentCountry: historicalEvent.presentCountry?.[0] ?? null
              }
              addHistoricalEventToMap(cleanHistoricalEvent)
              return cleanHistoricalEvent
            }
          )

          setHistoricalEvents(cleanHistoricalEvents)
        }
      }
    }

    selectRows()
  }, [addHistoricalEventToMap])

  return { historicalEvents, error }
}
