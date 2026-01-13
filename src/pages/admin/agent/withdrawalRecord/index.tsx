import { useIntl } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'

import List from './list'

export default function withdrawalRecord() {
  const intl = useIntl()

  return (
    <PageContainer icon="/img/emoji/21.png" pageBgColorMode="gray" contentStyle={{ paddingTop: 15, paddingInline: 36 }}>
      <List />
    </PageContainer>
  )
}
