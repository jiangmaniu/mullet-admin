import { MenuCodes } from './components/Admin/Access'
import { flatTreeData } from './utils/tree'

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * https://pro.ant.design/zh-CN/docs/authority-management
 * */
export default function access(
  initialState: { currentUser?: User.UserInfo; menuData?: User.MenuItem[]; menuButtons?: User.MenuItem[] } | undefined
) {
  const { currentUser, menuData = [], menuButtons = [] } = initialState ?? {}
  const flatMenuData = flatTreeData(menuData, 'id')
  const flatMenuButton = flatTreeData(menuButtons, 'id')
  const serverFlatMenu = [...flatMenuData, ...flatMenuButton]

  return {
    // 根据后台返回的角色权限，确定菜单
    canAdmin: (route: any) => {
      // 如果当前路由存在于返回的菜单权限列表中，则是有权限访问的
      return currentUser?.access_token && serverFlatMenu.some((item) => item.code === route.code)
    },
    // 按钮权限
    // const access = useAccess(); // access 实例的成员: canAction
    // 使用组件包裹 <Access accessible={access.canAction('order:list:add')}>新增</Access>
    canAction: (code: MenuCodes) => {
      return serverFlatMenu.some((item) => item.code === code)
    }
  }
}
