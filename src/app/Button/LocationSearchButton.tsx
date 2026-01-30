import { IconLocation } from '@tabler/icons-react'
import React from 'react'

import { ActionIconButton } from '@/app/Button/action-icon-button/ActionIconButton'
import { useStateStore } from '@/providers/storeProvider'

function LocationSearchButton() {
  const { setSearchType } = useStateStore((state) => state)

  const onClick = () => {
    setSearchType('location')
  }

  return (
    <ActionIconButton
      Icon={IconLocation}
      label="Search by location"
      onClick={onClick}
    />
  )
}

export { LocationSearchButton }
