import { useIntl } from '@umijs/max'
import { ButtonProps } from 'antd'

import { IconFontButton } from '../Button'

type IProps = {
  onSubmit?: () => void
  onReset?: () => void
  submitProps?: Omit<ButtonProps, 'icon'>
  resetProps?: Omit<ButtonProps, 'icon'>
}

// 查询、重置 按钮组
export default ({ onSubmit, onReset, resetProps, submitProps }: IProps) => {
  const intl = useIntl()
  return (
    <div className="flex items-center gap-3">
      <IconFontButton type="primary" icon="sousuo" onClick={onSubmit} style={{ paddingLeft: 10 }} {...submitProps}>
        {intl.formatMessage({ id: 'common.query' })}
      </IconFontButton>
      <IconFontButton icon="qingli" onClick={onReset} style={{ paddingLeft: 10 }} {...resetProps}>
        {intl.formatMessage({ id: 'common.reset' })}
      </IconFontButton>
    </div>
  )
}
