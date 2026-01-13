import { LogoutOutlined, TeamOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, history, useModel } from '@umijs/max'
import { Spin } from 'antd'
import { stringify } from 'querystring'
import type { MenuInfo } from 'rc-menu/lib/interface'
import React, { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

import SelectSuffixIcon from '@/components/Base/SelectSuffixIcon'
import useAuthenticator from '@/hooks/useAuthenticator'
import { onLogout, push } from '@/utils/navigator'

import HeaderDropdown from '../HeaderDropdown'
import GoogleAuthModal from './GoogleAuthModal'

export type GlobalHeaderRightProps = {
  menu?: boolean
  children?: React.ReactNode
}

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  return <span className="anticon mx-1 font-pf-bold text-sm text-gray">{currentUser?.nick_name || currentUser?.user_name}</span>
}

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await onLogout()
    const { search, pathname } = window.location
    const urlParams = new URL(window.location.href).searchParams
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect')
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search
        })
      })
    }
  }
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover
      }
    }
  })
  const { initialState, setInitialState } = useModel('@@initialState')
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [open, setOpen] = useState(false)

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      if (key === 'auth') {
        setOpenAuthModal(true)
        return
      }
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }))
        })
        loginOut()
        return
      }
      if (key === 'log') {
        push('/logs/personal')
      }
    },
    [setInitialState]
  )

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  const { currentUser, menuButtons } = initialState
  const userId = currentUser?.user_id

  // if (!currentUser || !currentUser.user_name) {
  //   return loading
  // }

  const { isBindGoogleAuth, onQueryIsBindGoogleAuth } = useAuthenticator()

  useEffect(() => {
    if (userId && open) {
      onQueryIsBindGoogleAuth()
    }
  }, [userId, open])

  const showPersonLog = menuButtons?.some((item) => item.path?.indexOf('/logs') !== -1)

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'auth',
            icon: <img src="/img/auth.png" className="size-[18px]" />,
            label: (
              <div>
                <div>Authenticator</div>
                {isBindGoogleAuth ? (
                  <div>
                    <span
                      className="text-green text-xs rounded-[2px] font-pf-bold px-[3px] py-[2px]"
                      style={{ background: 'rgba(69,164,138,0.18)' }}
                    >
                      <FormattedMessage id="mt.yiqiyong" />
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-weak bg-gray-50 rounded-[2px] text-xs font-pf-bold px-[3px] py-[2px]">
                      <FormattedMessage id="mt.weiqiyong" />
                    </span>
                  </div>
                )}
              </div>
            )
          },
          ...(showPersonLog
            ? [
                {
                  key: 'log',
                  icon: <TeamOutlined />,
                  label: <FormattedMessage id="menu.logs.personal" />
                }
              ]
            : []),
          {
            type: 'divider' as const
          }
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <FormattedMessage id="common.logout" />
    }
  ]

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems
        }}
        align={{ offset: [10, 10] }}
        onOpenChange={(open) => {
          setOpen(open)
        }}
      >
        <div className="mr-3 cursor-pointer">
          <img src={currentUser?.imgUrl || '/img/default-avatar.png'} className="w-[24px] h-[24px] rounded-lg mr-1" />
          <AvatarName />
          <SelectSuffixIcon style={{ width: 24, height: 24 }} />
        </div>
      </HeaderDropdown>
      <GoogleAuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  )
}
