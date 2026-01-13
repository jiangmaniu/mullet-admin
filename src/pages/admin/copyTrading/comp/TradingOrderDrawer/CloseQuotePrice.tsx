import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

import StandardTable from '@/components/Admin/StandardTable'
import { getSymbolPriceList } from '@/services/api/market/symbol'

import { OrderInfo } from '.'

type Params = API.PageParam & { priceValueId: string }

type IProps = {
  info: OrderInfo
}

export default function CloseQuotePrice({ info }: IProps) {
  const priceValueId = info.priceValueId

  const columns: ProColumns<MarketSymbol.SymbolPriceListItem>[] = [
    // {
    //   title: <FormattedMessage id="mt.riqi" />, // 与 antd 中基本相同，但是支持通过传入一个方法
    //   dataIndex: 'createTime',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150
    // },
    {
      title: <FormattedMessage id="mt.bidPrice" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'sell',
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
      title: <FormattedMessage id="mt.askPrice" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'buy',
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
      title: <FormattedMessage id="mt.jiaoyiliang" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'volume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      align: 'right',
      renderText(text, record, index, action) {
        return Number(record.buySize || 0) + Number(record.sellSize || 0)
      }
    }
  ]

  return (
    <StandardTable
      columns={columns}
      ghost
      hideSearch
      cardProps={{ style: { padding: 0 } }}
      scroll={{ x: 300 }}
      action={{
        query: (params: Params) => getSymbolPriceList({ ...params, priceValueId })
      }}
    />
  )
}
