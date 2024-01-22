import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { InfoModalProvider } from '@/context/InfoModalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WordWhip',
  description: 'A two-player competitive word game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <InfoModalProvider>
        <body className={inter.className}>{children}</body>
      </InfoModalProvider>
    </html>
  )
}
