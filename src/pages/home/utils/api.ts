/**
 * Базовый класс для API запросов
 */
export class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string = '', defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    }
  }

  /**
   * Выполняет HTTP запрос
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }

      return response.text() as T
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  /**
   * GET запрос
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    let url = endpoint
    
    if (params) {
      const searchParams = new URLSearchParams(params)
      url += `?${searchParams.toString()}`
    }

    return this.request<T>(url, { method: 'GET' })
  }

  /**
   * POST запрос
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  /**
   * PUT запрос
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  /**
   * DELETE запрос
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  /**
   * Загружает файл
   */
  async uploadFile<T>(endpoint: string, file: File, fieldName: string = 'file'): Promise<T> {
    const formData = new FormData()
    formData.append(fieldName, file)

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {} // Убираем Content-Type для FormData
    })
  }
}

/**
 * Создает экземпляр API клиента
 */
export const createApiClient = (baseURL?: string, headers?: Record<string, string>) => {
  return new ApiClient(baseURL, headers)
}

/**
 * Retry функция для повторных запросов
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }
  throw new Error('Max retries exceeded')
}

/**
 * Кэширует результат функции
 */
export const memoize = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  cacheTime: number = 5 * 60 * 1000 // 5 минут по умолчанию
): T => {
  const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    const cached = cache.get(key)
    const now = Date.now()

    if (cached && now - cached.timestamp < cacheTime) {
      return cached.value
    }

    const result = fn(...args) as ReturnType<T>
    cache.set(key, { value: result, timestamp: now })

    return result
  }) as T
}
