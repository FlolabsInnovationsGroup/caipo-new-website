'use client'

import { useState } from 'react'
import Image from 'next/image'
import SkeletonLoader from './SkeletonLoader'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div 
        data-testid="error-container"
        className={`bg-gray-800 rounded-lg flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <svg 
          data-testid="error-icon"
          className="w-12 h-12 text-gray-600"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    )
  }

  return (
    <div data-testid="image-container" className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0">
          <SkeletonLoader className="h-full w-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        priority={priority}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        data-priority={priority}
        data-quality={quality}
      />
    </div>
  )
} 