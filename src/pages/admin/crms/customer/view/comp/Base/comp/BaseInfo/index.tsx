import { FormattedMessage, useParams } from '@umijs/max'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import Iconfont from '@/components/Base/Iconfont'
import { DEFAULT_PRECISION } from '@/constants'
import { useStores } from '@/context/mobxProvider'
import { formatNum } from '@/pages/admin/crms'
import { cn } from '@/utils/cn'

type ITotalAccountInfo = {
  /**所有交易账号总的净值 */
  totalBalance?: number
  /**所有交易账号总的余额 */
  totalMoney?: number
  /**所有交易账号总的可用保证金 */
  totalAvailableMargin?: number
  /**所有交易账号总的暂用保证金 */
  totalOccupyMargin?: number
  /**所有交易账号中最大的精度 */
  maxCurrencyDecimal?: number
}

function BaseInfo({ clientInfo, clientRes }: { clientInfo: any; clientRes: any }) {
  const { trade } = useStores()
  const params = useParams<{ id: string }>()
  const [totalAccountInfo, setTotalAccountInfo] = useState<ITotalAccountInfo>({})
  const clientId = params?.id

  const accountList = clientRes?.data?.accountList || [] // 客户下所有的交易账号

  // const { data: positionRes, run: queryBgaOrder } = useRequest(getBgaOrderPage, { manual: true })
  // const positionList = positionRes?.data?.records || [] // 客户下所有的持仓单

  // let totalProfit: any = 0 // 计算总的浮动盈亏

  // if (positionList?.length) {
  //   positionList.forEach((item) => {
  //     totalProfit += covertProfit(item, {
  //       symbol: item.symbol,
  //       dataSourceCode: item.dataSourceCode
  //     })
  //   })
  // }

  // useEffect(() => {
  //   if (clientId) {
  //     queryBgaOrder({ clientId, status: 'BAG' })
  //   }
  // }, [clientId])

  useEffect(() => {
    if (accountList?.length) {
      // 所有交易账号总的净值
      let totalBalance = 0
      // 所有交易账号总的余额
      let totalMoney = 0
      // 所有交易账号总的可用保证金
      let totalAvailableMargin = 0
      // 所有交易账号总的暂用保证金
      let totalOccupyMargin = 0
      // 所有交易账号中最大的精度
      let maxCurrencyDecimal = 2

      accountList.forEach((item: any) => {
        const { balance, money, availableMargin, occupyMargin } = trade.getAccountBalance(item)
        totalBalance += balance
        totalMoney += money
        totalAvailableMargin += availableMargin
        totalOccupyMargin += occupyMargin
        maxCurrencyDecimal = Math.max(maxCurrencyDecimal, item.currencyDecimal || 2)
      })

      setTotalAccountInfo({
        totalBalance,
        totalMoney,
        totalAvailableMargin,
        totalOccupyMargin,
        maxCurrencyDecimal
      })
    }
  }, [accountList])

  const items = [
    {
      icon: 'shuju1',
      label: <FormattedMessage id="mt.jingzhi" />,
      value: formatNum(totalAccountInfo?.totalBalance, { precision: DEFAULT_PRECISION })
    },
    {
      icon: 'shuju1',
      label: <FormattedMessage id="mt.yue" />,
      value: formatNum(totalAccountInfo?.totalMoney, { precision: DEFAULT_PRECISION })
    },
    {
      icon: 'shuju1',
      label: <FormattedMessage id="mt.keyongbaozhengjin" />,
      value: formatNum(totalAccountInfo?.totalAvailableMargin, { precision: DEFAULT_PRECISION })
    },
    {
      icon: 'shuju1',
      label: <FormattedMessage id="mt.zhanyongbaozhengjin" />,
      value: formatNum(totalAccountInfo?.totalOccupyMargin, { precision: DEFAULT_PRECISION })
    },
    {
      icon: 'shuju1',
      label: <FormattedMessage id="mt.yishixianyingkui" />,
      // @ts-ignore
      value: formatNum(clientRes?.data?.accountCount?.totalProfitLoss, { precision: DEFAULT_PRECISION }),
      // @ts-ignore
      className: Number(clientRes?.data?.accountCount?.totalProfitLoss) > 0 ? '!text-green' : '!text-red'
    },
    {
      icon: 'shuju1',
      label: <FormattedMessage id="mt.jiaoyiliang" />,
      value: formatNum(clientInfo?.volume, { precision: DEFAULT_PRECISION })
    },
    {
      icon: 'shuju1',
      label: <FormattedMessage id="mt.shouxufei" />,
      value: formatNum(clientInfo?.handlingFees, { precision: DEFAULT_PRECISION })
    },
    {
      icon: 'shuju1',
      label: <FormattedMessage id="mt.kucunfei" />,
      value: formatNum(clientInfo?.interestFees, { precision: DEFAULT_PRECISION })
    }
  ]
  return (
    <div>
      <div className={cn(`grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 items-center gap-x-3 gap-y-2 my-4`)}>
        {items.map((item, idx) => (
          <div key={idx} className={cn('flex h-full rounded-xl bg-white divide-x divide-gray-130  border border-gray-150')}>
            <div className="flex items-center justify-center px-4 py-3">
              <Iconfont name={item.icon} width={32} height={32} />
            </div>
            <div className="flex flex-col flex-1 px-4 py-3">
              <div className="text-gray text-sm ">{item.label}</div>
              <div className={cn('text-gray text-[22px] !font-dingpro-medium', item.className)}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default observer(BaseInfo)
