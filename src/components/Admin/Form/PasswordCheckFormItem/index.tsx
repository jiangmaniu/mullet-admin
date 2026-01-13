import { ProFormText } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form, FormInstance, Popconfirm } from 'antd'
import { md5 } from 'js-md5'
import { useRef } from 'react'

import { IconFontButton } from '@/components/Base/Button'
import PwdTips from '@/components/PwdTips'
import { checkUserPassword, modifyUserPassword } from '@/services/api/user'
import { regPassword } from '@/utils'
import { message } from '@/utils/message'

type IProps = {
  required?: boolean
  showAction?: boolean
  form: FormInstance
  userId: any
}
export default function PasswordCheckFormItem({ required = false, showAction = false, form, userId }: IProps) {
  const intl = useIntl()
  const pwdTipsRef = useRef<any>(null)
  const password = Form.useWatch('password', form)

  const checkPwdFormStatus = () => {
    const error = form.getFieldError(['password'])
    if (error?.length) {
      message.info(intl.formatMessage({ id: 'mt.mimajianchabuzhengque' }))
      return false
    }
    return true
  }

  // 检查密码
  const handleCheckPwd = async () => {
    if (!checkPwdFormStatus()) return
    if (!password) return message.info(intl.formatMessage({ id: 'mt.qingshurumima' }))
    const res = await checkUserPassword({
      password: md5(password),
      userId
    })
    const isSuccess = res.data
    if (res.success) {
      if (isSuccess) {
        message.info(intl.formatMessage({ id: 'mt.mimajianchazhengque' }))
      } else {
        message.info(intl.formatMessage({ id: 'mt.mimajianchabuzhengque' }))
      }
    }
  }

  // 变更密码
  const handleModifyPwd = async () => {
    if (!checkPwdFormStatus()) return
    if (!password) return message.info(intl.formatMessage({ id: 'mt.qingshurumima' }))
    const res = await modifyUserPassword({
      password: md5(password),
      userId
    })
    if (res.success && res.data) {
      message.info(intl.formatMessage({ id: 'mt.xiugaimimachenggong' }))
    }
  }

  return (
    <>
      <ProFormText.Password
        required={required}
        name="password"
        width={384}
        fieldProps={{
          size: 'large',
          onFocus: () => {
            pwdTipsRef?.current?.show()
          },
          onBlur: () => {
            pwdTipsRef?.current?.hide()
          }
        }}
        label={intl.formatMessage({ id: 'mt.zhanghaomima' })}
        placeholder={intl.formatMessage({ id: 'mt.shuruzhanghaomima' })}
        // 密码格式错误，需要包含大写小写和特殊字体
        rules={[
          {
            required,
            message: intl.formatMessage({ id: 'mt.pleaseInputPwdPlaceholder' }),
            pattern: new RegExp(regPassword)
          }
        ]}
        addonAfter={
          <>
            {showAction && (
              <div className="relative pl-4">
                <div className="flex">
                  {/* 请求接口和输入的密码比对是否正确 */}
                  {/* 检查按钮：输入字符后，点击检查可确认字符是否为密码 */}
                  <IconFontButton
                    icon="jiancha"
                    iconProps={{ width: 18, height: 18 }}
                    style={{ height: 40, paddingInline: 14, marginRight: 12 }}
                    onClick={handleCheckPwd}
                    disabled={!password}
                  >
                    <FormattedMessage id="mt.jiancha" />
                  </IconFontButton>
                  {/* 变更按钮：输入字符后，点击变更即改变该字符为新密码 */}
                  <Popconfirm onConfirm={handleModifyPwd} title={<FormattedMessage id="mt.querenxiugaimima" />} disabled={!password}>
                    <IconFontButton
                      icon="biangeng"
                      iconProps={{ width: 18, height: 18 }}
                      style={{ height: 40, paddingInline: 14 }}
                      disabled={!password}
                    >
                      <FormattedMessage id="mt.biangeng" />
                    </IconFontButton>
                  </Popconfirm>
                </div>
              </div>
            )}
          </>
        }
      />
      <div className="mt-5">
        <PwdTips pwd={password} ref={pwdTipsRef} />
      </div>
    </>
  )
}
