import { Anchor, List, Modal, Stack, Tabs, TabsList, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { useState } from 'react'

import { ActionIconButton } from '@/app/Buttons/action-icon-button/ActionIconButton'

import styles from './About.module.css'

function About() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClick = () => {
    setIsModalOpen(true)
  }
  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={styles['about-content']}>
      <ActionIconButton
        Icon={IconInfoCircle}
        label="About & disclaimer"
        {...{ onClick }}
      />

      <Modal
        classNames={{ title: styles['modal-header'] }}
        onClose={onCloseModal}
        opened={isModalOpen}
        title="Project information"
      >
        <Tabs
          classNames={{ panel: styles['tab-panel'] }}
          defaultValue="disclaimer"
        >
          <TabsList>
            <Tabs.Tab value="disclaimer">Disclaimer</Tabs.Tab>
            <Tabs.Tab value="credits">Credits</Tabs.Tab>
          </TabsList>
          <Tabs.Panel value="disclaimer">
            <Stack gap="md">
              <Text size="md">
                Event titles are original content. Descriptions and coordinates
                are adapted from <strong>Wikipedia</strong> under the CC BY-SA
                4.0 license.
              </Text>
              <Text size="sm" c="dimmed">
                Disclaimer: Coordinates for historical sites are approximate and
                intended for illustrative purposes only.
              </Text>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="credits">
            <List size="md" spacing="md">
              <List.Item>
                Flag icons provided by a number of authors from{' '}
                <Anchor href="https://www.flaticon.com" target="_blank">
                  Flaticon
                </Anchor>
                :{' '}
                <Anchor
                  href="https://www.flaticon.com/authors/verluk"
                  target="_blank"
                >
                  verluk
                </Anchor>
                {', '}
                <Anchor
                  href="https://www.flaticon.com/authors/freepik"
                  target="_blank"
                >
                  Freepik
                </Anchor>
                {' and '}
                <Anchor
                  href="https://www.flaticon.com/authors/rimsha-ibrar"
                  target="_blank"
                >
                  rimsha-ibrar
                </Anchor>
                .
              </List.Item>
              <List.Item>
                Map engine:{' '}
                <Anchor href="https://leafletjs.com/" target="_blank">
                  Leaflet
                </Anchor>
                .
              </List.Item>
              <List.Item>
                UI:{' '}
                <Anchor href="https://mantine.dev/" target="_blank">
                  Mantine
                </Anchor>{' '}
                &{' '}
                <Anchor href="https://tabler.io/" target="_blank">
                  Tabler
                </Anchor>
                .
              </List.Item>
            </List>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </div>
  )
}

export { About }
