import type {
    SessionInfo
} from '../../../../../types'

import {
    Normalizer
} from '..'

import {
  BASE_URL,
  getSessionByIdEP
} from '../../../../components/url'

import { publicApiRequest } from '../../../../../../../utils/apiInterceptor'


export class GetSessionById {
    static async getSessionById(sessionId: string): Promise<SessionInfo> {
        const response = await publicApiRequest(`${BASE_URL}${getSessionByIdEP}/${sessionId}`, {
            method: 'GET'
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