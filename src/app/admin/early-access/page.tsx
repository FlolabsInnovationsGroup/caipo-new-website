'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { toast } from 'sonner'

interface EarlyAccessSignup {
  id: string
  email: string
  source: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export default function EarlyAccessManagement() {
  const [signups, setSignups] = useState<EarlyAccessSignup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSignups, setSelectedSignups] = useState<Set<string>>(new Set())
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'PENDING' | 'APPROVED' | 'REJECTED'>('all')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof EarlyAccessSignup
    direction: 'asc' | 'desc'
  }>({
    key: 'createdAt',
    direction: 'desc'
  })

  const fetchSignups = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/admin/early-access')
      if (!response.ok) {
        throw new Error('Failed to fetch signups')
      }
      const data = await response.json()
      setSignups(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch signups')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSignups()
  }, [])

  const filteredSignups = useMemo(() => {
    if (!signups) return []
    let filtered = [...signups]
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((signup) => signup.status === selectedStatus)
    }
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (sortConfig.key === 'createdAt') {
          return sortConfig.direction === 'asc'
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        return sortConfig.direction === 'asc'
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key])
      })
    }
    return filtered
  }, [signups, selectedStatus, sortConfig])

  const statusCounts = useMemo(() => {
    if (!signups) return { all: 0, PENDING: 0, APPROVED: 0, REJECTED: 0 }
    return {
      all: signups.length,
      PENDING: signups.filter((s) => s.status === 'PENDING').length,
      APPROVED: signups.filter((s) => s.status === 'APPROVED').length,
      REJECTED: signups.filter((s) => s.status === 'REJECTED').length,
    }
  }, [signups])

  const updateStatus = async (id: string, status: EarlyAccessSignup['status']) => {
    try {
      const response = await fetch(`/api/admin/early-access/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        throw new Error('Failed to update status')
      }
      await fetchSignups()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  const updateBatchStatus = async (status: EarlyAccessSignup['status']) => {
    try {
      const response = await fetch('/api/admin/early-access/batch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: Array.from(selectedSignups),
          status,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to update batch status')
      }
      await fetchSignups()
      setSelectedSignups(new Set())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update batch status')
    }
  }

  const handleSort = (key: keyof EarlyAccessSignup) => {
    setSortConfig({
      key,
      direction: 
        sortConfig.key === key && sortConfig.direction === 'asc' 
          ? 'desc' 
          : 'asc'
    })
  }

  const exportToCSV = () => {
    if (!signups) return
    const csv = [
      ['Email', 'Source', 'Status', 'Created At'],
      ...filteredSignups.map((signup) => [
        signup.email,
        signup.source || 'unknown',
        signup.status,
        new Date(signup.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'early-access-signups.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const toggleSelectAll = () => {
    if (selectedSignups.size === filteredSignups.length) {
      setSelectedSignups(new Set())
    } else {
      setSelectedSignups(new Set(filteredSignups.map(signup => signup.id)))
    }
  }

  const toggleSignup = (id: string) => {
    const newSelected = new Set(selectedSignups)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedSignups(newSelected)
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      APPROVED: 'bg-green-500/10 text-green-400 border-green-500/20',
      REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20'
    }[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'

    return (
      <span className={`px-2 py-1 text-xs rounded-full border ${colors}`}>
        {status.toLowerCase()}
      </span>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Early Access Management</h1>
            <div className="flex gap-4">
              {selectedSignups.size > 0 && (
                <>
                  <button
                    onClick={() => updateBatchStatus('APPROVED')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Approve Selected
                  </button>
                  <button
                    onClick={() => updateBatchStatus('REJECTED')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject Selected
                  </button>
                </>
              )}
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Export to CSV
              </button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {(['all', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedStatus === status
                    ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <div className="text-2xl font-bold mb-1">
                  {statusCounts[status]}
                </div>
                <div className="text-sm">
                  {status === 'all' ? 'Total' : status.toLowerCase()}
                </div>
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
            >
              {error}
            </div>
          )}

          {/* Batch Actions */}
          {selectedSignups.size > 0 && (
            <div className="mb-4 p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
              <div className="text-sm text-gray-400">
                {selectedSignups.size} {selectedSignups.size === 1 ? 'signup' : 'signups'} selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateBatchStatus('APPROVED')}
                  className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  Approve All
                </button>
                <button
                  onClick={() => updateBatchStatus('REJECTED')}
                  className="px-3 py-1 text-sm bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => updateBatchStatus('PENDING')}
                  className="px-3 py-1 text-sm bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-colors"
                >
                  Reset All
                </button>
              </div>
            </div>
          )}

          {/* Signups Table */}
          <GlassCard>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                        checked={selectedSignups.size === filteredSignups.length}
                        onChange={toggleSelectAll}
                        aria-label="Select all signups"
                      />
                    </th>
                    <th 
                      className="text-left py-3 px-4 cursor-pointer hover:text-purple-400 transition-colors"
                      onClick={() => handleSort('email')}
                    >
                      Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th 
                      className="text-left py-3 px-4 cursor-pointer hover:text-purple-400 transition-colors"
                      onClick={() => handleSort('source')}
                    >
                      Source {sortConfig.key === 'source' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th 
                      className="text-left py-3 px-4 cursor-pointer hover:text-purple-400 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th 
                      className="text-left py-3 px-4 cursor-pointer hover:text-purple-400 transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <div className="flex items-center justify-center" role="status">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500" />
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-red-400">
                        {error}
                      </td>
                    </tr>
                  ) : filteredSignups.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-400">
                        No signups found
                      </td>
                    </tr>
                  ) : (
                    filteredSignups.map((signup) => (
                      <tr key={signup.id} className="border-b border-white/5">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            className="rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                            checked={selectedSignups.has(signup.id)}
                            onChange={() => toggleSignup(signup.id)}
                            aria-label={`Select ${signup.email}`}
                          />
                        </td>
                        <td className="py-3 px-4">{signup.email}</td>
                        <td className="py-3 px-4">{signup.source || 'unknown'}</td>
                        <td className="py-3 px-4">
                          {new Date(signup.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={signup.status} />
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          {signup.status !== 'APPROVED' && (
                            <button
                              onClick={() => updateStatus(signup.id, 'APPROVED')}
                              className="text-green-400 hover:text-green-300 transition-colors"
                              aria-label={`Approve ${signup.email}`}
                            >
                              Approve
                            </button>
                          )}
                          {signup.status !== 'REJECTED' && (
                            <button
                              onClick={() => updateStatus(signup.id, 'REJECTED')}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              aria-label={`Reject ${signup.email}`}
                            >
                              Reject
                            </button>
                          )}
                          {signup.status !== 'PENDING' && (
                            <button
                              onClick={() => updateStatus(signup.id, 'PENDING')}
                              className="text-yellow-400 hover:text-yellow-300 transition-colors"
                              aria-label={`Reset ${signup.email}`}
                            >
                              Reset
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
} 