import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import logo2 from './assets/logo2.png'
import './App.css'
import './layout.css'
import './components/components.css'

// Импортируем testApi для отладки в консоли браузера
import { testApi } from './api/services/poolsService'
import { testApiEndpoints, checkWalletConnection, getPoolBalance, getPoolStatus } from './api/config/api.config'

// Делаем testApi доступным в глобальной области для отладки в консоли браузера
declare global {
  interface Window {
    testApi: () => Promise<void>
    testApiEndpoints: () => Promise<void>
             checkWalletConnection: (address: string) => Promise<any>
         getPoolBalance: (address: string) => Promise<any>
         getPoolStatus: (address: string, poolId: string) => Promise<any>
  }
}

window.testApi = testApi
window.testApiEndpoints = testApiEndpoints
window.checkWalletConnection = checkWalletConnection
window.getPoolBalance = getPoolBalance
window.getPoolStatus = getPoolStatus

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
        <img src={logo2} alt="BitForce Logo" />
      </div>
      <p className="loading-subtitle">Пожалуйста, подождите...</p>
    </div>
  </div>
)

function App() {
  
  
  const [showInitialLoading, setShowInitialLoading] = useState(true)

  useEffect(() => {
    console.log('🔄 App useEffect запущен')
    // Проверяем, был ли пользователь уже на сайте в этой сессии
    const hasSeenLoading = sessionStorage.getItem('hasSeenInitialLoading')
    console.log(' hasSeenLoading:', hasSeenLoading)
    
    if (hasSeenLoading) {
      // Если уже видел загрузку в этой сессии, сразу показываем контент
      console.log(' Показываем контент сразу')
      setShowInitialLoading(false)
    } else {
      console.log(' Показываем начальную загрузку')
    }

    // Тестируем API при загрузке приложения
    console.log('🧪 Тестируем API при загрузке...')
    testApi()
    
    // Дополнительно тестируем эндпоинты
    console.log('🔍 Тестируем эндпоинты API...')
    testApiEndpoints()
  }, [])

  const handleLoadingComplete = () => {
    // Помечаем, что пользователь увидел начальную загрузку
    sessionStorage.setItem('hasSeenInitialLoading', 'true')
    setShowInitialLoading(false)
  }

  // Показываем LoadingScreen только при первичной загрузке страницы
  if (showInitialLoading) {
    console.log('🎬 Показываем LoadingScreen')
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  console.log('🏠 Показываем основное приложение')

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
