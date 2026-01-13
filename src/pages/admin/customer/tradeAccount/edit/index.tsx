import { FormattedMessage, useIntl, useParams, useRequest, useSearchParams } from '@umijs/max'
import { Spin } from 'antd'
import qs from 'qs'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import { useStores } from '@/context/mobxProvider'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import usePageVisibility from '@/hooks/usePageVisibility'
import { getClientDetail } from '@/services/api/crm/customer'
import { getAccountDetail, UpdateAccount } from '@/services/api/tradeCore/account'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import Balance from './form/Balance'
import HistoryClose from './form/HistoryClose'
import HistoryPending from './form/HistoryPending'
import HistoryPosition from './form/HistoryPosition'
import Overview from './form/Overview'
import Permission from './form/Permission'
import Trade from './form/Trade'

export default function Add() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const { trade, ws } = useStores()
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)

  const [activeKey, setActiveKey] = useState('Overview')
  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.gailan' }),
      key: 'Overview',
      icon: 'qiehuan-gailan',
      component: Overview,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.quanxian' }),
      key: 'Permission',
      icon: 'qiehuan-quanxian',
      component: Permission,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.jiaoyi' }),
      key: 'Trade',
      icon: 'qiehuan-jiaoyi',
      component: Trade,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.jieyu' }),
      key: 'Balance',
      icon: 'qiehuan-yufukuan',
      component: Balance,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.lishiweituo' }),
      key: 'HistoryPending',
      icon: 'baojia',
      component: HistoryPending,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.shilichengjiao' }),
      key: 'HistoryClose',
      icon: 'chengjiaolishi',
      component: HistoryClose,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.lishichicang' }),
      key: 'HistoryPosition',
      icon: 'qiehuan-huobi',
      component: HistoryPosition,
      ref: useRef()
    }
  ]

  const activeIcon = tabList.find((item) => item.key === activeKey)?.icon as string

  const params = useParams()
  const id = params.id
  const isEdit = !!id

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const isFullScreen = ['Overview', 'Balance', 'Trade', 'HistoryClose', 'Safety', 'HistoryPending', 'HistoryPosition'].includes(activeKey)

  let [searchParams, setSearchParams] = useSearchParams()
  const currentTabKey = searchParams.get('key')

  const { loading, data, run } = useRequest(getAccountDetail, { manual: true })
  const info = (data?.data || {}) as Account.AccountPageListItem

  const [clientInfo, setClientInfo] = useState({} as User.UserInfo)

  const updateAccount = () => {
    if (info.clientId) {
      // 查询客户用户详情
      getClientDetail({ id: info.clientId }).then((res) => {
        if (res.success) {
          // 进入详情页，设置当前的账户信息，在交易页面用到
          const currentAccountInfo = (res.data?.accountList || []).find((item) => item.id === id) as unknown as User.AccountItem
          trade.setCurrentAccountInfo(currentAccountInfo)
          setClientInfo(res?.data as User.UserInfo)
        }
      })
    }
  }

  useEffect(() => {
    if (id) {
      run({ id })
    }
  }, [id])

  useEffect(() => {
    updateAccount()
    return () => {
      // 退出页面，取消交易页面的行情和深度订阅
      ws.close()
    }
  }, [info])

  usePageVisibility(
    () => {
      updateAccount()
    },
    () => {}
  )

  useEffect(() => {
    if (currentTabKey) {
      setActiveKey(currentTabKey)
    }
  }, [currentTabKey])

  const locationParams = useMemo(() => {
    return Object.fromEntries(searchParams.entries())
  }, [searchParams])

  const IconDom = (
    <div className="border-gray-150 border-[2px] rounded-full w-[125px] h-[125px] flex items-center justify-center">
      <Iconfont name={activeIcon} width={40} height={40} />
    </div>
  )

  return (
    <PageContainer
      tabList={tabList}
      icon="/img/emoji/3.png"
      pageTitle={
        <div>
          <span className="text-primary text-sm">
            <FormattedMessage id="mt.yonghuuid" />：
          </span>
          <span className="text-primary text-base font-semibold">{info?.userAccount}</span>
        </div>
      }
      tabPersistence
      onBack={() => {
        push(`/customer/account?${qs.stringify(locationParams)}`)
      }}
      showBack
      renderRight={() => (
        <>
          {activeKey === 'Setting' && (
            <SaveButton
              onClick={async () => {
                // 校验表单
                const formData = (await checkForm()) as Account.SubmitAccount

                // 表单校验成功
                if (formData) {
                  const status = formData.status as unknown as boolean
                  const values = {
                    accountGroupId: formData.accountGroupId,
                    isTrade: formData.isTrade,
                    status: status ? 'ENABLE' : 'DISABLED',
                    id
                  } as Account.SubmitAccount
                  console.log('checkForm Success', values)
                  const res = await UpdateAccount(values)
                  if (res.success) {
                    message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                    push('/customer/account')
                  }
                }
              }}
            />
          )}
        </>
      )}
      pageBgColorMode="white"
      contentStyle={{ paddingTop: isFullScreen ? 20 : 57, paddingInline: activeKey === 'Trade' ? 15 : isFullScreen ? 40 : 83 }}
      onChangeTab={(activeKey) => {
        startTransition(() => {
          setActiveKey(activeKey)
        })
      }}
      tabActiveKey={activeKey}
    >
      <Spin spinning={loading}>
        <div className="flex items-start">
          {!isFullScreen && <div className="mr-[60px]">{IconDom}</div>}
          <div style={{ width: isFullScreen ? '100%' : '75%' }}>
            {tabList.map((item: any, idx) => {
              const Component = item.component
              return (
                <Hidden show={activeKey === item.key} key={idx}>
                  <Component
                    ref={item.ref}
                    iconDom={IconDom}
                    initialValues={{
                      ...info,
                      clientInfo
                    }}
                    active={activeKey === item.key}
                    reload={run}
                  />
                </Hidden>
              )
            })}
          </div>
        </div>
      </Spin>
    </PageContainer>
  )
}
