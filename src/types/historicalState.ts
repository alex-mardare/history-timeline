import { HistoricalStateRow } from './schema'

interface HistoricalState extends Omit<
  HistoricalStateRow,
  | 'created_at'
  | 'description'
  | 'dissolution_date'
  | 'foundation_date'
  | 'id'
  | 'updated_at'
> {
  name: string
}

export type { HistoricalState }
