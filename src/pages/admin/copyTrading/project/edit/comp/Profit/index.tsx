import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useParams } from '@umijs/max'

import StandardTable from '@/components/Admin/StandardTable'
import { tradeFollowLeadProfitSharing } from '@/services/api/tradeFollow/lead'

import DrawerDetail from './comp/DrawerDetail'
import { getColumns } from './tableConfig'

export default function Profit() {
  const { id } = useParams()
  // useEffect(() => {
  //   tradeFollowLeadProfitSharing({
  //     leadId: id
  //   })
  // }, [id])

  return (
    <ProCard>
      <StandardTable
        columns={getColumns()}
        opColumnWidth={80}
        showOptionColumn
        hideSearch
        cardProps={{ bodyStyle: { padding: 0 } }}
        renderOptionColumn={(record) => {
          return (
            <DrawerDetail
              trigger={
                <a className="!text-primary font-medium text-sm cursor-pointer">
                  <FormattedMessage id="common.chakan" />
                </a>
              }
              info={record}
            />
          )
        }}
        // ghost
        action={{
          query: (params) => tradeFollowLeadProfitSharing({ ...params, leadId: id })
        }}
      />
    </ProCard>
  )
}
