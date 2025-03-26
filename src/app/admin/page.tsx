'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/GlassCard'

interface DashboardStats {
  totalSignups: number
  pendingSignups: number
  approvedSignups: number
  rejectedSignups: number
  recentSignups: Array<{
    id: string
    email: string
    createdAt: string
    source: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const adminSections = [
    {
      title: 'Early Access Management',
      description: 'View and manage early access signups, approve or reject requests.',
      href: '/admin/early-access',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    // Add more admin sections here as needed
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
          
          {/* Stats Overview */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <GlassCard key={i} className="h-32 animate-pulse" />
              ))}
            </div>
          ) : stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Total Signups</h3>
                  <p className="text-3xl font-bold">{stats.totalSignups}</p>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Pending Review</h3>
                  <p className="text-3xl font-bold text-yellow-400">{stats.pendingSignups}</p>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Approved</h3>
                  <p className="text-3xl font-bold text-green-400">{stats.approvedSignups}</p>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Rejected</h3>
                  <p className="text-3xl font-bold text-red-400">{stats.rejectedSignups}</p>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Recent Signups */}
          {stats?.recentSignups && (
            <GlassCard className="mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Signups</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Source</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentSignups.map((signup) => (
                        <tr key={signup.id} className="border-b border-white/5">
                          <td className="py-3 px-4">{signup.email}</td>
                          <td className="py-3 px-4">{signup.source || 'unknown'}</td>
                          <td className="py-3 px-4">
                            {new Date(signup.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section) => (
              <Link key={section.title} href={section.href}>
                <GlassCard className="h-full transition-transform hover:scale-105">
                  <div className="p-6">
                    <div className="text-purple-400 mb-4">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 