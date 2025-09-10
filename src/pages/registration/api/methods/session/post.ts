import {
    IPUtils,
    RefreshToken,
    CreateSession,
    ValidateSession,
    RevokeSession,
    UpdateLastSeen,
} from './components'

import type {
  SessionCreateData, 
  SessionResponse,
  RefreshTokenResponse,
  SessionValidateResponse,
  SessionRevokeResponse,
  SessionInfo
} from '../../../types'

export class PostSessionAPI {

  static async create_session(data: SessionCreateData): Promise<SessionResponse> {
    return CreateSession.createSession(data)
  }

  static IP = IPUtils

  static async refresh_token(refreshToken: string, ipAddress?: string, userAgent?: string): Promise<RefreshTokenResponse> {
    return RefreshToken.refreshToken(refreshToken, ipAddress, userAgent)
  }

  static async validate_session(sessionId: string, jti: string): Promise<SessionValidateResponse> {
    return ValidateSession.validateSession(sessionId, jti)
  }

  static async revoke_session(sessionId: string, reason?: string): Promise<SessionRevokeResponse> {
    return RevokeSession.revokeSession(sessionId, reason)
  }

  static async update_last_seen(params: { session_id: string; ip_address?: string | null; user_agent?: string | null }): Promise<SessionInfo> {
    return UpdateLastSeen.updateLastSeen(params)
    }
}