import { Settings as LayoutSettings } from '@ant-design/pro-components'
import { history, Link, Navigate, RunTimeLayoutConfig, useModel } from '@umijs/max'
import { ClickToComponent } from 'click-to-react-component'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Provider } from '@/context'
import { cssVars } from '@/theme/theme.config'

import defaultSettings from '../config/defaultSettings'
import Logo from './components/Admin/Header/Logo'
import Nav from './components/Admin/Header/Nav'
import Forbid from './components/Base/Forbid'
import SwitchLanguage from './components/SwitchLanguage'
import { DEFAULT_HOME_PAGE, DEFAULT_LOCALE, ICONFONT_URL } from './constants'
import { useEnv } from './context/envProvider'
import { useLang } from './context/languageProvider'
import { stores } from './context/mobxProvider'
import { getEnv } from './env'
import { errorConfig } from './requestErrorConfig'
import { checkVersion } from './utils/checkVersion'
import { getMenuData } from './utils/menu'
import { getBrowerLng, getPathname, getPathnameLng } from './utils/navigator'
import { beforeCaptureSetUserInfo } from './utils/sentry'
import { STORAGE_GET_HOME_PAGE, STORAGE_GET_TOKEN } from './utils/storage'

const loginPath = '/user/login'

// if (process.env.NODE_ENV === 'development') {
//   // https://github.com/Tencent/vConsole
//   const vConsole = new VConsole()
// }

let refreshTokenTimer: any = null

