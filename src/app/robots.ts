import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/private/',
      ]
    },
    sitemap: 'https://caipo.ai/sitemap.xml',
    host: 'https://caipo.ai'
  }
} 