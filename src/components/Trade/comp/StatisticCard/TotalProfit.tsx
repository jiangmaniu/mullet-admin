import { observer } from 'mobx-react'

import { useStores } from '@/context/mobxProvider'
import { formatNum } from '@/utils'

// 账户总浮动盈亏组件
function TotalProfit() {
  const { trade } = useStores()
  const totalProfit = trade.accountBalanceInfo.totalProfit
  const currentAccountInfo = trade.currentAccountInfo
  const currencyDecimal = currentAccountInfo.currencyDecimal || 2 // 账户组小数位

  return <div>{totalProfit ? formatNum(totalProfit, { precision: currencyDecimal }) : '0.00'}</div>
}

export default observer(TotalProfit)
