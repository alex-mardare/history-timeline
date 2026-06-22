import { Dispatch, SetStateAction } from 'react'

import { LocationSearchButton } from '@/components/buttons/LocationSearchButton'
import { EventSearchBar } from '@/components/search-area/events/EventSearchBar'
import { HistoricalEvent } from '@/types'

interface EventSearchAreaProps {
  historicalEvents: HistoricalEvent[]
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
}

function EventSearchArea({
  historicalEvents,
  searchText,
  setSearchText
}: EventSearchAreaProps) {
  return (
    <>
      <EventSearchBar {...{ historicalEvents, searchText, setSearchText }} />
      <LocationSearchButton />
    </>
  )
}

export { EventSearchArea }
