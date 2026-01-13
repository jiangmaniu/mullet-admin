import { FormattedMessage, useParams } from '@umijs/max'
import { useState } from 'react'

import ProFormSegmented from '@/components/Admin/Form/ProFormSegmented'
import Hidden from '@/components/Base/Hidden'
import { stores } from '@/context/mobxProvider'

import CurrentOrder from './comp/CurrentOrder'
import HistoryOrder from './comp/HistoryOrder'
import HistoryTrade from './comp/HistoryTrade'
import Position from './comp/Position'
import PositionHistory from './comp/PositionHistory'

export default function Trade({
  active,
  groups,
  accounts
}: {
  active: boolean
  groups: Record<string, { text: string; color?: string }>
  accounts: Record<string, { text: string; color?: string; groupId?: number }>
}) {
  const [tabKey, setTabKey] = useState<any>('POSITION')

  const { id } = useParams()

  const { ws } = stores

  // const data = await getAccountGroupPageList({ current: 1, size: 999 })
  // return (data.data?.records || []).filter((v) => !v.isSimulate).map((item) => ({ label: item.groupName, value: item.id }))

  const options = [
    {
      label: <FormattedMessage id="mt.chicangliebiao" />,
      value: 'POSITION',
      component: <Position groups={groups} accounts={accounts} active={tabKey === 'POSITION'} />
    },
    {
      label: <FormattedMessage id="mt.dangqianweituo" />,
      value: 'CURRENT_ORDER',
      component: <CurrentOrder groups={groups} accounts={accounts} active={tabKey === 'CURRENT_ORDER'} />
    },
    {
      label: <FormattedMessage id="mt.lishiweituo" />,
      value: 'HISTORY_ORDER',
      component: <HistoryOrder groups={groups} accounts={accounts} />
    },
    {
      label: <FormattedMessage id="mt.lishichengjiao" />,
      value: 'HISTORY_TRADE',
      component: <HistoryTrade groups={groups} accounts={accounts} />
    },
    {
      label: <FormattedMessage id="mt.cangweilishijilu" />,
      value: 'POSITION_HISTORY',
      component: <PositionHistory groups={groups} accounts={accounts} />
    }
    // {
    //   label: <FormattedMessage id="mt.zhanghuzijinliushui" />,
    //   value: 'FUND_RECORD',
    //   component: <FundRecord groups={groupOptions} accounts={accountOptions} />
    // }
  ]

  // useEffect(() => {
  //   stores.trade.getSymbolListBack()

  //   // 重新连接行情
  //   ws.reconnect()

  //   return () => {
  //     // 关闭行情
  //     ws.close()
  //   }
  // }, [])

  // usePageVisibility(
  //   () => {
  //     ws.reconnect()
  //   },
  //   () => {
  //     ws.close()
  //   }
  // )

  return (
    <div>
      {active ? (
        <>
          <div className="mb-4">
            <ProFormSegmented
              request={async () => options}
              width={800}
              fieldProps={{
                block: true,
                value: tabKey,
                onChange: (value) => {
                  setTabKey(value)
                }
              }}
            />
          </div>
          {options.map((item, idx) => {
            const Comp = item.component
            return (
              <Hidden key={idx} show={item.value === tabKey}>
                {Comp}
              </Hidden>
            )
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
