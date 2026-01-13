import { Database } from './supabase'

export type HistoricalEventCategoryRow =
  Database['public']['Tables']['historical_event_categories']['Row']

export type HistoricalEventRow =
  Database['public']['Tables']['historical_events']['Row']

export type HistoricalStateRow =
  Database['public']['Tables']['historical_states']['Row']

export type PresentCountryRow =
  Database['public']['Tables']['present_countries']['Row']
