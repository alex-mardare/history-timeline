import { CloseButton, Combobox, InputBase, useCombobox } from '@mantine/core'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ResetMapButton } from '@/app/buttons/ResetMapButton'
import { DROPDOWM_OPTIONS_LIMIT, MAP_ZOOM_LEVEL } from '@/constants/constants'
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

  const [searchText, setSearchText] = useState('')
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
      if (
        events[i].name.toLowerCase().includes(searchText.toLowerCase().trim())
      ) {
        result.push(events[i])
      }
    }
    return result
  }
  const centerMapOnEvent = (eventId: number) => {
    const selectedEvent = historicalEventsMap.get(eventId)
    setMapCenter({
      lat: selectedEvent?.latitude ?? mapCenter.lat,
      lng: selectedEvent?.longitude ?? mapCenter.lng,
      zoom: MAP_ZOOM_LEVEL.EVENT_ZOOM_LEVEL
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      comboboxStore.openDropdown()
      comboboxStore.updateSelectedOptionIndex()
      setSearchText(event.currentTarget.value)
    } else {
      setSearchText('')
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
    setSearchText(value)
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
    if (searchText.length > 0) {
      return (
        <CloseButton
          aria-label="Clear value"
          onClick={() => setSearchText('')}
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
            value={searchText}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{renderComboboxOptions()}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <ResetMapButton
        resetSearchText={() => setSearchText('')}
        {...{ searchText }}
      />
    </div>
  )
}

export { EventsSearchBar }
