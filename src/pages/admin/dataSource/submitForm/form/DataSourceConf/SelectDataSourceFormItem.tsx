import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl } from '@umijs/max'
import { FormInstance } from 'antd'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getEnv } from '@/env'

type IProps = {
  form: FormInstance
  name: string
  options: any[]
  onChange: (value: any) => void
  disabled?: boolean
}

// 选择数据源
export default function SelectDataSourceFormItem({ form, name, options, onChange, disabled }: IProps) {
  const intl = useIntl()
  const env = getEnv()
  // const options = getEnum().enumToOptions('DataSourceType')

  const className = useEmotionCss(({ token }) => {
    return {
      '.ant-select-selector': {
        paddingLeft: '6px !important'
      }
    }
  })

  console.log('options', options)

  return (
    <div className={className}>
      <ProFormSelect
        name={name}
        label={intl.formatMessage({ id: 'mt.hangqingyuanleixing' })}
        options={options}
        required
        disabled={disabled}
        fieldProps={{
          // 回填到选择框的 Option 的属性值，默认是 Option 的子元素
          optionLabelProp: 'label',
          showSearch: false,
          allowClear: false,
          listHeight: 300,
          optionRender: (option) => {
            return (
              <div className="flex items-center h-[38px]">
                {option.data?.icon && (
                  <div className="pr-1">
                    <img src={`${env.imgDomain}${option.data?.icon}`} width={85} />
                  </div>
                )}
                <div className="text-sm text-primary w-full truncate flex-1">{option?.data?.label}</div>
              </div>
            )
          },
          onChange: (value) => {
            onChange(value)
          },
          labelRender: (props) => {
            const item: any = options?.find((item: any) => item.value === props.value) || {}
            return (
              <div className="flex items-center">
                {item?.icon && (
                  <div className="pr-1">
                    <img src={`${env.imgDomain}${item.icon}`} width={85} />
                  </div>
                )}
                <div className="text-sm text-primary w-full truncate flex-1">{item?.label}</div>
              </div>
            )
          }
        }}
      />
    </div>
  )
}
