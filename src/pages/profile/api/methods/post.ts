import { BASE_URL, loginEP, createAuthHeaders } from '../components/url'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  user_id: string
  status: boolean
  message?: string
}

export class PostLoginAPI {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${BASE_URL}${loginEP}`, {
        method: 'POST',
        headers: createAuthHeaders('x-api-key'),
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        
        if (response.status === 401) {
          return {
            user_id: '',
            status: false,
            message: 'Неверные учетные данные'
          }
        } else if (response.status === 422) {
          const details = errorData.detail || []
          const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
            `${error.loc.join('.')}: ${error.msg}`
          ).join('; ')
          throw new Error(`Ошибка валидации: ${errorMessages}`)
        } else {
          throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
        }
      }

      const loginResult: LoginResponse = await response.json()
      return loginResult
      
    } catch (error) {
      console.error('Ошибка при авторизации:', error)
      throw error
    }
  }
}
