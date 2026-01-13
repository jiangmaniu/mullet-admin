import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl } from '@umijs/max'
import dayjs from 'dayjs'

import { DEFAULT_PRECISION } from '@/constants'
import { addAllOptionToEnum } from '@/constants/enum'
import { sysPush } from '@/utils/navigator'

import { TabProps } from '..'

export const getColumns = ({
  params,
  setParams,
  channels,
  registerChannels,
  setActiveKey
}: TabProps): ProColumns<CrmClient.WithdrawalOrderPageListItem>[] => {
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
      renderText(text, record, index, action) {
        return (
          <span className="cursor-pointer underline" onClick={() => sysPush(`/crms/customer/view/${record.userId}`)}>
            {text}
          </span>
        )
      },
      width: 140,
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.jiaoyizhanghu" />,
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
      width: 140
    },
    {
      title: <FormattedMessage id="mt.xing" />,
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
      width: 100
    },
    {
      title: <FormattedMessage id="mt.ming" />,
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
      width: 100
    },
    {
      title: <FormattedMessage id="mt.shoujihao" />,
      dataIndex: 'phone',
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
      width: 140
    },
    {
      title: <FormattedMessage id="mt.youxiang" />,
      dataIndex: 'email',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 220
    },
    {
      title: <FormattedMessage id="mt.yonghuqudao" />,
      dataIndex: 'channelId',
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
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.chujindingdanshijian" />,
      // dataIndex: 'orderTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return record.orderTime ? dayjs(record.orderTime).format('YYYY-MM-DD') : '‑‑'
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.chujinjine" />,
      dataIndex: 'baseOrderAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
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
      title: <FormattedMessage id="mt.chujinshouxufei" />,
      dataIndex: 'baseHandlingFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
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
      title: <FormattedMessage id="mt.shijichujin" />,
      dataIndex: 'baseReceiptAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
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
      title: <FormattedMessage id="mt.chujinhoujieyu" />,
      dataIndex: 'balance',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
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
    //   title: <FormattedMessage id="mt.zhifuqudao" />,
    //   dataIndex: 'channelName',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   align: 'center',
    //   fieldProps: {
    //     // precision: 0,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   renderText(text, record, index, action) {
    //     return text || '‑‑'
    //   },
    //   width: 140
    // },
    // {
    //   title: <FormattedMessage id="mt.shoukuanzhanghaodizhi" />,
    //   dataIndex: 'address',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: true,
    //   copyable: false,
    //   align: 'center',
    //   fieldProps: {
    //     // precision: 0,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   renderText(text, record, index, action) {
    //     return text || '‑‑'
    //   },
    //   width: 400
    // },
    {
      title: <FormattedMessage id="mt.leijichujindingdanshu" />,
      dataIndex: 'orderQuantity',
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
      width: 140,
      renderText(text, record, index, action) {
        return (
          <span
            className="cursor-pointer underline"
            onClick={() => {
              setParams({
                account: record.account,
                tradeAccountId: record.tradeAccountId,
                startDate: dayjs(record.orderTime).format('YYYY-MM-DD'),
                endDate: dayjs(record.orderTime).format('YYYY-MM-DD')
              })
              setActiveKey('Order')
            }}
          >
            {text}
          </span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.chenggongdingdanshu" />,
      dataIndex: 'successOrderQuantity',
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
      width: 140,
      renderText(text, record, index, action) {
        return (
          <span
            className="cursor-pointer underline"
            onClick={() => {
              setParams({
                account: record.account,
                tradeAccountId: record.tradeAccountId,
                startDate: dayjs(record.orderTime).format('YYYY-MM-DD'),
                endDate: dayjs(record.orderTime).format('YYYY-MM-DD')
              })
              setActiveKey('Order')
            }}
          >
            {text}
          </span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.leijichujin" />,
      dataIndex: 'totalWithdrawalAmount',
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
    // 表单搜索项
    {
      dataIndex: 'dateRangeNoTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: [getIntl().formatMessage({ id: 'mt.chujinshijian' }), getIntl().formatMessage({ id: 'mt.chujinjieshushijian' })]
      },
      colSize: 0.9
    },
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
      dataIndex: 'account',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      initialValue: params?.account,
      fieldProps: {
        style: { width: 140 },
        placeholder: getIntl().formatMessage({ id: 'mt.yonghuuid' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'tradeAccountId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      initialValue: params?.tradeAccountId,
      fieldProps: {
        style: { width: 140 },
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' })
      },
      colSize: 0.9
    },
    // TODO:入金状态&首入用户，暂时还做不了，现在还没有对接支付渠道
    // {
    //   dataIndex: 'rujin',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueType: 'select',
    //   valueEnum: addAllOptionToEnum(getEnum().Enum.DepositStatus),
    //   fieldProps: {
    //     placeholder: getIntl().formatMessage({ id: 'mt.rujinzhuangtai' }),
    //     style: { width: 120 }
    //   },
    //   colSize: 0.9
    // },
    // {
    //   dataIndex: 'shouru',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueType: 'select',
    //   valueEnum: addAllOptionToEnum(getEnum().Enum.FirstTimeUser),
    //   fieldProps: {
    //     placeholder: getIntl().formatMessage({ id: 'mt.shouruyonghu' }),
    //     style: { width: 120 }
    //   },
    //   colSize: 0.9
    // },
    {
      dataIndex: 'channelId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: addAllOptionToEnum(registerChannels),
      initialValue: params?.channelId,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.yonghuqudao' }),
        style: { width: 180 }
      },
      colSize: 0.9
    },
    {
      dataIndex: 'channelType',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: addAllOptionToEnum(channels),
      initialValue: params?.channelType,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.zhifuqudao' }),
        style: { width: 180 }
      },
      colSize: 0.9
    }
  ]
}
