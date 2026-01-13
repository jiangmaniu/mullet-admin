import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'
import { useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/Modal'
import WangEditorV3 from '@/components/Admin/WangEditorV3'
import Button from '@/components/Base/Button'
import { cn } from '@/utils/cn'
type IProps = {
  name: NamePath
  form?: FormInstance
}

export default function AddLangeFormItem({ name, form }: IProps) {
  const intl = useIntl()
  const { pathname } = useLocation()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [content, setContent] = useState('')

  const list = Form.useWatch('templateLanguageAddDTOList', form)

  const textAreaWrapClassName = useEmotionCss(() => {
    return {
      '.ant-form-item-required': {
        width: '100% !important'
      }
    }
  })

  return (
    <div className="mt-7 w-full">
      <Form.List
        name={name}
        initialValue={[
          {
            language: 'zh-TW', // 语言编码
            title: '', // 标题
            content: '' // 内容
          }
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              const isDefault = name === 0
              const content = form?.getFieldValue('templateLanguageAddDTOList')?.[name]?.content
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
                    </div>
                    {/* <div className={cn(textAreaWrapClassName)}>
                      <ProFormTextArea
                        name={[name, 'content']}
                        rules={[
                          {
                            required: true,
                            message: intl.formatMessage({ id: 'mt.shuruneirong' })
                          }
                        ]}
                        label={<div className='flex items-center justify-between w-full'>
                          <span><FormattedMessage id="mt.neirong" /></span>
                          {content && containsHTMLStrict(content) && <span className='text-xs text-secondary cursor-pointer' onClick={() => {
                            setPreviewVisible(true)
                            setContent(removeContainerWidth(content))
                          }}>
                            <InfoCircleOutlined style={{marginRight: 4, fontSize: 12}} />
                            <FormattedMessage id="mt.yulan" />
                          </span>}
                        </div>}
                        fieldProps={{ autoSize: { minRows: 4, maxRows: 10 } }}
                      />
                    </div> */}
                    <Form.Item
                      name={[name, 'content']}
                      className="!mt-6"
                      required
                      label={intl.formatMessage({ id: 'mt.neirong' })}
                      rules={[
                        {
                          required: true,
                          validator: (rule, value, callback) => {
                            if (!value) {
                              return Promise.reject(intl.formatMessage({ id: 'mt.shuruneirong' }))
                            }
                            return Promise.resolve()
                          }
                        }
                      ]}
                    >
                      <WangEditorV3
                        name={name}
                        form={form}
                        value={content}
                        domId={`editorV3-${name}`}
                        onChange={(value) => {
                          const templateLanguageAddDTOList = form?.getFieldValue('templateLanguageAddDTOList')
                          if (templateLanguageAddDTOList) {
                            templateLanguageAddDTOList[name].content = value
                            form?.setFieldValue('templateLanguageAddDTOList', templateLanguageAddDTOList)
                          }
                        }}
                      />
                    </Form.Item>
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
      <Modal
        title={intl.formatMessage({ id: 'mt.yulan' })}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        hiddenSubmitter
        width={760}
      >
        <div className="overflow-x-auto max-w-full" dangerouslySetInnerHTML={{ __html: content }} />
      </Modal>
    </div>
  )
}
