/* eslint-disable simple-import-sort/imports */
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl, useModel, useSearchParams } from '@umijs/max'
import { encrypt } from '@/utils/sm2'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

import SwitchLanguage from '@/components/SwitchLanguage'
import { stores, useStores } from '@/context/mobxProvider'
import { getEnv } from '@/env'
import useAuthenticator from '@/hooks/useAuthenticator'
import { getCaptcha, login } from '@/services/api/user'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'
import { setLocalUserInfo } from '@/utils/storage'
import { observer } from 'mobx-react'
import GoogleAuth from './GoogleAuth'

function Login() {
  const ENV = getEnv()
  const intl = useIntl()
  const { initialState, setInitialState } = useModel('@@initialState')
  const [captchaInfo, setCaptchaInfo] = useState({} as User.Captcha)
  const { global } = useStores()
  const { isBindGoogleAuth, onQueryIsBindGoogleAuth, setIsBindGoogleAuth } = useAuthenticator()
  const [searchParams] = useSearchParams()
  const bindKey = searchParams.get('bindKey')

  const handleCaptcha = async () => {
    const res = await getCaptcha()
    setCaptchaInfo(res)
  }

  useEffect(() => {
    handleCaptcha()
  }, [])

  useEffect(() => {
    if (bindKey) {
      setIsBindGoogleAuth(true)
    }
  }, [bindKey])

  const className = useEmotionCss(({ token }) => {
    return {
      '.ant-form-item': {
        marginBottom: 32
      }
    }
  })

  const fetchUserInfo = async () => {
    const userInfo = await stores.global.fetchUserInfo()
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          ...userInfo
        }))
      })
    }
    return userInfo
  }

  const handleSubmit = async (values: User.LoginParams) => {
    try {
      // 登录
      const result = await login(
        {
          username: values.username?.trim(),
          password: encrypt(values.password as string),
          tenanId: '888888',
          type: 'account',
          grant_type: 'captcha',
          scope: 'all'
        },
        {
          headers: {
            'Captcha-Code': values.captchaCode,
            'Captcha-Key': captchaInfo.key
          }
        }
      )

      // @ts-ignore
      if (result?.success) {
        // 缓存用户信息
        setLocalUserInfo(result as User.UserInfo)

        // 重新获取用户信息
        const userInfo = await fetchUserInfo()

        if (userInfo) {
          const isBindGoogleAuth = await onQueryIsBindGoogleAuth(userInfo?.currentUser?.user_id)
          // 是否绑定谷歌验证码
          setIsBindGoogleAuth(isBindGoogleAuth)

          if (!isBindGoogleAuth) {
            message.info(intl.formatMessage({ id: 'mt.dengluchenggong' }))
            // 设置默认首页为返回的菜单第一项，不同角色看到的菜单不一样
            const firstItem = userInfo?.menuData?.[0] as User.MenuItem
            // 如果有二级菜单，展示二级菜单的第一项路径，否则展示一级菜单路径
            const defaultHomePath = firstItem?.children?.length ? firstItem?.children[0]?.path : firstItem?.path
            stores.global.setHomePagePath(defaultHomePath)
            push(defaultHomePath || '')
          }
        }

        return
      } else {
        // 刷新验证码
        handleCaptcha()
      }
    } catch (error: any) {
      message.info(error.message)
    }
  }

  return (
    <div className="flex items-center h-full w-full">
      <div
        className="flex items-end flex-1 h-full bg-no-repeat bg-[size:100%_100%]"
        style={{
          backgroundImage: 'url(/platform/img/login-bg.png)'
        }}
      >
        <div className="pl-10 pb-10">
          <div className="max-w-[68%] text-white font-bold text-[28px] leading-[40px]">
            Implementing liquidity automation with {ENV?.name} Enterprise
          </div>
          <div className="text-white text-base pt-2">{ENV?.websiteUrl}</div>
        </div>
      </div>
      <div className="w-[36%] relative h-full flex items-center justify-center flex-col">
        {isBindGoogleAuth && (
          <div className="absolute top-[22px] -left-2 flex items-center xl:w-1300 w-1120 mx-4">
            <div
              className="rounded-full cursor-pointer flex items-center"
              onClick={() => {
                // 返回上一步
                setIsBindGoogleAuth(false)
                push('/user/login')
              }}
            >
              <img src="/img/arrow-left.png" width={40} height={40} />
              <span className="text-[20px] font-pf-bold">
                <FormattedMessage id="mt.fanhuidenglu" />
              </span>
            </div>
          </div>
        )}
        <div className="absolute top-0 right-3">
          <SwitchLanguage />
        </div>
        <div className="flex items-center justify-center">
          <LoginForm
            title={intl.formatMessage({ id: 'mt.loginTitle' })}
            subTitle={intl.formatMessage({ id: 'mt.loginSubTitle' })}
            rootClassName={className}
            contentStyle={{
              width: 380
            }}
            submitter={isBindGoogleAuth ? false : { searchConfig: { submitText: intl.formatMessage({ id: 'mt.denglu' }) } }}
            onFinish={async (values) => {
              await handleSubmit(values as User.LoginParams)
            }}
          >
            {/* 未绑定谷歌授权的不需要验证谷歌验证码 */}
            {!isBindGoogleAuth && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large'
                  }}
                  label={intl.formatMessage({ id: 'common.yonghuming' })}
                  placeholder={intl.formatMessage({ id: 'mt.shuruyonghuming' })}
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'mt.shuruyonghuming' })
                    }
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large'
                  }}
                  required={false}
                  label={intl.formatMessage({ id: 'common.mima' })}
                  placeholder={intl.formatMessage({ id: 'mt.shurumima' })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'mt.shuruyonghuming' })
                    }
                  ]}
                />
                <div className="flex items-center gap-2">
                  <ProFormText
                    name="captchaCode"
                    fieldProps={{
                      size: 'large'
                    }}
                    label={intl.formatMessage({ id: 'mt.tuxingyanzhengma' })}
                    placeholder={intl.formatMessage({ id: 'mt.shuruyanzhengma' })}
                    required={false}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({ id: 'mt.shuruyanzhengma' })
                      }
                    ]}
                    formItemProps={{ style: { width: '100%' } }}
                  />
                  <div className="border-gray-220 border rounded-lg h-10 cursor-pointer w-auto overflow-hidden" onClick={handleCaptcha}>
                    <img src={captchaInfo.image} className="w-full h-full" />
                  </div>
                </div>
              </>
            )}
            {/* 登录成功后验证谷歌验证码 进行双重验证 */}
            {isBindGoogleAuth && <GoogleAuth />}
          </LoginForm>
        </div>
        <footer className="flex items-center text-sm text-[#5C5C5C] absolute bottom-7 left-[50%] translate-x-[-50%]">
          {intl.formatMessage({ id: 'mt.baoquanxinxi' }, { name: ENV?.name })}
        </footer>
      </div>
    </div>
  )
}

export default observer(Login)
