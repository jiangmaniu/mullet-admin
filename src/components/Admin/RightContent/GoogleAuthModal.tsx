import { CopyOutlined } from '@ant-design/icons'
import { FormattedMessage, useIntl, useModel } from '@umijs/max'
import { Popconfirm, Spin } from 'antd'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useState } from 'react'

import Modal from '@/components/Admin/Modal'
import Button from '@/components/Base/Button'
import CodeInput from '@/components/Base/CodeInput'
import useAuthenticator from '@/hooks/useAuthenticator'
import { copyContent } from '@/utils'

type IProps = {
  trigger?: JSX.Element
  open: boolean
  onClose: () => void
}

function GoogleAuthModal({ trigger, open, onClose }: IProps) {
  const intl = useIntl()
  const { initialState } = useModel('@@initialState')
  const currentUser = initialState?.currentUser
  const userId = currentUser?.user_id as string
  const [code, setCode] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const {
    onSubmit,
    onVerifyGoogleScret,
    onReset,
    onCheckUserAuth,
    onRefreshScret,
    scretInfo,
    isBindGoogleAuth,
    setIsBindGoogleAuth,
    loading,
    error
  } = useAuthenticator({ code })

  const handleChangeCode = (value: string) => {
    setCode(value)
  }

  useEffect(() => {
    isOpen && onCheckUserAuth()
  }, [isOpen, userId])

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <Modal
      open={isOpen}
      renderTitle={() => (
        <div className="w-full">
          <div className="text-lg text-primary font-semibold">Google Authenticator</div>
          <div className="flex items-center justify-center pt-4">
            <img className="size-[78px]" src="/img/auth2.png" />
          </div>
        </div>
      )}
      afterClose={() => {
        onClose?.()
      }}
      hiddenSubmitter
      width={544}
      showHeaderBg
    >
      <Spin spinning={loading}>
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
          <div className="flex justify-center items-center mb-6">
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
          </div>
          <div className="mt-4">
            <div className="mb-2 text-sm">
              <FormattedMessage id="mt.gugeyanzhengmatishi1" />
            </div>
            <div className="text-sm">
              <FormattedMessage id="mt.gugeyanzhengmatishi2" />
            </div>
          </div>
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
      </Spin>
    </Modal>
  )
}

export default GoogleAuthModal
