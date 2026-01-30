import { Dispatch, SetStateAction } from 'react'

import { EventSearchButton } from '@/app/Button/EventSearchButton'
import { LocationSearchBar } from '@/app/SearchArea/Locations/LocationSearchBar'

interface LocationSearchAreaProps {
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
}

function LocationSearchArea({
  searchText,
  setSearchText
}: LocationSearchAreaProps) {
  return (
    <>
      <LocationSearchBar {...{ searchText, setSearchText }} />
      <EventSearchButton />
    </>
  )
}

export { LocationSearchArea }
