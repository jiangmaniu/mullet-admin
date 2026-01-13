import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useParams } from '@umijs/max'
import { useState } from 'react'

import ProFormSegmented from '@/components/Admin/Form/ProFormSegmented'
import Hidden from '@/components/Base/Hidden'
import CurrentCopyTrading from '@/pages/admin/copyTrading/comp/CurrentCopyTrading'
import HistoryCopyTrading from '@/pages/admin/copyTrading/comp/HistoryCopyTrading'

import currentCopyTrading from './currentCopyTrading'
import historyCopyTrading from './historyCopyTrading'

export default function CopyTrading() {
  const { id } = useParams()
  const [tabKey, setTabKey] = useState<any>('CURRENT')
  const options = [
    {
      label: <FormattedMessage id="mt.dangqiangendan" />,
      value: 'CURRENT',
      component: <CurrentCopyTrading id={id} active={tabKey === 'CURRENT'} {...currentCopyTrading()} />
    },
    {
      label: <FormattedMessage id="mt.lishigendan" />,
      value: 'HISTORY',
      component: <HistoryCopyTrading id={id} active={tabKey === 'HISTORY'} {...historyCopyTrading()} />
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
