import { MetadataRoute } from 'next'

type Route = {
  url: string
  lastModified: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

const routes: Route[] = [
  {
    url: 'https://caipo.ai',
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1.0
  },
  {
    url: 'https://caipo.ai/features',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://caipo.ai/pricing',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://caipo.ai/about',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7
  },
  {
    url: 'https://caipo.ai/contact',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7
  },
  {
    url: 'https://caipo.ai/support',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://caipo.ai/privacy',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5
  },
  {
    url: 'https://caipo.ai/terms',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5
  },
  {
    url: 'https://caipo.ai/security',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6
  },
  {
    url: 'https://caipo.ai/use-cases',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8
  }
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ url, lastModified, changeFrequency, priority }) => ({
    url,
    lastModified,
    changeFrequency,
    priority
  }))
} 