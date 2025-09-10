import {
    GetUserInfo
} from './components'

import type {
    UserId,
    UserInfoResponse
} from '../../../types'


export class GetUser{

    static async user(user_id: UserId): Promise<UserInfoResponse> {
        return GetUserInfo.get_user_info(user_id)
    }
}