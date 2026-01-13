import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { getPaymentChannelType } from '@/services/api/payment/channel'
import { formatNum } from '@/utils'

export const getColumns = (): ProColumns<PaymentReport.ChannelWithdrawalReportListItem>[] => {
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
      title: <FormattedMessage id="mt.qudaobizhong" />,
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
      title: (
        <span className="font-pf-bold">
          <FormattedMessage id="mt.chujindingdanshu" />
        </span>
      ),
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
      tooltip: <FormattedMessage id="mt.zongdingdanshu" />
    },
    {
      title: <FormattedMessage id="mt.chujinchenggongshu" />,
      dataIndex: 'successesQuantity',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      tooltip: <FormattedMessage id="mt.chujinchenggongshutips" />
    },
    {
      title: <FormattedMessage id="mt.qudaochujinjine" />,
      dataIndex: 'channelWithdrawAmount',
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
        return formatNum(record?.channelWithdrawAmount, { precision: 2, noDataFormat: '0', unit: record.symbol })
      },
      tooltip: <FormattedMessage id="mt.qudaochujinjinetips" />
    },
    {
      title: <FormattedMessage id="mt.qudaochujinshouxufei" />,
      dataIndex: 'channelWithdrawFee',
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
        return formatNum(record?.channelWithdrawFee, { precision: 2, noDataFormat: '0', unit: record.symbol })
      },
      tooltip: <FormattedMessage id="mt.qudaochujinshouxufeitips2" />
    },
    {
      title: <FormattedMessage id="mt.qudaochujinheji" />,
      dataIndex: 'channelWithdrawTotalAmount',
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
        return formatNum(record?.channelWithdrawTotalAmount, { precision: 2, noDataFormat: '0', unit: record.symbol })
      },
      tooltip: <FormattedMessage id="mt.qudaochujinhejitip2" />
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
      tooltip: <FormattedMessage id="mt.pingtaihuilvtishi2" />
    },
    {
      title: <FormattedMessage id="mt.kehuchujinjine" />,
      dataIndex: 'baseOrderAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      renderText(text, record, index, action) {
        return formatNum(record?.baseOrderAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.kehuchujinjinetishi" />
    },
    {
      title: <FormattedMessage id="mt.kehuchujinshouxufei" />,
      dataIndex: 'baseHandlingFee',
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
        return formatNum(record?.baseHandlingFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.kehuchujinshouxufeitishi" />
    },
    {
      title: <FormattedMessage id="mt.kehudaozhangjine" />,
      dataIndex: 'customerReceiptAmount',
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
        return formatNum(record?.customerReceiptAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.kehudaozhangjinetishi" />
    },
    {
      title: <FormattedMessage id="mt.pingtaichujinshouxufei" />,
      dataIndex: 'platformWithdrawFee',
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
        return formatNum(record?.platformWithdrawFee, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.pingtaichujinshouxufeitishi" />
    },
    {
      title: <FormattedMessage id="mt.pingtaishijichujin" />,
      dataIndex: 'platformActualAmount',
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
        return formatNum(record?.platformActualAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })
      },
      tooltip: <FormattedMessage id="mt.pingtaishijichujintips" />
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
