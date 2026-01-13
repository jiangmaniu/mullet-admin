import { FormattedMessage, useIntl, useSearchParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { useMemo, useState } from 'react'

import StandardTable from '@/components/Admin/StandardTable'
import StatisticCard from '@/components/Admin/StatisticCard'
import Iconfont from '@/components/Base/Iconfont'
import { useEnv } from '@/context/envProvider'
import { commissionRecordsCount, commissionRecordsPageList } from '@/services/api/agent/commissionRecords'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const intl = useIntl()
  const { breakPoint } = useEnv()
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const agentId = searchParams.get('agentId') as string

  const { data: commissionRecordsCountRes, run: runCommissionRecordsCount } = useRequest(commissionRecordsCount, { manual: true })
  const countData = commissionRecordsCountRes?.data
  const isSmallScreen = breakPoint === 'xl'

  const renderStaticCardItems = useMemo(() => {
    const staticCardItems = [
      {
        label: <FormattedMessage id="mt.agent.yijiesuanyongjin" />,
        value: countData?.settledCommission || 0,
        valueColor: countData?.settledCommission ? (countData?.settledCommission > 0 ? 'var(--color-green)' : 'var(--color-red)') : '',
        showAddSymbol: true
      },
      {
        label: <FormattedMessage id="mt.agent.weijiesuanyongjin" />,
        value: countData?.unsettledCommission || 0,
        valueColor: countData?.unsettledCommission ? (countData?.unsettledCommission > 0 ? 'var(--color-green)' : 'var(--color-red)') : '',
        showAddSymbol: true
      },
      {
        label: <FormattedMessage id="mt.agent.jiaoyishoushu" />,
        value: countData?.tradingVolume || 0,
        noFormatValue: true
      },
      {
        label: <FormattedMessage id="mt.agent.yishixianyingkui" />,
        value: countData?.profitLossAmount || 0,
        valueColor: countData?.profitLossAmount
          ? Number(countData?.profitLossAmount) > 0
            ? 'var(--color-green)'
            : 'var(--color-red)'
          : '',
        showAddSymbol: true
      }
    ]
    return (
      <StatisticCard
        style={{ width: isSmallScreen ? '60%' : '50%' }}
        cardProps={{ bordered: false }}
        subCardProps={{ ghost: true }}
        items={staticCardItems}
        direction="row"
        needFormatValue
      />
    )
  }, [intl.locale, countData, isSmallScreen])

  return (
    <div className="relative">
      <StandardTable<AgentCommissionRecords.CommissionRecordsListItem, AgentCommissionRecords.CommissionRecordsListParams>
        columns={getColumns()}
        search={{ span: 4 }}
        // onEditItem={(record) => {
        //   console.log('record', record)
        // }}
        // @TODO 暂时不支持
        // tableExtraRender={() => (
        //   <div>
        //     <Export />
        //   </div>
        // )}
        renderTableHeader={() => (
          <div className="mb-4 flex justify-between items-end">
            {renderStaticCardItems}
            <div className="text-sm">
              <Iconfont name="biaoshi" className="!size-[14px] mr-1" />
              <FormattedMessage id="mt.agent.huobidanwei" /> USD
            </div>
          </div>
        )}
        showOptionColumn={false}
        params={{ agentId }}
        // ghost
        action={{
          query: (params) => {
            runCommissionRecordsCount({ agentId, ...params })
            setLoading(true)
            return commissionRecordsPageList(params).finally(() => {
              setLoading(false)
            })
          }
        }}
        loading={loading}
        onReset={() => {
          setSearchParams({})
        }}
      />
    </div>
  )
}
