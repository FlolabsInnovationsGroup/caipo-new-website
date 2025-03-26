'use client';

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-black text-white">
        <Toaster richColors position="top-right" />
        {children}
      </div>
    </SessionProvider>
  )
} 