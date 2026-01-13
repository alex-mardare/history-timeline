import { HistoricalEventCategoryRow } from './schema'

interface HistoricalEventCategory extends Omit<
  HistoricalEventCategoryRow,
  'created_at' | 'id' | 'updated_at'
> {
  name: string
}

export type { HistoricalEventCategory }
