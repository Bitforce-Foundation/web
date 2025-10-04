export {
    BASE_URL,
    loginEP,
    createAuthHeaders,
    createPostWithAuth,
    createJWTHeaders,
    createPostWithJWT
}

import { TokenManager } from '../../../registration/utils'

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

const BASE_URL = 'https://bitforce-api.ru'

const loginEP = '/api/v1/auth/login'