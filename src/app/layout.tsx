import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CAIPO - AI-Powered Productivity Assistant',
  description: 'CAIPO is your AI-powered productivity assistant, helping you work smarter and achieve more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Force dynamic rendering for auth
  headers()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}