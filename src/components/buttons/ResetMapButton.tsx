import { IconCircleX } from '@tabler/icons-react'
import { useShallow } from 'zustand/shallow'

import { ActionIconButton } from '@/components/buttons/action-icon-button/ActionIconButton'
import { useStateStore } from '@/providers/storeProvider'

interface ResetMapButtonProps {
  resetSearchText: () => void
  searchText: string
}

function ResetMapButton({ resetSearchText, searchText }: ResetMapButtonProps) {
  const {
    eventsCalculatedCenter,
    locationBoundary,
    mapCenter,
    setLocationBoundary,
    setMapCenter
  } = useStateStore(
    useShallow((state) => ({
      eventsCalculatedCenter: state.eventsCalculatedCenter,
      locationBoundary: state.locationBoundary,
      mapCenter: state.mapCenter,
      setLocationBoundary: state.setLocationBoundary,
      setMapCenter: state.setMapCenter
    }))
  )

  const clearSearchText = () => {
    return searchText.length > 0 && resetSearchText()
  }
  const onClick = () => {
    if (locationBoundary !== null) {
      setLocationBoundary(null)
      clearSearchText()
    }
    if (eventsCalculatedCenter !== mapCenter) {
      setMapCenter(eventsCalculatedCenter)
      clearSearchText()
    }
  }

  return (
    <ActionIconButton
      Icon={IconCircleX}
      label="Reset map search"
      {...{ onClick }}
    />
  )
}

export { ResetMapButton }
