import type {
    UserId,
    UserInfoResponse
} from '../../../../../types'

import {
    BASE_URL,
    getUserInfoEP,
    createAuthHeaders
} from '../../../../components/url'

export class GetUserInfo {
    static async get_user_info(user_id: UserId): Promise<UserInfoResponse> {
        try {
            const userIdString = typeof user_id === 'string' ? user_id : user_id.user_id
            const response = await fetch(`${BASE_URL}${getUserInfoEP}/${userIdString}`, {
                method: 'GET',
                headers: createAuthHeaders()
            })

            if (!response.ok) {
                const errorData = await response.json()
                
                if (response.status === 404) {
                    throw new Error(errorData.message || 'Пользователь не найден')
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
            
            const userInfo = await response.json()
            return userInfo
            
        } catch (error) {
            console.error('Ошибка при получении информации о пользователе:', error)
            throw error
        }
    }
}