'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB, Metric } from 'web-vitals'
import { trackWebVitals } from '@/lib/analytics'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals
    onCLS((metric: Metric) => trackWebVitals(metric))
    onFID((metric: Metric) => trackWebVitals(metric))
    onLCP((metric: Metric) => trackWebVitals(metric))
    
    // Additional metrics
    onFCP((metric: Metric) => trackWebVitals(metric))
    onTTFB((metric: Metric) => trackWebVitals(metric))

    // Track page load performance
    const pageLoadData = window.performance.timing
    const pageLoadTime = pageLoadData.loadEventEnd - pageLoadData.navigationStart

    trackWebVitals({
      name: 'page_load_time',
      delta: pageLoadTime,
      id: 'plt',
    })

    // Track memory usage if available
    if ('memory' in window.performance) {
      const memory = (window.performance as Performance & { memory?: { usedJSHeapSize: number } }).memory
      trackWebVitals({
        name: 'heap_size',
        delta: memory?.usedJSHeapSize || 0,
        id: 'heap',
      })
    }

    // Track long tasks
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) { // Tasks longer than 50ms
          trackWebVitals({
            name: 'long_task',
            delta: entry.duration,
            id: 'lt',
          })
        }
      })
    })

    observer.observe({ entryTypes: ['longtask'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
} 