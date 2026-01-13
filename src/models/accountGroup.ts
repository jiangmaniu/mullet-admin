import { useRequest } from 'ahooks'

import { useLang } from '@/context/languageProvider'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'

/**查询账户组 */
export default function AccountGroup() {
  const { lng } = useLang()
  const { data, loading, run } = useRequest(getAccountGroupPageList, { manual: true })
  const list = data?.data?.records || []

  return {
    data: list,
    realAccountGroupOptions: list.filter((item) => !item.isSimulate).map((item) => ({ label: item.groupName, value: item.id })),
    loading,
    run
  }
}
