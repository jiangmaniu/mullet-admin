import { PageLoading, ProCard } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'

import StandardTable from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { getTradingProfit } from '@/services/api/crmManage/trading'

import PieChart from './PieChart'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function TakeProfit({ params }: any) {
  const { global } = useStores()
  const [requestResultData, setRequestResultData] = useState([] as CrmTrading.ProfitSymbolItem[])

  const { data, run, loading } = useRequest(getTradingProfit, {
    manual: true
  })
  const dataSource = data?.data || []

  useEffect(() => {
    run(params)
  }, [params])

  return (
    <ProCard
      style={{ width: '50%', height: loading ? 300 : 936 }}
      title={
        <span className="text-gray font-semibold text-xl">
          <FormattedMessage id="mt.yinglichanpin" />
        </span>
      }
    >
      {!loading && (
        <>
          {dataSource.length > 0 && (
            <div className="mb-4">
              <PieChart
                data={
                  dataSource.slice(0, 18).map((item) => {
                    return {
                      // value: item.personCount,
                      value: item.profit,
                      name: item.symbol
                    }
                  }) ?? []
                }
              />
            </div>
          )}
          <StandardTable
            columns={getColumns()}
            hideSearch
            bodyStyle={{ padding: 0 }}
            cardBordered={false}
            scroll={{ x: 300 }}
            pageSize={9}
            // getRequestResult={(result) => {
            //   setRequestResultData(result?.data || [])
            // }}
            // // ghost
            // action={{
            //   query: (params) =>
            //     getTradingProfit(params).finally(() => {
            //       setLoading(false)
            //     })
            // }}
            // params={params}
            dataSource={dataSource}
          />
        </>
      )}
      {loading && <PageLoading />}
    </ProCard>
  )
}
