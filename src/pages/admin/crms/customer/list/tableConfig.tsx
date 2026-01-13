import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl, useLocation } from '@umijs/max'
import classNames from 'classnames'

import { DEFAULT_PRECISION } from '@/constants'

import { formatNum } from '../..'

export const getColumns = (): ProColumns<CrmTrading.StatAccountItem>[] => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const startDate = queryParams.get('startDate')
  const endDate = queryParams.get('endDate')
  const lastLoginStartDate = queryParams.get('lastLoginStartDate')
  const lastLoginEndDate = queryParams.get('lastLoginEndDate')
  const fastAStartTime = queryParams.get('fastAStartTime')
  const fastAEndTime = queryParams.get('fastAEndTime')

  return [
    {
      title: <FormattedMessage id="mt.yonghuuid" />,
      dataIndex: 'account',
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
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.xing" />,
      dataIndex: 'firstName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.ming" />,
      dataIndex: 'lastName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.kaihuqudao" />,
      dataIndex: 'channelId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.rujin" />,
      dataIndex: 'deposit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
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
      title: <FormattedMessage id="mt.shouxufei" />,
      dataIndex: 'handlingFees',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
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
      title: <FormattedMessage id="mt.geyelixi" />,
      dataIndex: 'interestFees',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
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
      title: <FormattedMessage id="mt.chujin" />,
      dataIndex: 'withdrawal',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
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
      title: <FormattedMessage id="mt.jingrujin" />,
      dataIndex: 'netIncome',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
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
      title: <FormattedMessage id="mt.jiaoyiliang" />,
      dataIndex: 'tradingVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
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
      title: <FormattedMessage id="mt.zhuceshijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.shoucirujinshijian" />,
      dataIndex: 'firstAtime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.shangcishangxianshijian" />,
      dataIndex: 'lastLoginTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.zuihoujiaoyishijian" />,
      dataIndex: 'lastTradeTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.yishixianyingkui" />,
      dataIndex: 'profit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        // @ts-ignore
        const profit = record.profit
        const flag = Number(profit) > 0
        const color = flag ? 'text-green-700' : 'text-red-600'
        const profitFormat = formatNum(profit, { precision: DEFAULT_PRECISION })
        return (
          <>
            {profit ? (
              <span className={classNames('font-[800] !font-dingpro-medium', color)}>{flag ? '+' + profitFormat : profitFormat}</span>
            ) : (
              '‑‑'
            )}
          </>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.yue" />,
      dataIndex: 'money',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },

    // 表单搜索项
    {
      dataIndex: 'time1',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      search: {
        transform: (value) => {
          return { startTime: value[0], endTime: value[1] }
        }
      },
      initialValue: startDate && endDate ? [startDate, endDate] : undefined,
      hideInTable: true,
      fieldProps: {
        style: {
          width: 240
        },
        placeholder: [useIntl().formatMessage({ id: 'mt.kaihushijian' }), useIntl().formatMessage({ id: 'mt.kaihushijian' })]
      },
      colSize: 1.5
    },
    {
      dataIndex: 'time2',
      search: {
        transform: (value) => {
          return { fastAStartTime: value[0], fastAEndTime: value[1] }
        }
      },
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      initialValue: fastAStartTime && fastAEndTime ? [fastAStartTime, fastAEndTime] : undefined,
      fieldProps: {
        style: {
          width: 240
        },
        placeholder: [useIntl().formatMessage({ id: 'mt.shourushijian' }), useIntl().formatMessage({ id: 'mt.shourushijian' })]
      },

      colSize: 1.5
    },

    {
      dataIndex: 'time3',
      search: {
        transform: (value) => {
          return { lastLoginStartTime: value[0], lastLoginEndTime: value[1] }
        }
      },
      initialValue: lastLoginStartDate && lastLoginEndDate ? [lastLoginStartDate, lastLoginEndDate] : undefined,
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        style: {
          width: 240
        },
        placeholder: [useIntl().formatMessage({ id: 'mt.zuihoudenglushijian' }), useIntl().formatMessage({ id: 'mt.zuihoudenglushijian' })]
      },
      colSize: 1.5
    },
    // {
    //   dataIndex: 'dateRangeNoTime',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'dateRange', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   initialValue: startDate && endDate ? [startDate, endDate] : undefined,
    //   fieldProps: {
    //     placeholder: [useIntl().formatMessage({ id: 'mt.zhuceshijian' }), useIntl().formatMessage({ id: 'mt.zhuceshijian' })]
    //   }
    // },
    // {
    //   dataIndex: 'tradeAccountId',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   fieldProps: {
    //     placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' })
    //   }
    // },
    {
      dataIndex: 'userUid',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.yonghuuid' }),
        style: { width: 200 }
      },
      colSize: 0.9
    }
  ]
}
