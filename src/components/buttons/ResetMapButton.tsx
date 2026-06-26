import { IconCircleX } from '@tabler/icons-react'

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
  } = useStateStore((state) => state)

  const onClick = () => {
    if (searchText.length > 0) {
      resetSearchText()
      if (eventsCalculatedCenter !== mapCenter) {
        setMapCenter(eventsCalculatedCenter)
      }
      if (locationBoundary !== null) {
        setLocationBoundary(null)
      }
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
