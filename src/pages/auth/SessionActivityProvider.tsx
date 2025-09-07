import React from 'react'
import { useSessionActivity } from './hooks'

interface SessionActivityProviderProps {
  children: React.ReactNode
}

/**
 * Провайдер для глобального отслеживания активности сессии.
 * Должен быть обернут вокруг всего приложения.
 * Автоматически обновляет last_seen_at при входе на сайт и каждые 10 минут.
 */
export const SessionActivityProvider: React.FC<SessionActivityProviderProps> = ({ children }) => {
  // Инициализируем хук отслеживания активности
  useSessionActivity()

  // Провайдер просто рендерит дочерние элементы
  return <>{children}</>
}

export default SessionActivityProvider