type UserInfo = { currentUser: User.UserInfo; menuButtons: User.MenuItem[]; menuData: User.MenuItem[] }

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: User.UserInfo
  loading?: boolean
  fetchUserInfo?: (token?: any) => Promise<UserInfo | undefined>
  menuData?: User.MenuItem[]
  menuButtons?: User.MenuItem[]
}> {
  // 如果不是登录页面，执行
  const { location } = history

  const fetchUserInfo = stores.global.fetchUserInfo
  // 登录页进不来
  if (getPathname(location.pathname) !== loginPath && STORAGE_GET_TOKEN()) {
    // 获取全局用户信息
    const { currentUser, menuButtons, menuData } = (await fetchUserInfo()) as UserInfo

    return {
      menuData,
      menuButtons,
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // const [collapsed, setCollapsed] = useState<boolean>(false) // 默认展开侧边栏
  const { sidebarCollapsed: collapsed, setSidebarCollapsed: setCollapsed } = useModel('global')
  const { breakPoint, isMobileOrIpad, isMobile, isIpad, screenSize } = useEnv()
  const { lng, count } = useLang()
  const { pageBgColor } = useModel('global')
  const [openKeys, setOpenKeys] = useState<any[]>([])
  const [isUpdateVersion, setIsUpdateVersion] = useState<boolean>(false)

  // @ts-ignore
  const menuData = initialState?.menuData || []

  useEffect(() => {
    // 侧边菜单内容过少的时候，默认都展开
    if (menuData.length && menuData.length <= 4) {
      setOpenKeys(menuData.map((item) => item.path))
    }
  }, [menuData])

  useEffect(() => {
    // 1200px-1600px收起侧边栏
    if (screenSize.width > 1200 && screenSize.width < 1600) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [screenSize])

  useEffect(() => {
    let versionTimer
    // 交易版本是否更新
    if (isUpdateVersion) {
      clearInterval(versionTimer)
      return
    }
    versionTimer = setInterval(() => {
      checkVersion(() => {
        setIsUpdateVersion(true)
        console.log('版本更新')
      })
    }, 10 * 1000)
    return () => {
      // 清除定时器
      clearInterval(versionTimer)
    }
  }, [isUpdateVersion])

  return {
    ...initialState?.settings,
    // title: '测试',// layout 的左上角 的 title
    // logo: '', // layout 的左上角 logo 的 url，可以动态修改
    // loading: false, // layout 的加载态
    // 渲染 logo 和 title, 优先级比 headerTitleRender 更高
    // headerTitleRender: () => <div>headerTitleRender</div>,
    // 在 layout 底部渲染一个块
    // menuFooterRender: () => <div>菜单底部区域</div>,
    // logo: !collapsed ? <Logo /> : undefined,
    logo: <Logo />,
    title: '',
    // layout 的内容区 style
    contentStyle: {
      background: pageBgColor,
      minHeight: '100vh',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0
    },
    unAccessible: <Forbid />,
    actionsRender: () => [],
    // actionsRender: () => [<SwitchLanguage isAdmin key="lang" />],
    // avatarProps: {
    //   src: initialState?.currentUser?.avatar || '/img/logo.png',
    //   title: <AvatarName />,
    //   render: (_, avatarChildren) => {
    //     return <AvatarDropdown>{avatarChildren}</AvatarDropdown>
    //   }
    // },
    // 是否固定 header 到顶部
    // fixedHeader: true,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name
    // },
    // onMenuHeaderClick: () => {
    //   history.push('/')
    // }, // 点击跳转到首页，移动端不支持点击
    // headerRender: () => <p>123</p>, // 自定义顶部头
    // footerRender: () => <Footer />, // 自定义页脚的 render 方法
    siderWidth: 300, // 侧边菜单宽度默认	208
    collapsed,
    // 自定义展开收起按钮的渲染
    collapsedButtonRender: false,
    // collapsedButtonRender: (collapsed: boolean | undefined, defaultDom: React.ReactNode) => (isMobileOrIpad ? undefined : defaultDom),
    menuProps: {
      // 点击菜单项
      onClick: (info) => {
        // 折叠侧边栏菜单
        if (isMobileOrIpad) {
          setCollapsed(true)
        }
        // 设置当前当前的path
        stores.global.setActiveMenuPath(info.key)
        // console.log('info', info)
      }
    },
    // 侧边菜单底部的配置，可以增加一些底部操作
    menuFooterRender: (props) => {
      if (isMobileOrIpad && !props?.collapsed) {
        return (
          <div className="flex justify-center" style={{ paddingBottom: 100 }}>
            <SwitchLanguage isAdmin />
          </div>
        )
      }
    },
    onCollapse: (collapsed: boolean) => {
      setCollapsed(collapsed)
    },
    // 一些时候我们会发现 collapsed 和 onCollapse 设置默认收起并不生效，这是因为 ProLayout 中内置了 breakpoint 来触发收起的机制，我们可以设置 breakpoint={false} 来关掉这个机制
    // breakpoint: false,
    onPageChange: () => {
      const { location } = history

      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath)
        return
      }
      // 刷新token，更新用户信息
      // const nextRefreshTokenTime = STORAGE_GET_NEXT_REFRESH_TOKEN_TIME()
      // // 下次刷新token的时间减去当前时间小于10分钟则刷新token
      // const countDown = nextRefreshTokenTime && nextRefreshTokenTime - Date.now()
      // const ms = countDown / 1000
      // const refreshFlag = ms < 10 * 60 * 1000 // 10分钟
      // if (refreshTokenTimer) clearTimeout(refreshTokenTimer)

      // if (refreshFlag) {
      //   // 定时刷新token，不刷新页面可以
      //   refreshTokenTimer = setTimeout(() => {
      //     refreshToken().then((res) => {
      //       setInitialState((s) => ({
      //         ...s,
      //         currentUser: res
      //       }))
      //     })
      //   }, ms)
      // }
    },
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>
    //     ]
    //   : [],
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <>
            <Nav />
            {children}
          </>
        </>
      )
    },
    // menuData 的数据，可以动态的控制数据
    // menuDataRender: (menuData) => [
    //   {
    //     path: '/welcome',
    //     name: '欢迎'
    //   },
    //   {
    //     path: '/admin',
    //     name: '管理',
    //     children: [
    //       {
    //         name: '申请单列表',
    //         path: '/admin/process'
    //       },
    //       {
    //         name: '申请单详情',
    //         path: '/admin/process/detail/:id',
    //         hideInMenu: true
    //       },
    //       {
    //         name: '编辑申请单',
    //         path: '/admin/process/edit/:id',
    //         hideInMenu: true
    //       },
    //       {
    //         name: '添加申请单',
    //         path: '/admin/process/add',
    //         hideInMenu: true
    //       }
    //     ]
    //   }
    // ],
    menu: {
      // https://beta-pro.ant.design/docs/advanced-menu-cn
      // actionRef: layoutActionRef, // 如果你希望可以手动的控制菜单刷新，可以使用 actionRef 功能。
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        // userId: initialState?.currentUser?.userid,
        count
      },
      // config.ts/routes.ts文件里的路由还是要添加,和静态路由是一样
      request: async (params, defaultMenuData) => {
        // 这里仅仅处理国际化路径替换，权限处理在src/access.ts中判断
        const menuData = initialState?.menuData as User.MenuItem[] // 服务端菜单

        return getMenuData(menuData, defaultMenuData, lng)
      }
    },
    openKeys,
    onOpenChange: (keys: any) => {
      setOpenKeys(keys)
    },
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom
      }
      // 支持二级菜单显示icon
      const src = menuItemProps.pro_layout_parentKeys && menuItemProps.pro_layout_parentKeys.length > 0 && menuItemProps.icon
      return (
        <Link to={menuItemProps.path} className="flex items-center">
          {src && <img src={src} width={22} height={22} />}
          {defaultDom}
        </Link>
      )
    }
    // logout: () => {
    //   alert('退出登录成功')
    // },
    // headerContentRender: (props: ProLayoutProps) => <div>自定义头内容的方法</div>,
    // menuRender: (props: HeaderViewProps) => <div>自定义菜单的 render 方法</div>,
    // menuItemRender: (itemProps: MenuDataItem, defaultDom: React.ReactNode, props: BaseMenuProps) => <div>自定义菜单项的 render 方法</div>,
    // subMenuItemRender: (itemProps: MenuDataItem) => <div>自定义拥有子菜单菜单项的 render 方法</div>,
    // menuDataRender: (menuData: MenuDataItem[]) => MenuDataItem[], // menuData 的 render 方法，用来自定义 menuData
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig
}

