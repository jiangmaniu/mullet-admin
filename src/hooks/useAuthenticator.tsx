import { useIntl, useModel } from '@umijs/max'
import { useState } from 'react'

import { createGoogleScret, isBindGoogleAuthCode, resetMchGoogle, verifyGoogleScret } from '@/services/api/crm/manager'
import { message } from '@/utils/message'

type IProps = {
  userId?: string
  code?: string
}

/**
 * 谷歌验证码授权
 * @param param0
 * @returns
 */
export default function useAuthenticator(props?: IProps) {
  const intl = useIntl()
  const { initialState } = useModel('@@initialState')
  const currentUser = initialState?.currentUser
  const userId = (props?.userId || currentUser?.user_id) as string
  const code = props?.code as string
  const [isBindGoogleAuth, setIsBindGoogleAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [scretInfo, setScretInfo] = useState({} as Manager.createGoogleScretRes)

  // 刷新谷歌授权码信息
  const onRefreshScret = async () => {
    setLoading(true)
    const data = await createGoogleScret({
      userId
    })
    setScretInfo(data?.data as Manager.createGoogleScretRes)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  // 查询是否绑定谷歌邮箱
  const onQueryIsBindGoogleAuth = async (id?: string) => {
    const res = await isBindGoogleAuthCode({ userId: id || userId })
    const isBind = !!res.success && !!res.data
    setIsBindGoogleAuth(isBind)
    return isBind
  }

  // 校验用户是否绑定谷歌授权码，然后刷新秘钥信息
  const onCheckUserAuth = async () => {
    const isBind = await onQueryIsBindGoogleAuth()
    // 未绑定 创建/获取谷歌验证秘钥
    if (!isBind) {
      onRefreshScret()
    }
  }

  // 绑定谷歌授权
  const onVerifyGoogleScret = async (code: string) => {
    if (!code) {
      return message.info(intl.formatMessage({ id: 'mt.yanzhengmabunengweikong' }))
    }
    const res = await verifyGoogleScret({
      googleCode: code,
      secret: scretInfo?.secret as string,
      userId
    })
    if (res.success) {
      setError(false)
      message.info(intl.formatMessage({ id: 'common.opSuccess' }))
      // 更新状态
      setIsBindGoogleAuth(true)
    } else {
      setError(true)
    }
  }

  // 解除绑定谷歌授权
  const onReset = async () => {
    const res = await resetMchGoogle({ userId })
    if (res.success) {
      message.info(intl.formatMessage({ id: 'common.opSuccess' }))
      setIsBindGoogleAuth(false)
      // 刷新谷歌二维码
      onRefreshScret()
    }
  }

  const onSubmit = async () => {
    if (isBindGoogleAuth) {
      // 解绑
      onReset()
    } else {
      onVerifyGoogleScret(code)
    }
  }

  return {
    onCheckUserAuth,
    onRefreshScret,
    onQueryIsBindGoogleAuth,
    onVerifyGoogleScret,
    onReset,
    onSubmit,

    scretInfo,
    isBindGoogleAuth,
    setIsBindGoogleAuth,
    loading,
    error
  }
}
