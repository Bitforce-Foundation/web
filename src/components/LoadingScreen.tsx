import { useState, useEffect } from 'react'
import logo2 from '../assets/logo2.png'
import './LoadingScreen.css'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Таймер для завершения анимации загрузки
    const timer = setTimeout(() => {
      setIsComplete(true)
      setTimeout(() => {
        onLoadingComplete()
      }, 500)
    }, 3500) // Возвращаю оригинальное время

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <span className="loading-logo-f">F</span>
          <span className="loading-logo-b">B</span>
          <svg className="loading-growth-line" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Линия роста с острыми углами */}
            <path 
              d="M 15 70 L 45 35 L 75 60 L 105 20 L 135 45 L 165 19 L 183 4" 
              stroke="#ffffff" 
              strokeWidth="6" 
              fill="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              className="loading-growth-path"
            />
            
            {/* Треугольная стрелка в конце */}
            <g className="loading-growth-arrow">
              <path 
                d="M 192 -6 L 174 0 L 185 14 Z" 
                fill="#ffffff"
              />
            </g>
          </svg>
        </div>
        
        <div className="loading-logo2">
          <img 
            src={logo2} 
            alt="BitForce Logo" 
            onError={(e) => {
              console.error('Failed to load logo2:', e)
              // Fallback на текст если изображение не загрузилось
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const fallback = document.createElement('div')
              fallback.textContent = 'BitForce'
              fallback.style.cssText = 'font-size: 2rem; color: #dbc08f; font-weight: bold;'
              target.parentNode?.appendChild(fallback)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen