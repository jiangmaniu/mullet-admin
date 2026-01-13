import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { formatNum } from '@/utils'

export const getColumns = (): ProColumns<PaymentReport.PlatformReportListItem>[] => {
  const intl = useIntl()
  return [
    {
      title: <FormattedMessage id="mt.tongjiriqi" />,
      dataIndex: 'statisticsDate1',
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
      fixed: 'left',
      renderText(text, record, index, action) {
        return record.statisticsDate
      }
    },
    {
      title: <FormattedMessage id="mt.tongjibizhong" />,
      dataIndex: 'symbol',
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
      title: <FormattedMessage id="mt.dingdanzongshu" />,
      dataIndex: 'orderQuantity',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      tooltip: <FormattedMessage id="mt.dingdanzongshutips" />
    },
    {
      title: <FormattedMessage id="mt.rujinchenggongshu" />,
      dataIndex: 'depositSuccessesQuantity',
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
      title: <FormattedMessage id="mt.chujinchenggongshu" />,
      dataIndex: 'withdrawalSuccessesQuantity',
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
      title: <FormattedMessage id="mt.kehurujinjine" />,
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
        return formatNum(record.customerDepositAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: <FormattedMessage id="mt.kehurujinshouxufei" />,
      dataIndex: 'customerDepositFee',
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
        return formatNum(record.customerDepositFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: (
        <span className="font-pf-bold">
          <FormattedMessage id="mt.pingtairujinshouxufei" />
        </span>
      ),
      dataIndex: 'platformDepositFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      tooltip: intl.formatMessage({ id: 'mt.pingtairujinshouxufeitips' }),
      width: 180,
      renderText(text, record, index, action) {
        return formatNum(record.platformDepositFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: (
        <span className="font-pf-bold">
          <FormattedMessage id="mt.kehuchujinjine" />
        </span>
      ),
      dataIndex: 'customerWithdrawAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      tooltip: intl.formatMessage({ id: 'mt.kehuchujinjinetips' }),
      width: 180,
      renderText(text, record, index, action) {
        return formatNum(record.customerWithdrawAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: <FormattedMessage id="mt.kehuchujinshouxufei" />,
      dataIndex: 'customerWithdrawFee',
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
        return formatNum(record.customerWithdrawFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: (
        <span className="font-pf-bold">
          <FormattedMessage id="mt.kehudaozhangjine" />
        </span>
      ),
      dataIndex: 'customrReceiptAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      tooltip: intl.formatMessage({ id: 'mt.kehudaozhangjinetips' }),
      width: 180,
      renderText(text, record, index, action) {
        return formatNum(record.customrReceiptAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: (
        <span className="font-pf-bold">
          <FormattedMessage id="mt.pingtaichujinshouxufei" />
        </span>
      ),
      dataIndex: 'platformWithdrawFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      tooltip: intl.formatMessage({ id: 'mt.pingtaichujinshouxufeitips' }),
      width: 180,
      renderText(text, record, index, action) {
        return formatNum(record.platformWithdrawFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: (
        <span className="font-pf-bold">
          <FormattedMessage id="mt.pingtaishouxufeiheji" />
        </span>
      ),
      dataIndex: 'platformTotalFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      tooltip: intl.formatMessage({ id: 'mt.pingtaishouxufeihejitips' }),
      width: 180,
      renderText(text, record, index, action) {
        return formatNum(record.platformTotalFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },
    {
      title: (
        <span className="font-pf-bold">
          <FormattedMessage id="mt.dangrijingrujin" />
        </span>
      ),
      dataIndex: 'platformBalance',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      tooltip: intl.formatMessage({ id: 'mt.dangrijingrujintips' }),
      width: 180,
      fixed: 'right',
      align: 'right',
      renderText(text, record, index, action) {
        return formatNum(record.platformBalance, { precision: 2, noDataFormat: '0', unit: 'USD' })
      }
    },

    // 表单搜索项
    // {
    //   dataIndex: 'symbol',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueType: 'select',
    //   fieldProps: {
    //     className: '!w-[140px]',
    //     placeholder: useIntl().formatMessage({ id: 'mt.jizhunhuobi' })
    //   },
    //   colSize: 0.9,
    //   request: async () => {
    //     const res = await getBaseCurrencyDict()
    //     const data = (res.data || []).map((item) => {
    //       return {
    //         label: item.key,
    //         value: item.value
    //       }
    //     })
    //     return data
    //   }
    // },
    {
      dataIndex: 'timeType',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: getEnum().Enum.PaymentStatisticalPeriod,
      fieldProps: {
        className: '!w-[170px]',
        placeholder: useIntl().formatMessage({ id: 'mt.tongjizhouqi' })
      },
      colSize: 0.9,
      initialValue: 'DAY'
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
