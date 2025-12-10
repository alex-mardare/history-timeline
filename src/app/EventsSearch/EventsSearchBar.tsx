import { Combobox, InputBase, useCombobox } from '@mantine/core'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { HistoricalEvent } from '@/interfaces/historicalEvent'

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

  const [search, setSearch] = useState('')

  const eventNames = historicalEvents.map(
    (event: HistoricalEvent) => event.name
  )

  const filteredOptions = eventNames.filter((eventName: string) =>
    eventName.toLowerCase().includes(search.toLowerCase().trim())
  )

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
    if (filteredOptions.length > 0) {
      return filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
          {item}
        </Combobox.Option>
      ))
    } else {
      return <Combobox.Empty>Nothing found</Combobox.Empty>
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
