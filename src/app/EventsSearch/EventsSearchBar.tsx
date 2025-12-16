import { CloseButton, Combobox, InputBase, useCombobox } from '@mantine/core'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DROPDOWM_OPTIONS_LIMIT } from '@/constants/constants'
import { HistoricalEvent } from '@/interfaces/historicalEvent'
import { useStateStore } from '@/providers/storeProvider'

import styles from './EventsSearchBar.module.css'

interface EventsSearchBarProps {
  historicalEvents: HistoricalEvent[]
}
type OnClickFocusEvent =
  | React.FocusEvent<HTMLInputElement>
  | React.MouseEvent<HTMLInputElement>

function EventsSearchBar({ historicalEvents }: EventsSearchBarProps) {
  const comboboxStore = useCombobox({
    onDropdownClose: () => comboboxStore.resetSelectedOption()
  })
  const { historicalEventsMap, mapCenter, setMapCenter } = useStateStore(
    (state) => state
  )

  const [search, setSearch] = useState('')
  const [events, setEvents] = useState<HistoricalEvent[]>([])

  useEffect(() => {
    setEvents(
      historicalEvents.filter(
        (event: HistoricalEvent) => event.latitude && event.longitude
      )
    )
  }, [historicalEvents])

  const filterEventNames = () => {
    const result: HistoricalEvent[] = []
    for (let i = 0; i < events.length; i++) {
      if (result.length === DROPDOWM_OPTIONS_LIMIT) {
        break
      }
      if (events[i].name.toLowerCase().includes(search.toLowerCase().trim())) {
        result.push(events[i])
      }
    }
    return result
  }
  const centerMapOnEvent = (eventId: number) => {
    const selectedEvent = historicalEventsMap.get(eventId)
    setMapCenter({
      lat: selectedEvent?.latitude ?? mapCenter.lat,
      lng: selectedEvent?.longitude ?? mapCenter.lng
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      comboboxStore.openDropdown()
      comboboxStore.updateSelectedOptionIndex()
      setSearch(event.currentTarget.value)
    } else {
      setSearch('')
      comboboxStore.closeDropdown()
    }
  }
  const onClickFocus = (event: OnClickFocusEvent) => {
    const targetElement = event.target as HTMLInputElement
    if (targetElement.value.length > 0) {
      comboboxStore.openDropdown()
    }
  }
  const onOptionSubmit = (value: string) => {
    setSearch(value)
    comboboxStore.closeDropdown()
  }

  const renderComboboxOptions = () => {
    const filteredOptions = filterEventNames()
    if (filteredOptions.length > 0) {
      return filteredOptions.map((option: HistoricalEvent) => (
        <Combobox.Option
          key={option.id}
          onClick={() => {
            centerMapOnEvent(option.id)
          }}
          value={option.name}
        >
          {option.name}
        </Combobox.Option>
      ))
    } else {
      return <Combobox.Empty>Nothing found</Combobox.Empty>
    }
  }
  const renderInputBaseRightSection = () => {
    if (search.length > 0) {
      return (
        <CloseButton
          aria-label="Clear value"
          onClick={() => setSearch('')}
          onMouseDown={(
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => event.preventDefault()}
          size="sm"
        />
      )
    }
  }

  return (
    <div className={styles['dropdown']}>
      <Combobox onOptionSubmit={onOptionSubmit} store={comboboxStore}>
        <Combobox.Target>
          <InputBase
            leftSection={<Search />}
            onChange={onChange}
            onClick={onClickFocus}
            onFocus={onClickFocus}
            placeholder="Search events"
            rightSection={renderInputBaseRightSection()}
            value={search}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{renderComboboxOptions()}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  )
}

export { EventsSearchBar }
