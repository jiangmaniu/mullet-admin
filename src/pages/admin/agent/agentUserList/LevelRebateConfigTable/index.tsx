import StandardTable from '@/components/Admin/StandardTable'
import { levelRebateConfigList } from '@/services/api/agent/user'

import { getColumns } from './tableConfig'

type Params = API.PageParams

type IProps = {
  /**代理等级id */
  levelId?: any
  dataSourceData?: any
}

// 等级返佣配置
export default function LevelRebateConfigTable({ levelId, dataSourceData }: IProps) {
  return (
    <StandardTable
      columns={getColumns()}
      search={{ span: 4 }}
      showOptionColumn={false}
      hideSearch
      scroll={{ x: 550 }}
      // ghost
      params={{ levelId }}
      cardProps={{ bodyStyle: { padding: 0 } }}
      action={{
        query: (params) => {
          const data = Promise.resolve({
            data: dataSourceData,
            success: true
          })
          return levelId ? levelRebateConfigList(params) : data
        }
      }}
    />
  )
}
