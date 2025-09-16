/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  authLogin,
  sessionCreate,
  sessionRefresh,
  sessionRevoke,
  getRegistrationUser
} from '../api'

type User = {
  id: string
  email?: string
  username?: string
}

type AuthTokens = {
  access_token: string
  refresh_token: string
  session_id: string
  expires_at: number // epoch ms
}

type AuthContextType = {
  user: User | null
  tokens: AuthTokens | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEYS = {
  user: 'auth_user',
  tokens: 'auth_tokens',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.user)
    const savedTokens = localStorage.getItem(STORAGE_KEYS.tokens)
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedTokens) {
      setTokens(JSON.parse(savedTokens))
    }
  }, [])

  const persist = (nextUser: User | null, nextTokens: AuthTokens | null) => {
    setUser(nextUser)
    setTokens(nextTokens)
    if (nextUser) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser))
    else localStorage.removeItem(STORAGE_KEYS.user)
    if (nextTokens) localStorage.setItem(STORAGE_KEYS.tokens, JSON.stringify(nextTokens))
    else localStorage.removeItem(STORAGE_KEYS.tokens)
  }

  const login = async (username: string, password: string) => {
    const loginRes = await authLogin(username, password)
    if (!loginRes?.status || !loginRes.user_id) {
      throw new Error('Неверные учетные данные')
    }

    const session = await sessionCreate({
      user_id: loginRes.user_id,
      ip_address: '0.0.0.0',
      user_agent: navigator.userAgent,
    })

    const expiresAt = Date.now() + session.expires_in * 1000

    // Получаем профиль пользователя (email и пр.)
    let profile: any = null
    try {
      profile = await getRegistrationUser(loginRes.user_id)
    } catch {}

    const nextUser: User = {
      id: loginRes.user_id,
      email: profile?.email,
      username: profile?.username,
    }
    const nextTokens: AuthTokens = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      session_id: session.session_id,
      expires_at: expiresAt,
    }
    persist(nextUser, nextTokens)
  }

  const logout = async () => {
    try {
      if (tokens?.session_id) {
        await sessionRevoke({ session_id: tokens.session_id })
      }
    } catch {}
    persist(null, null)
  }

  // Автообновление токена при простом сценарии
  useEffect(() => {
    if (!tokens) return
    const interval = setInterval(async () => {
      if (!tokens) return
      if (Date.now() > tokens.expires_at - 60_000) {
        try {
          const refreshed = await sessionRefresh({
            refresh_token: tokens.refresh_token,
            ip_address: '0.0.0.0',
            user_agent: navigator.userAgent,
          })
          const nextTokens: AuthTokens = {
            access_token: refreshed.access_token,
            refresh_token: refreshed.refresh_token,
            session_id: refreshed.session_id,
            expires_at: Date.now() + refreshed.expires_in * 1000,
          }
          persist(user, nextTokens)
        } catch {}
      }
    }, 30_000)
    return () => clearInterval(interval)
  }, [tokens, user])

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth должен использоваться внутри <AuthProvider>')
  }
  return ctx
}
