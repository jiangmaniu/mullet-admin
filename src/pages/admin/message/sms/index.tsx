import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'

import Record from './comp/Record'
import Template from './comp/Template'

type Params = API.PageParams

export default function List() {
  const [activeKey, setActiveKey] = useState('Record')
  const tabList = [
    {
      label: <FormattedMessage id="mt.duanxinjilu" />,
      key: 'Record',
      icon: 'a-duanxinshouye'
    }
    // {
    //   label: <FormattedMessage id="mt.moban" />,
    //   key: 'Template',
    //   icon: 'moban'
    // }
  ]
  return (
    <PageContainer
      icon="/img/emoji/17.png"
      pageBgColorMode="gray"
      tabList={tabList}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
    >
      {activeKey === 'Record' && <Record />}
      {activeKey === 'Template' && <Template />}
    </PageContainer>
  )
}
