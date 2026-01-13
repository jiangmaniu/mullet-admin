import { Access as AccessComp, useAccess } from '@umijs/max'

/**
 * 菜单权限编码
 */
export type MenuCodes =
  | 'sym'
  | 'sym:add'
  | 'sym:edit'
  | 'order'
  | 'order:list'
  | 'order:list:view'
  | 'order:close'
  | 'order:close:view'
  | 'order:position'
  | 'order:position:view'
  | 'datasources'
  | 'customer'
  | 'customer:list'
  | 'customer:account'
  | 'customer:account:edit'
  | 'customer:position'
  | 'customer:position:eidt'
  | 'customer:pending'
  | 'customer:pending:edit'
  | 'account-group'
  | 'account-group:demo'
  | 'account-group:demo:add'
  | 'account-group:demo:edit'
  | 'account-group:real'
  | 'account-group:real:add'
  | 'account-group:real:edit'
  | 'managers'
  | 'sys'
  | 'sys:dashboard'
  | 'sys:time'
  | 'sys:holiday'
  | 'customer-group'
  | 'msg'
  | 'msg:sms'
  | 'msg:email'
  | 'msg:station-msg'

type IProps = {
  children: React.ReactNode
  /**菜单编码 */
  code: MenuCodes
}

/**
 * 根据菜单编码，控制按钮权限组件
 */
export default function Access({ code, children }: IProps) {
  const access = useAccess()
  return <AccessComp accessible={access.canAction(code)}>{children}</AccessComp>
}
