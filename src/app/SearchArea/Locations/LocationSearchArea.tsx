import { Dispatch, SetStateAction } from 'react'

import { EventSearchButton } from '../../Buttons/EventSearchButton'
import { LocationSearchBar } from './LocationSearchBar'

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
