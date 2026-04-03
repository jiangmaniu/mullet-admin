import { useIntl } from '@umijs/max'
import { Tabs } from 'antd'
import { useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'

import ApprovalRecordsTab from './tabs/ApprovalRecordsTab'
import PendingApprovalTab from './tabs/PendingApprovalTab'

export default function WithdrawalApprove() {
  const intl = useIntl()
  const [activeTab, setActiveTab] = useState('pending')

  const tabs = [
    {
      key: 'pending',
      label: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.pendingApproval' }),
      children: <PendingApprovalTab />
    },
    {
      key: 'records',
      label: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.approvalRecords' }),
      children: <ApprovalRecordsTab />
    }
  ]

  return (
    <PageContainer icon="/img/emoji/4.png" pageBgColorMode="gray">
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabs} destroyInactiveTabPane />
    </PageContainer>
  )
}
