import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useEffect, useState } from 'react'

import { getSymbolGroupTree } from '@/services/api/tradeCore/symbolGroup'
import { flatTreeData } from '@/utils/tree'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  const [symbolTree, setSymbolTree] = useState<any>([])
  const flattenTreeData = flatTreeData(symbolTree, 'id')

  useEffect(() => {
    getSymbolGroupTree().then((res) => {
      setSymbolTree(res?.data || [])
    })
  }, [])

  return [
    {
      title: intl.formatMessage({ id: 'mt.symbol' }),
      dataIndex: 'symbol',
      align: 'left',
      width: 150,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' }) }]
      },
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' })
      }
      // valueType: 'treeSelect',
      // 点击编辑后，默认回显列表上的交易品种
      // request: async () => {
      //   return symbolTree
      // },
      // renderText(text, record, index, action) {
      //   const symbolId = record.symbol
      //   // @ts-ignore
      //   const symbolName = symbolId ? flattenTreeData.find((item) => item.id === symbolId)?.title : ''
      //   return symbolName
      // }
    }
  ]
}
