import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { formatNum } from '@/utils'

export const getColumns = (): ProColumns<PaymentWithdraw.WithdrawalOrderPageListItem>[] => {
  return [
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
      width: 255,
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.qudaodingdanhao" />,
      dataIndex: 'channelOrderNo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.chuangjianshijian" />,
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
      title: <FormattedMessage id="mt.yonghuuid" />,
      dataIndex: 'account',
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
      title: <FormattedMessage id="mt.jiaoyizhanghu" />,
      dataIndex: 'tradeAccountId',
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
      title: <FormattedMessage id="mt.zhifuqudao" />,
      dataIndex: 'channelName',
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
    // @TODO 暂时没字段
    {
      title: <FormattedMessage id="mt.zhifutongdao" />,
      dataIndex: 'channelRevealName',
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
      title: <FormattedMessage id="mt.chujinjine" />,
      dataIndex: 'orderAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180,
      renderText(text, record, index, action) {
        return formatNum(record?.orderAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: <FormattedMessage id="mt.shouxufei" />,
      dataIndex: 'baseHandlingFee',
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
        return formatNum(record?.baseHandlingFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: <FormattedMessage id="mt.daozhangjine" />,
      dataIndex: 'receiptAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        return formatNum(record?.receiptAmount, { precision: 2, noDataFormat: '0', unit: record.symbol })
      }
    },
    {
      title: <FormattedMessage id="mt.duihuanhuilv" />,
      dataIndex: 'exchangeRate',
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
      title: <FormattedMessage id="mt.dingdanzhuangtai" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueEnum: getEnum().Enum.PaymentWithdrawalOrderStatus
    },
    {
      title: <FormattedMessage id="mt.beizhu" />,
      dataIndex: 'remark',
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
      title: <FormattedMessage id="mt.gengxinshijian" />,
      dataIndex: 'updateTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      fixed: 'right',
      align: 'right'
    },

    // 表单搜索项
    {
      dataIndex: 'orderNo',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.dingdanhao' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'account',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.yonghuuid' })
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
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.jiaoyizhanghao' })
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
      valueEnum: getEnum().Enum.PaymentWithdrawalOrderStatus,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.dingdanzhuangtai' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'create_time',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'dateRange',
      fieldProps: {
        className: '!w-[250px]',
        placeholder: [
          useIntl().formatMessage({ id: 'mt.chuangjiankaishishijian' }),
          useIntl().formatMessage({ id: 'mt.chuangjianjieshushijian' })
        ]
      },
      search: {
        transform: (value) => {
          return {
            createStartTime: `${value[0]} 00:00:00`,
            createEndTime: `${value[1]} 24:59:59`
          }
        }
      },
      colSize: 0.9
    },
    {
      dataIndex: 'receipt_time',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'dateRange',
      fieldProps: {
        className: '!w-[250px]',
        placeholder: [
          useIntl().formatMessage({ id: 'mt.daozhangkaishishijian' }),
          useIntl().formatMessage({ id: 'mt.daozhangjieshushijian' })
        ]
      },
      search: {
        transform: (value) => {
          return {
            receiptStartTime: `${value[0]} 00:00:00`,
            receiptEndTime: `${value[1]} 24:59:59`
          }
        }
      },
      colSize: 0.9
    }
  ]
}
