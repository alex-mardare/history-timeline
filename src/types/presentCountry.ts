import { PresentCountryRow } from './schema'

interface PresentCountry extends Omit<
  PresentCountryRow,
  'created_at' | 'id' | 'updated_at'
> {
  name: string
}

export type { PresentCountry }
