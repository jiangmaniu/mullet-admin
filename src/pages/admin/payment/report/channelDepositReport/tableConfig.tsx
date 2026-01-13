import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { getPaymentChannelType } from '@/services/api/payment/channel'
import { formatNum } from '@/utils'

export const getColumns = (): ProColumns<PaymentReport.ChannelDepositReportListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.tongjiriqi" />,
      dataIndex: 'statisticsDate1',
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
        return record.statisticsDate
      },
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.qudaomingcheng" />,
      dataIndex: 'channelName',
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
      title: <FormattedMessage id="mt.zhifutongdao" />,
      dataIndex: 'channelRevealName',
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
      title: <FormattedMessage id="mt.rujinbizhong" />,
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
      title: <FormattedMessage id="mt.rujindingdanshu" />,
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
      tooltip: <FormattedMessage id="mt.gaitongdaosuoyoudingdanshu" />
    },
    {
      title: <FormattedMessage id="mt.rujinchenggongshu" />,
      dataIndex: 'successesQuantity',
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
    // 客户转入金额法币
    {
      title: <FormattedMessage id="mt.kehuzhuanrujine" />,
      dataIndex: 'orderAmount',
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
        return formatNum(record?.orderAmount, { precision: 2, noDataFormat: '0', unit: record.symbol })
      },
      tooltip: <FormattedMessage id="mt.fabirujinjine" />
    },
    // 平台入金手续费法币
    {
      title: <FormattedMessage id="mt.pingtairujinshouxufei" />,
      dataIndex: 'platformDepositFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      renderText(text, record, index, action) {
        return formatNum(record?.platformDepositFee, { precision: 2, noDataFormat: '0', unit: record.symbol })
      },
      tooltip: <FormattedMessage id="mt.pingtairujinshouxufeitishi" />
    },
    {
      title: <FormattedMessage id="mt.qudaodaozhangheji" />,
      dataIndex: 'channelReceiptAmount',
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
        return formatNum(record?.channelReceiptAmount, { precision: 2, noDataFormat: '0', unit: record.symbol })
      },
      tooltip: <FormattedMessage id="mt.qudaodaozhanghejitips" />
    },
    {
      title: <FormattedMessage id="mt.kehurujinshouxufei" />,
      dataIndex: 'handlingFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      renderText(text, record, index, action) {
        return formatNum(record?.handlingFee, { precision: 2, noDataFormat: '0', unit: record.symbol })
      },
      tooltip: <FormattedMessage id="mt.kehurujinshouxufeitishi" />
    },
    {
      title: <FormattedMessage id="mt.qudaohuilv" />,
      dataIndex: 'channelExchangeRate',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      tooltip: <FormattedMessage id="mt.qudaohuilvtishi" />
    },
    {
      title: <FormattedMessage id="mt.pingtaihuilv" />,
      dataIndex: 'platformExchangeRate',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      tooltip: <FormattedMessage id="mt.pingtaihuilvtips" />
    },
    // {
    //   title: <FormattedMessage id="mt.rujinhuichashouyi" />,
    //   dataIndex: 'platformExchangeIncome',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150,
    //   renderText(text, record, index, action) {
    //     return formatNum(record?.platformExchangeIncome, { precision: 2, noDataFormat: '0', unit: record.symbol })
    //   },
    //   tooltip: <FormattedMessage id="mt.rujinhuichashouyitips2" />
    // },
    // {
    //   title: <FormattedMessage id="mt.qudaojiesuanjine" />,
    //   dataIndex: 'channelSettlementAmount',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150,
    //   renderText(text, record, index, action) {
    //     return formatNum(record?.channelSettlementAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
    //   },
    //   tooltip: <FormattedMessage id="mt.qudaojiesuanjieetishi" />
    // },
    // 基准货币
    {
      title: <FormattedMessage id="mt.kehurujinjine" />,
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
        return formatNum(record?.baseOrderAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.kehurujinjinetishi" />
    },
    {
      title: <FormattedMessage id="mt.kehurujinshouxufei" />,
      dataIndex: 'baseHandlingFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      renderText(text, record, index, action) {
        return formatNum(record?.baseHandlingFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.kehurujinshouxufeitips" />
    },
    // 客户转入金额基准
    {
      title: <FormattedMessage id="mt.kehuzhuanrujine" />,
      dataIndex: 'baseActualOrderAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      renderText(text, record, index, action) {
        return formatNum(record?.baseActualOrderAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.kehuzhuanrujinetips" />
    },
    // 平台入金手续费基准
    {
      title: <FormattedMessage id="mt.pingtairujinshouxufei" />,
      dataIndex: 'platformBaseDepositFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      renderText(text, record, index, action) {
        return formatNum(record?.platformBaseDepositFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.pingtairujinshouxufeitishi2" />
    },
    {
      title: <FormattedMessage id="mt.pingtairuzhangheji" />,
      dataIndex: 'platformAccountAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      fixed: 'right',
      align: 'right',
      renderText(text, record, index, action) {
        return formatNum(record?.platformAccountAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.pingtairuzhanghejitips" />
    },

    // 表单搜索项
    {
      dataIndex: 'channelType',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        className: '!w-[170px]',
        placeholder: useIntl().formatMessage({ id: 'mt.qudaoshang' })
      },
      request: async () => {
        const res = await getPaymentChannelType()
        return (res.data || []).filter((item) => item.dictKey !== 'balance').map((item) => ({ label: item.dictValue, value: item.dictKey }))
      },
      colSize: 0.9
    },
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
