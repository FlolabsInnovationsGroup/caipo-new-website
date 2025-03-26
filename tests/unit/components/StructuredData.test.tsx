import { render } from '@testing-library/react'
import StructuredData from '@/components/StructuredData'

describe('StructuredData', () => {
  const mockData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CAIPO",
    "url": "https://caipo.ai",
  }

  it('renders script tag with correct type', () => {
    const { container } = render(<StructuredData data={mockData} />)
    const script = container.querySelector('script')
    expect(script).toHaveAttribute('type', 'application/ld+json')
  })

  it('renders JSON data correctly', () => {
    const { container } = render(<StructuredData data={mockData} />)
    const script = container.querySelector('script')
    expect(script?.innerHTML).toBe(JSON.stringify(mockData))
  })

  it('handles nested data structures', () => {
    const nestedData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "CAIPO AI",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    
    const { container } = render(<StructuredData data={nestedData} />)
    const script = container.querySelector('script')
    expect(script?.innerHTML).toBe(JSON.stringify(nestedData))
  })

  it('handles arrays in data', () => {
    const arrayData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is CAIPO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CAIPO is an AI platform."
          }
        }
      ]
    }
    
    const { container } = render(<StructuredData data={arrayData} />)
    const script = container.querySelector('script')
    expect(script?.innerHTML).toBe(JSON.stringify(arrayData))
  })

  it('handles empty objects', () => {
    const { container } = render(<StructuredData data={{}} />)
    const script = container.querySelector('script')
    expect(script?.innerHTML).toBe('{}')
  })
}) 