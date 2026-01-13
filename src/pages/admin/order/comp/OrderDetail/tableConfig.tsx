import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import classNames from 'classnames'

import { getEnum } from '@/constants/enum'
import { formatNum, formatTime } from '@/utils'

export const getColumns = (): ProColumns<Order.OrderDetailListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.danhao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'id',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      onCell: (record) => {
        return {
          onClick: (e) => {
            e.stopPropagation()
          }
        }
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      // fixed: 'left',
      width: 300
    },
    // 客户下单时间
    {
      title: <FormattedMessage id="mt.shijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      render(dom, entity, index, action, schema) {
        return <span className="relative z-[18]">{formatTime(entity.createTime) || '‑‑'}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyiliang" />,
      dataIndex: 'tradingVolume',
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
        return <div className="z-[18] relative">{text ? text : '‑‑'}</div>
      }
    },
    {
      title: <FormattedMessage id="mt.fangxiang" />,
      dataIndex: 'direction',
      // valueEnum: getEnum().Enum.OrderType,
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
        return <span className="relative z-[18]">{text || '‑‑'}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.jiage" />,
      dataIndex: 'price',
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
        return <div className="z-[18] relative !font-dingpro-medium">{text || '‑‑'}</div>
      }
    },
    {
      title: <FormattedMessage id="mt.yuanyin" />,
      dataIndex: 'createReason',
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
        return <span className="relative z-[18]">{getEnum().Enum.OrderCreateReason[text]?.text || '‑‑'}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.yingkui" />,
      dataIndex: 'profit',
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
        const profit = record.profit
        const formatProfit = formatNum(profit, { precision: 2 })
        const flag = Number(profit) > 0
        return profit ? (
          <span className={classNames('relative z-[18] font-semibold', flag ? 'text-green' : 'text-red')}>
            {flag ? `+${formatProfit}` : formatProfit}
          </span>
        ) : (
          <span className="relative z-[18]">--</span>
        )
      }
    }
  ]
}
