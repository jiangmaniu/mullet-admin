import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import FormText from '@/components/Admin/Form/ProFormText'
import { getDataSourceType } from '@/services/api/dataSource'

import ConfParamsEditTable from './ConfParamsEditTable'
import SelectDataSourceFormItem from './SelectDataSourceFormItem'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: DataSource.DataSourceListItem
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  const { pathname } = useLocation()

  const { data } = useRequest(getDataSourceType)
  const dataSourceOptions = data?.data || []

  // 行情源类型
  const dsType = Form.useWatch('dsType', form)
  const dataSourceOption = useMemo(() => {
    return dataSourceOptions.find((item) => item.value === dsType) || ({} as DataSource.DataSourceTypeItem)
  }, [dsType, dataSourceOptions])

  const confInfo = Form.useWatch('confInfo', form)

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue({
      ...initialValues
    })
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
        <div className="text-primary mb-5 font-pf-bold text-[22px]">
          <FormattedMessage id="mt.jichuxinxipeizhi" />
        </div>
        <div className="w-[70%] grid grid-cols-2 gap-x-[76px] gap-y-8">
          <SelectDataSourceFormItem
            form={form}
            name="dsType"
            disabled={!!initialValues?.id}
            options={dataSourceOptions}
            onChange={(value) => {
              const item = dataSourceOptions.find((item) => item.value === value)

              // 当前选择的数据，已经保存过
              if (initialValues?.dsType === value) {
                form.setFieldValue('confInfo', initialValues?.confInfo)
              } else {
                form.setFieldValue('confInfo', item?.params)
              }
            }}
          />
          <FormText required maxLength={40} name="name" label={intl.formatMessage({ id: 'mt.hangqingyuanmingcheng' })} />
          {/* <FormText
            required
            maxLength={40}
            name="code"
            label={intl.formatMessage({ id: 'mt.hangqingyuanbianma' })}
            rules={[
              {
                required: true,
                validator(rule, value, callback) {
                  if (!value) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.qingshuruhangqingyuanbianma' }))
                  } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.zhiyunxuinputyingwenzimuheshuzi' }))
                  }
                  return Promise.resolve()
                }
              }
            ]}
          />
          <FormText required name="address" label={intl.formatMessage({ id: 'mt.lianjiedizhi' })} /> */}
        </div>
        {!!dataSourceOption?.params?.length && (
          <div className="w-[80%] mt-6">
            <Form.Item
              name="confInfo_item"
              rules={[
                {
                  required: true,
                  validateTrigger: 'onSubmit',
                  validator(rule, value, callback) {
                    if (confInfo?.length && confInfo.some((item: any) => !item?.value)) {
                      return Promise.reject(intl.formatMessage({ id: 'mt.qingbianjicanshuzhi' }))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <ConfParamsEditTable
                form={form}
                name="confInfo"
                title={
                  <div className="text-primary text-sm relative top-2">
                    <FormattedMessage id="mt.peizhicanshuxinxi" />
                  </div>
                }
              />
            </Form.Item>
          </div>
        )}
      </div>
    </Form>
  )
})
