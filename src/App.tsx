import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

// Ленивая загрузка компонентов
const Home = lazy(() => import('./pages/Home'))
const Buy = lazy(() => import('./pages/Buy'))
const Sell = lazy(() => import('./pages/Sell'))
const Profile = lazy(() => import('./pages/Profile'))

// Компонент загрузки для переходов между страницами
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-content">
      <div className="loading-logo2">
        <img src="/src/assets/logo2.png" alt="BitForce Logo" />
      </div>
      <p className="loading-subtitle">Пожалуйста, подождите...</p>
    </div>
  </div>
)

function App() {
  const [showInitialLoading, setShowInitialLoading] = useState(true)

  useEffect(() => {
    // Проверяем, был ли пользователь уже на сайте в этой сессии
    const hasSeenLoading = sessionStorage.getItem('hasSeenInitialLoading')
    
    if (hasSeenLoading) {
      // Если уже видел загрузку в этой сессии, сразу показываем контент
      setShowInitialLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    // Помечаем, что пользователь увидел начальную загрузку
    sessionStorage.setItem('hasSeenInitialLoading', 'true')
    setShowInitialLoading(false)
  }

  // Показываем LoadingScreen только при первичной загрузке страницы
  if (showInitialLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  )
}

export default App
