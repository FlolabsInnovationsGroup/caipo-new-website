interface Organization {
  name: string
  url: string
  logo: string
  sameAs: string[]
}

interface SoftwareApplication {
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    price: string
    priceCurrency: string
    priceValidUntil: string
  }[]
}

const baseOrganization: Organization = {
  name: 'CAIPO',
  url: 'https://caipo.ai',
  logo: 'https://caipo.ai/logo.png',
  sameAs: [
    'https://twitter.com/caipoai',
    'https://github.com/caipo',
    'https://linkedin.com/company/caipo'
  ]
}

export function generateOrganizationSchema(org: Partial<Organization> = {}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...baseOrganization,
    ...org
  }
}

export function generateSoftwareApplicationSchema(app: SoftwareApplication): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    ...app,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    },
    offers: app.offers.map(offer => ({
      '@type': 'Offer',
      ...offer
    }))
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateFAQSchema(questions: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  }
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author
}: {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: generateOrganizationSchema()
  }
}

export function generateProductSchema({
  name,
  description,
  image,
  price,
  currency = 'USD'
}: {
  name: string
  description: string
  image: string
  price: number
  currency?: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock'
    }
  }
} 