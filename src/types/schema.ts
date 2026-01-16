import { Database } from './supabase'

type HistoricalEventCategoryRow =
  Database['public']['Tables']['historical_event_categories']['Row']

type HistoricalEventRow =
  Database['public']['Tables']['historical_events']['Row']

type HistoricalStateRow =
  Database['public']['Tables']['historical_states']['Row']

type PresentCountryRow =
  Database['public']['Tables']['present_countries']['Row']

export type {
  HistoricalEventCategoryRow,
  HistoricalEventRow,
  HistoricalStateRow,
  PresentCountryRow
}
