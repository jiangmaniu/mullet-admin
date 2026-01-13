import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ProFormTextArea } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import { NamePath } from 'antd/es/form/interface'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import Button from '@/components/Base/Button'
import { cn } from '@/utils/cn'

import AddExplanationItem from './AddExplanationItem'

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
            explanation: [
              {
                title: '',
                content: ''
              }
            ], // 出入金说明
            notice: '', // 出入金须知
            defaultFlag: 'YES' // 是否默认
          }
          // {
          //   language: 'en-US', // 语言编码
          //   explanation: [
          //     {
          //       title: '',
          //       content: ''
          //     }
          //   ], // 出入金说明
          //   notice: '', // 出入金须知
          //   defaultFlag: 'NO' // 是否默认
          // }
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
                      <ProFormTextArea
                        name={[name, 'notice']}
                        rules={[
                          {
                            required: true,
                            message: isDepositChannel
                              ? intl.formatMessage({ id: 'mt.rujinxuzhi' })
                              : intl.formatMessage({ id: 'mt.chujinxuzhi' })
                          }
                        ]}
                        label={
                          isDepositChannel ? intl.formatMessage({ id: 'mt.rujinxuzhi' }) : intl.formatMessage({ id: 'mt.chujinxuzhi' })
                        }
                        fieldProps={{ showCount: true, maxLength: 2000, autoSize: { minRows: 2 } }}
                      />
                    </div>
                    <div className="grid grid-cols-1 w-full mb-6">
                      <Form.Item
                        label={
                          isDepositChannel
                            ? intl.formatMessage({ id: 'mt.rujinshuoming' })
                            : intl.formatMessage({ id: 'mt.chujinshuoming' })
                        }
                      >
                        <AddExplanationItem name={[name, 'explanation']} />
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
