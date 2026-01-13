import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { useStores } from '@/context/mobxProvider'
import { formatNum } from '@/utils'

// 账户可用保证金组件
function AvailableMargin() {
  const { trade } = useStores()
  const { availableMargin } = trade.getAccountBalance()
  const [count, setCount] = useState(0)
  const currencyDecimal = trade.currentAccountInfo.currencyDecimal

  useEffect(() => {
    // 设置一个定时器强制更新availableMargin的值
    const timer = setInterval(() => {
      if (count > 5) {
        clearInterval(timer)
      }
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [count])

  return (
    <span className="text-base font-pf-bold  dark:text-primary" key={count}>
      {Number(availableMargin) ? formatNum(availableMargin, { precision: currencyDecimal }) : '0.00'}
    </span>
  )
}

export default observer(AvailableMargin)
