import { IconLocation } from '@tabler/icons-react'
import React from 'react'

import { ActionIconButton } from '@/app/buttons/action-icon-button/ActionIconButton'

function LocationSearchButton() {
  return (
    <ActionIconButton
      Icon={IconLocation}
      label="Search by location"
      onClick={() => {}}
    />
  )
}

export { LocationSearchButton }
