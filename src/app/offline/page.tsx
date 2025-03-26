import Link from 'next/link'
import GlassCard from '@/components/GlassCard'
import GlassButton from '@/components/GlassButton'
import { WifiOff, RefreshCw, Home } from 'lucide-react'

export const metadata = {
  title: 'Offline | CAIPO',
  description: 'You are currently offline. Please check your internet connection.',
}

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <GlassCard
          title="You're Offline"
          description="Don't worry! You can still access previously visited pages."
          icon={<WifiOff className="w-8 h-8 text-purple-400" />}
        >
          <div className="mt-8 space-y-6">
            <div className="text-gray-300 space-y-4">
              <p>Here's what you can do:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Check your internet connection</li>
                <li>Try refreshing the page once you're back online</li>
                <li>Access any previously visited pages from the navigation menu</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <GlassButton onClick={() => window.location.reload()} className="w-full sm:w-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </GlassButton>
              <Link href="/" className="w-full sm:w-auto">
                <GlassButton className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </GlassButton>
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
} 