import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'

import { addAllOptionToEnum, getEnum } from '@/constants/enum'

import { TabProps } from '..'
import { formatNum } from '../..'

export const getColumns = ({
  setActiveKey,
  params,
  setParams,
  channels,
  channelNoValues
}: TabProps): ProColumns<CrmClient.DepositOrderDetailPageListItem>[] => {
  const t = useIntl().formatMessage

  return [
    {
      title: <FormattedMessage id="mt.shengchengdingdanriqi" />,
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
    {
      title: <FormattedMessage id="mt.shourudingdan" />,
      dataIndex: 'isFirst',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text === 1 ? <FormattedMessage id="common.yes" /> : <FormattedMessage id="common.no" />
      },
      align: 'center',
      width: 100
    },
    {
      title: <FormattedMessage id="mt.dingdanhao" />,
      dataIndex: 'orderNo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
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
      width: 140
    },
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
      width: 140
    },
    {
      title: <FormattedMessage id="mt.yonghuqudao" />,
      dataIndex: 'channelId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },

    {
      title: <FormattedMessage id="mt.xing" />,
      dataIndex: 'lastName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      align: 'center',
      width: 100
    },
    {
      title: <FormattedMessage id="mt.ming" />,
      dataIndex: 'firstName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      align: 'center',
      width: 100
    },

    {
      title: <FormattedMessage id="mt.jine" />,
      dataIndex: 'baseOrderAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      // fieldProps: {
      //   precision: 2,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      renderText(text, record, index, action) {
        return <span className="font-pf-bold">{formatNum(text, { precision: 2 })}</span>
      },
      align: 'right',
      width: 160
    },

    {
      title: <FormattedMessage id="mt.zhifutongdao" />,
      dataIndex: 'channelName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      width: 140
    },

    {
      title: <FormattedMessage id="mt.rujinfangshi" />,
      dataIndex: 'channelNo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      width: 140
    },

    {
      title: <FormattedMessage id="mt.zhifushijian" />,
      dataIndex: 'receiptTime',
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
      title: <FormattedMessage id="mt.dingdanzhuangtai" />,
      dataIndex: 'status',
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
        return getEnum().Enum.PaymentDepositOrderStatus[text]?.text || text
      },
      align: 'right',
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
        placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
      }
    },
    {
      dataIndex: 'account',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        style: { width: 140 },
        placeholder: getIntl().formatMessage({ id: 'mt.yonghuuid' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'orderNo',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        style: { width: 140 },
        placeholder: getIntl().formatMessage({ id: 'mt.dingdanhao' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'tradeAccountId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        style: { width: 140 },
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'isFirst',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: getEnum().Enum.Number,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.shifoushouru' }),
        style: { width: 120 }
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
        style: { width: 120 }
      },
      colSize: 0.9
    },
    {
      dataIndex: 'channelNoValue',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: addAllOptionToEnum(channelNoValues),
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.rujinfangshi' }),
        style: { width: 120 }
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: addAllOptionToEnum(getEnum().Enum.PaymentStatus),
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.dingdanzhuangtai' }),
        style: { width: 120 }
      },
      colSize: 0.9
    }
  ]
}
