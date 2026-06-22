import { useCombobox } from '@mantine/core'
import { useState } from 'react'

import { ResetMapButton } from '@/components/buttons/ResetMapButton'
import { EventSearchArea } from '@/components/search-area/events/EventSearchArea'
import { LocationSearchArea } from '@/components/search-area/locations/LocationSearchArea'
import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types'

import styles from './SearchArea.module.css'

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
      {searchType === 'event' && (
        <EventSearchArea {...{ historicalEvents, searchText, setSearchText }} />
      )}
      {searchType === 'location' && (
        <LocationSearchArea {...{ searchText, setSearchText }} />
      )}
      <ResetMapButton
        resetSearchText={() => setSearchText('')}
        {...{ searchText }}
      />
    </div>
  )
}

export { SearchArea }
