import { Dispatch, SetStateAction } from 'react'

import { EventSearchButton } from '@/components/buttons/EventSearchButton'
import { LocationSearchBar } from '@/components/search-area/locations/LocationSearchBar'

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
