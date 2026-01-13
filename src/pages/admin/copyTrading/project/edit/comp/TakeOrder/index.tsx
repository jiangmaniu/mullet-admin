import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import ProFormSegmented from '@/components/Admin/Form/ProFormSegmented'
import Hidden from '@/components/Base/Hidden'
import CurrentTakeOrder from '@/pages/admin/copyTrading/comp/CurrentTakeOrder'
import HistoryTakeOrder from '@/pages/admin/copyTrading/comp/HistoryTakeOrder'

import currentTakeOrder from './currentTakeOrder'
import historyTakeOrder from './historyTakeOrder'

export default function TakeOrder({ id }: { id: string }) {
  const [tabKey, setTabKey] = useState<any>('CURRENT')
  const options = [
    {
      label: <FormattedMessage id="mt.dangqiancangwei" />,
      value: 'CURRENT',
      component: <CurrentTakeOrder id={id} active={tabKey === 'CURRENT'} {...currentTakeOrder()} />
    },
    {
      label: <FormattedMessage id="mt.lishicangwei" />,
      value: 'HISTORY',
      component: <HistoryTakeOrder id={id} active={tabKey === 'HISTORY'} {...historyTakeOrder()} />
    }
  ]

  return (
    <div>
      <div className="mb-3">
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
      <ProCard>
        {options.map((item, idx) => {
          return (
            <Hidden show={item.value === tabKey} key={idx}>
              {item.component}
            </Hidden>
          )
        })}
      </ProCard>
    </div>
  )
}
