import { CopyOutlined } from '@ant-design/icons'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form, Popconfirm, Spin } from 'antd'
import { QRCodeCanvas } from 'qrcode.react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import Button from '@/components/Base/Button'
import CodeInput from '@/components/Base/CodeInput'
import useAuthenticator from '@/hooks/useAuthenticator'
import { copyContent } from '@/utils'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Manager.ListItem
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const [code, setCode] = useState('')
  const id = initialValues?.id
  const isAdd = !id
  const userId = initialValues?.userId as string

  const {
    onSubmit,
    onVerifyGoogleScret,
    onCheckUserAuth,
    onRefreshScret,
    scretInfo,
    isBindGoogleAuth,
    setIsBindGoogleAuth,
    loading,
    error
  } = useAuthenticator({ userId, code })

  useImperativeHandle(ref, () => {
    return form
  })

  useEffect(() => {
    // 创建谷歌验证码
    // 是否已绑定谷歌验证码
    if (userId) {
      onCheckUserAuth()
    }
  }, [userId])

  const handleChangeCode = (value: string) => {
    setCode(value)
  }

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
      <Spin spinning={loading}>
        <div className="flex flex-row gap-x-[50px] w-full items-center">
          <img src="/img/auth2.png" className="size-[78px]" />
          <div className="w-full">
            {!isBindGoogleAuth && (
              <>
                <div
                  className="mb-2 cursor-pointer"
                  onClick={() => {
                    // 复制秘钥
                    copyContent(scretInfo?.secret as string)
                  }}
                >
                  <span className="pr-1 text-base font-pf-bold">
                    <FormattedMessage id="mt.miyao" />
                  </span>
                  <CopyOutlined style={{ fontSize: 16 }} />
                </div>
                <div className="text-sm">{scretInfo?.secret}</div>
                <div className="text-base font-pf-bold py-3">
                  <FormattedMessage id="mt.miyaoerweima" />
                </div>
              </>
            )}
            <div className="flex items-end justify-between">
              {!isBindGoogleAuth && scretInfo?.qrCode && (
                <QRCodeCanvas
                  value={scretInfo?.qrCode as string}
                  size={142}
                  fgColor="#000000"
                  bgColor="#ffffff"
                  level="L"
                  // imageSettings={{
                  //   src: '/img/saomiao.svg',
                  //   height: 35, // 设置 logo 大小
                  //   width: 35,
                  //   excavate: true // 设置是否挖空二维码的中间部分
                  // }}
                />
              )}
              <div>
                {
                  // 输入验证码进行绑定谷歌验证码
                  !isBindGoogleAuth && (
                    <div className="my-6 flex items-center justify-center">
                      <CodeInput onChange={handleChangeCode} status={error ? 'error' : ''} />
                    </div>
                  )
                }

                {isBindGoogleAuth ? (
                  <Popconfirm title={intl.formatMessage({ id: 'mt.querenjiechubangdingma' })} onConfirm={onSubmit}>
                    <Button block style={{ height: 42, fontWeight: 500, fontSize: 18 }}>
                      <FormattedMessage id="mt.jiechubangding" />
                    </Button>
                  </Popconfirm>
                ) : (
                  <Button block style={{ height: 42, fontWeight: 500, fontSize: 18 }} onClick={onSubmit}>
                    <FormattedMessage id="mt.bangdinggugeyanzhengma" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </Form>
  )
})
