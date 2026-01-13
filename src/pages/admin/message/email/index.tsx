import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'

import Channel from './Channel'
import Send from './Send'
import Template from './Template'

type Params = API.PageParams

export default function List() {
  const [activeKey, setActiveKey] = useState('Send')
  const tabList = [
    {
      label: <FormattedMessage id="mt.fasongyoujian" />,
      key: 'Send',
      icon: 'a-duanxinshouye'
    },
    {
      label: <FormattedMessage id="mt.youjianmu" />,
      key: 'Template',
      icon: 'moban'
    },
    {
      label: <FormattedMessage id="mt.youjiantongdao" />,
      key: 'Channel',
      icon: 'kehuzu'
    }
  ]
  return (
    <PageContainer
      icon="/img/emoji/16.png"
      pageBgColorMode="gray"
      tabList={tabList}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
      tabPersistence
    >
      {activeKey === 'Send' && <Send />}
      {activeKey === 'Template' && <Template />}
      {activeKey === 'Channel' && <Channel />}
    </PageContainer>
  )
}
