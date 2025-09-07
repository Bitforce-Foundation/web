import type {
  UserSessionsParams,
    UserSessionsResponse,
} from '../../../../../types'

import {
  BASE_URL,
  getUserSessionsEP
} from '../../../../components/url'

export class GetUserSessions {
    static async getUserSessions(params: UserSessionsParams): Promise<UserSessionsResponse> {
        console.log('Получение сессий пользователя:', params.user_id)
    
        const searchParams = new URLSearchParams()
        
        if (params.active_only !== undefined) {
          searchParams.append('active_only', params.active_only.toString())
        }
        
        if (params.limit !== undefined) {
          searchParams.append('limit', params.limit.toString())
        }
        
        if (params.offset !== undefined) {
          searchParams.append('offset', params.offset.toString())
        }
    
        const response = await fetch(`${BASE_URL}${getUserSessionsEP}/${params.user_id}?${searchParams.toString()}`)
    
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