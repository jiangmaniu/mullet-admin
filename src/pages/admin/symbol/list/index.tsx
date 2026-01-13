import { FormattedMessage, useIntl, useSearchParams } from '@umijs/max'
import { useEffect, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getSymbolPageList, removeSymbol } from '@/services/api/tradeCore/symbol'
import { push } from '@/utils/navigator'

import SymbolTree from './comp/SymbolTree'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const intl = useIntl()
  const [currentTreeKey, setCurrentTreeKey] = useState<string>('') // 当前选择的树key
  const [currentTreePathName, setCurrentTreePathName] = useState<string>('') // 当前选择的树key所在的完整路径名称
  const [symbolGroupId, setSymbolGroupId] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const symbolGroupId = searchParams.get('symbolGroupId')
    if (symbolGroupId) {
      setSymbolGroupId(symbolGroupId)
    }
  }, [searchParams])

  return (
    <PageContainer icon="/img/emoji/11.png">
      <div className="flex justify-between gap-5">
        <div style={{ width: 320 }} className="bg-white rounded-2xl py-4">
          <SymbolTree
            onChange={(key, path) => {
              setCurrentTreeKey(key)
              setCurrentTreePathName(path)
              console.log('key', key)
              console.log('path', path)
              setSymbolGroupId(key)
              setSearchParams({ symbolGroupId: key || '' })
            }}
            activeKeys={symbolGroupId ? [symbolGroupId] : []}
          />
        </div>
        <div style={{ width: 'calc(100% - 330px)' }}>
          <StandardTable<Symbol.SymbolListItem, API.PageParam & { symbolGroupId?: string }>
            columns={getColumns()}
            tableExtraRender={() => (
              <AddButton href="/symbol/add">
                <FormattedMessage id="mt.addSymbol" />
              </AddButton>
            )}
            onEditItem={(record) => {
              console.log('record', record)
              push(`/symbol/edit/${record.id}?title=${record.symbol}&symbolGroupId=${record.symbolGroupId}`)
            }}
            showOptionColumn
            params={{ symbolGroupId }}
            action={{
              query: (params) => getSymbolPageList({ ...params }),
              del: (params) => removeSymbol(params)
            }}
          />
        </div>
      </div>
    </PageContainer>
  )
}
