import { IconMapPin } from '@tabler/icons-react'
import React from 'react'

import { ActionIconButton } from '@/app/Button/action-icon-button/ActionIconButton'
import { useStateStore } from '@/providers/storeProvider'

function EventSearchButton() {
  const { setSearchType } = useStateStore((state) => state)

  const onClick = () => {
    setSearchType('event')
  }

  return (
    <ActionIconButton
      Icon={IconMapPin}
      label="Search by events"
      onClick={onClick}
    />
  )
}

export { EventSearchButton }
