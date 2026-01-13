import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import ProFormSegmented from '@/components/Admin/Form/ProFormSegmented'
import PageContainer from '@/components/Admin/PageContainer'
import Hidden from '@/components/Base/Hidden'

import CurrentCopyTrading from '../../comp/CurrentCopyTrading'
import HistoryCopyTrading from '../../comp/HistoryCopyTrading'
import currentCopyTrading from './currentCopyTrading'
import historyCopyTrading from './historyCopyTrading'

export default function TakeOrder() {
  const [tabKey, setTabKey] = useState<any>('CURRENT')
  const options = [
    { label: <FormattedMessage id="mt.dangqiangendan" />, value: 'CURRENT', component: <CurrentCopyTrading {...currentCopyTrading()} /> },
    { label: <FormattedMessage id="mt.lishigendan" />, value: 'HISTORY', component: <HistoryCopyTrading {...historyCopyTrading()} /> }
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
