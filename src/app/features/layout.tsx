import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Features',
    description: 'Discover CAIPO\'s powerful features for intelligent automation, voice interaction, and visual understanding.',
}

export default function FeaturesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 