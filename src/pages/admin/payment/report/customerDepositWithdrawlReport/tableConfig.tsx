import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { formatNum } from '@/utils'

export const getColumns = (): ProColumns<PaymentReport.UserReportListItem>[] => {
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
      width: 200
      // fixed: 'left'
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
    // {
    //   title: <FormattedMessage id="mt.huobileixing" />,
    //   dataIndex: 'baseCurrency',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 120
    // },
    {
      title: <FormattedMessage id="mt.dingdanshuliang" />,
      dataIndex: 'orderQuantity',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.rujinchenggongshuliang" />,
      dataIndex: 'depositSuccessQuantity',
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
      title: <FormattedMessage id="mt.chujinchenggongshuliang" />,
      dataIndex: 'withdrawSuccessQuantity',
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
      title: <FormattedMessage id="mt.rujinjine" />,
      dataIndex: 'customerDepositAmount',
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
        return <span className="relative z-[18]">{formatNum(text, { precision: 2, unit: 'USD', noDataFormat: '0' })}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.rujinshouxufei" />,
      dataIndex: 'depositHandlingFee',
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
        return <span className="relative z-[18]">{formatNum(text, { precision: 2, unit: 'USD', noDataFormat: '0' })}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.chujinjine" />,
      dataIndex: 'customerWithdrawAmount',
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
        return <span className="relative z-[18]">{formatNum(text, { precision: 2, unit: 'USD', noDataFormat: '0' })}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.chujinshouxufei" />,
      dataIndex: 'withdrawHandlingFee',
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
        return <span className="relative z-[18]">{formatNum(text, { precision: 2, unit: 'USD', noDataFormat: '0' })}</span>
      },
      tooltip: <FormattedMessage id="mt.chujinshouxufeitips" />
    },
    {
      title: <FormattedMessage id="mt.chujindaozhangjine" />,
      dataIndex: 'withdrawalReceiptAmount',
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
        return <span className="relative z-[18]">{formatNum(text, { precision: 2, unit: 'USD', noDataFormat: '0' })}</span>
      },
      tooltip: <FormattedMessage id="mt.chujindaozhangjinetips" />
    },
    {
      title: <FormattedMessage id="mt.shouxufeiheji" />,
      dataIndex: 'totalHandlingFee',
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
        return <span className="relative z-[18]">{formatNum(text, { precision: 2, unit: 'USD', noDataFormat: '0' })}</span>
      },
      tooltip: <FormattedMessage id="mt.shouxufeihejitips" />
    },
    {
      title: <FormattedMessage id="mt.jingrujinheji" />,
      dataIndex: 'totalDwAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      align: 'right',
      fixed: 'right',
      renderText(text, record, index, action) {
        return <span className="relative z-[18]">{formatNum(text, { precision: 2, unit: 'USD', noDataFormat: '0' })}</span>
      },
      tooltip: <FormattedMessage id="mt.jingrujinhejitips" />
    },

    // 表单搜索项
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
      dataIndex: 'dateRange',
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
      colSize: 0.9
    }
  ]
}
