import { ArrowDownOutlined, ArrowUpOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { Tooltip } from 'antd'

import { DEFAULT_PRECISION } from '@/constants'
import { numberFormatUnit } from '@/utils/number'

export const getColumns = (): ProColumns<CrmTrading.TradingSymbolItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.paiming" />,
      dataIndex: 'num',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 80,
      fixed: 'left',
      align: 'center',
      renderText(text, record, index, action) {
        // 获取当前页码和每页显示数量
        const { current = 1, pageSize = 10 } = action?.pageInfo || {}

        // 计算实际序号
        const actualIndex = (current - 1) * pageSize + index + 1
        return actualIndex <= 3 ? <img src="/img/huo.png" width={20} height={20} /> : <span className="text-gray ">{actualIndex}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.chanpinmingcheng" />,
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'left',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    // {
    //   title: <FormattedMessage id="mt.jiaoyiepingcang" />,
    //   dataIndex: 'closeGvm',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     precision: DEFAULT_PRECISION,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150
    // },
    {
      // title: <FormattedMessage id="mt.jiaoyiliangkaicang" />,

      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.jiaoyiliangkaicang" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.kaicangzhushi" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      // className: 'title-align-right',
      dataIndex: 'openVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      align: 'left',
      renderText(text, record, index, action) {
        const openVolume = Number(record.openBullish) + Number(record.openShortSelling)
        return (
          <span title={`${openVolume} / ${Number(record.openGvm)}`}>
            {text && text !== '0'
              ? `${numberFormatUnit(openVolume, { precision: DEFAULT_PRECISION })}/${numberFormatUnit(Number(record.openGvm), {
                  precision: DEFAULT_PRECISION
                })}`
              : '0'}
          </span>
        )
      },
      width: 160
    },
    {
      title: (
        <span className="text-gray">
          <ArrowUpOutlined /> <FormattedMessage id="mt.duo" />
        </span>
      ),
      dataIndex: 'openBullish',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      align: 'center',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        const val = Number(text)
        return <span>{text && text !== '0' ? `${numberFormatUnit(val, { precision: DEFAULT_PRECISION })}` : '0'}</span>
      },
      width: 100
    },
    {
      title: (
        <span className="text-gray">
          <ArrowDownOutlined /> <FormattedMessage id="mt.kong" />
        </span>
      ),
      dataIndex: 'openShortSelling',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      align: 'center',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        const val = Number(text)
        return <span>{text && text !== '0' ? `${numberFormatUnit(val, { precision: DEFAULT_PRECISION })}` : '0'}</span>
      },
      width: 100
    },
    // 平仓
    {
      // title: <FormattedMessage id="mt.jiaoyiliangpingcang" />,
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.jiaoyiliangpingcang" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.pingcangzhushi" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      // className: 'title-align-right',
      dataIndex: 'closeVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },

      renderText(text, record, index, action) {
        const closeVolume = Number(record.closeBullish) + Number(record.closeShortSelling)
        return (
          <span title={`${closeVolume} / ${Number(record.closeGvm)}`}>
            {text && text !== '0'
              ? `${numberFormatUnit(closeVolume, { precision: DEFAULT_PRECISION })}/${numberFormatUnit(Number(record.closeGvm), {
                  precision: DEFAULT_PRECISION
                })}`
              : '0'}
          </span>
        )
      },
      align: 'left',
      width: 160
    },
    {
      title: (
        <span className="text-gray">
          <ArrowUpOutlined /> <FormattedMessage id="mt.duo" />
        </span>
      ),
      dataIndex: 'closeBullish',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      align: 'center',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        const val = Number(text)
        return <span>{text && text !== '0' ? `${numberFormatUnit(val, { precision: DEFAULT_PRECISION })}` : '0'}</span>
      },
      width: 100
    },
    {
      title: (
        <span className="text-gray">
          <ArrowDownOutlined /> <FormattedMessage id="mt.kong" />
        </span>
      ),
      dataIndex: 'closeShortSelling',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      align: 'center',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        const val = Number(text)
        return <span>{text && text !== '0' ? `${numberFormatUnit(val, { precision: DEFAULT_PRECISION })}` : '0'}</span>
      },
      width: 100
    },
    // {
    //   title: <FormattedMessage id="mt.jiaoyiekaicang" />,
    //   dataIndex: 'openGvm',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     precision: DEFAULT_PRECISION,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150
    // },
    {
      // title: <FormattedMessage id="mt.jiaoyiliangzonghe" />,
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.jiaoyiliangzonghe" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.zonghezhushi" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      className: 'title-align-right',
      // dataIndex: 'SummaryVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        // placeholder: ''
      },
      // sorter: (a, b) => Number(a.openVolume) + Number(a.closeVolume) - (Number(b.openVolume) + Number(b.closeVolume)),
      formItemProps: {
        label: '' // 去掉form label
      },
      // renderText(text, record, index, action) {
      //   return <span>{(Number(record.openVolume) + Number(record.closeVolume)).toFixed(DEFAULT_PRECISION)}</span>
      // },

      renderText(text, record, index, action) {
        const openVolume = Number(record.openBullish) + Number(record.openShortSelling)
        const closeVolume = Number(record.closeBullish) + Number(record.closeShortSelling)
        const totalVolume = openVolume + closeVolume
        const totalGvm = Number(record.openGvm) + Number(record.closeGvm)
        return (
          <span title={`${openVolume} + ${closeVolume} / ${record.openGvm} + ${record.closeGvm}`}>
            {text && text !== '0'
              ? `${numberFormatUnit(totalVolume, { precision: DEFAULT_PRECISION })}/${numberFormatUnit(totalGvm, {
                  precision: DEFAULT_PRECISION
                })}`
              : '0'}
          </span>
        )
      },
      width: 150,
      fixed: 'right',
      align: 'right'
    }

    // 表单搜索项
    // {
    //   dataIndex: 'dateRangeNoTime',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'dateRange', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   fieldProps: {
    //     placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
    //   }
    // }
  ]
}
