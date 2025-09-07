import { ipServices } from '../url'


export class IPUtils {
    static getClientInfo(): { ip_address?: string; user_agent?: string } {
        return {
            ip_address: undefined,
            user_agent: navigator.userAgent,
        }
    }

    static async getClientInfoAsync(): Promise<{ ip_address: string | null; user_agent: string }> {
      const ip = await this.getClientIP()
      return {
        ip_address: ip,
        user_agent: navigator.userAgent,
      }
    }
    static async getClientIP(): Promise<string | null> {
      try {
        for (const service of ipServices) {
          try {
            const response = await fetch(service, { 
              timeout: 5000,
              headers: {
                'Accept': 'application/json'
              }
            } as RequestInit)

            if (response.ok) {
              const data = await response.json()
            
              const ip = data.ip || data.origin || data.query
            
              if (ip && typeof ip === 'string') {
                return ip
              }
            }
          } catch (serviceError) {
            console.warn(`IP service ${service} failed:`, serviceError)
            continue
          }
        }

        return null
      } catch (error) {
        console.warn('Failed to get client IP:', error)
        return null
      }
    }
}