import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance, StandardTableRef } from '@/components/Admin/StandardTable'
import { getSymbolPrice } from '@/services/api/dataSource'
import { getSymbolPageList } from '@/services/api/tradeCore/symbol'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const instanceRef = useRef<Instance>()
  const intl = useIntl()
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<any>({})
  const [dataSource, setDataSource] = useState<DataSource.SymbolPriceItem[]>([])
  const [dataSourceOrigin, setDataSourceOrigin] = useState<DataSource.SymbolPriceItem[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [status, setStatus] = useState('')
  const tableRef = useRef<StandardTableRef>(null)
  const { run: querySymbol, data: res } = useRequest(getSymbolPageList, { manual: true })
  const symbolOptions = (res?.data?.records || [])
    .map((item) => ({ ...item, label: item.symbol, value: item.symbol }))
    .sort((a: any, b: any) => a.symbol.localeCompare(b.symbol)) // A-Z排序
  const defaultSymbol = symbolOptions[0]?.value || ''

  const queryData = async (query?: any, isLoadMore?: boolean) => {
    const queryParams = {
      ...params,
      ...(query || {})
    }
    setLoading(true)
    const res = await getSymbolPrice(queryParams)
    const data = res?.data || []
    setLoading(false)
    const dataList = isLoadMore ? [...dataSource, ...data] : data
    setDataSource(dataList)
    setDataSourceOrigin(dataList)

    if (searchValue) {
      onSearchPrice(searchValue, dataList)
    }
    if (status) {
      onChangeStatus(status, dataList)
    }
  }

  useEffect(() => {
    querySymbol({ current: 1, size: 9999 })
  }, [])

  const setDefaultSymbol = () => {
    instanceRef.current?.form?.setFieldValue('symbol', defaultSymbol || undefined)
    // 默认查询当前小时的数据 从00分开始
    instanceRef.current?.form?.setFieldValue('queryTime', `${dayjs().format('YYYY-MM-DD HH')}`)
  }

  useEffect(() => {
    setTimeout(() => {
      setDefaultSymbol()
    }, 100)
    // setTimeout(() => {
    //   // 触发表单查询
    //   instanceRef.current?.form?.submit()
    // }, 300)
  }, [defaultSymbol])

  const lastScrollTop = useRef(0) // 记录上一次滚动位置

  const onSearchPrice = (searchValue: any, dataList?: DataSource.SymbolPriceItem[]) => {
    let searchList = dataList?.length ? dataList : dataSourceOrigin
    if (status) {
      searchList = searchList.filter((item) => item.status === status)
    }
    const searchData = searchValue
      ? searchList.filter((item) => {
          const bid = String(item.bid || '')
          const ask = String(item.ask || '')
          return bid.indexOf(searchValue) !== -1 || ask.indexOf(searchValue) !== -1
        })
      : searchList
    setDataSource(searchData)
    setSearchValue(searchValue)
  }

  // 选择状态
  const onChangeStatus = (value: any, dataList?: DataSource.SymbolPriceItem[]) => {
    let searchList = dataList?.length ? dataList : dataSourceOrigin
    if (searchValue) {
      searchList = searchList.filter((item) => {
        const bid = String(item.bid || '')
        const ask = String(item.ask || '')
        return bid.indexOf(searchValue) !== -1 || ask.indexOf(searchValue) !== -1
      })
    }
    if (value) {
      setDataSource(searchList.filter((item) => item.status === value))
    } else {
      setDataSource(searchList)
    }
    setStatus(value)
  }

  return (
    <PageContainer icon="/img/emoji/8.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns(symbolOptions, onSearchPrice, onChangeStatus)}
        // ghost
        opColumnWidth={140}
        // tableExtraRender={() => (
        //   <div className="flex items-center gap-x-3">
        //     <Export />
        //     <div className="text-secondary border flex items-center gap-x-1 rounded-[7px] border-gray-150 text-sm px-2 py-[5px]">
        //       <Iconfont name="biaozhu" color="#6A7073" />
        //       <FormattedMessage id="mt.lishibaojiatishi" />
        //     </div>
        //   </div>
        // )}
        dataSource={dataSource}
        beforeSearchSubmit={(params: any) => {
          const queryTime = params.queryTime
          // queryTime查询开始时间，截止时间后台默认是当前时间
          if (queryTime) {
            const ts = new Date(`${queryTime}:00:00`).getTime()
            params.queryTime = ts
          }
          setParams(params)
          queryData(params)
          // setSearchValue('')
          // 重置本地价格搜索框
          // instanceRef.current?.form?.setFieldValue('price', '')
        }}
        pagination={false}
        // 虚拟列表
        virtual
        scroll={{ y: document.body.clientHeight - 360, x: 100 }}
        getInstance={(instance) => (instanceRef.current = instance)}
        hideReset
        // onScroll={debounce((e: any) => {
        //   if (searchValue) return
        //   const { scrollTop, scrollHeight, clientHeight } = e.target
        //   const threshold = 100 // 距离底部100px时触发

        //   // 判断是否在下滑（当前 scrollTop > 上一次 scrollTop）
        //   const isScrollingDown = scrollTop > lastScrollTop.current

        //   // 仅在下滑且接近底部时加载
        //   if (isScrollingDown && scrollHeight - (scrollTop + clientHeight) < threshold && !loading) {
        //     console.log('滚动加载')
        //     const lastItemTimestamp = dataSource?.[dataSource.length - 1]?.timestamp
        //     // 从开始时间往后翻查询 比如现在9点 往后10点查询，而不是往8点查询
        //     queryData(
        //       {
        //         queryTime: lastItemTimestamp
        //       },
        //       true
        //     )
        //   }

        //   // 更新上一次 scrollTop
        //   lastScrollTop.current = scrollTop
        // }, 300)}
        ref={tableRef}
      />
    </PageContainer>
  )
}
