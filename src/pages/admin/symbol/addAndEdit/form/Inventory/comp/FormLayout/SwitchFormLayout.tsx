import { ISymbolFormLayout } from '../MultiplierEditTable'

type IProps = {
  /**创建品种布局 */
  symbolLayout: React.ReactNode
  /**账户组修改品种布局 */
  accountGroupLayout: React.ReactNode
  layout: ISymbolFormLayout
}
export default function SwitchFormLayout({ layout, symbolLayout, accountGroupLayout }: IProps) {
  return (
    <>
      {layout === 'CREATE_SYMBOL' && symbolLayout}
      {layout === 'UPDATE_ACCOUNT_GROUP_SYMBOL' && accountGroupLayout}
    </>
  )
}
