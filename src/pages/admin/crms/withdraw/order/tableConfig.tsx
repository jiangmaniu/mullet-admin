import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl } from '@umijs/max'

import { addAllOptionToEnum, getEnum } from '@/constants/enum'

import { TabProps } from '..'

export const getColumns = ({ params, setParams, channels }: TabProps): ProColumns<CrmClient.WithdrawalOrderDetailPageListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.shengchengdingdanriqi" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      width: 200
    },
    {
      title: <FormattedMessage id="mt.dingdanhao" />,
      dataIndex: 'orderNo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 280
    },
    {
      title: <FormattedMessage id="mt.qudaodingdanhao" />,
      dataIndex: 'channelOrderNo',
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
        return text || '‑‑'
      },
      width: 200
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
      width: 180
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
      width: 220
    },
    {
      title: <FormattedMessage id="mt.shoukuanzhanghao" />,
      dataIndex: 'address',
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
        return text || '‑‑'
      },
      width: 200
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
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
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
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.zhifutongdao" />,
      dataIndex: 'channelName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      // fieldProps: {
      //   precision: 0,
      //   placeholder: ''
      // },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 180
    },

    {
      title: <FormattedMessage id="mt.chujinjine" />,
      dataIndex: 'baseOrderAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        precision: 0,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180
    },

    {
      title: <FormattedMessage id="mt.shouxufei" />,
      dataIndex: 'baseHandlingFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        precision: 0,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180
    },

    {
      title: <FormattedMessage id="mt.daozhangjine" />,
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
      width: 180
    },

    {
      title: <FormattedMessage id="mt.pingtaihuilv" />,
      dataIndex: 'exchangeRate',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        precision: true,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180
    },

    // {
    //   title: <FormattedMessage id="mt.qudaohuilv" />,
    //   dataIndex: 'channelExchangeRate',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     precision: 0,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 180
    // },

    // {
    //   title: <FormattedMessage id="mt.qudaoshoukuanjine" />,
    //   dataIndex: 'channelBaseFandlingFee',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     precision: 0,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 180
    // },

    {
      title: <FormattedMessage id="mt.daozhangshijian" />,
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
      align: 'right',
      fieldProps: {
        placeholder: ''
      },
      fixed: 'right',
      renderText(text, record, index, action) {
        return getEnum().Enum.PaymentWithdrawalOrderStatus[text]?.text || text
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
        placeholder: [
          `${getIntl().formatMessage({ id: 'mt.shengchengdingdan' })}${getIntl().formatMessage({ id: 'mt.kaishishijian' })}`,
          `${getIntl().formatMessage({ id: 'mt.shengchengdingdan' })}${getIntl().formatMessage({ id: 'mt.jieshushijian' })}`
        ]
      }
    },

    {
      dataIndex: 'orderNo',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      initialValue: params?.orderNo,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.dingdanhao' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'channelOrderNo',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.qudaodingdanhao' })
      },
      colSize: 0.9
    },
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
      fieldProps: {
        style: { width: 140 },
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' })
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
        placeholder: getIntl().formatMessage({ id: 'mt.yonghuqudao' }),
        style: { width: 180 }
      },
      colSize: 0.9
    }
    // @TODO 接口暂时不支持
    // {
    //   dataIndex: 'status',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueType: 'select',
    //   valueEnum: addAllOptionToEnum(getEnum().Enum.ReceiptStatus),
    //   fieldProps: {
    //     placeholder: getIntl().formatMessage({ id: 'mt.dingdanzhuangtai' }),
    //     style: { width: 120 }
    //   },
    //   colSize: 0.9
    // }
  ]
}
