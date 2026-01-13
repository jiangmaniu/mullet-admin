import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl } from '@umijs/max'
import dayjs from 'dayjs'

import { addAllOptionToEnum } from '@/constants/enum'
import { sysPush } from '@/utils/navigator'

import { TabProps } from '..'

export const getColumns = ({
  setActiveKey,
  params,
  setParams,
  channels,
  registerChannels
}: TabProps): ProColumns<CrmClient.DepositOrderPageListItem>[] => {
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
      width: 150,
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
      width: 200
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
      width: 180
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
      width: 200
    },
    {
      title: <FormattedMessage id="mt.shouru" />,
      dataIndex: 'firstAMoney',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        const isFirstA = Number(text) > 0
        return (
          <>
            {isFirstA ? (
              <span>
                <FormattedMessage id="common.yes" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="common.no" />
              </span>
            )}
          </>
        )
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.shengchengdingdan" />,
      dataIndex: 'orderQuantity',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
      // fieldProps: {
      //   precision: 0,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
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
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.chenggongdingdan" />,
      dataIndex: 'successOrderQuantity',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',

      renderText(text, record, index, action) {
        return (
          <span
            className="cursor-pointer underline"
            onClick={() => {
              setParams({
                account: record.account,
                tradeAccountId: record.tradeAccountId,
                status: 'SUCCESS',
                startDate: dayjs(record.orderTime).format('YYYY-MM-DD'),
                endDate: dayjs(record.orderTime).format('YYYY-MM-DD')
              })
              setActiveKey('Order')
            }}
          >
            {text}
          </span>
        )
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.kaihuqudao" />,
      dataIndex: 'channelId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
      fieldProps: {
        // precision: 0,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.kaihushijian" />,
      dataIndex: 'regTime',
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
      title: <FormattedMessage id="mt.dingdanshijian" />,
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
        return <span>{record.orderTime}</span>
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.dingdanjine" />,
      dataIndex: 'money',
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
      width: 120
    },
    // {
    //   title: <FormattedMessage id="mt.zhifuqudao" />,
    //   dataIndex: 'channelName',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   align: 'center',
    //   fieldProps: {
    //     // precision: DEFAULT_PRECISION,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 120
    // },
    // {
    //   title: <FormattedMessage id="mt.rujinfangshi" />,
    //   dataIndex: 'incomingType',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: true,
    //   copyable: false,
    //   align: 'center',
    //   fieldProps: {
    //     // precision: DEFAULT_PRECISION,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 160
    // },
    // 表单搜索项
    {
      dataIndex: 'dateRangeNoTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      initialValue: params?.startDate && params?.endDate ? [params?.startDate, params?.endDate] : undefined,
      fieldProps: {
        // placeholder: [useIntl().formatMessage({ id: 'mt.rujinshijian' })]
        placeholder: [
          `${getIntl().formatMessage({ id: 'mt.dingdan' })}${getIntl().formatMessage({ id: 'mt.kaishishijian' })}`,
          `${getIntl().formatMessage({ id: 'mt.dingdan' })}${getIntl().formatMessage({ id: 'mt.jieshushijian' })}`
        ]
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
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.zhifuqudao' }),
        style: { width: 180 }
      },
      colSize: 0.9
    }
  ]
}
