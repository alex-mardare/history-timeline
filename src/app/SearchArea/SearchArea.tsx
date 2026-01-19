import { useCombobox } from '@mantine/core'
import { useState } from 'react'

import { EventSearchButton } from '@/app/buttons/EventSearchButton'
import { LocationSearchButton } from '@/app/buttons/LocationSearchButton'
import { ResetMapButton } from '@/app/buttons/ResetMapButton'
import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types/historicalEvent'

import styles from './SearchArea.module.css'
import { EventsDropdown } from '../EventsDropdown/EventsDropdown'

interface SearchAreaProps {
  historicalEvents: HistoricalEvent[]
}

function SearchArea({ historicalEvents }: SearchAreaProps) {
  const comboboxStore = useCombobox({
    onDropdownClose: () => comboboxStore.resetSelectedOption()
  })
  const { searchType } = useStateStore((state) => state)
  const [searchText, setSearchText] = useState('')

  return (
    <div className={styles['search-area']}>
      <EventsDropdown {...{ historicalEvents, searchText, setSearchText }} />
      <ResetMapButton
        resetSearchText={() => setSearchText('')}
        {...{ searchText }}
      />
      {searchType === 'event' && <LocationSearchButton />}
      {searchType === 'location' && <EventSearchButton />}
    </div>
  )
}

export { SearchArea }
