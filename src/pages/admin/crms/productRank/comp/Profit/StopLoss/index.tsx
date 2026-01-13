import { PageLoading, ProCard } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'

import StandardTable from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { getTradingLoss } from '@/services/api/crmManage/trading'

import PieChart from '../TakeProfit/PieChart'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function StopLoss({ params = {} }: any) {
  const { global } = useStores()
  const [requestResultData, setRequestResultData] = useState([] as CrmTrading.LossItem[])

  const { data, run, loading } = useRequest(getTradingLoss, {
    manual: true
  })
  const dataSource = data?.data || []

  useEffect(() => {
    run(params)
  }, [params])

  const pieData = dataSource.map((item) => {
    return {
      // value: item.personCount,
      // value: item.tradeCount,
      value: Math.abs(Number(item.profit) || 0),
      name: item.symbol
    }
  })

  return (
    <ProCard
      style={{ width: '50%', height: loading ? 300 : 936 }}
      title={
        <span className="text-gray font-semibold text-xl">
          <FormattedMessage id="mt.kuisunchanpin" />
        </span>
      }
    >
      {!loading && (
        <>
          {pieData.length > 0 && (
            <div className="mb-4">
              <PieChart data={pieData} />
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
            // ghost
            // action={{
            //   query: (params) =>
            //     getTradingLoss(params).finally(() => {
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
