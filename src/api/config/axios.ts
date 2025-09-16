import axios, { type AxiosInstance } from 'axios'

export function createAxios(baseURL: string, withApiKey = true): AxiosInstance {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    timeout: 15000,
  })

  instance.interceptors.request.use((config) => {
    if (withApiKey) {
      const apiKey = import.meta.env.VITE_API_KEY || 'sk-admin-DMiTODzXxgRrMF_Wz3sgM8gGbqVqGQbIy3s3S6drvA0'
      if (apiKey) {
        config.headers = config.headers || {}
        ;(config.headers as Record<string, string>)['X-API-Key'] = apiKey
        ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${apiKey}`
        config.params = { ...(config.params || {}), api_key: apiKey }
      }
    }
    return config
  })

  return instance
}


