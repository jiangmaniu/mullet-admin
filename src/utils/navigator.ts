import { history } from '@umijs/max'
import { stringify } from 'qs'

import { DEFAULT_LOCALE } from '@/constants'
import { SUPPORTED_LANGUAGES } from '@/constants/enum'
import { stores } from '@/context/mobxProvider'
import { logout } from '@/services/api/user'

import {
  STORAGE_REMOVE_ACTIVE_MENU_PATH,
  STORAGE_REMOVE_HOME_PAGE,
  STORAGE_REMOVE_MENU,
  STORAGE_REMOVE_MENU_BUTTON,
  STORAGE_REMOVE_OPEN_MENU_LIST,
  STORAGE_REMOVE_TOKEN,
  STORAGE_REMOVE_USER_INFO,
  STORAGE_SET_CONF_INFO
} from './storage'

/**
 * 退出登录
 * @param requestLogout 不请求退出接口
 */
export const onLogout = async (noRequestLogout?: boolean) => {
  if (!noRequestLogout) {
    await logout().catch((e) => e)
  }

  STORAGE_REMOVE_TOKEN()
  STORAGE_REMOVE_USER_INFO()
  STORAGE_REMOVE_MENU()
  STORAGE_REMOVE_MENU_BUTTON()
  STORAGE_REMOVE_HOME_PAGE()
  STORAGE_REMOVE_OPEN_MENU_LIST()
  STORAGE_REMOVE_ACTIVE_MENU_PATH()
  STORAGE_SET_CONF_INFO('', 'currentAccountInfo') // 重置当前选择的账户

  // 重置打开的菜单信息
  stores.global.openMenuList = []
  stores.global.currentOpenMenuPath = ''
  stores.global.homePagePath = ''

  // 关闭行情
  stores.ws.close()

  // 退出登录，并且将当前的 url 保存
  const { search, pathname } = window.location
  const urlParams = new URL(window.location.href).searchParams
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect')
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search
      })
    })
  }
}

// 跳转登页
export const goLogin = () => {
  push('/user/login')
}

export const goKefu = () => {}

/**
 * 获取多语言路径信息
 */
export const getPathnameLng = () => {
  const pathname = location.pathname
  const pathnameLng = pathname
    .split('/')
    .filter((v) => v)
    .at(0) as string

  return {
    pathname,
    pathnameLng,
    hasPathnameLng: pathnameLng && SUPPORTED_LANGUAGES.includes(pathnameLng)
  }
}

/**
 * 格式化跳转路径，添加多语言
 * @param pathname 跳转的路径
 * @returns
 */
export const formatPathname = (pathname: string) => {
  const lng = localStorage.getItem('umi_locale') || DEFAULT_LOCALE

  return `/${lng}${pathname}`
}

/**
 * 获取当前路径，不包含/zh-TW多语言路径
 */
export const getPathname = (path?: string) => {
  const pathname = path || location.pathname

  // 去掉多语言前缀和hash部分
  return pathname
    .replace(new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})`), '')
    .replace(/#.*$/, '')
    .replace(/\/$/, '')
}

/**
 * 替换地址中的语言
 * @param path 页面路径
 * @returns
 */
export const replacePathnameLng = (path: string, lang?: string) => {
  const lng = lang || localStorage.getItem('umi_locale') || DEFAULT_LOCALE
  const pathname = getPathname(path)

  return `/${lng}${pathname}`
}

/**
 * 获取浏览器语言
 */
export const getBrowerLng = () => {
  const browerLng = navigator.language?.toLocaleLowerCase()

  let locationLng = 'en-US'
  if (['zh-cn', 'zh-hk', 'zh-tw'].includes(browerLng)) {
    locationLng = 'zh-TW'
  }
  return {
    browerLng,
    locationLng
  }
}

/**
 * 多语言 push跳转方法
 * @param path 跳转路径
 */
export const push = (path: string) => {
  history.push(formatPathname(path))
}

/**
 * 多语言 push跳转方法
 * @param path 跳转路径
 * @param params 跳转参数
 */
export const sysPush = (path: string, params?: any) => {
  // 设置当前当前的path
  stores.global.setActiveMenuPath(path)

  // 跳转菜单
  replace(params ? `${path}?${params}` : path)
}

/**
 * 多语言 replace跳转方法
 * @param path 跳转路径
 */
export const replace = (path: string) => {
  history.replace(formatPathname(path))
}

/**
 * 返回上一个页面
 */
export const onBack = () => {
  const path = location.pathname
    .split('/')
    .filter((v) => v)
    .slice(0, -1)
    .join('/')

  // 不能在返回了
  if (path.length === 1) return

  push(getPathname(`/${path}`))
}

// 跳转客服页面 @TODO
export const goToService = () => {}
