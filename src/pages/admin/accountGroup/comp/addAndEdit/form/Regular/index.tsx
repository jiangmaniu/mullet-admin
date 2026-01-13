import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import { getEnum } from '@/constants/enum'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  const { pathname } = useLocation()

  const isDemoAccount = pathname.indexOf('account-group/demo') !== -1

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  return (
    <Form
      onFinish={async (values) => {
        // console.log('onFinish values', values)
      }}
      onFinishFailed={(errorInfo) => {
        // console.log('onFinishFailed', errorInfo)
      }}
      onValuesChange={async (values) => {
        const newValues = { ...formData, ...values }
        setFormData(newValues)
        onValuesChange?.(newValues)
        console.log('values', values)
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="flex items-start flex-col w-full">
        <div className="flex items-center gap-10">
          {/* 开关（默认允许）：连接开关控制该组登录权限，交易开关控制该组交易权限 */}
          <div className="flex items-center pb-5">
            <ProFormSwitch name="enableConnect" initialValue={true} />
            <span className="text-primary text-sm pl-3 font-semibold">
              <FormattedMessage id="mt.qiyonglianjie" />
            </span>
          </div>
          <div className="flex items-center pb-5">
            <ProFormSwitch name="enableTrade" initialValue={true} />
            <span className="text-primary text-sm pl-3 font-semibold">
              <FormattedMessage id="mt.qiyongjiaoyi" />
            </span>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5">
          <ProFormText
            autoFocus
            required
            // fieldProps={{
            //   prefix: <span className="text-secondary text-[15px]] pr-1">{isDemoAccount ? 'demo' : 'real'}/</span>
            // }}
            name="groupCode"
            label={intl.formatMessage({ id: 'mt.zubie' })}
            maxLength={40}
            rules={[
              {
                required: true,
                validator(rule, value, callback) {
                  if (!value) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.qingshuruzubie' }))
                  } else if (!/^[a-zA-Z0-9_\/]+$/.test(value)) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.zhinengshuruzimushuzixiahuaxian' }))
                  }
                  return Promise.resolve()
                }
              }
            ]}
          />
          <ProFormText maxLength={40} name="groupName" label={intl.formatMessage({ id: 'mt.mingcheng' })} />

          {/* 输入框带预设选项，即账户的结算货币（目前仅支持USD） */}
          {/* <FormInputPresets
            name="currencyUnit"
            label={intl.formatMessage({ id: 'mt.huobidanwei' })}
            options={[{ label: 'USD', value: 'USD' }]}
            form={form}
            required
          /> */}
          <ProFormSelect
            name="currencyUnit"
            label={intl.formatMessage({ id: 'mt.huobidanwei' })}
            options={[{ label: 'USD', value: 'USD' }]}
            initialValue="USD"
            disabled
          />

          <ProFormDigit required name="currencyDecimal" label={intl.formatMessage({ id: 'mt.xiaoshudian' })} />
          {/* 下拉框（默认同客户任意划转） */}
          {!isDemoAccount && (
            <ProFormSelect
              name="fundTransfer"
              required
              label={intl.formatMessage({ id: 'mt.zijinhuazhuan' })}
              options={getEnum().enumToOptions('FundTransfer')}
            />
          )}
          {/* 默认值3个月 */}
          <ProFormSelect
            name="usableHistory"
            label={intl.formatMessage({ id: 'mt.keyonglishi' })}
            options={[
              { label: <FormattedMessage id="mt.wuxianzhi" />, value: '0' },
              { label: <FormattedMessage id="mt.yigeyue" />, value: '1' },
              { label: <FormattedMessage id="mt.sangeyue" />, value: '3' },
              { label: <FormattedMessage id="mt.liugeyue" />, value: '6' },
              { label: <FormattedMessage id="mt.yinian" />, value: '12' }
            ]}
            initialValue="3"
          />
          {/* 注意：输入框，该组创建的交易账户自动拥有的初始金额（仅模拟组有该输入框） */}
          {isDemoAccount && <ProFormDigit required name="defaultDeposit" label={intl.formatMessage({ id: 'mt.morenrujin' })} />}
          <ProFormText name="remark" label={intl.formatMessage({ id: 'mt.beizhu' })} />
        </div>
      </div>
    </Form>
  )
})
