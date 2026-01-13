import { FormattedMessage } from '@umijs/max'

export type IPresetsButtonType = 'FOREIGN' | 'WEEK'
type IProps = {
  /**外汇、整个星期 */
  onChange: (type: IPresetsButtonType) => void
}

/**选择外汇、整个星期 预设按钮 */
export default function PresetsButton({ onChange }: IProps) {
  const options = [
    { label: <FormattedMessage id="mt.waihui" />, value: 'FOREIGN' },
    { label: <FormattedMessage id="mt.zhenggexingqi" />, value: 'WEEK' }
  ]
  return (
    <div className="flex items-center gap-x-5">
      <span className="text-sm text-primary font-semibold">
        <FormattedMessage id="mt.yushecanshu" />：
      </span>
      <div className="flex gap-x-3">
        {options.map((item, idx) => (
          <span
            className="hover:border-blue hover:text-brand cursor-pointer rounded-md text-sm text-primary font-semibold border border-gray-150 px-5 py-1"
            key={idx}
            onClick={() => onChange(item.value as IPresetsButtonType)}
          >
            {item?.label}
          </span>
        ))}
      </div>
    </div>
  )
}
