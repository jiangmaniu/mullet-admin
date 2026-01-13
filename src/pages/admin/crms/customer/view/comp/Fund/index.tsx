import { FormattedMessage, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

import DataStatisticCard from '@/components/Admin/DataStatisticCard'
import StandardTable from '@/components/Admin/StandardTable'
import Iconfont from '@/components/Base/Iconfont'
import { DEFAULT_PRECISION } from '@/constants'
import { formatNum } from '@/pages/admin/crms'
import { getClientMoneyInfoList, getClientStatMoney } from '@/services/api/crmManage/client'

import { getColumns } from './tableConfig'

export default function Fund({
  active,
  groups,
  accounts
}: {
  active: boolean
  groups: Record<string, { text: string; color?: string }>
  accounts: Record<string, { text: string; color?: string }>
}) {
  const { id } = useParams()
  const { data, run, loading } = useRequest(getClientStatMoney, { manual: true })

  useEffect(() => {
    if (active && id) {
      run({ clientId: id })
    }
  }, [id, active])

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div>
      <DataStatisticCard
        items={[
          {
            icon: <Iconfont name="shuju1" width={32} height={32} />,
            label: <FormattedMessage id="mt.jingrujin" />,
            value: formatNum(data?.data?.netBalance || 0, { precision: DEFAULT_PRECISION }),
            containerClassName: 'min-w-[230px]'
          },
          {
            icon: <Iconfont name="shuju1" width={32} height={32} />,
            label: <FormattedMessage id="mt.zongrujin" />,
            value: formatNum(data?.data?.totalAmount || 0, { precision: DEFAULT_PRECISION }),
            containerClassName: 'min-w-[230px]'
          },
          {
            icon: <Iconfont name="shuju1" width={32} height={32} />,
            label: <FormattedMessage id="mt.zongchujin" />,
            value: formatNum(data?.data?.totalWithdraw || 0, { precision: DEFAULT_PRECISION }),
            containerClassName: 'min-w-[230px]'
          },
          {
            icon: <Iconfont name="shuju1" width={32} height={32} />,
            label: <FormattedMessage id="mt.zongzengjin" />,
            value: formatNum(data?.data?.totalGive || 0, { precision: DEFAULT_PRECISION }),
            containerClassName: 'min-w-[230px]'
          }
          // {
          //   icon: 'shuju1',
          //   label: <FormattedMessage id="mt.huazhuan" />,
          //   value: formatNum(data?.totalTransfer || 0, { precision: DEFAULT_PRECISION })
          // }
        ]}
        className="mb-5 !flex flex-row"
      />
      <StandardTable
        columns={getColumns(groups, accounts)}
        search={{
          span: 3
        }}
        cardProps={{ bodyStyle: { padding: 10 } }}
        // ghost
        params={{ clientId: id }}
        action={{
          query: (params) => getClientMoneyInfoList(params)
        }}
      />
    </div>
  )
}
