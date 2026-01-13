import { useIntl } from '@umijs/max'
import { Select } from 'antd'
import { useState } from 'react'

import Iconfont from '@/components/Base/Iconfont'
import { getEnum } from '@/constants/enum'
import { cn } from '@/utils/cn'

type IProps = {
  // 可编辑表格自动注入的属性
  value?: any
  // 可编辑表格自动注入的属性，用于触发onChange事件修改value值回填到表格的row中
  onChange?: (value: any) => void
}

function EditTableRowSelectType({ value, onChange }: IProps) {
  const intl = useIntl()
  const [open, setOpen] = useState(false)

  const options = getEnum().enumToOptions('AgentRebateConfigType')

  return (
    <Select
      style={{ width: '100%', height: 30 }}
      placeholder={intl.formatMessage({ id: 'mt.agent.xuanzeleixing' })}
      onDropdownVisibleChange={(open) => setOpen(open)}
      dropdownRender={(menu) => (
        <div className="p-1">
          {options.map((item, idx) => {
            const isActive = item.value === value
            return (
              <div
                key={idx}
                onClick={() => {
                  onChange?.(item.value)
                  setOpen(false)
                }}
                className={cn(
                  'min-h-8 mb-2 py-[5px] px-3 text-primary text-sm cursor-pointer rounded-[5px] hover:bg-gray-70',
                  isActive && 'bg-gray-70'
                )}
                title={item.label}
              >
                <div className={cn('font-extrabold pb-1 flex items-center justify-between')}>
                  {item.label} {isActive && <Iconfont name="xuanzhong" className="!size-[18px]" />}
                </div>
                <div className="text-secondary text-xs">{item.desc}</div>
              </div>
            )
          })}
        </div>
      )}
      dropdownStyle={{ width: 330 }}
      labelRender={(props) => {
        return options.find((item) => item.value === value)?.label
      }}
      value={value}
      open={open}
    />
  )
}

export default EditTableRowSelectType
