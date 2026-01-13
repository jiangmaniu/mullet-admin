import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { Col, Form, Row } from 'antd'
import { FormInstance } from 'antd/lib'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import FormDoubleInput from '@/components/Admin/Form/FormDoubleInput'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
  tabList?: any[]
}

// @TODO 限制条件的表单值不生效

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, tabList }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const [inputValue, setInputValue] = useState<any>({})
  const { pathname } = useLocation()
  const isDepositChannel = pathname.indexOf('payment/deposit-channel') !== -1

  // 常规Tab下的表单值
  // 品种名称从数据源选择后确定的品种名称
  // 获取常规Tab下的form表单实例
  const regularForm = tabList?.find((item) => item?.key === 'Regular')?.ref?.current as FormInstance
  const baseCurrency = Form.useWatch('baseCurrency', regularForm) || '' // 这里要从常规Tab下的数据源那里选择后获取，来填充到 基准货币、盈利货币 下拉

  useImperativeHandle(ref, () => {
    return form
  })

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
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <Form.Item
        noStyle
        name="test"
        rules={[
          {
            required: true,
            validator(rule, value, callback) {
              if (!form.getFieldValue('singleAmountMax')) {
                return Promise.reject(intl.formatMessage({ id: 'mt.qingwanshanxianzhitiaojian' }))
              }
              return Promise.resolve()
            }
          }
        ]}
      >
        <div className="flex items-start flex-col w-[50%]">
          <div className="text-base font-semibold pb-7">
            {isDepositChannel ? <FormattedMessage id="mt.kehudanbirujinxianzhi" /> : <FormattedMessage id="mt.kehudanbichujinxianzhi" />}
          </div>
          <div className="w-full grid border border-gray-220 rounded-[15px]">
            <Row className="border-b border-gray-150">
              <Col span={6} className="text-primary py-4 text-sm font-semibold border-r text-center border-gray-150">
                <FormattedMessage id="mt.jizhuihuobi" />
              </Col>
              <Col span={18} className="text-primary py-4 text-sm font-semibold text-center border-gray-150">
                <FormattedMessage id="mt.zuixiaozuidazhi" />
              </Col>
            </Row>
            <Row className="border-b last:border-none border-gray-150">
              <Col className="text-sm text-center py-[10px] text-primary border-r border-gray-150" span={6}>
                {baseCurrency || 'USD'}
              </Col>
              <Col className="text-sm text-center py-[10px] px-10 text-secondary border-gray-150" span={18}>
                <FormDoubleInput
                  name={['singleAmountMin', 'singleAmountMax']}
                  placeholder={[intl.formatMessage({ id: 'common.pleaseInput' }), intl.formatMessage({ id: 'common.pleaseInput' })]}
                  leftInputProps={{
                    precision: 0
                  }}
                  rightInputProps={{
                    precision: 0,
                    min: 1
                  }}
                  type="number"
                />
              </Col>
            </Row>
          </div>
        </div>
      </Form.Item>
    </Form>
  )
})
