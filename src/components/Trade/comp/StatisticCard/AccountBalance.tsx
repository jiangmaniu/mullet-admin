import { observer } from 'mobx-react'

import { useStores } from '@/context/mobxProvider'
import { formatNum } from '@/utils'

// 账户净值
function AccountBalance() {
  const { trade } = useStores()
  const balance = trade.accountBalanceInfo.balance
  const currencyDecimal = trade.currentAccountInfo.currencyDecimal

  return (
    <span className="text-base font-pf-bold  dark:text-primary">
      {Number(balance) ? formatNum(balance, { precision: currencyDecimal }) : '0.00'}
    </span>
  )
}

export default observer(AccountBalance)
