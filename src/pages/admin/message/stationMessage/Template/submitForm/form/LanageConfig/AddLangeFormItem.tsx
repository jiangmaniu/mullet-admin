import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ProFormTextArea } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import { NamePath } from 'antd/es/form/interface'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Button from '@/components/Base/Button'
import { cn } from '@/utils/cn'

type IProps = {
  name: NamePath
}

export default function AddLangeFormItem({ name }: IProps) {
  const intl = useIntl()
  const { pathname } = useLocation()
  const isDepositChannel = pathname.indexOf('payment/deposit-channel') !== -1

  return (
    <div className="mt-7 w-full">
      <Form.List
        name={name}
        initialValue={[
          {
            language: 'zh-TW', // 语言编码
            title: '',
            content: ''
          }
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              const isDefault = name === 0
              return (
                <div key={key} className="w-full relative">
                  <div className="w-full flex flex-col relative border border-gray-180 rounded-md p-4 mb-7">
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
                        required
                        maxLength={100}
                        name={[name, 'title']}
                        // fieldProps={{ showCount: true }}
                        label={intl.formatMessage({ id: 'mt.biaoti' })}
                      />
                      <ProFormTextArea
                        name={[name, 'content']}
                        rules={[
                          {
                            required: true,
                            message: intl.formatMessage({ id: 'mt.shuruneirong' })
                          }
                        ]}
                        label={intl.formatMessage({ id: 'mt.neirong' })}
                        fieldProps={{ autoSize: { minRows: 4, maxRows: 10 } }}
                      />
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
    </div>
  )
}
