import type {
  SessionRevokeResponse, 
  SessionRevokeData
} from '../../../../../types'

import {
  BASE_URL,
  POST,
  sessionRevokeEP,
} from '../../../../components/url'


export class RevokeSession {
    static async revokeSession(sessionId: string, reason?: string): Promise<SessionRevokeResponse> {

    const requestBody: SessionRevokeData = {
      session_id: sessionId,
    }

    if (reason) {
      requestBody.reason = reason
    }

    const response = await fetch(`${BASE_URL}${sessionRevokeEP}`, {
      ...POST,
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