import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'

import Send from './Send'
import Template from './Template'

type Params = API.PageParams

export default function List() {
  const [activeKey, setActiveKey] = useState('Send')
  const tabList = [
    {
      label: <FormattedMessage id="mt.gonggaoguanli" />,
      key: 'Send',
      icon: 'a-duanxinshouye'
    },
    {
      label: <FormattedMessage id="mt.zhanneixinmuban" />,
      key: 'Template',
      icon: 'moban'
    }
  ]
  return (
    <PageContainer
      icon="/img/emoji/17.png"
      pageBgColorMode="gray"
      tabList={tabList}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
      tabPersistence
    >
      {activeKey === 'Send' && <Send />}
      {activeKey === 'Template' && <Template />}
    </PageContainer>
  )
}
