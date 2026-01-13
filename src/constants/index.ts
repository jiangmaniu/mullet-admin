const NAMESPACE = `manager` // 命名空间

// 注意：UI图标更新后，需要重新更新地址和本地代码
// 上线需要重新下载字体包，替换public下的/iconfont
// 字体图标 替换设计提供的地址 https://blog.csdn.net/weixin_44119268/article/details/102629409
export const ICONFONT_URL =
  process.env.NODE_ENV === 'development' ? '//at.alicdn.com/t/c/font_4512169_dlneaa140v.js' : '/iconfont/iconfont.js'

// 默认首页地址
export const DEFAULT_HOME_PAGE = '/datasources/list'

// 首页
export const KEY_HOME_PAGE = NAMESPACE + '_' + 'home_path'

// 本地存储-用户信息-键
export const KEY_TOKEN = NAMESPACE + '_' + 'token'
export const KEY_USER_INFO = NAMESPACE + '_' + 'userInfo'
export const KEY_PARAMS = NAMESPACE + '_' + 'params'
export const KEY_PWD = NAMESPACE + '_' + 'pwd'
export const KEY_NEXT_REFRESH_TOKEN_TIME = NAMESPACE + '_' + 'nextRefreshTokenTime'

// 临时缓存在sessionStorage中的语言
export const KEY_TEMP_LNG = NAMESPACE + '_' + 'temp_lang'

// 定位信息
export const KEY_LOCATION_INFO = NAMESPACE + '_' + 'location_info'

// 打开的菜单路径
export const KEY_OPEN_MENU_LIST = NAMESPACE + '_' + 'open_menu_list'
export const KEY_ACTIVE_MENU_PATH = NAMESPACE + '_' + 'active_menu_path'

// 菜单按钮权限
export const KEY_MENU = NAMESPACE + '_' + 'menu'
export const KEY_MENU_BUTTON = NAMESPACE + '_' + 'menu_button'

// 当前切换的主题色
export const KEY_THEME = NAMESPACE + '_' + 'theme'

// ========= 交易页面
// 打开的品种名称
export const KEY_SYMBOL_NAME_LIST = NAMESPACE + '_' + 'open_symbol_name_list'
export const KEY_ACTIVE_SYMBOL_NAME = NAMESPACE + '_' + 'active_symbol_name'
export const KEY_FAVORITE = NAMESPACE + '_' + 'favorite_list' // 收藏

// 按账户id储存用户的设置信息：自选、打开的品种列表、激活的品种名称
export const KEY_USER_CONF_INFO = NAMESPACE + '_' + 'user_conf_info'

// 默认语言 en-US
export const DEFAULT_LOCALE = 'en-US'

// 平台配置文件
export const KEY_PLATFORM_CONFIG = NAMESPACE + '_' + 'platform_config'

// tradingview当前选择的分辨率 1/5/15...
export const KEY_TRADINGVIEW_RESOLUTION = NAMESPACE + '_' + 'tradingview_resolution'

// 貨幣
export const SOURCE_CURRENCY = 'USD'
export const CURRENCY = 'USDT'

// 默认精度
export const DEFAULT_PRECISION = 2

/****** 默认带单参数 *****/
/** 跟隨人數 */
export const DEFAULT_FOLLOWER_NUMBER = 100
/** 资产规模限制 */
export const DEFAULT_ASSET_SCALE = 10
/** 资产要求限制 */
export const DEFAULT_ASSET_REQUIREMENT = 10000
/** 利润分成比例限制 */
export const DEFAULT_PROFIT_SHARING_RATIO = 10

export const FIXED_ZERO_VALUE = '0.00'

// 接口防重放appKey
export const REPLAY_PROTECTION_APP_KEY = 'KblZBTQ5t7TLYsif5SVs7fcJbpUj7igu'
