export { 
  BASE_URL, 
  POST, 
  initialRegistrationEP, 
  sessionCreateEP, 
  ipServices,
  sessionRefreshEP,
  sessionValidateEP,
  sessionRevokeEP,
  getUserSessionsEP,
  getSessionByIdEP,
  updateLastSeenEP
}

const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://your-api-domain.com' // Заменить на реальный домен в проде
  }
  
  const hostname = window.location.hostname
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:8080`
  }
  
  return `http://${hostname.replace(/:\d+$/, '')}:8080`
}

const BASE_URL = getApiBaseUrl()


const POST = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

const initialRegistrationEP = `/api/v1/registration/initial`

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
