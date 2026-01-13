import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useParams } from '@umijs/max'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { formatNum } from '@/pages/admin/crms'
import { getBuySellInfo } from '@/utils/business'
import { cn } from '@/utils/cn'
import { getCurrentQuote } from '@/utils/wsUtil'

const CurrentPrice = observer(({ record, index }: { record: CrmClient.CurrentOrderItem; index: number }) => {
  const quote = getCurrentQuote({
    symbol: record.symbol,
    dataSourceCode: record.dataSourceCode
  })
  const currentPrice = record.buySell === 'BUY' ? quote.ask : quote.bid
  return (
    <>
      {Number(currentPrice) ? (
        <span className={cn('!text-[13px] !font-dingpro-medium', quote?.bidDiff > 0 ? 'text-green' : 'text-red')}>{currentPrice}</span>
      ) : (
        <span className="!text-[13px] !font-dingpro-medium">-</span>
      )}
    </>
  )
})

export const getColumns = (
  groups: Record<string, { text: string; color?: string }>,
  accounts: Record<string, { text: string; color?: string; groupId?: number }>
): ProColumns<CrmClient.CurrentOrderItem>[] => {
  const { id } = useParams()

  const [group, setGroup] = useState('ALLALL')

  const showAccounts = useMemo(() => {
    const records = Object.keys(accounts).filter(
      (key) => !group || group === 'ALLALL' || String(accounts[key].groupId) === group || key === 'ALLALL'
    )
    return records.reduce((acc, key) => {
      acc[key] = accounts[key]
      return acc
    }, {} as Record<string, { text: string; color?: string }>)
  }, [group])

  const [account, setAccount] = useState('ALLALL')
  useEffect(() => {
    if (group && group !== 'ALLALL') {
      setAccount('ALLALL')
    }
  }, [group])
  return [
    {
      title: <FormattedMessage id="mt.zhanghuleixing" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'accountGroupId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        return text ? groups[text]?.text : ''
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyizhanghu" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'tradeAccountId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        return text ? accounts[text]?.text : ''
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyizhanghuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'tradeAccountId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.jiaoyipinzhong" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      align: 'center',
      width: 140,
      fieldProps: {}
    },
    {
      title: <FormattedMessage id="mt.jiaoyileixing" />,
      dataIndex: 'type',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      renderText(text, record, index, action) {
        const buySellInfo = getBuySellInfo(record)
        return <span className={cn(buySellInfo.colorClassName)}>{buySellInfo.text}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.guadanjia" />,
      dataIndex: 'limitPrice',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.biaojijia" />,
      dataIndex: 'currentPrice',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      width: 140,

      renderText(text, record, index, action) {
        return <CurrentPrice record={record} index={index} />
      }
    },
    {
      title: <FormattedMessage id="mt.zhiyingzhisun" />,
      dataIndex: 'sp',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 240,
      renderText(text, record, index, action) {
        return `${formatNum(record.takeProfit, { precision: DEFAULT_PRECISION }) || '0'}/${
          formatNum(record.stopLoss, { precision: DEFAULT_PRECISION }) || '0'
        }`
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyishijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.guadanbiaohao" />,
      dataIndex: 'id',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      fixed: 'right',
      align: 'right'
    },
    // 表单搜索项
    // {
    //   dataIndex: 'dateRangeNoTime',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'dateRange', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   fieldProps: {
    //     placeholder: [getIntl().formatMessage({ id: 'common.startDate' }), getIntl().formatMessage({ id: 'common.endDate' })]
    //   }
    // },
    {
      dataIndex: 'accountGroupId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: groups,
      title: getIntl().formatMessage({ id: 'mt.zhanghuleixing' }),
      fieldProps: {
        onChange: (value) => {
          // @ts-ignore
          setGroup(value)
        },
        value: group,
        style: {
          // width: 280,
          overflow: 'hidden'
        },
        placeholder: getIntl().formatMessage({ id: 'mt.zhanghuleixing' })
      }
    },
    {
      dataIndex: 'tradeAccountId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      search: true,
      valueEnum: showAccounts,
      title: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' }),
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' }),
        onChange: (value) => {
          // @ts-ignore
          setAccount(value)
        },
        style: {
          // width: 280,
          overflow: 'hidden'
        },
        value: account
      }
    }
  ]
}
