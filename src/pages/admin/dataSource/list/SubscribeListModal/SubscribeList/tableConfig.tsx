import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { formatNum, formatTime } from '@/utils'
import { getCurrentQuote } from '@/utils/wsUtil'

export const getColumns = (onChangeSymbol: any): ProColumns<any>[] => {
  const getQuote = (record: DataSource.SymbolListItem) => {
    return getCurrentQuote({
      symbol: record.symbol,
      dataSourceCode: record.dataSourceCode,
      useQuoteDigits: true, // 用行情推送过来的精度
      from: 'DataSourceList'
    })
  }

  return [
    {
      title: <FormattedMessage id="mt.hangqingyuan" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'dataSourceCode',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      colSize: 0.9,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 200,
      renderText(text, record, index, action) {
        const iconUrl = getEnum().Enum.DataSourceType[record?.dsType]?.icon
        return (
          <div className="flex items-center">
            {iconUrl && <img src={iconUrl} width={85} />}
            {/* <span className="text-sm text-primary pl-1">{text}</span> */}
          </div>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.dingyuepinzhong" />,
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
      width: 160
    },
    // {
    //   title: <FormattedMessage id="mt.zhangdiefu" />,
    //   dataIndex: 'percent',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 180,
    //   renderText(text, record, index, action) {
    //     const currentQuote = getQuote(record)
    //     const percent = currentQuote?.percent || 0
    //     return currentQuote.hasQuote ? (
    //       <span className={classNames('font-semibold', Number(percent) > 0 ? 'text-green' : 'text-red')}>
    //         {Number(percent) > 0 ? '+' + percent : percent}%
    //       </span>
    //     ) : (
    //       '‑‑'
    //     )
    //   }
    // },
    {
      title: <FormattedMessage id="mt.mairujia" />,
      dataIndex: 'test',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      renderText(text, record, index, action) {
        const currentQuote = getQuote(record)
        const ask = currentQuote?.askOrigin
        const precision = currentQuote.digits || 2

        return Number(ask) ? (
          <span
            className="text-green rounded-lg border font-pf-bold px-[10px] py-[3px]"
            style={{ background: 'rgba(69,164,138,0.1)', borderColor: 'rgba(69,164,138,0.2)' }}
          >
            {formatNum(ask, { precision })}
          </span>
        ) : (
          '‑‑'
        )
      }
    },
    // {
    //   title: <FormattedMessage id="mt.diancha" />,
    //   dataIndex: 'spread',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 180,
    //   renderText(text, record, index, action) {
    //     const currentQuote = getQuote(record)
    //     return currentQuote.hasQuote ? currentQuote?.spread || 0 : '‑‑'
    //   }
    // },
    {
      title: <FormattedMessage id="mt.maichujia" />,
      dataIndex: 'test',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      renderText(text, record, index, action) {
        const currentQuote = getQuote(record)
        const bid = currentQuote?.bidOrigin
        const precision = currentQuote.digits || 2

        return Number(bid) ? (
          <span
            className="text-red rounded-lg border font-pf-bold px-[10px] py-[3px]"
            style={{ background: 'rgba(197,71,71,0.1)', borderColor: 'rgba(197,71,71,0.2)' }}
          >
            {formatNum(bid, { precision })}
          </span>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.zuixinbaojiashijian" />,
      dataIndex: 'time',
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
      align: 'right',
      renderText(text, record, index, action) {
        const currentQuote = getQuote(record)
        const time = currentQuote?.currentQuote?.priceData?.id
        return time ? formatTime(time) : '‑‑'
      }
    },

    // 表单搜索项
    {
      dataIndex: 'symbol',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      // valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        onChange: (e) => {
          onChangeSymbol?.(e.target.value)
        },
        className: '!w-[180px]',
        placeholder: getIntl().formatMessage({ id: 'mt.dingyuepinzhong' })
      },
      colSize: 0.9
    }
  ]
}
