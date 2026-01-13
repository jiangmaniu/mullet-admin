import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'

import AccountGroup from './comp/accountGroup'
import Role from './comp/role'

type Params = API.PageParams

export default function List() {
  const [activeKey, setActiveKey] = useState('role')
  const tabList = [
    {
      label: <FormattedMessage id="mt.role" />,
      key: 'role',
      icon: 'shezhi'
    },
    {
      label: <FormattedMessage id="mt.zhanghuzu" />,
      key: 'accountGroup',
      icon: 'qiehuan-huobi'
    }
  ]
  return (
    <PageContainer
      icon="/img/emoji/1.png"
      pageBgColorMode="gray"
      tabList={tabList}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
    >
      {activeKey === 'role' && <Role />}
      {activeKey === 'accountGroup' && <AccountGroup />}
    </PageContainer>
  )
}
