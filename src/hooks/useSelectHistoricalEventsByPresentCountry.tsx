'use client'

import { notifications } from '@mantine/notifications'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types'
import { noHistoricalEventsLoading } from '@/utils/notifications'
import { supabaseClient } from '@/utils/supabaseClient'

const useSelectHistoricalEventsByPresentCountry = (locationOsmId: number) => {
  const [historicalEvents, setHistoricalEvents] = useState<HistoricalEvent[]>(
    []
  )
  const [error, setError] = useState<PostgrestError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { addCountryHistoricalEvents } = useStateStore(
    useShallow((state) => ({
      addCountryHistoricalEvents: state.addCountryHistoricalEvents
    }))
  )

  useEffect(() => {
    async function selectHistoricalEvents() {
      setIsLoading(true)
      const { data, error } = await supabaseClient
        .from('historical_events')
        .select(
          `id, name, eventDate:event_date, eventTime:event_time, description, latitude, longitude, eventLocation:event_location, realLocation:approximate_real_location,
        historicalEventCategory:historical_event_categories(name),
        historicalState:historical_states(name),
        historical_events_present_countries!inner(present_countries!inner(name, osm_id))`
        )
        .eq(
          'historical_events_present_countries.present_countries.osm_id',
          locationOsmId
        )
        .order('event_date_sort_key', { ascending: true })
      if (error) {
        setError(error)
        const handleNoData = () => {
          notifications.show(noHistoricalEventsLoading)
        }
        handleNoData()
      } else {
        if (data) {
          const formattedEvents: HistoricalEvent[] = data.map((event) => ({
            ...event,
            presentCountry:
              event.historical_events_present_countries?.[0]
                ?.present_countries ?? null
          }))
          formattedEvents.forEach((event: HistoricalEvent) => {
            addCountryHistoricalEvents(event)
          })
          setHistoricalEvents(formattedEvents)
        }
      }
    }

    selectHistoricalEvents().finally(() => setIsLoading(false))
  }, [addCountryHistoricalEvents, locationOsmId])

  return { historicalEvents, isLoading, error }
}

export { useSelectHistoricalEventsByPresentCountry }
