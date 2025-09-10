import { useEffect, useCallback, useRef } from 'react'
import { PostSessionAPI } from '../api/methods/session/post'
import { TokenManager } from '../utils'

/**
 * Хук для автоматического обновления времени последней активности сессии
 * Обновляет last_seen_at и IP-адрес:
 * - При первом монтировании (вход на сайт) - использует update_ip
 * - Каждые 10 минут для активной сессии - использует update_ip  
 * - При активности пользователя - использует update_last_seen с IP
 */
export const useSessionActivity = () => {
  const intervalRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)
  const activityTimeoutRef = useRef<number | null>(null)
  const clientIPRef = useRef<string | null>(null)

  // Функция для получения и кеширования IP-адреса клиента
  const getClientIP = useCallback(async (): Promise<string | null> => {
    if (clientIPRef.current) {
      return clientIPRef.current
    }

    try {
      const ip = await PostSessionAPI.IP.getClientIP()
      clientIPRef.current = ip
      return ip
    } catch (error) {
      console.warn('Failed to get client IP:', error)
      return null
    }
  }, [])

  // Функция обновления last_seen_at с IP (для активности пользователя)
  const updateLastSeenWithIP = useCallback(async () => {
    const sessionId = TokenManager.getSessionId()
    
    if (!sessionId) {
      return false
    }

    try {
      const clientIP = await getClientIP()
      
      await PostSessionAPI.update_last_seen({
        session_id: sessionId,
        ip_address: clientIP,
        user_agent: navigator.userAgent
      })
      
      lastUpdateRef.current = Date.now()
      return true
    } catch (error) {
      console.error('Failed to update session activity with IP:', error)
      
      // Пробует без IP в случае ошибки
      try {
        await PostSessionAPI.update_last_seen({
          session_id: sessionId,
          user_agent: navigator.userAgent
        })
        
        lastUpdateRef.current = Date.now()
        return true
      } catch (fallbackError) {
        console.error('Failed to update session activity without IP:', fallbackError)
        return false
      }
    }
  }, [getClientIP])

  // Дебаунс обновление активности
  const scheduleActivityUpdate = useCallback(() => {
    const now = Date.now()
    const timeSinceLastUpdate = now - lastUpdateRef.current
    
    // Обновляется не чаще чем раз в минуту при активности пользователя
    if (timeSinceLastUpdate < 60 * 1000) {
      return
    }

    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current)
    }

    // Таймаут на 5 секунд после последней активности
    activityTimeoutRef.current = setTimeout(() => {
      updateLastSeenWithIP()
    }, 5000)
  }, [updateLastSeenWithIP])

  // Слушатели активности пользователя
  useEffect(() => {
    const sessionId = TokenManager.getSessionId()
    
    if (!sessionId) {
      return
    }

    // Активность с реальным IP при первом монтировании
    updateLastSeenWithIP()

    // Интервал обновления каждые 10 минут
    intervalRef.current = setInterval(() => {
      updateLastSeenWithIP()
    }, 10 * 60 * 1000) // 10 минут

    // Слушатели событий активности пользователя
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    activityEvents.forEach(event => {
      document.addEventListener(event, scheduleActivityUpdate, { passive: true })
    })

    // Очистка при размонтировании
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current)
        activityTimeoutRef.current = null
      }

      activityEvents.forEach(event => {
        document.removeEventListener(event, scheduleActivityUpdate)
      })
    }
  }, [updateLastSeenWithIP, scheduleActivityUpdate])

  return {
    updateLastSeenWithIP
  }
}
