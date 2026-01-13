import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

import { DEFAULT_PRECISION } from '@/constants'
import { numberFormatUnit } from '@/utils/number'

export const getColumns = (): ProColumns<CrmTrading.ProfitSymbolItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.paiming" />,
      dataIndex: 'num',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 60,
      fixed: 'left',
      align: 'center',
      renderText(text, record, index, action) {
        // 获取当前页码和每页显示数量
        const { current = 1, pageSize = 10 } = action?.pageInfo || {}

        // 计算实际序号
        const actualIndex = (current - 1) * pageSize + index + 1
        return actualIndex <= 3 ? (
          <img src="/img/huo.png" width={20} height={20} />
        ) : (
          <span className="text-gray font-semibold">{actualIndex}</span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.chanpinmingcheng" />,
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.jiaoyirenshu" />,
      dataIndex: 'personCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      align: 'center',
      fieldProps: {
        precision: 0,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
      // fixed: 'right',
      // align: 'right'
    },
    {
      title: <FormattedMessage id="mt.jiaoyicishu" />,
      dataIndex: 'tradeCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      align: 'center',
      fieldProps: {
        precision: 0,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.jiaoyiliang" />,
      dataIndex: 'tradingVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.yinglijine" />,
      dataIndex: 'profit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      align: 'right',
      ellipsis: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        const val = Number(text)
        return (
          <span className="text-green">{text && text !== '0' ? `${numberFormatUnit(val, { precision: DEFAULT_PRECISION })}` : '0'}</span>
        )
      },
      width: 100
    }
    // {
    //   title: <FormattedMessage id="mt.jiaoyishoushu" />,
    //   dataIndex: 'tradingVolume',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     precision: 2,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 100
    // }
  ]
}
