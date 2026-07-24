import { IconMapPin } from '@tabler/icons-react'
import { useShallow } from 'zustand/shallow'

import { ActionIconButton } from '@/components/buttons/action-icon-button/ActionIconButton'
import { useStateStore } from '@/providers/storeProvider'

function EventSearchButton() {
  const { setSearchType, setLocationBoundary } = useStateStore(
    useShallow((state) => ({
      setSearchType: state.setSearchType,
      setLocationBoundary: state.setLocationBoundary
    }))
  )

  const onClick = () => {
    setSearchType('event')
    setLocationBoundary(null)
  }

  return (
    <ActionIconButton
      Icon={IconMapPin}
      label="Search by events"
      {...{ onClick }}
    />
  )
}

export { EventSearchButton }
