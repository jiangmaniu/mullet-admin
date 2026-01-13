import { useRequest } from 'ahooks'

import { useLang } from '@/context/languageProvider'
import { getClientDetail } from '@/services/api/crm/customer'

/**根据客户id 获取客户详情 */
export default function ClientInfo() {
  const { lng } = useLang()
  const { data, loading, run } = useRequest(getClientDetail, { manual: true })
  const list = data?.data
  const accountOptions = (list?.accountList || []).map((item) => ({ value: item.id, label: item.name }))

  return {
    data: list,
    accountOptions,
    loading,
    run
  }
}
