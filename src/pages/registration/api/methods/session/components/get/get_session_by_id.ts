import type {
    SessionInfo
} from '../../../../../types'

import {
    Normalizer
} from '..'

import {
  BASE_URL,
  getSessionByIdEP,
  createAuthHeaders
} from '../../../../components/url'


export class GetSessionById {
    static async getSessionById(sessionId: string): Promise<SessionInfo> {

        const response = await fetch(`${BASE_URL}${getSessionByIdEP}/${sessionId}`, {
            method: 'GET',
            headers: createAuthHeaders()
        })

        if (!response.ok) {
          const errorData = await response.json()
          
          if (response.status === 404) {
            throw new Error(errorData.message || 'Сессия не найдена')
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
    
        const sessionData = await response.json()
        return Normalizer.normalizeSessionData(sessionData)
      }
}