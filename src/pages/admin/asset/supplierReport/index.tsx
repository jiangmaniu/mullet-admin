import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'

import Dashboard from './Dashboard'

type Params = API.PageParams

export default function List() {
  const [activeKey, setActiveKey] = useState('Deposit')
  const tabList = [
    {
      label: <FormattedMessage id="mt.rujin" />,
      key: 'Deposit',
      icon: 'rujin'
    },
    {
      label: <FormattedMessage id="mt.chujin" />,
      key: 'Withdrawal',
      icon: 'chujin'
    }
  ]
  return (
    <PageContainer
      icon="/img/emoji/20.png"
      pageBgColorMode="gray"
      tabList={tabList}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
    >
      <Dashboard />
    </PageContainer>
  )
}
