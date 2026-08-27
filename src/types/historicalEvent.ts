import { HistoricalEventCategory } from './historicalEventCategory'
import { HistoricalState } from './historicalState'
import { PresentCountry } from './presentCountry'
import { HistoricalEventRow } from './schema'

interface HistoricalEvent extends Omit<
  HistoricalEventRow,
  | 'approximate_real_location'
  | 'created_at'
  | 'event_date'
  | 'event_date_sort_key'
  | 'event_location'
  | 'event_time'
  | 'historical_event_category_id'
  | 'historical_state_id'
  | 'present_country_id'
  | 'updated_at'
> {
  eventDate: string | null
  eventLocation: string | null
  eventTime: string | null
  historicalEventCategory: HistoricalEventCategory | null
  historicalState: HistoricalState | null
  presentCountry: PresentCountry | null
  realLocation: boolean
}

export type { HistoricalEvent }
