import { getEnv } from '@/env'

interface FinanceRequestConfig {
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** URL参数 */
  params?: Record<string, any>
  /** 请求体数据 */
  data?: any
  /** 自定义 headers（不可覆盖 X-API-Key） */
  headers?: Record<string, string>
  /** 请求超时时间(ms) */
  timeout?: number
}

interface FinanceResponse<T = any> {
  success: boolean
  code: number
  msg: string
  data: T
}

// 默认超时时间
const DEFAULT_TIMEOUT = 30000

/**
 * 构建 URL 参数
 */
function buildUrlWithParams(baseUrl: string, params?: Record<string, any>): string {
  if (!params) return baseUrl

  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  if (!queryString) return baseUrl

  return baseUrl.includes('?') ? `${baseUrl}&${queryString}` : `${baseUrl}?${queryString}`
}

/**
 * 带超时的 fetch
 */
async function fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error: any) {
    clearTimeout(timeoutId)
    if (error?.name === 'AbortError') {
      throw new Error('Request Timeout')
    }
    throw error
  }
}

/**
 * /trade-payment 专用请求（api.mulletfinance.xyz 等）
 * 使用原生 fetch，与主站 Blade request 分离。
 *
 * 基址：仅 `FINANCE_API_BASE_URL`（`getEnv()` 含仓库默认 platform config + 本地缓存 + 开发环境变量）。
 * 认证：所有请求必须携带 `X-API-Key`，取自 `ADMIN_API_KEY`（同上）。
 */
export async function financeRequest<T = any, R = object>(url: string, config?: FinanceRequestConfig): Promise<FinanceResponse<T> & R> {
  const timeout = config?.timeout ?? DEFAULT_TIMEOUT

  try {
    const env = getEnv()
    const apiKey = env.ADMIN_API_KEY || ''
    if (!apiKey) {
      throw new Error('ADMIN_API_KEY is not configured')
    }

    // 构建完整 URL（不回退 BASE_URL，财务网关与主接口分离）
    const baseURL = env.FINANCE_API_BASE_URL || ''
    if (!baseURL) {
      throw new Error(
        'FINANCE_API_BASE_URL is missing: add to public/platform/config.json, or set FINANCE_API_BASE_URL in .env (dev); defaults are merged in src/env/index.ts'
      )
    }
    const cleanBaseURL = baseURL.replace(/\/$/, '')
    const cleanUrl = url.startsWith('/') ? url : `/${url}`
    const fullUrl = buildUrlWithParams(`${cleanBaseURL}${cleanUrl}`, config?.params)

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(config?.headers || {}),
      'X-API-Key': apiKey
    }

    const method = config?.method?.toUpperCase() || 'GET'
    const fetchOptions: RequestInit = {
      method,
      headers
    }

    if (config?.data && method !== 'GET') {
      fetchOptions.body = typeof config.data === 'string' ? config.data : JSON.stringify(config.data)
    }

    const response = await fetchWithTimeout(fullUrl, fetchOptions, timeout)

    const text = await response.text()
    let data: FinanceResponse<T> & R
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error('Invalid JSON response')
    }

    if (!response.ok || data.code !== 200) {
      throw data
    }

    return data
  } catch (error: any) {
    console.error('❌ Finance API Error:', error.message)

    if (error.message === 'Request Timeout') {
      throw new Error('Request Timeout')
    } else if (error.message?.includes('Network request failed')) {
      throw new Error('Network error, please retry')
    }

    throw error
  }
}
