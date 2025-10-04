import type {
  RefreshTokenData, 
  RefreshTokenResponse
} from '../../../../../types'

import {
    BASE_URL,
    sessionRefreshEP,
    createPostWithAuth
} from '../../../../components/url'


export class RefreshToken {
    static async refreshToken(refreshToken: string, ipAddress?: string, userAgent?: string): Promise<RefreshTokenResponse> {

    const requestBody: RefreshTokenData = {
      refresh_token: refreshToken,
    }

    if (ipAddress) {
      requestBody.ip_address = ipAddress
    }
    
    if (userAgent) {
      requestBody.user_agent = userAgent
    }

    const response = await fetch(`${BASE_URL}${sessionRefreshEP}`, {
      ...createPostWithAuth('x-api-key'), // refresh может использовать API key
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      if (response.status === 401) {
        throw new Error(errorData.message || 'Токен недействителен. Необходимо войти в систему заново.')
      } else if (response.status === 422) {
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else if (response.status === 500) {
        throw new Error(errorData.message || 'Внутренняя ошибка сервера')
      } else {
        throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }
}