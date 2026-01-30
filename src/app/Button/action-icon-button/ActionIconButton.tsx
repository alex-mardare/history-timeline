import { ActionIcon, Tooltip } from '@mantine/core'
import React from 'react'

import styles from './ActionIconButton.module.css'

interface ActionIconButtonProps {
  Icon: React.JSX.ElementType
  label: string
  onClick: () => void
}

function ActionIconButton({ Icon, label, onClick }: ActionIconButtonProps) {
  return (
    <Tooltip label={label} openDelay={650} withArrow>
      <ActionIcon className={styles['action-icon-button']} onClick={onClick}>
        <Icon />
      </ActionIcon>
    </Tooltip>
  )
}

export { ActionIconButton }
