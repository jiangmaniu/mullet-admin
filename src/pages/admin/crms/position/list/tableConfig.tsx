import { InfoCircleOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { Tooltip } from 'antd'

import { DEFAULT_PRECISION } from '@/constants'
import { formatNum } from '@/utils'
import { cn } from '@/utils/cn'
import { numberFormatUnit } from '@/utils/number'

export const getColumns = (): ProColumns<CrmTrading.MoneyPositionListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.symbol" />,
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
      width: 120,
      fixed: 'left'
    },
    {
      // title: <FormattedMessage id="mt.duotouchicangliang" />,

      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.duotouchicangliang" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.duotouchicangliangtips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'bullish',
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
        return (
          <span title={`${record.bullish} / ${record.bullishWeight}`}>
            {text && text !== '0'
              ? `${formatNum(text, { precision: DEFAULT_PRECISION })}${getIntl().formatMessage({ id: 'mt.lot' })}/${numberFormatUnit(
                  Number(record.bullishWeight),
                  {
                    precision: DEFAULT_PRECISION
                  }
                )}`
              : '0'}
          </span>
        )
      },
      width: 180
    },
    {
      title: <FormattedMessage id="mt.duotoujunjia" />,
      dataIndex: 'bullishAvg',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180
    },
    {
      // title: <FormattedMessage id="mt.kongtouchicangliang" />,
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.kongtouchicangliang" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.kongtouchicangliangtips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'shortSelling',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180,
      // renderText(text, record, index, action) {
      //   return <span className="text-gray">1000手/1000</span>
      // }

      renderText(text, record, index, action) {
        return (
          <span title={`${record.shortSelling} / ${record.shortSellingWeight}`}>
            {text && text !== '0'
              ? `${formatNum(text, { precision: DEFAULT_PRECISION })}${getIntl().formatMessage({ id: 'mt.lot' })}/${numberFormatUnit(
                  Number(record.shortSellingWeight),
                  {
                    precision: DEFAULT_PRECISION
                  }
                )}`
              : '0'}
          </span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.kongtoujunjia" />,
      dataIndex: 'shortSellingAvg',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      renderText(text, record, index, action) {
        return formatNum(text, { precision: DEFAULT_PRECISION, placeholder: '0' })
      },
      width: 180
    },
    // @TODO 没有字段
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.jingchicangliang" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.jingchicangliangtips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'totalVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180,

      renderText(text, record, index, action) {
        return (
          // @ts-ignore
          <span title={`${record.totalVolume} / ${Number(record.bullishWeight) + Number(record.shortSellingWeight)}`}>
            {text && text !== '0'
              ? `${formatNum(record.totalVolume, { precision: DEFAULT_PRECISION })}${getIntl().formatMessage({
                  id: 'mt.lot'
                })}/${numberFormatUnit(Number(record.bullishWeight) + Number(record.shortSellingWeight), {
                  precision: DEFAULT_PRECISION
                })}`
              : '0'}
          </span>
        )
      }
      // renderText(text, record, index, action) {
      //   return <span className="text-gray">1000手/1000</span>
      // }
    },
    {
      title: <FormattedMessage id="mt.yingli" />,
      dataIndex: 'profit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: '',
        minWidth: 120
      },
      className: 'title-align-right',
      sorter: (a, b) => Number(b.profit) - Number(a.profit),
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      width: 120,
      renderText(text, record, index, action) {
        return <span className={cn('text-red', text > 0 && 'text-green')}>{formatNum(text, { precision: DEFAULT_PRECISION })}</span>
      },
      align: 'right'
      // align: 'right',
      // fixed: 'right'
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
    }
  ]
}
