import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getPaymentTypeList } from '@/services/api/receivePayment/receiveManage'
import { formatNum } from '@/utils'

export const getColumns = (): ProColumns<PaymentReceiveReport.ReceiveResourceReportListItem>[] => {
  const intl = useIntl()

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
      width: 200,
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.qudaoleixing" />,
      dataIndex: 'channelNo',
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
      title: <FormattedMessage id="mt.ziyuanzhanghao" />,
      dataIndex: 'resouceAccount',
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
      title: <FormattedMessage id="mt.kehuzhanghao" />,
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
      title: <FormattedMessage id="mt.jiaoyizhanghao" />,
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
      title: <FormattedMessage id="mt.dingdanjine" />,
      dataIndex: 'baseOrderAmount',
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
        // 基准货币单位
        return formatNum(record?.baseOrderAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: <FormattedMessage id="mt.zhifujine" />,
      dataIndex: 'receiptAmount',
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
        // 法币单位
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
      title: <FormattedMessage id="mt.chuangjianshijian" />,
      dataIndex: 'createTime',
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
      title: <FormattedMessage id="mt.daozhangshijian" />,
      dataIndex: 'receiptTime',
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
      align: 'right',
      fixed: 'right'
    },

    // 表单搜索项
    {
      dataIndex: 'channelNoValue',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      request: async () => {
        const res = await getPaymentTypeList()
        const data = res?.data || []
        console.log(
          'data',
          data.map((item: any) => {
            return {
              label: item.channelNo,
              value: item.channelNoValue
            }
          })
        )
        return data.map((item: any) => {
          return {
            label: item.channelNo,
            value: item.channelNoValue
          }
        })
      },
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.qudaoleixing' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'resouceAccount',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.ziyuanzhanghao' })
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
        className: '!w-[300px]',
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
        className: '!w-[300px]',
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
