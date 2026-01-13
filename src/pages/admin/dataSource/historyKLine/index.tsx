import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { getKlineTimeFrame } from '@/services/api/dataSource'
import { getSymbolPageList } from '@/services/api/tradeCore/symbol'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const instanceRef = useRef<Instance>()
  const intl = useIntl()
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<any>({})
  const [dataSource, setDataSource] = useState<DataSource.KlineListItem[]>([])
  const [dataSourceOrigin, setDataSourceOrigin] = useState<DataSource.KlineListItem[]>([])
  const [isEmpty, setIsEmpty] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { run: querySymbol, data: res } = useRequest(getSymbolPageList, { manual: true })
  const symbolOptions = (res?.data?.records || [])
    .map((item) => ({ ...item, label: item.symbol, value: item.symbol }))
    .sort((a: any, b: any) => a.symbol.localeCompare(b.symbol)) // A-Z排序
  const defaultSymbol = symbolOptions[0]?.value || ''

  const queryData = async (query?: any, isLoadMore?: boolean) => {
    const queryParams = {
      size: 10000,
      ...params,
      ...(query || {})
    }
    setLoading(true)
    const res = await getKlineTimeFrame(queryParams)
    // @ts-ignore
    const data = res?.data || []
    setLoading(false)
    const dataList = isLoadMore ? [...dataSource, ...data] : data
    setDataSource(dataList)
    setDataSourceOrigin(dataList)
    setIsEmpty(data.length === 0)

    if (searchValue) {
      onSearchPrice(searchValue, dataList)
    }
  }

  useEffect(() => {
    querySymbol({ current: 1, size: 9999 })
  }, [])

  const setDefaultSymbol = () => {
    instanceRef.current?.form?.setFieldValue('symbol', defaultSymbol || undefined)
    // 默认查询时间的数据 从00分开始
    instanceRef.current?.form?.setFieldValue('time', [
      `${dayjs().subtract(10, 'minutes').format('YYYY-MM-DD HH:mm')}:00`,
      `${dayjs().format('YYYY-MM-DD HH:mm')}:00`
    ])
  }

  const onSearchPrice = (searchValue: any, dataList?: DataSource.KlineListItem[]) => {
    const searchList = dataList?.length ? dataList : dataSourceOrigin
    const searchData = searchValue
      ? searchList.filter((item) => {
          const high = String(item.high || '')
          const open = String(item.open || '')
          const low = String(item.low || '')
          const close = String(item.close || '')

          return (
            high.indexOf(searchValue) !== -1 ||
            open.indexOf(searchValue) !== -1 ||
            low.indexOf(searchValue) !== -1 ||
            close.indexOf(searchValue) !== -1
          )
        })
      : searchList
    setDataSource(searchData)
    setSearchValue(searchValue)
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

  return (
    <PageContainer icon="/img/emoji/8.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns(symbolOptions, onSearchPrice)}
        // ghost
        // tableExtraRender={() => <Export />}
        showOptionColumn={false}
        getInstance={(instance) => (instanceRef.current = instance)}
        dataSource={dataSource}
        beforeSearchSubmit={(params: any) => {
          const [start, end] = params.time || []
          if (Array.isArray(params.time)) {
            const startTime = new Date(start).getTime()
            const endTime = new Date(end).getTime()
            params.startTime = startTime
            params.endTime = endTime

            delete params.time
          }
          setIsEmpty(false)
          setParams(params)
          queryData(params)
          // setSearchValue('')
          // 重置本地价格搜索框
          // instanceRef.current?.form?.setFieldValue('price', '')
        }}
        pagination={false}
        // 虚拟列表
        virtual
        scroll={{ y: document.body.clientHeight - 360 }}
        hideReset
        // onScroll={debounce((e: any) => {
        //   if (searchValue) return
        //   const { scrollTop, scrollHeight, clientHeight } = e.target
        //   const threshold = 100 // 距离底部50px时触发

        //   // 判断是否在下滑（当前 scrollTop > 上一次 scrollTop）
        //   const isScrollingDown = scrollTop > lastScrollTop.current

        //   // 仅在下滑且接近底部时加载
        //   if (isScrollingDown && scrollHeight - (scrollTop + clientHeight) < threshold && !loading && !isEmpty) {
        //     console.log('滚动加载')
        //     // 非首次查询必须减去1s否则，查询会没有尽头
        //     const lastItemTimestamp = Number(dataSource?.[dataSource.length - 1]?.klineTime) - 1
        //     queryData(
        //       {
        //         klineTime: lastItemTimestamp
        //       },
        //       true
        //     )
        //   }

        //   // 更新上一次 scrollTop
        //   lastScrollTop.current = scrollTop
        // }, 300)}
      />
    </PageContainer>
  )
}
