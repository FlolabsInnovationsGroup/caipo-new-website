'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { signOut } from 'next-auth/react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, router, pathname])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!session && pathname !== '/admin/login') {
    return null
  }

  if (pathname === '/admin/login') {
    return (
      <>
        <Toaster richColors position="top-right" />
        {children}
      </>
    )
  }

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') {
      return true
    }
    if (path !== '/admin' && pathname.startsWith(path)) {
      return true
    }
    return false
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-right" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link 
                href="/admin"
                className={`text-sm font-medium transition-colors ${
                  isActive('/admin') ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/early-access"
                className={`text-sm font-medium transition-colors ${
                  isActive('/admin/early-access') ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                Early Access
              </Link>
            </div>

            {session?.user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">
                  {session.user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  )
} 