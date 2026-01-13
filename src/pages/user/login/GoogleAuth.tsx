import { FormattedMessage, useModel } from '@umijs/max'
import { Spin } from 'antd'
import { useState } from 'react'

import CodeInput from '@/components/Base/CodeInput'
import { stores } from '@/context/mobxProvider'
import { checkGoogleCode } from '@/services/api/crm/manager'
import { push } from '@/utils/navigator'

function GoogleAuth() {
  const { fetchUserInfo } = useModel('user')
  const { initialState } = useModel('@@initialState')
  const { currentUser, menuData } = initialState || {}
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleLogin = () => {
    // 设置默认首页为返回的菜单第一项，不同角色看到的菜单不一样
    const firstItem = menuData?.[0] as User.MenuItem
    // 如果有二级菜单，展示二级菜单的第一项路径，否则展示一级菜单路径
    const defaultHomePath = firstItem?.children?.length ? firstItem?.children[0]?.path : firstItem?.path
    stores.global.setHomePagePath(defaultHomePath)
    push(defaultHomePath || '')
  }

  const handleChange = async (value: string) => {
    setLoading(true)
    // 登录成功验证谷歌验证码
    const res = await checkGoogleCode({ googleCode: value })
    setLoading(false)
    if (res.success) {
      await fetchUserInfo()
      setError(false)
      // 跳转到首页
      handleLogin()
    } else {
      setError(true)
    }
  }

  return (
    <div>
      <div className="bg-[#F8FBFD] rounded-xl px-[60px] pt-[52px] pb-[42px] w-[418px] mb-[53px]">
        <div className="flex flex-col items-center justify-center">
          <img src="/img/auth2.png" className="size-[78px]" />
          <div className="pb-[4px] text-[22px] font-pf-bold">Google Authenticator</div>
          <div className="text-sm">
            <FormattedMessage id="mt.qingshuruyanzhengma" />
          </div>
          <div className="mt-[30px]">
            <Spin spinning={loading}>
              <CodeInput onChange={handleChange} status={error ? 'error' : ''} />
            </Spin>
          </div>
        </div>
      </div>
      {/* <Button block type="primary" style={{height:46}}><FormattedMessage id="common.queren" /></Button> */}
    </div>
  )
}

export default GoogleAuth
