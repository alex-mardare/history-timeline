import { IconMapPin } from '@tabler/icons-react'
import React from 'react'

import { ActionIconButton } from '@/app/buttons/action-icon-button/ActionIconButton'

function EventSearchButton() {
  return (
    <ActionIconButton
      Icon={IconMapPin}
      label="Search by events"
      onClick={() => {}}
    />
  )
}

export { EventSearchButton }
