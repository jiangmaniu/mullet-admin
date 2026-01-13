/* eslint-disable simple-import-sort/imports */
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Tree as AntdTree, GetProps } from 'antd'

type IProps = GetProps<typeof AntdTree>

export default function Tree({ ...res }: IProps) {
  const rootClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-tree-checkbox-checked .ant-tree-checkbox-inner': {
        borderColor: 'var(--color-brand) !important',
        background: 'var(--color-brand) !important'
      },
      '.ant-tree-checkbox-inner:after': {
        background: 'var(--color-brand) !important'
      }
    }
  })

  return (
    <div className="border border-gray-220 rounded-xl p-3 min-h-[230px] max-h-[400px] overflow-y-auto">
      <AntdTree rootClassName={rootClassName} {...res} />
    </div>
  )
}
