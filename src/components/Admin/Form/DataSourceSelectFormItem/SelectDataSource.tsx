import { useIntl } from '@umijs/max'
import { FormInstance } from 'antd'
import { Form } from 'antd-mobile'
import { useState } from 'react'

import ProFormSelect from '../ProFormSelect'

type IProps = {
  form: FormInstance
  name: string
  data: any
  onSelect: (value: any) => void
}

// 选择数据源
export default function SelectDataSource({ form, name, data, onSelect }: IProps) {
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const selectCode = Form.useWatch(name, form)

  return (
    <div>
      <ProFormSelect
        name={name}
        initialValue={data?.[0]?.code}
        placeholder={intl.formatMessage({ id: 'mt.xuanzeshujuyuan' })}
        options={data?.map((item: any) => ({ ...item, label: item.name, value: item.code }))}
        fieldProps={{
          open,
          // 回填到选择框的 Option 的属性值，默认是 Option 的子元素
          optionLabelProp: 'label',
          onDropdownVisibleChange: (visible) => setOpen(visible),
          showSearch: true,
          allowClear: false,
          listHeight: 300,
          onSelect: (value) => {
            onSelect?.(value)
          },
          optionRender: (option) => {
            return (
              <div className="flex items-center h-[38px]">
                {option.data?.imgUrl && (
                  <div className="pr-1">
                    <img src={option.data?.imgUrl} width={85} />
                  </div>
                )}
                <div className="text-sm text-primary w-full truncate flex-1">{option?.data?.name}</div>
              </div>
            )
          }
          // dropdownRender: () => {
          //   return (
          //     <div className="overflow-y-auto max-h-[300px]">
          //       <div className="flex flex-col gap-y-2 p-3">
          //         {data.map((item: any, idx: number) => (
          //           <div
          //             className={classNames('flex items-center border border-gray-150 p-3 cursor-pointer hover:bg-gray-50 rounded-[7px]', {
          //               'bg-gray-50': selectCode === item.code
          //             })}
          //             key={idx}
          //             onClick={() => {
          //               setOpen(false)
          //               onSelect?.(item)
          //               form.setFieldValue(name, item.code)
          //             }}
          //           >
          //             {item.imgUrl && (
          //               <div>
          //                 <img src={item.imgUrl} width={85} height={22} />
          //               </div>
          //             )}
          //             <div className="text-sm text-primary pl-4 w-full truncate flex-1">{item.name}</div>
          //           </div>
          //         ))}
          //       </div>
          //     </div>
          //   )
          // }
        }}
      />
    </div>
  )
}
