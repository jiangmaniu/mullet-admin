import qs, { stringify } from 'qs'

import { push } from '@/utils/navigator'
import { request } from '@/utils/request'
import { setLocalUserInfo, STORAGE_GET_USER_INFO, STORAGE_SET_MENE, STORAGE_SET_MENU_BUTTON } from '@/utils/storage'

// 获取图形验证码
export async function getCaptcha() {
  return request<User.Captcha>('/api/blade-auth/oauth/captcha', {
    method: 'GET',
    needToken: false,
    authorization: false
  })
}

// 登录接口
export async function login(body: User.LoginParams, options?: { [key: string]: any }) {
  return request<User.LoginResult>(`/api/blade-auth/oauth/token?${qs.stringify(body)}`, {
    method: 'POST',
    needToken: false,
    ...(options || {})
  })
}

// 获取用户信息
export async function getUserInfo() {
  return request<API.Response<User.UserInfo>>('/api/blade-system/user/info', {
    method: 'GET',
    skipErrorHandler: true
  }).then((res) => {
    if (res?.code !== 200) {
      push('/user/login')
      return {}
    }
  })
}

// 退出登录接口
export async function outLogin() {
  return request<API.Response>('/api/blade-auth/oauth/logout', {
    method: 'GET'
  })
}

// 刷新token
export async function refreshToken() {
  const userInfo = STORAGE_GET_USER_INFO() as User.UserInfo
  const body = {
    grant_type: 'refresh_token',
    scope: 'all',
    refresh_token: userInfo?.refresh_token
  }
  return request<User.UserInfo>(`/api/blade-auth/oauth/token?${stringify(body)}`, {
    method: 'POST'
  }).then((res) => {
    if (res?.access_token) {
      setLocalUserInfo(res)
    }
    return res
  })
}

// 退出登录
export async function logout() {
  return request('/api/blade-auth/oauth/logout', {
    method: 'GET',
    authorization: false
  })
}

// 动态获取菜单
export async function getMenuRoutes() {
  return request<API.Response<User.MenuItem[]>>('/api/blade-system/menu/routes', {
    method: 'GET'
  }).then((res) => {
    let menuData: User.MenuItem[] = []
    if (res.success) {
      menuData = res?.data || []
      // 缓存
      STORAGE_SET_MENE(menuData)
    }

    return menuData
  })
}

// 获取菜单按钮权限
export async function getMenuButtons() {
  return request<API.Response<User.MenuItem[]>>('/api/blade-system/menu/buttons', {
    method: 'GET'
  }).then((res) => {
    let menuButtons: User.MenuItem[] = []

    if (res?.success) {
      menuButtons = res?.data || []
      // 缓存
      STORAGE_SET_MENU_BUTTON(menuButtons)
    }

    return menuButtons as User.MenuItem[]
  })
}

// 用户-验证密码(经理和客户都可以)
export async function checkUserPassword(body: User.SubmitPasswordParams) {
  return request<API.Response<boolean>>('/api/trade-crm/crmApi/user/validatePassword', {
    method: 'POST',
    data: body
  })
}

// 用户-修改密码(经理和客户都可以)
export async function modifyUserPassword(body: User.SubmitPasswordParams) {
  return request<API.Response<any>>('/api/trade-crm/crmApi/user/editPassword', {
    method: 'POST',
    data: body
  })
}
