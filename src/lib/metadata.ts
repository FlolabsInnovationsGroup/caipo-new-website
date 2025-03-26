import type { Metadata } from 'next'

interface MetadataProps {
    title: string
    description: string
    path: string
    ogImage?: string
    twitterImage?: string
    type?: 'website' | 'article'
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    section?: string
}

export function generateMetadata({
    title,
    description,
    path,
    ogImage = '/og-image.jpg',
    twitterImage = '/twitter-image.jpg',
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
}: MetadataProps): Metadata {
    const url = `https://caipo.ai${path}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: 'CAIPO',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type,
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
            ...(authors?.length && { authors }),
            ...(section && { section }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [twitterImage],
            creator: '@caipoai',
        },
        alternates: {
            canonical: url,
        },
    }
}

interface StructuredDataProps {
    title: string
    description: string
    path: string
    type?: string
    datePublished?: string
    dateModified?: string
    images?: string[]
}

export function generateStructuredDataString(props: StructuredDataProps): string {
    const { title, description, path, type = 'WebPage', datePublished, dateModified, images = [] } = props
    const url = `https://caipo.ai${path}`

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': type,
        name: title,
        description,
        url,
        ...(datePublished && { datePublished }),
        ...(dateModified && { dateModified }),
        ...(images.length && { image: images }),
        publisher: {
            '@type': 'Organization',
            name: 'CAIPO',
            logo: {
                '@type': 'ImageObject',
                url: 'https://caipo.ai/logo.png',
            },
        },
    }

    return JSON.stringify(structuredData)
} 