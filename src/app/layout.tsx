import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'

import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { StoreProvider } from '@/providers/storeProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  authors: [{ name: 'Alexandru Mardare' }],
  icons: 'assets/main-icon.svg',
  title: 'History Timeline'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>
          <Notifications />
          <StoreProvider>{children}</StoreProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
