import {
    GetUserSessions,
    GetSessionById,
} from './components'

import type {
    UserSessionsParams,
    UserSessionsResponse,
    SessionInfo,
} from '../../../types'

export class GetSessionAPI {

    static async get_user_sessions(params: UserSessionsParams): Promise<UserSessionsResponse> {
        return GetUserSessions.getUserSessions(params)
    }

    static async get_session_by_id(sessionId: string): Promise<SessionInfo> {
        return GetSessionById.getSessionById(sessionId)
    }

}