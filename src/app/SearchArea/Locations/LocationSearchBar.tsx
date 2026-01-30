import {
  Badge,
  CloseButton,
  Combobox,
  Group,
  InputBase,
  Text,
  useCombobox
} from '@mantine/core'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

import { MAP_ZOOM_LEVEL } from '@/constants/constants'
import { useLocationSearch } from '@/hooks/useLocationSearch'
import { useStateStore } from '@/providers/storeProvider'
import { Location } from '@/types/location'

interface LocationSearchBarProps {
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
}

type OnClickFocusEvent =
  | React.FocusEvent<HTMLInputElement>
  | React.MouseEvent<HTMLInputElement>

function LocationSearchBar({
  searchText,
  setSearchText
}: LocationSearchBarProps) {
  const comboboxStore = useCombobox({
    onDropdownClose: () => comboboxStore.resetSelectedOption()
  })
  const { setMapCenter } = useStateStore((state) => state)
  const [locations, setLocations] = useState<Location[]>([])
  const { searchLocations } = useLocationSearch(setLocations)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const centerMapOnEvent = (latitude: number, longitude: number) => {
    setMapCenter({
      lat: latitude,
      lng: longitude,
      zoom: MAP_ZOOM_LEVEL.LOCATION_ZOOM_LEVEL
    })
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (searchValue.length > 0) {
      comboboxStore.openDropdown()
      comboboxStore.updateSelectedOptionIndex()
      setSearchText(event.currentTarget.value)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        searchLocations(searchValue)
      }, 500)
    } else {
      setSearchText('')
      comboboxStore.closeDropdown()
      setLocations([])
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
    if (locations.length > 0) {
      return locations.map((location: Location) => {
        const subLabel = [location.name, location.state, location.country]
          .filter((val) => val && val !== location.name)
          .join(', ')
        return (
          <Combobox.Option
            key={location.id}
            onClick={() => {
              centerMapOnEvent(location.latitude, location.longitude)
            }}
            value={location.name}
          >
            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm" wrap="nowrap" style={{ flex: 1 }}>
                <div style={{ overflow: 'hidden' }}>
                  <Text size="sm" fw={500} truncate>
                    {location.name}
                  </Text>
                  {subLabel && (
                    <Text size="xs" c="dimmed" truncate>
                      {subLabel}
                    </Text>
                  )}
                </div>
              </Group>

              <Badge
                variant="light"
                color="gray"
                size="xs"
                style={{ flexShrink: 0 }}
              >
                {location.type.toUpperCase()}
              </Badge>
            </Group>
          </Combobox.Option>
        )
      })
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
    <Combobox onOptionSubmit={onOptionSubmit} store={comboboxStore}>
      <Combobox.Target>
        <InputBase
          leftSection={<Search />}
          onChange={onChange}
          onClick={onClickFocus}
          onFocus={onClickFocus}
          placeholder="Search locations"
          rightSection={renderInputBaseRightSection()}
          value={searchText}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{renderComboboxOptions()}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export { LocationSearchBar }
