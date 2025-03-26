declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with your GA4 measurement ID

export function pageview(url: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

type EventNames = 
  | 'click_cta'
  | 'join_waitlist'
  | 'view_feature'
  | 'contact_support'
  | 'install_pwa'
  | 'share_content'
  | 'toggle_theme'
  | 'search'
  | 'error'
  | 'web_vitals'
  | 'user_engagement'
  | 'feature_usage'

interface EventParams {
  category?: string
  label?: string
  value?: number
  feature_name?: string
  error_message?: string
  search_term?: string
  metric_name?: string
  metric_value?: number
  metric_id?: string
  engagement_type?: string
  engagement_value?: number
  [key: string]: any
}

export function trackEvent(
  action: EventNames,
  params: EventParams = {}
) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      ...params,
      timestamp: new Date().toISOString(),
    })
  }
}

// Performance tracking
export function trackWebVitals({ name, delta, id }: {
  name: string
  delta: number
  id: string
}) {
  trackEvent('web_vitals', {
    metric_name: name,
    metric_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    metric_id: id,
  })
}

// Error tracking
export const trackError = (error: Error, componentName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'error', {
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack,
      component_name: componentName || 'unknown',
      url: window.location.href,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`Error in ${componentName || 'unknown component'}:`, error)
  }
}

// User engagement tracking
export function trackEngagement(
  type: 'scroll_depth' | 'time_on_page' | 'interaction',
  value: number
) {
  trackEvent('user_engagement', {
    engagement_type: type,
    engagement_value: value,
  })
}

// Feature usage tracking
export function trackFeatureUsage(
  featureName: string,
  action: 'view' | 'interact' | 'complete'
) {
  trackEvent('feature_usage', {
    feature_name: featureName,
    action,
  })
} 