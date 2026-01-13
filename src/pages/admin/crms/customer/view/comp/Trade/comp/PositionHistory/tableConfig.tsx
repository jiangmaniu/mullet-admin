import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl } from '@umijs/max'
import { useEffect, useMemo, useState } from 'react'

import { getEnum } from '@/constants/enum'
import { useLang } from '@/context/languageProvider'
import { formatNum } from '@/pages/admin/crms'
import { getBuySellInfo } from '@/utils/business'
import { cn } from '@/utils/cn'

export const getColumns = ({
  currencyDecimal,
  groups,
  accounts
}: {
  currencyDecimal: any
  groups: Record<string, { text: string; color?: string }>
  accounts: Record<string, { text: string; color?: string; groupId?: number }>
}): ProColumns<Order.BgaOrderPageListItem>[] => {
  const { lng } = useLang()
  const isZh = lng === 'zh-TW'

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
      title: (
        <span className="!pl-1">
          <FormattedMessage id="mt.pinlei" />
        </span>
      ), // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'category',
      className: '!px-1',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 240,
      renderText(text, record, index, action) {
        const buySellInfo = getBuySellInfo(record)
        return (
          <div className="flex items-center">
            {/* <SymbolIcon src={record.imgUrl} /> */}
            <div className="flex items-center pl-[10px]">
              <span className="text-sm text-primary">{record.symbol}</span>
              {/* @ts-ignore */}
              <span className={cn('text-xs pl-2', buySellInfo.colorClassName)}>{buySellInfo?.text2}</span>
            </div>
          </div>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.chicangdanhao" />,
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
      width: 200
    },
    {
      title: <FormattedMessage id="mt.kaicangshoushu" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.kaicangjiage" />,
      dataIndex: 'startPrice',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      renderText(text, record, index, action) {
        return text ? formatNum(text, { precision: record.symbolDecimal }) : '0'
      }
    },
    {
      title: <FormattedMessage id="mt.kaicangshijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 190
    },
    {
      title: <FormattedMessage id="mt.jiaoyizhanghao" />,
      dataIndex: 'tradeAccountId',
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
      title: <FormattedMessage id="mt.zhiyingzhisun2" />,
      dataIndex: 'stopLossProfit',
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
      renderText(text, record, index, action) {
        return (
          <div>
            <span className="!text-[13px] text-primary">
              {record?.takeProfit ? formatNum(record?.takeProfit, { precision: record.symbolDecimal }) : '--'}
            </span>
            <span className="dark:text-gray-95"> / </span>
            <span className="!text-[13px] text-primary">
              {record?.stopLoss ? formatNum(record?.stopLoss, { precision: record.symbolDecimal }) : '--'}
            </span>
          </div>
        )
      }
    },
    // {
    //   title: <FormattedMessage id="mt.xiugaishijian" />,
    //   dataIndex: 'updateTime',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 200
    // },
    {
      title: (
        <>
          <FormattedMessage id="mt.shouxufei" />
          (USD)
        </>
      ),
      dataIndex: 'handlingFees',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        return <span className="!text-[13px] text-primary">{formatNum(text, { precision: record.symbolDecimal })}</span>
      }
    },
    {
      title: (
        <>
          <FormattedMessage id="mt.kucunfei" />
          (USD)
        </>
      ),
      dataIndex: 'interestFees',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        return <span className="!text-[13px] text-primary">{formatNum(text, { precision: record.symbolDecimal })}</span>
      }
    },
    {
      title: <FormattedMessage id="common.status" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      valueEnum: getEnum().Enum.BGAStatus,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: (
        <>
          <FormattedMessage id="mt.yingkui" />
          (USD)
        </>
      ),
      dataIndex: 'profit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: isZh ? 120 : 140,
      renderText(text, record, index, action) {
        const profit: any = record?.profit
        const flag = Number(profit) > 0
        const formatProfit = formatNum(profit, { precision: record.symbolDecimal })
        return profit ? (
          <span className={cn('!font-dingpro-medium', flag ? 'text-green' : 'text-red')}>{flag ? `+${formatProfit}` : formatProfit}</span>
        ) : (
          '-'
        )
      },
      align: 'right',
      fixed: 'right'
    },
    // 表单搜索项
    {
      dataIndex: 'dateRangeNoTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: [getIntl().formatMessage({ id: 'mt.jiaoyikaishishijian' }), getIntl().formatMessage({ id: 'mt.jiaoyijieshushijian' })]
      }
    },
    {
      dataIndex: 'accountGroupId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: groups,
      initialValue: groups[0],
      title: getIntl().formatMessage({ id: 'mt.zhanghuleixing' }),
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.zhanghuleixing' }),
        onChange: (value) => {
          // @ts-ignore
          setGroup(value)
        },
        style: {
          // width: 280,
          overflow: 'hidden'
        },
        value: group
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
      title: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' }),
      valueEnum: showAccounts,
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
