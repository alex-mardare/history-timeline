import { IconCircleX } from '@tabler/icons-react'
import React from 'react'

import { ActionIconButton } from '@/app/buttons/action-icon-button/ActionIconButton'
import { useStateStore } from '@/providers/storeProvider'

interface ResetMapButtonProps {
  resetSearchText: () => void
  searchText: string
}

function ResetMapButton({ resetSearchText, searchText }: ResetMapButtonProps) {
  const { eventsCalculatedCenter, mapCenter, setMapCenter } = useStateStore(
    (state) => state
  )

  const onClick = () => {
    if (searchText.length > 0 && eventsCalculatedCenter !== mapCenter) {
      setMapCenter(eventsCalculatedCenter)
      resetSearchText()
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
