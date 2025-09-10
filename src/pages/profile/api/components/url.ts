export {
    BASE_URL,
    POST,
    loginEP
}

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
    'Content-Type': 'application/json'
  }
}

const loginEP = '/api/v1/auth/login'