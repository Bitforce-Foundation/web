import React, { useState, useEffect } from 'react'
import { SessionAPI } from '../api'
import { useSession } from '../hooks'
import type { SessionInfo, UserSessionsResponse } from '../types'

interface SessionComponentProps {
  userId: string
  onSessionCreated?: (session: SessionInfo) => void
  onError?: (error: string) => void
}

export const SessionComponent: React.FC<SessionComponentProps> = ({
  userId,
  onSessionCreated,
  onError
}) => {
  const {
    session,
    isLoading,
    error,
    isAuthenticated,
    createSession,
    refreshTokens,
    validateSession,
    revokeCurrentSession,
    logout,
    clearError
  } = useSession()

  const [userSessions, setUserSessions] = useState<UserSessionsResponse | null>(null)
  const [loadingSessions, setLoadingSessions] = useState(false)
  const [jtiInput, setJtiInput] = useState('')

  // Загрузка списка сессий пользователя
  const loadUserSessions = async () => {
    setLoadingSessions(true)
    try {
      const response = await SessionAPI.getUserSessions({
        user_id: userId,
        active_only: true,
        limit: 10,
        offset: 0
      })
      setUserSessions(response)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки сессий'
      onError?.(errorMessage)
    } finally {
      setLoadingSessions(false)
    }
  }

  // Создание сессии
  const handleCreateSession = async () => {
    const newSession = await createSession(userId)
    if (newSession) {
      onSessionCreated?.(newSession as unknown as SessionInfo)
      loadUserSessions() // Обновляем список сессий
    }
  }

  // Обновление токенов
  const handleRefreshTokens = async () => {
    const success = await refreshTokens()
    if (success) {
      console.log('Токены успешно обновлены')
    }
  }

  // Валидация сессии
  const handleValidateSession = async () => {
    if (!jtiInput.trim()) {
      onError?.('Введите JTI для валидации')
      return
    }
    
    const isValid = await validateSession(jtiInput.trim())
    if (isValid) {
      console.log('Сессия валидна')
    }
  }

  // Отзыв текущей сессии
  const handleRevokeCurrentSession = async () => {
    const success = await revokeCurrentSession('Отозвана пользователем')
    if (success) {
      console.log('Сессия отозвана')
      loadUserSessions() // Обновляем список сессий
    }
  }

  // Отзыв всех сессий пользователя кроме текущей
  const handleRevokeAllSessions = async () => {
    try {
      await SessionAPI.revokeAllUserSessions({
        user_id: userId,
        exclude_session_id: session?.session_id
      })
      console.log('Все остальные сессии отозваны')
      loadUserSessions() // Обновляем список сессий
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка отзыва сессий'
      onError?.(errorMessage)
    }
  }

  // Загружаем сессии при монтировании компонента
  useEffect(() => {
    const loadSessions = async () => {
      if (userId) {
        setLoadingSessions(true)
        try {
          const response = await SessionAPI.getUserSessions({
            user_id: userId,
            active_only: true,
            limit: 10,
            offset: 0
          })
          setUserSessions(response)
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки сессий'
          onError?.(errorMessage)
        } finally {
          setLoadingSessions(false)
        }
      }
    }
    
    loadSessions()
  }, [userId, onError])

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>Управление сессиями</h2>
      
      {/* Статус аутентификации */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: isAuthenticated ? '#d4edda' : '#f8d7da', borderRadius: '5px' }}>
        <strong>Статус: </strong>
        {isAuthenticated ? 'Аутентифицирован' : 'Не аутентифицирован'}
        {session && (
          <div style={{ marginTop: '5px', fontSize: '12px' }}>
            <div><strong>Session ID:</strong> {session.session_id}</div>
            <div><strong>Token Type:</strong> {session.token_type}</div>
          </div>
        )}
      </div>

      {/* Ошибки */}
      {error && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px' }}>
          <strong>Ошибка:</strong> {error}
          <button 
            onClick={clearError}
            style={{ marginLeft: '10px', padding: '2px 8px' }}
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Управление сессией */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Управление сессией</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {!isAuthenticated && (
            <button 
              onClick={handleCreateSession} 
              disabled={isLoading}
              style={{ padding: '8px 16px' }}
            >
              {isLoading ? 'Создание...' : 'Создать сессию'}
            </button>
          )}
          
          {isAuthenticated && (
            <>
              <button 
                onClick={handleRefreshTokens} 
                disabled={isLoading}
                style={{ padding: '8px 16px' }}
              >
                {isLoading ? 'Обновление...' : 'Обновить токены'}
              </button>
              
              <button 
                onClick={handleRevokeCurrentSession} 
                disabled={isLoading}
                style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white' }}
              >
                {isLoading ? 'Отзыв...' : 'Отозвать сессию'}
              </button>
              
              <button 
                onClick={logout}
                style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white' }}
              >
                Выйти
              </button>
            </>
          )}
        </div>
      </div>

      {/* Валидация сессии */}
      {isAuthenticated && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Валидация сессии</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Введите JTI"
              value={jtiInput}
              onChange={(e) => setJtiInput(e.target.value)}
              style={{ padding: '8px', minWidth: '300px' }}
            />
            <button 
              onClick={handleValidateSession}
              disabled={isLoading || !jtiInput.trim()}
              style={{ padding: '8px 16px' }}
            >
              {isLoading ? 'Валидация...' : 'Валидировать'}
            </button>
          </div>
        </div>
      )}

      {/* Список сессий пользователя */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3>Сессии пользователя</h3>
          <div>
            <button 
              onClick={loadUserSessions}
              disabled={loadingSessions}
              style={{ padding: '6px 12px', marginRight: '10px' }}
            >
              {loadingSessions ? 'Загрузка...' : 'Обновить'}
            </button>
            {isAuthenticated && (
              <button 
                onClick={handleRevokeAllSessions}
                disabled={isLoading}
                style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white' }}
              >
                Отозвать все остальные
              </button>
            )}
          </div>
        </div>
        
        {userSessions ? (
          <div>
            <p><strong>Всего сессий:</strong> {userSessions.total}</p>
            {userSessions.sessions.length > 0 ? (
              <div style={{ border: '1px solid #ddd', borderRadius: '5px' }}>
                {userSessions.sessions.map((sessionInfo, index) => (
                  <div 
                    key={sessionInfo.id} 
                    style={{ 
                      padding: '10px', 
                      borderBottom: index < userSessions.sessions.length - 1 ? '1px solid #eee' : 'none',
                      backgroundColor: sessionInfo.id === session?.session_id ? '#e7f3ff' : 'white'
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      <div><strong>ID:</strong> {sessionInfo.id}</div>
                      <div><strong>JTI:</strong> {sessionInfo.jti}</div>
                      <div><strong>IP:</strong> {sessionInfo.ip_address}</div>
                      <div><strong>User Agent:</strong> {sessionInfo.user_agent.substring(0, 50)}...</div>
                      <div><strong>Создана:</strong> {new Date(sessionInfo.created_at).toLocaleString()}</div>
                      <div><strong>Истекает:</strong> {new Date(sessionInfo.expires_at).toLocaleString()}</div>
                      {sessionInfo.revoked_at && (
                        <div style={{ color: '#dc3545' }}><strong>Отозвана:</strong> {new Date(sessionInfo.revoked_at).toLocaleString()}</div>
                      )}
                      {sessionInfo.id === session?.session_id && (
                        <div style={{ color: '#007bff', fontWeight: 'bold' }}>Текущая сессия</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Активных сессий не найдено</p>
            )}
          </div>
        ) : (
          <p>Загрузите список сессий</p>
        )}
      </div>
    </div>
  )
}

export default SessionComponent