// 修改被 react-router 渲染前的树状路由表
// https://umijs.org/docs/api/runtime-config
export const patchClientRoutes = ({ routes }: any) => {
  const { locationLng } = getBrowerLng()
  // 获取本地缓存的语言
  const lng = localStorage.getItem('umi_locale') || locationLng
  const token = STORAGE_GET_TOKEN()
  const homePage = STORAGE_GET_HOME_PAGE() || DEFAULT_HOME_PAGE
  const homePath = token ? homePage : loginPath

  // 首次默认重定向到en-US
  routes.unshift(
    ...[
      {
        path: '/',
        element: <Navigate to={`/${lng}${homePath}`} replace />
      },
      {
        path: `/${lng}`,
        element: <Navigate to={`/${lng}${homePath}`} replace />
      }
    ]
  )
}

// 埋点
export function onRouteChange({ location, clientRoutes, routes, action, basename, isFirst }: any) {
  // 获取本地缓存的语言
  const lng = localStorage.getItem('umi_locale') || DEFAULT_LOCALE
  const { pathnameLng, hasPathnameLng, pathname } = getPathnameLng()

  // 如果地址中不存在语言路径，则添加语言路径
  if (!hasPathnameLng && pathname !== '/') {
    history.replace(`/${lng}${location.pathname}`)
  }

  // 排除以下页面，未登录需重定向到登录页
  // if (!['/user/login'].includes(pathname) && !STORAGE_GET_TOKEN()) {
  //   push('/user/login')
  // }

  beforeCaptureSetUserInfo()
}

export const rootContainer = (container: JSX.Element) => {
  const ENV = getEnv()
  return React.createElement(
    () => (
      <>
        {/* @ts-ignore */}
        <Helmet>
          {/* 注入css变量 */}
          <style>{cssVars}</style>
          {/* 需要设置一次地址，否则不使用Layout的情况下，iconfont图标使用不显示 */}
          <script async={true} src={ICONFONT_URL}></script>
          {/* <script async={true} src={'/platform/config.js'}></script> */}

          {/* pwa配置 */}
          {/* <link ref="manifest" href="/platform/manifest.json" /> */}
          <link rel="shortcut icon" href="/platform/favicon.ico" />

          {/* meta标签 */}
          <meta name="application-name" content={ENV?.name} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={ENV?.name} />
          <meta name="description" content="Trading Platform" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <Provider>{container}</Provider>
        {/* 快速调试组件
          按住 option + 单击，就会直接打开它的对应的组件的源码。
          如果按住 option + 右键单击，可以看到它的所有父级组件，然后选择一个组件打
        */}
        <ClickToComponent />
      </>
    ),
    null,
    container
  )
}

// sentry运行时配置 https://github.com/alitajs/umi-plugin-sentry
// export const sentry = {
//   showDialog: false,
//   // @ts-ignore
//   // fallback: ({ error, componentStack, resetError }) => (
//   //   <div style={{ padding: 20 }}>
//   //     <div>You have encountered an error</div>
//   //     <div>{error.toString()}</div>
//   //     <div>{componentStack}</div>
//   //     <Button
//   //       onClick={() => {
//   //         resetError()
//   //       }}
//   //       type="primary"
//   //       style={{ marginTop: 20 }}
//   //     >
//   //       Click here to reset!
//   //     </Button>
//   //   </div>
//   // ),
//   onError: (e: any) => {
//     console.error('sentry onError', e)
//   },
//   beforeCapture: (scope: any) => {
//     console.log('sentry beforeCapture', scope)

//     beforeCaptureSetUserInfo()
//   }
// }
