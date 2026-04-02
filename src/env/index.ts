import type { IPlatformConfig } from '@/mobx/global'
import { STORAGE_GET_PLATFORM_CONFIG } from '@/utils/storage'

import PLATFORM_DEFAULT_CONFIG from '../../public/platform/config.json'
import serverConf from './server'

export const getEnv = () => {
  // 远程/缓存：fetch /platform/config.json 后写入 localStorage
  const clientConf = STORAGE_GET_PLATFORM_CONFIG() || {}

  const env = {
    // 仓库内默认配置（避免首屏请求未完成、或本地仍为上古缓存时缺少 FINANCE_API_BASE_URL 等）
    ...PLATFORM_DEFAULT_CONFIG,
    ...clientConf,
    // 开发环境：.env / define 注入覆盖
    ...serverConf
  }
  return env as IPlatformConfig
}
