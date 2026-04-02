import { action, makeAutoObservable, observable, runInAction } from 'mobx'

import { DEFAULT_HOME_PAGE } from '@/constants'
import { getTimeZone } from '@/services/api/common'
import { getMyMessageList, getUnReadMessageCount } from '@/services/api/message'
import { getMenuButtons, getMenuRoutes, getUserInfo } from '@/services/api/user'
import { getIpInfo } from '@/utils/ip'
import { getPathname, replace } from '@/utils/navigator'
import {
  STORAGE_GET_ACTIVE_MENU_PATH,
  STORAGE_GET_HOME_PAGE,
  STORAGE_GET_MENU,
  STORAGE_GET_MENU_BUTTON,
  STORAGE_GET_OPEN_MENU_LIST,
  STORAGE_GET_TOKEN,
  STORAGE_GET_USER_INFO,
  STORAGE_SET_ACTIVE_MENU_PATH,
  STORAGE_SET_HOME_PAGE,
  STORAGE_SET_OPEN_MENU_LIST,
  STORAGE_SET_PLATFORM_CONFIG,
  STORAGE_SET_USER_INFO
} from '@/utils/storage'

import PLATFORM_DEFAULT_CONFIG from '../../public/platform/config.json'
import trade from './trade'
import ws from './ws'

export type LocationData = {
  area_code: string
  city: string
  city_code: string
  continent: string
  country: string
  country_code: string
  district: string
  elevation: string
  ip: string
  isp: string
  latitude: string
  longitude: string
  province: string
  street: string
  time_zone: string
  weather_station: string
  zip_code: string
}

export type IPlatformConfig = typeof PLATFORM_DEFAULT_CONFIG & {
  BASE_URL?: string
  /** /trade-payment 网关 */
  FINANCE_API_BASE_URL?: string
  /** Trade-payment / Cobo 类 Admin API（如 wrangler secret、mpx-trade application-dev.yml cobo.backend.api-key） */
  ADMIN_API_KEY?: string
}

export class GlobalStore {
  @observable locationInfo = {} as LocationData

  constructor() {
    makeAutoObservable(this)

    this.getPlatformConfig()
  }

  @observable timeZone = ''
  @observable openMenuList: string[] = [] // 记录打开的品种名称
  @observable currentOpenMenuPath = DEFAULT_HOME_PAGE // 当前激活的路径
  @observable homePagePath = '' // 首页路径，动态设置
  @observable messageList = [] as Message.MessageItem[] // 消息列表
  @observable messageCurrent = 1 // 消息列表页码
  @observable messageTotalCount = 1 // 总页码
  @observable unReadCount = 0 // 未读消息数量
  @observable platformConfig = {} as IPlatformConfig // 平台配置

  // 设置进入系统的首页路径
  setHomePagePath = (path: any) => {
    this.homePagePath = path
    STORAGE_SET_HOME_PAGE(path)
    this.setActiveMenuPath(path)
  }
  initHomePage = () => {
    this.homePagePath = STORAGE_GET_HOME_PAGE() || DEFAULT_HOME_PAGE
  }

