import { HistoricalEventCategory } from './historicalEventCategory'
import { HistoricalState } from './historicalState'
import { PresentCountry } from './presentCountry'

interface HistoricalEvent {
  description: string | null
  eventDate: string
  eventLocation: string | null
  eventTime: string | null
  historicalEventCategory: HistoricalEventCategory | null
  historicalState: HistoricalState | null
  id: number
  latitude: number | null
  longitude: number | null
  name: string
  presentCountry: PresentCountry | null
}

interface SupabaseHistoricalEvent {
  description: string | null
  eventDate: string
  eventLocation: string | null
  eventTime: string | null
  historicalEventCategory: HistoricalEventCategory[]
  historicalState: HistoricalState[]
  id: number
  latitude: number | null
  longitude: number | null
  name: string
  presentCountry: PresentCountry[]
}

export type { HistoricalEvent, SupabaseHistoricalEvent }
