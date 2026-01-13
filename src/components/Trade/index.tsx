import { ProCard } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useParams } from '@umijs/max'
import { useNetwork } from 'ahooks'
import { observer } from 'mobx-react'
import { useEffect } from 'react'

import { useStores } from '@/context/mobxProvider'
import usePageVisibility from '@/hooks/usePageVisibility'
import useSyncDataToWorker from '@/hooks/useSyncDataToWorker'
import { cn } from '@/utils/cn'

import BuyAndSell from './comp/BuyAndSell'
import Center from './comp/Center'
import BalanceEmptyModal from './comp/Modal/BalanceEmptyModal'
import Sidebar from './comp/Sidebar'
import TradeRecord from './comp/TradeRecord'
import DepthPrice from './comp/Widget/DepthPrice'

export default observer(() => {
  const { ws, trade, kline } = useStores()
  const { id } = useParams()
  const networkState = useNetwork()
  const isOnline = networkState.online

  // 同步数据到worker线程
  useSyncDataToWorker()

  const onSubscribeExchangeRateQuote = () => {
    // 订阅当前激活的汇率品种行情
    setTimeout(() => {
      ws.subscribeExchangeRateQuote()
    }, 1000)
  }

  useEffect(() => {
    // 提前初始化worker
    ws.initWorker()
  }, [])

  useEffect(() => {
    // 如果网络断开，在连接需要重新重新建立新的连接
    if (!isOnline) {
      ws.close()
    }
    if (isOnline) {
      // 重新建立新连接
      ws.connect()
    }

    return () => {
      // 关闭ws连接
      ws.close()
    }
  }, [isOnline])

  useEffect(() => {
    onSubscribeExchangeRateQuote()

    // 查询当前品种的ticker 高开低收信息
    trade.queryTradeSymbolTicker(trade.activeSymbolName)
  }, [trade.activeSymbolName])

  usePageVisibility(
    () => {
      // 用户从后台切换回前台时执行的操作
      ws.connect()

      trade.setTradePageActive(true)

      onSubscribeExchangeRateQuote()
    },
    () => {
      // 用户从前台切换到后台时执行的操作

      trade.setTradePageActive(false)

      // 关闭ws
      ws.close()
    }
  )

  const borderTopClassName = useEmotionCss(({ token }) => {
    return {
      '&::after': {
        content: "''",
        background: 'var(--divider-line-color)',
        width: '100%',
        height: 0.5,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 10
      }
    }
  })

  return (
    <>
      <ProCard bordered ghost>
        <div>
          {/* 交易 */}
          <div className="flex">
            <Sidebar />
            {/* 中间区域 */}
            <Center />
            {/* 深度报价 */}
            <DepthPrice />
            {/* 买卖交易区 */}
            <BuyAndSell />
          </div>
          <div className={cn('flex items-start justify-between relative', borderTopClassName)}>
            {/* 交易记录 */}
            <div style={{ width: '100%' }}>
              <TradeRecord />
            </div>
            {/* <div className={classNames('w-[300px] min-h-[270px] relative')}>
              <Liquidation />
            </div> */}
          </div>
          {/* 底部固定状态栏 */}
          {/* <Footer /> */}
          {/* 浮动交易窗口 */}
          {/* <FloatTradeBox /> */}
        </div>
      </ProCard>
      <BalanceEmptyModal />
    </>
  )
})
