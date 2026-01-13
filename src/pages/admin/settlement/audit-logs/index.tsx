import { FormattedMessage } from '@umijs/max'
import { observer } from 'mobx-react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { getAuditLogs } from '@/services/api/settlement'

import { getColumns } from './tableConfig'

function AuditLogs() {
  return (
    <PageContainer
      icon="/img/emoji/2.png"
      pageBgColorMode="gray"
      title={<FormattedMessage id="menu.settlement.audit-logs" defaultMessage="审计日志" />}
    >
      <StandardTable
        columns={getColumns()}
        hiddenDeleteBtn
        hiddenEditBtn
        showOptionColumn={false}
        pageSize={20}
        action={{
          query: (params) => getAuditLogs(params)
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div className="p-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">操作详情</h4>
                  <p className="text-sm text-gray-600">
                    <strong>操作人:</strong> {record.operatorName || record.operatorId}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>IP地址:</strong> {record.ipAddress || '-'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>浏览器:</strong> {record.userAgent || '-'}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">变更内容</h4>
                  {record.changes ? (
                    <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-40">
                      {JSON.stringify(record.changes, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-gray-400">暂无变更内容</p>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      />
    </PageContainer>
  )
}

export default observer(AuditLogs)
