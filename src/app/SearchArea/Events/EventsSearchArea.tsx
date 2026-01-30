import { Dispatch, SetStateAction } from 'react'

import { LocationSearchButton } from '@/app/Buttons/LocationSearchButton'
import { EventsSearchBar } from '@/app/SearchArea/Events/EventsSearchBar'
import { HistoricalEvent } from '@/types/historicalEvent'

interface EventsSearchAreaProps {
  historicalEvents: HistoricalEvent[]
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
}

function EventsSearchArea({
  historicalEvents,
  searchText,
  setSearchText
}: EventsSearchAreaProps) {
  return (
    <>
      <EventsSearchBar {...{ historicalEvents, searchText, setSearchText }} />
      <LocationSearchButton />
    </>
  )
}

export { EventsSearchArea }
