import {
    BASE_URL,
    sessionCreateEP,
    createPostWithAuth,
} from '../../../../components/url'

import type { 
    SessionCreateData, 
    SessionResponse
} from '../../../../../types'

export class CreateSession {
    static async createSession(data: SessionCreateData): Promise<SessionResponse> {
    const response = await fetch(`${BASE_URL}${sessionCreateEP}`, {
      ...createPostWithAuth('x-api-key'),
      body: JSON.stringify(data)}
    )

    if (!response.ok) {
      const errorData = await response.json()
      
      if (response.status === 422) {
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else if (response.status === 500) {
        throw new Error(errorData.detail || 'Внутренняя ошибка сервера')
      } else {
        throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }
}