import { IPlatformConfig } from '../mobx/global'
import { deleteEmptyProperty } from '../utils/helpers'

// 针对平台做seo打包配置，暂时不需要
const serverConf =
  process.env.NODE_ENV === 'development'
    ? {
        // 按需把public/platform/config.json配置同步过来，需要在.env-conf 中配置
        name: process.env.name,
        platform: process.env.platform,
        desc: process.env.desc
      }
    : {}

// 开发环境配置，本地接口调试使用
const devConf = {
  ...serverConf,
  ws: process.env.WS_URL, // websocket地址
  imgDomain: process.env.IMG_DOMAIN, // 图片地址
  BASE_URL: process.env.BASE_URL, // 接口地址
  FINANCE_API_BASE_URL: process.env.FINANCE_API_BASE_URL, // 财务 / trade-payment 网关
  CLIENT_ID: process.env.CLIENT_ID, // 客户端ID
  CLIENT_SECRET: process.env.CLIENT_SECRET, // 客户端密钥
  REGISTER_APP_CODE: process.env.REGISTER_APP_CODE, // 注册应用code
  ADMIN_API_KEY: process.env.ADMIN_API_KEY // 财务/交易支付 Admin API Key
}

let ENV = deleteEmptyProperty({
  ...devConf
}) as IPlatformConfig

export default ENV
