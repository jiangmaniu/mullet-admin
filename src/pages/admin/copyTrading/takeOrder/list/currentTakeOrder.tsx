import { FormattedMessage, getIntl } from '@umijs/max'
import { Popconfirm } from 'antd'
import classNames from 'classnames'

import { IStandardTableProps } from '@/components/Admin/StandardTable'
import { getEnum } from '@/constants/enum'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'
import { push } from '@/utils/navigator'

export default (): IStandardTableProps<TradeFollowLead.TradeFollowCurrentLeadOrderItem, TradeFollowLead.TradeFollowLeadOrderParams> => ({
  showOptionColumn: true,
  opColumnWidth: 140,
  tableExtraRender: () => {
    // 占位符
    return <div className="h-[30px]"></div>
  },
  columns: [
    {
      title: <FormattedMessage id="mt.symbol" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'symbol',
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
      title: <FormattedMessage id="mt.yonghuuid" />,
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
      title: <FormattedMessage id="mt.jiaoyizhanghuzu" />,
      dataIndex: 'type',
      valueEnum: getEnum().Enum.TradeBuySell,
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180
    },
    {
      title: <FormattedMessage id="mt.jiaoyizhanghu" />,
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
      title: <FormattedMessage id="mt.xiangmumingcheng" />,
      dataIndex: 'name',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.fangxiang" />,
      dataIndex: 'tradeBuySell',
      valueEnum: getEnum().Enum.TradeBuySell,
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.dingdanhao" />,
      dataIndex: 'id',
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
      title: <FormattedMessage id="mt.shoushu" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    // {
    //   title: <FormattedMessage id="mt.pingcangjia" />,
    //   dataIndex: 'tradePrice',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     precision: 2,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 140
    // },
    {
      title: <FormattedMessage id="mt.kaicangjunjia" />,
      dataIndex: 'startPrice',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.daidanyingkui" />,
      dataIndex: 'profit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      renderText(text, record, index, action) {
        const profit = Number(record.profit || 0)
        return profit ? (
          <span className={classNames('font-semibold', profit > 0 ? 'text-green' : 'text-red')}>{profit > 0 ? '+' + profit : profit}</span>
        ) : (
          '‑‑'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.gendanrenshu" />,
      dataIndex: 'num',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
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
      width: 200
    },

    // 表单搜索项
    {
      dataIndex: 'dateRange',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: [getIntl().formatMessage({ id: 'common.startDate' }), getIntl().formatMessage({ id: 'common.endDate' })]
      }
    },
    {
      dataIndex: 'name',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.sousuouid' })
      }
    },
    {
      dataIndex: 'accountGroupId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      request: async () => {
        const data = await getAccountGroupPageList({ current: 1, size: 999 })
        return (data.data?.records || []).filter((v) => !v.isSimulate).map((item) => ({ label: item.groupName, value: item.id }))
      },
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.zhanghuleixing' })
      }
    },
    {
      dataIndex: 'accountId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghao' })
      }
    }
  ],
  renderOptionColumn: (record) => {
    return (
      <div className="flex gap-x-5 justify-end">
        <a
          className="!text-primary font-medium text-sm cursor-pointer"
          onClick={() => {
            push(`/copy-trading/take/view/${record.id}`)
          }}
        >
          <FormattedMessage id="common.chakan" />
        </a>
        <Popconfirm
          title={<FormattedMessage id="mt.querenjieshugaibidingdanma" />}
          onConfirm={() => {
            // @TODO
          }}
        >
          <a className="!text-primary font-medium text-sm cursor-pointer">
            <FormattedMessage id="mt.jieshu" />
          </a>
        </Popconfirm>
      </div>
    )
  }
})
