import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

console.log('🚀 main.tsx запущен')

const rootElement = document.getElementById('root')
console.log('🔍 Root элемент:', rootElement)

if (!rootElement) {
  console.error('❌ Root элемент не найден!')
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

console.log('✅ React приложение запущено')
