import { Dispatch, SetStateAction } from 'react'

import { LocationSearchButton } from '@/app/Buttons/LocationSearchButton'
import { EventSearchBar } from '@/app/SearchArea/Events/EventSearchBar'
import { HistoricalEvent } from '@/types/historicalEvent'

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
