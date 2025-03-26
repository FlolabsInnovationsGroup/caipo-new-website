import { render, screen, fireEvent } from '@testing-library/react'
import OptimizedImage from '@/components/OptimizedImage'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, onLoad, onError, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      {...props}
      onLoad={onLoad}
      onError={onError}
      data-testid="next-image"
    />
  ),
}))

// Mock SkeletonLoader
jest.mock('@/components/SkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton-loader">Loading...</div>,
}))

const defaultProps = {
  src: '/test-image.jpg',
  alt: 'Test image',
  width: 200,
  height: 150,
}

describe('OptimizedImage', () => {
  it('renders loading state initially', () => {
    render(<OptimizedImage {...defaultProps} />)
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })

  it('shows error state when image fails to load', () => {
    render(<OptimizedImage {...defaultProps} />)
    const image = screen.getByTestId('next-image')
    fireEvent.error(image)
    
    const errorIcon = screen.getByTestId('error-icon')
    expect(errorIcon).toBeInTheDocument()
    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument()
  })

  it('passes priority prop to Next Image', () => {
    render(<OptimizedImage {...defaultProps} priority />)
    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('data-priority', 'true')
  })

  it('passes quality prop to Next Image', () => {
    const quality = 75
    render(<OptimizedImage {...defaultProps} quality={quality} />)
    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('data-quality', quality.toString())
  })

  it('maintains aspect ratio with provided dimensions', () => {
    render(<OptimizedImage {...defaultProps} />)
    const container = screen.getByTestId('image-container')
    expect(container.style.width).toBe('200px')
    expect(container.style.height).toBe('150px')
  })

  it('renders error state with correct dimensions', () => {
    render(<OptimizedImage {...defaultProps} />)
    const image = screen.getByTestId('next-image')
    fireEvent.error(image)
    
    const errorContainer = screen.getByTestId('error-container')
    expect(errorContainer.style.width).toBe('200px')
    expect(errorContainer.style.height).toBe('150px')
  })
}) 