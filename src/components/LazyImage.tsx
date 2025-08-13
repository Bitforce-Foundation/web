import { useState, useCallback } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
}

function LazyImage({ src, alt, className, placeholder }: LazyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  return (
    <div className={`lazy-image-container ${className || ''}`}>
      {!imageLoaded && !imageError && placeholder && (
        <div className="image-placeholder">{placeholder}</div>
      )}
      <img
        src={src}
        alt={alt}
        className={`lazy-image ${imageLoaded ? 'loaded' : 'loading'} ${imageError ? 'error' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        style={{ display: imageLoaded || imageError ? 'block' : 'none' }}
      />
    </div>
  )
}

export default LazyImage 