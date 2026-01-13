import { FormattedMessage, useIntl, useModel } from '@umijs/max'
import { useState } from 'react'

import { IconFontButton } from '@/components/Base/Button'
import { useEnv } from '@/context/envProvider'
import { handleDownloadBlobFile } from '@/utils/download'

type IProps = {
  onClick?: () => Promise<any> | void
  style?: React.CSSProperties
}
export default function Export({ onClick, style }: IProps) {
  const [loading, setLoading] = useState(false)
  const { hasProList } = useModel('global')
  const intl = useIntl()
  const { isMobileOrIpad } = useEnv()

  if (isMobileOrIpad || !hasProList) {
    return null
  }

  // 暂时隐藏导出按钮
  // return null
  return (
    <IconFontButton
      icon={'daochu'}
      onClick={async () => {
        try {
          // 导出loading，统一处理
          setLoading(true)
          const res = await onClick?.()
          if (res?.status === 200 && res?.data) {
            handleDownloadBlobFile(res)
          }
        } finally {
          setLoading(false)
        }
      }}
      loading={loading}
      style={{ width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
      className="export-btn"
    >
      <FormattedMessage id="common.export" />
    </IconFontButton>
  )
}
