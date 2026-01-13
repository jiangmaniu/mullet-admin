import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

import { getSymbolGroupTree } from '@/services/api/tradeCore/symbolGroup'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  // const treeData = useMemo(() => {
  //   const res = await getSymbolGroupTree()
  //   const data = res?.data || []
  //   return data
  // }, [])
  return [
    {
      title: intl.formatMessage({ id: 'mt.pinzhongleibie' }),
      dataIndex: 'symbolGroupId',
      align: 'left',
      width: 200,
      valueType: 'treeSelect',
      request: async () => {
        const res = await getSymbolGroupTree()
        const data = (res?.data || []).map((item) => {
          return {
            label: item.title,
            value: item.id,
            children: item.children?.map((child) => ({
              label: child.title,
              value: child.id
            }))
          }
        })
        return data
      },
      renderText(text, record, index, action) {
        return text
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.shouzengjin' }),
      dataIndex: 'rewardAmount',
      align: 'left',
      width: 200
    }
  ]
}
