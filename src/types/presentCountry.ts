import { PresentCountryRow } from './schema'

interface PresentCountry extends Omit<
  PresentCountryRow,
  'created_at' | 'id' | 'osm_id' | 'updated_at'
> {
  name: string
}

export type { PresentCountry }
