export { 
  BASE_URL, 
  POST, 
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
  createPostWithAuth
}

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

const createPostWithAuth = (authType: 'bearer' | 'x-api-key' = 'bearer') => ({
  method: 'POST',
  headers: createAuthHeaders(authType)
})


const POST = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API}`
  }
}

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
