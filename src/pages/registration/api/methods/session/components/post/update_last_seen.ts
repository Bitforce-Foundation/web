import type {
  SessionInfo
} from '../../../../../types'

import {
    Normalizer
} from '..'

import {
  BASE_URL,
  updateLastSeenEP
} from '../../../../components/url'

export class UpdateLastSeen {
    static async updateLastSeen(params: { session_id: string; ip_address?: string | null; user_agent?: string | null }): Promise<SessionInfo> {
    
        const searchParams = new URLSearchParams()
        searchParams.append('session_id', params.session_id)
        
        if (params.ip_address !== undefined) {
          searchParams.append('ip_address', params.ip_address || '')
        }
        
        if (params.user_agent !== undefined) {
          searchParams.append('user_agent', params.user_agent || '')
        }

        const requestUrl = `${BASE_URL}${updateLastSeenEP}?${searchParams.toString()}`
    
        const response = await fetch(requestUrl, {
          method: 'POST',
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          
          if (response.status === 422 || response.status === 400) {
            const details = errorData.detail || []
            const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
              `${error.loc.join('.')}: ${error.msg}`
            ).join('; ')
            throw new Error(`Некорректные данные: ${errorMessages}`)
          } else {
            throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
          }
        }
    
        const sessionData = await response.json()
        const normalizedData = Normalizer.normalizeSessionData(sessionData)
        return normalizedData
      }
}