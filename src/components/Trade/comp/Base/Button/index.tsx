import { Button as AntdButton, ButtonProps } from 'antd'
import qs from 'qs'

import { useEnv } from '@/context/envProvider'
import { push } from '@/utils/navigator'

type IProps = ButtonProps & {
  /**按钮内容 */
  children?: React.ReactNode
  /**跳转地址 */
  href?: string
  /**跳转地址参数 */
  params?: Record<string, any>
  /**按钮高度 */
  height?: number
  style?: React.CSSProperties
}

export default function Button({ children, href, params, onClick, height = 38, style, ...res }: IProps) {
  const { isMobileOrIpad } = useEnv()
  const btnHeight = isMobileOrIpad ? 44 : height

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    } else if (href) {
      push(`${href}${qs.stringify(params, { addQueryPrefix: true })}`)
    }
  }

  return (
    <AntdButton onClick={handleClick} style={{ height: btnHeight, ...style }} {...res}>
      <span>{children}</span>
    </AntdButton>
  )
}
