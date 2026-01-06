import { ActionIcon } from '@mantine/core'
import { IconCircleX } from '@tabler/icons-react'
import React from 'react'

import { useStateStore } from '@/providers/storeProvider'

import styles from './ResetMapButton.module.css'

interface ResetMapButtonProps {
  resetSearchText: () => void
  searchText: string
}

function ResetMapButton({ resetSearchText, searchText }: ResetMapButtonProps) {
  const { eventsCalculatedCenter, setMapCenter } = useStateStore(
    (state) => state
  )

  const onClick = () => {
    if (searchText.length > 0) {
      setMapCenter(eventsCalculatedCenter)
      resetSearchText()
    }
  }

  return (
    <ActionIcon className={styles['reset-button']} onClick={onClick}>
      <IconCircleX />
    </ActionIcon>
  )
}

export { ResetMapButton }
