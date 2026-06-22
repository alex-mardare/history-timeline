import { IconCircleX } from '@tabler/icons-react'

import { ActionIconButton } from '@/components/buttons/action-icon-button/ActionIconButton'
import { useStateStore } from '@/providers/storeProvider'

interface ResetMapButtonProps {
  resetSearchText: () => void
  searchText: string
}

function ResetMapButton({ resetSearchText, searchText }: ResetMapButtonProps) {
  const { eventsCalculatedCenter, mapCenter, setLocationBoundary } =
    useStateStore((state) => state)

  const onClick = () => {
    if (searchText.length > 0 && eventsCalculatedCenter !== mapCenter) {
      resetSearchText()
      setLocationBoundary(null)
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
