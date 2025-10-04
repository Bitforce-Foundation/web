import type {
  SessionValidateResponse, 
  SessionValidateData
} from '../../../../../types'

import {
  BASE_URL,
  createPostWithJWT,
  sessionValidateEP,
} from '../../../../components/url'

export class ValidateSession {
    static async validateSession(sessionId: string, jti: string): Promise<SessionValidateResponse> {

    const requestBody: SessionValidateData = {
      session_id: sessionId,
      jti: jti,
    }

    const response = await fetch(`${BASE_URL}${sessionValidateEP}`, {
      ...createPostWithJWT(),
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      if (response.status === 422) {
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else {
        throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }
}