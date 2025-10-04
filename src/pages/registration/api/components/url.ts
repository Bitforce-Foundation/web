export { 
  BASE_URL, 
  initialRegistrationEP,
  getUserInfoEP,
  sessionCreateEP, 
  ipServices,
  sessionRefreshEP,
  sessionValidateEP,
  sessionRevokeEP,
  getUserSessionsEP,
  getSessionByIdEP,
  updateLastSeenEP,
  createAuthHeaders,
  createPostWithAuth,
  createJWTHeaders,
  createPostWithJWT
}

import { TokenManager } from '../../utils'

const BASE_URL = 'https://bitforce-api.ru'

const createAuthHeaders = (authType: 'bearer' | 'x-api-key' = 'bearer') => {
  const apiKey = import.meta.env.VITE_API
  
  const baseHeaders = {
    'Content-Type': 'application/json'
  }

  switch (authType) {
    case 'bearer':
      return {
        ...baseHeaders,
        'Authorization': `Bearer ${apiKey}`
      }
    case 'x-api-key':
      return {
        ...baseHeaders,
        'X-API-Key': apiKey
      }
    default:
      return baseHeaders
  }
}

const createJWTHeaders = () => {
  const authHeader = TokenManager.getAuthHeader()
  
  return {
    'Content-Type': 'application/json',
    ...(authHeader && authHeader)
  }
}

const createPostWithAuth = (authType: 'bearer' | 'x-api-key' = 'bearer') => ({
  method: 'POST',
  headers: createAuthHeaders(authType)
})

const createPostWithJWT = () => ({
  method: 'POST',
  headers: createJWTHeaders()
})

const initialRegistrationEP = `/api/v1/registration/initial`

const getUserInfoEP = `/api/v1/registration/user`

const sessionCreateEP = `/api/v1/session/create`

const ipServices = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://httpbin.org/ip'
      ]

const sessionRefreshEP = `/api/v1/session/refresh`

const sessionValidateEP = `/api/v1/session/validate`

const sessionRevokeEP = `/api/v1/session/revoke`

const getUserSessionsEP = `/api/v1/session/user`

const getSessionByIdEP = '/api/v1/session'

const updateLastSeenEP = '/api/v1/session/update_last_seen'
