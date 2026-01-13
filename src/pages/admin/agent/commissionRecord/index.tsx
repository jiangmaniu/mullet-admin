import { useIntl, useSearchParams } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'

import List from './list'

export default function commissionRecord() {
  const intl = useIntl()

  const [searchParams, setSearchParams] = useSearchParams()
  const userName = searchParams.get('userName') || ''

  // 获取searchParams全部参数
  const allParams = Object.fromEntries(searchParams.entries())

  return (
    <PageContainer
      icon="/img/emoji/21.png"
      pageBgColorMode="gray"
      contentStyle={{ paddingTop: 15, paddingInline: 36 }}
      pageTitle={
        <>
          {userName ? `[${userName}]` : ''}
          {intl.formatMessage({ id: 'menu.agent.agent-commission-record' })}
        </>
      }
    >
      <List />
    </PageContainer>
  )
}
