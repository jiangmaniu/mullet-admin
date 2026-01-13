import { ProFormSegmented as ProFormSegmentedComp } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { GetProps } from 'antd'

type IProps = GetProps<typeof ProFormSegmentedComp>

export default function ProFormSegmented({ ...res }: IProps) {
  const className = useEmotionCss(({ token }) => {
    return {
      '.ant-segmented-item-selected .ant-segmented-item-label': {
        fontWeight: '600 !important'
      }
    }
  })
  return (
    <div className={className}>
      <ProFormSegmentedComp {...res} />
    </div>
  )
}
