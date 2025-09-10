import type {
    SessionInfo
} from '../../../types'


export class Normalizer {
    static normalizeSessionData(sessionData: Record<string, unknown>): SessionInfo {
        
        if (sessionData.ip_address) {
          if (typeof sessionData.ip_address === 'object') {
            const ipObj = sessionData.ip_address as { toString?: () => string }
            if (ipObj.toString) {
              let ipString = ipObj.toString()
              ipString = ipString.replace(/^IPv4Address\(['"]?(.+?)['"]?\)$/, '$1')
              sessionData.ip_address = ipString
            } else {
              sessionData.ip_address = null
            }
          } else if (typeof sessionData.ip_address === 'string') {
            let ipString = sessionData.ip_address as string
            if (ipString.startsWith('IPv4Address(')) {
              ipString = ipString.replace(/^IPv4Address\(['"]?(.+?)['"]?\)$/, '$1')
              sessionData.ip_address = ipString
            }
          }
        }
                
        return sessionData as unknown as SessionInfo
      }
}