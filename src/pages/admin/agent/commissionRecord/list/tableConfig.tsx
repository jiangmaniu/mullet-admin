import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useState } from 'react'

import { getEnum } from '@/constants/enum'
import { formatNum, isTruthy } from '@/utils'
import { cn } from '@/utils/cn'

export const getColumns = (): ProColumns<AgentCommissionRecords.CommissionRecordsListItem>[] => {
  const intl = useIntl()
  const [settlementStatus, setSettlementStatus] = useState<any>('SETTLED')
  const isSettled = settlementStatus === 'Settled'

  return [
    // {
    //   title: <FormattedMessage id="mt.agent.xingming" />, // 与 antd 中基本相同，但是支持通过传入一个方法
    //   dataIndex: 'userName',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: true,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fixed: 'left',
    //   width: 160
    // },
    {
      title: <FormattedMessage id="mt.agent.xing" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'lastName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 100
    },
    {
      title: <FormattedMessage id="mt.agent.ming" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'firstName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 100
    },
    {
      title: <FormattedMessage id="mt.agent.kehuuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userUid',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.agent.dingdanhao" />,
      dataIndex: 'orderNo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.agent.zhanghuzu" />,
      dataIndex: 'accountGroupName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.agent.jiaoyizhanghu" />,
      dataIndex: 'tradeAccountId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.agent.jiaoyipinzhong" />,
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.agent.jiaoyifangxiang" />,
      dataIndex: 'tradeDirection',
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
        const isBuy = text === 'BUY'
        return text ? (
          <span className={cn('font-medium', isBuy ? 'text-green' : 'text-red')}>{getEnum().Enum.TradeBuySell[text]?.text}</span>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.agent.jiaoyishoushu" />,
      dataIndex: 'tradeVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.agent.jiaoyishouxufei" />,
      dataIndex: 'handlingFee',
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
        return text ? (
          <span className={cn('font-medium', text > 0 ? 'text-green' : 'text-red')}>
            {text > 0 ? '+' : ''}
            {formatNum(text, { precision: 2 })}
          </span>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.agent.yishixianyingkui" />,
      dataIndex: 'realizedProfitLoss',
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
        return text ? (
          <span className={cn('font-medium', text > 0 ? 'text-green' : 'text-red')}>
            {text > 0 ? '+' : ''}
            {formatNum(text, { precision: 2 })}
          </span>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.agent.huodefanyongkehu" />,
      dataIndex: 'rebateCustomer',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.agent.fanyongyongjin" />,
      dataIndex: 'rebateCommission',
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
        return text ? (
          <span className={cn('font-medium', text > 0 ? 'text-green' : 'text-red')}>
            {text > 0 ? '+' : ''}
            {formatNum(text, { precision: 2 })}
          </span>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.agent.fanyongfangshi" />,
      dataIndex: 'rebateType',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      valueEnum: getEnum().Enum.AgentRebateConfigType,
      width: 150
    },
    {
      title: <FormattedMessage id="mt.agent.fanyongzhi" />,
      dataIndex: 'rebateValue',
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
        const rebateType = record?.rebateType
        const rebateValue = record?.rebateValue || ''
        let unit = ''
        // 固定金额单位USD
        if (rebateType === 'FIXED_AMOUNT' && isTruthy(rebateValue)) {
          unit = 'USD'
        } else if (isTruthy(rebateValue)) {
          unit = '%'
        }
        return rebateValue ? `${rebateValue} ${unit}` : '--'
      }
    },
    {
      title: <FormattedMessage id="mt.agent.kaicangshijian" />,
      dataIndex: 'openTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.agent.pingcangshijian" />,
      dataIndex: 'closeTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    // {
    //   title: <FormattedMessage id="mt.agent.jiesuanshijian" />,
    //   dataIndex: 'settlementTime',
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
      title: <FormattedMessage id="mt.agent.yugujiesuanshijian" />,
      dataIndex: 'estimatedSettlementTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.agent.jiesuanzhuangtai" />,
      dataIndex: 'settlementStatus',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      fixed: 'right',
      align: 'right',
      renderText(text, record, index, action) {
        const hasSettled = text === 'SETTLED'
        return text ? (
          <span className={cn('font-medium', hasSettled ? 'text-green' : 'text-red')}>
            {getEnum().Enum.AgentSettlementStatus[text]?.text}
          </span>
        ) : (
          '--'
        )
      }
    },

    // 表单搜索项
    // 结算时间
    {
      dataIndex: 'time',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[260px]',
        placeholder: [
          intl.formatMessage({ id: 'mt.agent.pingcangkaishishijian' }),
          intl.formatMessage({ id: 'mt.agent.pingcangjieshushijian' })
        ]
      },
      search: {
        transform: (value) => {
          return {
            settlementStartTime: `${value[0]} 00:00:00`,
            settlementEndTime: `${value[1]} 23:59:59`
          }
        }
      },
      colSize: 0.9
    },
    {
      dataIndex: 'userUid',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[100px]',
        placeholder: intl.formatMessage({ id: 'mt.agent.kehuuid' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'userName',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[100px]',
        placeholder: intl.formatMessage({ id: 'mt.agent.xingming' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'accountGroupName',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[100px]',
        placeholder: intl.formatMessage({ id: 'mt.agent.zhanghuzu' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'tradeAccountId',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[100px]',
        placeholder: intl.formatMessage({ id: 'mt.agent.jiaoyizhanghu' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'symbol',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[100px]',
        placeholder: intl.formatMessage({ id: 'mt.agent.jiaoyipinzhong' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'settlementStatus',
      hideInTable: true,
      hideInSearch: false,
      valueType: 'select',
      valueEnum: getEnum().Enum.AgentSettlementStatus,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[110px]',
        placeholder: intl.formatMessage({ id: 'mt.agent.jiesuanzhuangtai' }),
        onChange(value) {
          setSettlementStatus(value)
        }
      },
      colSize: 0.9
    },
    // {
    //   dataIndex: 'levelMode',
    //   hideInTable: true,
    //   hideInSearch: false,
    //   valueType: 'select',
    //   valueEnum: getEnum().Enum.AgentModeSetting,
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fieldProps: {
    //     className: '!w-[100px]',
    //     placeholder: intl.formatMessage({ id: 'mt.agent.jianglileixing' })
    //   },
    //   colSize: 0.9
    // },
    {
      dataIndex: 'rebateType',
      hideInTable: true,
      hideInSearch: false,
      valueType: 'select',
      valueEnum: getEnum().Enum.AgentRebateConfigType,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[120px]',
        placeholder: intl.formatMessage({ id: 'mt.agent.fanyongfangshi' })
      },
      colSize: 0.9
    }
  ]
}
