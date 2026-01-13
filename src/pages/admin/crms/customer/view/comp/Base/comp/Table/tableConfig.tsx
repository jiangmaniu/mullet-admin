import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import classNames from 'classnames'

import { DEFAULT_PRECISION } from '@/constants'
import { formatNum } from '@/pages/admin/crms'

export const getColumns = (): ProColumns<CrmClient.ClientAccountItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.jiaoyizhanghu" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'tradeAccountId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 200,
      fieldProps: {}
    },
    {
      title: <FormattedMessage id="mt.mingcheng" />,
      dataIndex: 'name',
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
      title: <FormattedMessage id="mt.zubie" />,
      dataIndex: 'groupCode',
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
      width: 100
    },
    {
      title: <FormattedMessage id="mt.yue" />,
      dataIndex: 'money',
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
      width: 100
    },
    {
      title: <FormattedMessage id="mt.jiaoyiliang" />,
      dataIndex: 'tradingVolume',
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
      width: 100
    },
    {
      title: <FormattedMessage id="mt.jingrujin" />,
      dataIndex: 'netIncome',
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
      width: 100
    },
    {
      title: (
        <>
          <FormattedMessage id="mt.yishixianyingkui" />
          (USD)
        </>
      ),
      dataIndex: 'profit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      align: 'center',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      // fixed: 'right',
      // align: 'right',
      renderText(text, record, index, action) {
        const profit = formatNum(record.profit, { precision: DEFAULT_PRECISION })
        return profit ? (
          <span className={classNames('font-semibold', Number(profit) > 0 ? 'text-green' : 'text-red')}>
            {Number(profit) > 0 ? '+' + profit : profit}
          </span>
        ) : (
          '0'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.zhanyongbaozhengjin" />,
      dataIndex: 'orderBaseMargin',
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
      width: 120
    },
    // {
    //   title: <FormattedMessage id="mt.weichibaozhengjinlv" />,
    //   dataIndex: 'marginRate',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   align: 'center',
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 140,
    //   renderText(text, record, index, action) {
    //     // 净值/暂用
    //     return record.netIncome && record.margin ? toFixed(record.netIncome / record.margin) + '%' : '0'
    //   }
    // },
    {
      title: <FormattedMessage id="mt.kaihushijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'right',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    }

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
    // }
  ]
}