  // 获取平台配置
  getPlatformConfig = async () => {
    const config = await fetch(location.origin + `/platform/config.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => data)

    // 缓存配置到本地
    STORAGE_SET_PLATFORM_CONFIG(config)

    this.setPlatformConfig(config)

    return config
  }

  // 设置平台配置
  setPlatformConfig = (conf: any) => {
    runInAction(() => {
      this.platformConfig = conf
    })
  }

  // 获取用户信息
  @action
  fetchUserInfo = async () => {
    let result = undefined
    try {
      // 查询用户信息
      const res = await getUserInfo().catch((e) => e)
      const userInfo = res?.data

      // 获取菜单权限
      const menu = await getMenuRoutes().catch((e) => e)
      const buttons = await getMenuButtons().catch((e) => e)
      let menuData = menu?.length ? menu : (STORAGE_GET_MENU() as User.MenuItem[]) // 获取菜单

      // 添加结算对账菜单（如果不存在）
      const settlementMenuExists = menuData?.some((item) => item.code === 'settlement')
      if (!settlementMenuExists && menuData?.length) {
        const settlementMenu = {
          id: 'settlement_menu_id',
          name: 'settlement',
          alias: 'settlement',
          code: 'settlement',
          path: '/:lng/settlement',
          icon: 'icon-peizhi',
          type: 1,
          children: [
            {
              id: 'settlement_financial_summary',
              name: 'financial-summary',
              alias: 'financial-summary',
              code: 'settlement:financial-summary',
              path: '/:lng/settlement/financial-summary',
              type: 2
            },
            {
              id: 'settlement_audit_logs',
              name: 'audit-logs',
              alias: 'audit-logs',
              code: 'settlement:audit-logs',
              path: '/:lng/settlement/audit-logs',
              type: 2
            }
          ]
        }

        // 找到版本管理菜单的位置，在其前面插入结算对账菜单
        const versionMenuIndex = menuData.findIndex((item) => item.code === 'version')
        if (versionMenuIndex !== -1) {
          menuData.splice(versionMenuIndex, 0, settlementMenu as any)
        } else {
          // 如果找不到版本菜单，则添加到最后
          menuData = [...menuData, settlementMenu as any]
        }
      }

      const menuButtons = buttons?.length ? buttons : STORAGE_GET_MENU_BUTTON() // 获取按钮权限  // 根据菜单获取菜单编码
      const localUserInfo = STORAGE_GET_USER_INFO() || {}

      const currentUser = {
        ...localUserInfo,
        ...userInfo // 合并用户信息
      }

      // 更新本地的用户信息
      STORAGE_SET_USER_INFO(currentUser)

      // 初始化全局配置
      await this.init()

      // 初始化ws链接
      ws.reconnect()

      result = {
        currentUser,
        menuData,
        menuButtons
      }
    } catch (error) {
      console.log('error====', error)
    }
    return result as {
      currentUser: User.UserInfo
      menuData: User.MenuItem[]
      menuButtons: User.MenuItem[]
    }
  }

  // 初始化本地打开的path
  @action
  initOpenMenuList() {
    this.openMenuList = STORAGE_GET_OPEN_MENU_LIST() || []
    this.currentOpenMenuPath = STORAGE_GET_ACTIVE_MENU_PATH()
  }

  // 记录打开的path
  @action
  setOpenMenuList(path: string) {
    if (!this.currentOpenMenuPath) {
      this.currentOpenMenuPath = path
    }
    if (this.openMenuList.some((item) => item === path)) return
    this.openMenuList.push(path)
    this.updateLocalOpenMenuList()
  }

  // 移除打开的path
  @action
  removeOpenMenuList(path: string, removeIndex: number) {
    const originList = JSON.parse(JSON.stringify(this.openMenuList))
    const newList = this.openMenuList.filter((item) => item !== path)

    this.openMenuList = newList
    this.updateLocalOpenMenuList()

    if (this.currentOpenMenuPath === path) {
      // 更新激活的索引
      const nextActiveItem = originList[removeIndex - 1] || originList[removeIndex + 1]
      this.setActiveMenuPath(nextActiveItem)

      // 激活菜单路由
      replace(getPathname(nextActiveItem))
    }
  }

  // 关闭全部打开的路径
  @action
  closeOpenMenuPath = (key: string) => {
    const isRemoveAll = key === 'all'
    const path = isRemoveAll ? this.homePagePath : this.currentOpenMenuPath
    // 清空缓存
    STORAGE_SET_OPEN_MENU_LIST([])
    // 当前激活的菜单
    this.currentOpenMenuPath = path
    STORAGE_SET_ACTIVE_MENU_PATH(path)
    // 设置打开的菜单列表
    STORAGE_SET_OPEN_MENU_LIST([path])
    this.openMenuList = [path]
    // 跳转
    replace(path)
  }

  // 切换当前打开的path
  @action
  setActiveMenuPath(path: string) {
    const formatPath = getPathname(path)
    this.currentOpenMenuPath = formatPath
    STORAGE_SET_ACTIVE_MENU_PATH(formatPath)

    // 更新激活的菜单路由
    this.setOpenMenuList(formatPath)
  }

  // 更新本地缓存的path列表
  @action updateLocalOpenMenuList = () => {
    STORAGE_SET_OPEN_MENU_LIST(this.openMenuList)
  }

  // ====================

  @action
  getIp = async () => {
    return getIpInfo().then((res) => {
      runInAction(() => {
        this.locationInfo = res
      })
    })
  }

  // 查询时区
  @action
  queryTimeZone = async () => {
    const res = await getTimeZone()
    if (res.success) {
      runInAction(() => {
        this.timeZone = res.data || ''
      })
    }
  }

  // 获取消息列表
  @action
  getMessageList = async (isRefresh = false) => {
    const hasMore = !isRefresh && this.messageCurrent < this.messageTotalCount
    if (hasMore) {
      this.messageCurrent += 1
    } else {
      this.messageCurrent = 1
    }

    const res = await getMyMessageList({ size: 10, current: this.messageCurrent })
    const list = (res.data?.records || []) as Message.MessageItem[]

    runInAction(() => {
      this.messageTotalCount = Number(res?.data?.pages)
      if (hasMore) {
        this.messageList = this.messageList.concat(list)
      } else {
        this.messageList = list
      }
    })
  }

  // 获取未读消息数量
  getUnreadMessageCount = async () => {
    const res = await getUnReadMessageCount()
    const count = res.data || 0

    runInAction(() => {
      this.unReadCount = count
    })
  }

  // ========== 全局页面初始化执行 ================
  init = async () => {
    try {
      // this.getIp()
      this.initOpenMenuList()
      this.queryTimeZone()
      this.initHomePage()
      trade.init()

      if (STORAGE_GET_TOKEN()) {
        this.getUnreadMessageCount()
        this.getMessageList()
      }
    } catch (e) {
      console.log('init error', e)
    }
  }
}

const global = new GlobalStore()

export default global
