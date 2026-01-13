import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Button from '@/components/Base/Button'
import { cn } from '@/utils/cn'

import AddAccountItem from './AddAccountItem'

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
      <Form.List
        name={'synopsis'}
        initialValue={[
          {
            language: 'zh-TW', // 语言编码
            name: '', // 账户名称
            abbr: '', // 账户属性缩写标签
            tag: '', // 标签
            remark: '', // 简介
            list: [
              {
                title: '',
                content: ''
              }
            ]
          }
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              const isDefault = name === 0
              return (
                <div key={key}>
                  <div className="w-full relative flex items-center justify-between border border-gray-180 rounded-md p-4 mb-7">
                    <div className="flex items-start flex-col w-full">
                      <div className="grid grid-cols-2 gap-7 w-full mb-6">
                        <ProFormSelect
                          name={[name, 'language']}
                          required
                          label={intl.formatMessage({ id: 'mt.yuyanxuanze' })}
                          options={[
                            ...(isDefault
                              ? [
                                  {
                                    label: intl.formatMessage({ id: 'mt.zhongwen' }),
                                    value: 'zh-TW'
                                  }
                                ]
                              : []),
                            ...(!isDefault
                              ? [
                                  {
                                    label: intl.formatMessage({ id: 'mt.yingwen' }),
                                    value: 'en-US'
                                  },
                                  {
                                    label: intl.formatMessage({ id: 'mt.yuenanyue' }),
                                    value: 'vi-VN'
                                  }
                                ]
                              : [])
                          ]}
                          initialValue={isDefault ? 'zh-TW' : 'en-US'}
                          disabled={isDefault}
                        />
                        <ProFormText
                          maxLength={20}
                          fieldProps={{ showCount: true }}
                          required
                          name={[name, 'name']}
                          label={intl.formatMessage({ id: 'mt.zhanghumingcheng' })}
                        />
                        <ProFormText
                          required
                          maxLength={15}
                          fieldProps={{ showCount: true }}
                          name={[name, 'abbr']}
                          label={intl.formatMessage({ id: 'mt.zhanghushuxingsuoxiebiaoqian' })}
                        />
                        <ProFormText
                          maxLength={15}
                          fieldProps={{ showCount: true }}
                          name={[name, 'tag']}
                          label={intl.formatMessage({ id: 'mt.biaoqian' })}
                        />
                        <ProFormText
                          name={[name, 'remark']}
                          rules={[{ required: true, message: intl.formatMessage({ id: 'mt.shurujianjie' }) }]}
                          label={intl.formatMessage({ id: 'mt.shurujianjie' })}
                        />
                      </div>
                      <div className="grid grid-cols-1 w-full mb-6">
                        <Form.Item label={intl.formatMessage({ id: 'mt.zhanghujieshao' })}>
                          <AddAccountItem name={[name, 'list']} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="absolute -right-3 -top-3">
                      {!isDefault && (
                        <MinusCircleOutlined
                          style={{ fontSize: 20 }}
                          className={cn('cursor-pointer hover:text-red', isDefault && 'pointer-events-none opacity-40 text-weak')}
                          onClick={() => {
                            remove(name)
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            {fields.length < 3 && (
              <Button block type="dashed" size="large" icon={<PlusOutlined />} onClick={() => add()}>
                <FormattedMessage id="mt.xinzengyihang" />
              </Button>
            )}
          </>
        )}
      </Form.List>
    </Form>
  )
})
