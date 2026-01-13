import { FormattedMessage, useIntl, useModel, useParams, useRequest } from '@umijs/max'
import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import Hidden from '@/components/Base/Hidden'
import { addAllOptionToEnum } from '@/constants/enum'
import { getClientDetail } from '@/services/api/crm/customer'
import { findClient } from '@/services/api/crmManage/client'
import { push } from '@/utils/navigator'

import Base from './comp/Base'
import Fund from './comp/Fund'
import Header from './comp/Header'
import Trade from './comp/Trade'

export default function AddAndEdit() {
  const intl = useIntl()

  const [activeKey, setActiveKey] = useState('Base')
  const params = useParams()
  const clientId = params.id

  // 详情页下面的组件共享数据
  // const { data: clientInfo, run, loading } = useModel('clientInfo')
  const { data: accountGroup, run: queryAccountGroup } = useModel('accountGroup')

  useEffect(() => {
    queryAccountGroup({ current: 1, size: 999 })
  }, [])

  const { data: clientRes, run: queryClientDefail } = useRequest(getClientDetail, { manual: true })
  const { data: clientData, run: queryClient } = useRequest(findClient, { manual: true })
  const clientInfo = clientData?.data // 客户基本信息统计

  useEffect(() => {
    if (clientId) {
      queryClient({ clientId })
      queryClientDefail({ id: clientId })
    }
  }, [clientId])

  const groupOptions = addAllOptionToEnum(
    (accountGroup || []).reduce((acc, curr) => {
      if (!curr.isSimulate && curr.id && curr.groupName) {
        acc[curr.id] = { text: curr.groupName }
      }
      return acc
    }, {} as Record<string, { text: string; color?: string }>)
  )

  // const { data: accounts } = useRequest(() => getClientDetail({ id: clientId }))
  const accountOptions = addAllOptionToEnum(
    (clientRes?.data?.accountList || []).reduce((acc, curr) => {
      if (!curr.isSimulate && curr.id && curr.name) {
        acc[curr.id] = { text: `${curr.name}`, groupId: curr.accountGroupId }
      }
      return acc
    }, {} as Record<string, { text: string; color?: string; groupId?: number }>)
  )

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.jichuxinxi' }),
      key: 'Base',
      icon: 'qiehuan-gailan',
      component: Base,
      props: {
        active: activeKey === 'Base',
        clientInfo,
        clientRes
      },
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.jiaoyixinxi' }),
      key: 'Trade',
      icon: 'shuju',
      component: Trade,
      props: {
        active: activeKey === 'Trade',
        clientInfo,
        groups: groupOptions,
        accounts: accountOptions
      },
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.zijinxinxi' }),
      key: 'Fund',
      icon: 'zijinliushui',
      component: Fund,
      props: {
        active: activeKey === 'Fund',
        clientInfo,
        groups: groupOptions,
        accounts: accountOptions
      },
      ref: useRef()
    }
  ]
  return (
    <PageContainer
      tabList={tabList}
      showBack
      onBack={() => push('/crms/customer')}
      icon="/img/emoji/23.png"
      pageTitle={<FormattedMessage id="mt.kehuxiangqing" />}
      pageBgColorMode="gray"
      contentStyle={{ paddingTop: 15, paddingInline: 36 }}
      tabBarTitleFontWeight="500"
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
      tabActiveKey={activeKey}
      renderHeader={() => <Header clientInfo={clientInfo} clientRes={clientRes} />}
    >
      {tabList.map((item: any, idx) => {
        const Component = item.component
        return (
          <Hidden show={activeKey === item.key} key={idx}>
            <Component ref={item.ref} {...item.props} active={activeKey === item.key} />
          </Hidden>
        )
      })}
    </PageContainer>
  )
}
