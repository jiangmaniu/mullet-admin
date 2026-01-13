import { useIntl } from '@umijs/max'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import ProFormText from '@/components/Admin/Form/ProFormText'
import StandardTable from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'

import { getColumns } from './tableConfig'

type Params = API.PageParams

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: DataSource.DataSourceListItem
}

const PAGE_SIZE = 10

function SubscribeList({ style, onFieldsChange, onValuesChange, initialValues }: IProps) {
  const intl = useIntl()
  const [dataSource, setDataSource] = useState<any>([])
  const [dataSourceOrigin, setDataSourceOrigin] = useState<any>([])
  const [pageNum, setPageNum] = useState(1)
  const { ws } = useStores()
  const quotes = toJS(ws.quotes)

  useEffect(() => {
    const data = (initialValues?.subSymbols || []).map((item: any) => ({
      symbol: item,
      dataSourceCode: initialValues?.code,
      dsType: initialValues?.dsType
    }))
    setDataSource(data)
    setDataSourceOrigin(data)
  }, [initialValues])

  const onChangeSymbol = (value: any) => {
    const searchList = dataSourceOrigin.filter(
      (item: any) => (item.symbol || '').toLocaleUpperCase().indexOf((value || '').toLocaleUpperCase()) !== -1
    )
    setDataSource(searchList)
    // 订阅搜到的品种
    if (searchList.length) {
      ws.batchSubscribeSymbol({
        list: searchList.map((item: any) => ({ dataSourceCode: initialValues?.code, symbol: item?.symbol }))
      })
    }
  }

  // 分页按需订阅品种行情
  const subscribeQuote = () => {
    const currentPageSymbolList = dataSourceOrigin.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE)
    if (currentPageSymbolList.length) {
      ws.checkSocketReady(() => {
        ws.batchSubscribeSymbol({
          list: currentPageSymbolList.map((item: any) => ({ dataSourceCode: initialValues?.code, symbol: item?.symbol }))
        })
      })
    }
  }

  useEffect(() => {
    if (dataSourceOrigin.length) {
      subscribeQuote()
    }
  }, [pageNum, dataSourceOrigin])

  useEffect(() => {
    return () => {
      // 关闭行情
      ws.close()
      console.log('关闭行情')
      setDataSourceOrigin([])
      setDataSource([])
      setPageNum(1)
    }
  }, [])

  return (
    <div>
      {!!dataSourceOrigin.length && (
        <div className="mb-3">
          <ProFormText
            fieldProps={{
              size: 'middle',
              onChange: (e) => {
                onChangeSymbol(e.target.value)
              }
            }}
            width={200}
            placeholder={intl.formatMessage({ id: 'mt.sousuopinzhong' })}
          />
        </div>
      )}
      <StandardTable
        columns={getColumns(onChangeSymbol)}
        // ghost
        showOptionColumn={false}
        dataSource={dataSource}
        search={{ optionRender: () => [] }}
        pageSize={PAGE_SIZE}
        scroll={{ x: 300 }}
        cardProps={{ bodyStyle: { padding: 0 } }}
        hideSearch
        size="small"
        rowKey="symbol"
        pagination={{
          total: dataSource.length,
          onShowSizeChange(current, size) {
            setPageNum(current)
          }
        }}
      />
    </div>
  )
}

export default observer(SubscribeList)
