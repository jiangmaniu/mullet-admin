import { getIntl, history, useIntl } from '@umijs/max'
import { useLayoutEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import Hidden from '@/components/Base/Hidden'
import { getFindAllClientGroup } from '@/services/api/crmManage/trading'
import { getPaymentChannelType } from '@/services/api/payment/channel'

import Detail from './detail'
import Order from './order'

export type TabProps = {
  activeKey: string
  setActiveKey: (key: string) => void
  params: any
  setParams: (params: any) => void
  channels: any // 支付渠道
  channelNoValues: any // 入金方式
  registerChannels: any // 注册渠道
}

export default function AddAndEdit() {
  const intl = useIntl()

  const hash = history.location.hash?.replace(/^#/, '')

  const [activeKey, setActiveKey] = useState(hash || 'Detail')
  const [params, setParams] = useState({})

  // 支付方式
  const [channels, setChannels] = useState<any>({})
  // 入金方式
  const [channelNoValues, setChannelNoValues] = useState<any>({})
  // 注册渠道
  const [registerChannels, setRegisterChannels] = useState<any>({})

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.mingxi' }),
      key: 'Detail',
      icon: 'qiehuan-gailan',
      component: Detail,
      ref: useRef(),
      props: {
        activeKey,
        setActiveKey,
        params,
        setParams,
        channels,
        channelNoValues,
        registerChannels
      }
    },
    {
      label: intl.formatMessage({ id: 'mt.dingdan' }),
      key: 'Order',
      icon: 'qiehuan-gailan',
      component: Order,
      ref: useRef(),
      props: {
        activeKey,
        setActiveKey,
        params,
        setParams,
        channels,
        channelNoValues,
        registerChannels
      }
    }
  ]

  // 获取支付方式 和 入金方式
  useLayoutEffect(() => {
    getPaymentChannelType().then((res) => {
      const channels = res?.data?.reduce((pre: any, cur: any) => {
        return { ...pre, [cur.dictKey]: { text: cur.dictValue, ...cur } }
      }, {})
      setChannels(channels)

      const channelNoValues = res?.data?.reduce((pre: any, cur: any) => {
        const children = cur.children?.reduce((pre: any, cur: any) => {
          return { ...pre, [cur.dictKey]: { text: ` ${cur.dictValue}`, ...cur } }
        }, {})
        return { ...pre, ...children }
      }, {})
      setChannelNoValues(channelNoValues)
    })

    getFindAllClientGroup().then((res) => {
      const registerChannels = res?.data?.reduce((pre: any, cur: any) => {
        return { ...pre, [cur.code]: { text: `${cur.code} ${cur.groupName}` } }
      }, {})
      setRegisterChannels(registerChannels)
    })
  }, [])

  return (
    <PageContainer
      tabList={tabList}
      tabPersistence
      icon="/img/emoji/23.png"
      pageBgColorMode="gray"
      pageTitle={getIntl().formatMessage({ id: 'mt.rujinmingxi' })}
      contentStyle={{ paddingTop: 15, paddingInline: 36 }}
      onChangeTab={(activeKey) => {
        // 切换tab时，清空参数
        setParams({})
        setActiveKey(activeKey)
      }}
      tabActiveKey={activeKey}
    >
      {tabList.map((item: any, idx) => {
        const Component = item.component
        return (
          <Hidden show={activeKey === item.key} key={idx}>
            <Component ref={item.ref} {...item.props} activeKey={activeKey} />
          </Hidden>
        )
      })}
      {/* <Detail /> */}
    </PageContainer>
  )
}
