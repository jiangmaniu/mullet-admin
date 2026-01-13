import { MenuDataItem } from '@ant-design/pro-components'

import { ILanguage } from '@/constants/enum'

import { getPathname, replacePathnameLng } from './navigator'

/**
 * 以服务端菜单为基准，过滤本地需要的菜单
 * @param menuData 服务端动态菜单
 * @param defaultMenuData 本地/config/routes.ts 定义的静态菜单
 * @param lng 当前语言
 * @returns MenutData[]
 */
export const getMenuData = (menuData: User.MenuItem[], defaultMenuData: MenuDataItem[], lng: ILanguage) => {
  // 提取 defaultMenuData 中所有菜单的编码
  const extractPaths = (data: any) => {
    const codes = new Set() // 菜单编号
    const codeMapName = new Map() // 菜单编码对应name
    const codeMapIcon = new Map() // 菜单编码对应icon
    const extract = (items: any) => {
      items.forEach((item: any) => {
        if (item.path) {
          codes.add(item.code)
          codeMapName.set(item.code, item.name)
          codeMapIcon.set(item.code, item.icon)
        }
        if (item.routes?.length) extract(item.routes)
      })
    }
    extract(data)
    return { codes, codeMapName, codeMapIcon }
  }

  const { codes: localDefaultCodes, codeMapName, codeMapIcon } = extractPaths(defaultMenuData)

  // 递归格式化菜单路径
  const formatMenuPath = (data: any) => {
    return (
      data
        .map((item: any) => {
          if (item.path) {
            // 首次加载，路径没有被处理过
            if (item.path.indexOf(':lng') > -1) {
              item.path = item.path?.replace(/:lng/, lng)
            } else {
              // 不刷新页面更新多语言的情况，切换多语言替换当前路径
              item.path = replacePathnameLng(item.path, lng)
            }
          }

          // 使用菜单别名替换菜单的name，重新做国际化翻译
          // 这里的别名alias需要在服务端配置动态菜单加上，必须和/config/routes.ts 定义的静态菜单的name一致，否则无法自动调用在locale/menu定义的翻译 menu.xx来翻译
          item.name = item.alias
          
          // 获取本地config/routes.ts的icon
          const localIcon = codeMapIcon.get(item.code)
          
          // 特殊处理：结算菜单使用有效的图标
          if (item.code === 'settlement') {
            item.icon = 'icon-peizhi'  // 强制使用有效的图标
          } else {
            item.icon = localIcon || item.icon
          }

          if (item.children?.length) {
            item.children = formatMenuPath(item.children)
          }
          if (item.routes?.length) {
            item.routes = formatMenuPath(item.routes)
          }
          return item
        })
        // 服务端配置的菜单，需要存在于本地config/routes中
        .filter((item: any) => localDefaultCodes.has(getPathname(item.code)))
    )
  }

  const filteredMenuData = formatMenuPath(menuData)

  return filteredMenuData
}

/**
 * 提取菜单权限编码
 * @param menuItems
 * @returns code[]
 */
export const extractMenuCodes = (menuItems: MenuDataItem[]) => {
  const codes: string[] = []

  const traverse = (items: MenuDataItem[]) => {
    for (const item of items) {
      if (item.code) {
        codes.push(item.code)
      }
      if (item.routes) {
        traverse(item.routes)
      }
      if (item.children) {
        traverse(item.children)
      }
    }
  }

  traverse(menuItems)
  return codes
}
