import { NotificationData } from '@mantine/notifications'
import { IconExclamationCircleFilled } from '@tabler/icons-react'

const noHistoricalEventsLoading: NotificationData = {
  autoClose: 300000,
  color: 'red',
  icon: <IconExclamationCircleFilled />,
  message:
    'There was an issue loading the historical events. Please try again later.',
  position: 'top-right',
  title: 'Problems loading the data'
}

export { noHistoricalEventsLoading }
