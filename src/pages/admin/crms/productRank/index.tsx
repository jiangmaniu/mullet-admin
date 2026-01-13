import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import ProFormSegmented from '@/components/Admin/Form/ProFormSegmented'
import PageContainer from '@/components/Admin/PageContainer'

import Profit from './comp/Profit'
import Trade from './comp/Trade'

export default function ProductRank() {
  const [tabKey, setTabKey] = useState<any>('TRADE')
  const options = [
    { label: <FormattedMessage id="mt.jiaoyichanpinpaiming" />, value: 'TRADE', component: <Trade /> },
    { label: <FormattedMessage id="mt.yingyichanpinpaiming" />, value: 'PROFIT', component: <Profit /> }
  ]

  return (
    <PageContainer icon="/img/emoji/23.png">
      <div className="flex items-center justify-center mb-5">
        <ProFormSegmented
          request={async () => options}
          width={400}
          fieldProps={{
            block: true,
            value: tabKey,
            onChange: (value) => {
              setTabKey(value)
            }
          }}
        />
      </div>
      {/* {options.map((item, idx) => {
        return item.value === tabKey && <div key={idx}>{item.component}</div>
      })} */}
      {tabKey === 'TRADE' && <Trade />}
      {tabKey === 'PROFIT' && <Profit />}
    </PageContainer>
  )
}
