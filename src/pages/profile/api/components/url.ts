export {
    BASE_URL,
    POST,
    loginEP,
    createAuthHeaders,
    createPostWithAuth
}

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

const BASE_URL = 'https://bitforce-api.ru'


const POST = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API}`
  }
}

const loginEP = '/api/v1/auth/login'