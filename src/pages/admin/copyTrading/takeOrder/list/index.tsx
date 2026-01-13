import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import ProFormSegmented from '@/components/Admin/Form/ProFormSegmented'
import PageContainer from '@/components/Admin/PageContainer'
import Hidden from '@/components/Base/Hidden'

import CurrentTakeOrder from '../../comp/CurrentTakeOrder'
import HistoryTakeOrder from '../../comp/HistoryTakeOrder'
import currentTakeOrder from './currentTakeOrder'
import historyTakeOrder from './historyTakeOrder'

export default function TakeOrder() {
  const [tabKey, setTabKey] = useState<any>('CURRENT')
  const options = [
    { label: <FormattedMessage id="mt.dangqiandaidan" />, value: 'CURRENT', component: <CurrentTakeOrder {...currentTakeOrder()} /> },
    { label: <FormattedMessage id="mt.lishidaidan" />, value: 'HISTORY', component: <HistoryTakeOrder {...historyTakeOrder()} /> }
  ]

  return (
    <PageContainer icon="/img/emoji/22.png" pageBgColorMode="gray">
      <div className="relative">
        <div className="absolute top-[48px]">
          <ProFormSegmented
            request={async () => options}
            width={240}
            fieldProps={{
              block: true,
              onChange: (value) => {
                setTabKey(value)
              }
            }}
          />
        </div>
        {options.map((item, idx) => {
          return (
            <Hidden show={item.value === tabKey} key={idx}>
              {item.component}
            </Hidden>
          )
        })}
      </div>
    </PageContainer>
  )
}
