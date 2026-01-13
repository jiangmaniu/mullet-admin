import { useIntl } from '@umijs/max'
import { Form, FormInstance } from 'antd'

import { getEnum } from '@/constants/enum'
import { useEnv } from '@/context/envProvider'
import useStyle from '@/hooks/useStyle'
import { isTruthy } from '@/utils'

import ProFormDigit from '../ProFormDigit'
import ProFormSelect from '../ProFormSelect'
import ProFormText from '../ProFormText'

type IProps = {
  form: FormInstance
}

/**
 * 点差模式选择组件，固定、浮动点差改成一个输入框
 * @param param0
 * @returns
 */
export default function SpreadFormItem({ form }: IProps) {
  const intl = useIntl()
  const { screenSize } = useEnv()
  const { spreadAddonClassName } = useStyle()
  // useWatch 允许你监听字段变化，同时仅当该字段变化时重新渲染，否则通过form.getFieldValue获取的值是上一次的值
  const spreadConf = Form.useWatch('spreadConf', form)
  const type = spreadConf?.type
  const buy = spreadConf?.[type]?.buy
  const sell = spreadConf?.[type]?.sell

  return (
    <>
      <ProFormDigit
        label={intl.formatMessage({ id: 'mt.dianchamoshi' })}
        placeholder={type === 'fixed' ? intl.formatMessage({ id: 'mt.gudingdiancha' }) : intl.formatMessage({ id: 'mt.fudongdiancha' })}
        // name数组会转成{spreadConf:{fixed:{buy:''}}} 形式存储
        name={['spreadConf', type, 'buy']}
        formItemProps={{ className: spreadAddonClassName }}
        addonBefore={
          <ProFormSelect
            name={['spreadConf', 'type']}
            options={getEnum().enumToOptions('SpreadMode')}
            initialValue={'fixed'}
            filedConfig={{ style: { marginBottom: 0 }, noStyle: true }}
            allowClear={false}
            fieldProps={{
              bordered: false,
              style: { textAlign: 'left', paddingRight: 10 },
              dropdownStyle: { width: 'auto' },
              onChange: (value: any) => {
                // 重置买卖价格
                form.resetFields([
                  ['spreadConf', type, 'buy'],
                  ['spreadConf', type, 'sell']
                ])
              }
            }}
          />
        }
        style={{ width: '100%' }}
        fieldProps={{
          // allowClear: false,
          bordered: false,
          controls: false,
          style: { width: 'auto', paddingLeft: 60 },
          maxLength: 40,
          precision: 0,
          onChange: (value: any) => {
            // 固定、浮动点差 买卖都是同一个输入框
            form.setFieldsValue({
              spreadConf: {
                [type]: {
                  sell: value // 改变卖价
                }
              }
            })
          }
        }}
        rules={[
          {
            required: true,
            // @ts-ignore
            validator(rule, value) {
              if (!isTruthy(buy)) {
                return Promise.reject(intl.formatMessage({ id: 'mt.qingshurudiancha' }))
              } else if (!isTruthy(sell)) {
                return Promise.reject(intl.formatMessage({ id: 'mt.qingshurudiancha' }))
              }
              return Promise.resolve()
            }
          }
        ]}
      />
      {/* 隐藏表单提交 */}
      <ProFormText name={['spreadConf', type, 'sell']} hidden />
    </>
  )
}
