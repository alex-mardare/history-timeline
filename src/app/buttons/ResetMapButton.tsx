import { ActionIcon, Tooltip } from '@mantine/core'
import { IconCircleX } from '@tabler/icons-react'
import React from 'react'

import { useStateStore } from '@/providers/storeProvider'

import styles from './ResetMapButton.module.css'

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
    <Tooltip label="Reset map search" openDelay={650} withArrow>
      <ActionIcon className={styles['reset-button']} onClick={onClick}>
        <IconCircleX />
      </ActionIcon>
    </Tooltip>
  )
}

export { ResetMapButton }
