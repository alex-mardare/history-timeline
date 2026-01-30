import { useCombobox } from '@mantine/core'
import { useState } from 'react'

import { ResetMapButton } from '@/app/Buttons/ResetMapButton'
import { EventsSearchArea } from '@/app/SearchArea/Events/EventsSearchArea'
import { LocationSearchArea } from '@/app/SearchArea/Locations/LocationSearchArea'
import { useStateStore } from '@/providers/storeProvider'
import { HistoricalEvent } from '@/types/historicalEvent'

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
        <EventsSearchArea
          {...{ historicalEvents, searchText, setSearchText }}
        />
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
