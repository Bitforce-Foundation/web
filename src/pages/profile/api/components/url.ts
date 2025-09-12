export {
    BASE_URL,
    POST,
    loginEP,
    createAuthHeaders,
    createPostWithAuth
}

// Утилиты для авторизации
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

const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://your-api-domain.com' // Заменить на реальный домен в проде
  }
  
  const hostname = window.location.hostname
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:8324`
  }
  
  return `http://${hostname.replace(/:\d+$/, '')}:8324`
}

const BASE_URL = getApiBaseUrl()


const POST = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API}`
  }
}

const loginEP = '/api/v1/auth/login'