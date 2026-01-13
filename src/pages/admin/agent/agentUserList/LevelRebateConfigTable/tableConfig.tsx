import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { accountGroupList } from '@/services/api/agent/settings'

export const getColumns = (): ProColumns<AgentUser.RebateConfigItem>[] => {
  const intl = useIntl()

  return [
    {
      title: intl.formatMessage({ id: 'mt.agent.xuhao' }),
      align: 'center',
      width: 80,
      editable: false,
      renderText(text, record, index, action) {
        return index + 1
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.zhanghuzu' }),
      align: 'center',
      dataIndex: 'accountGroupId',
      width: 120,
      valueType: 'select',
      request: async () => {
        const res = await accountGroupList()
        return res?.data || []
      },
      renderText(text, record, index, action) {
        return text === '-1' ? '*' : text
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.jiaoyipinzhong' }),
      align: 'left',
      dataIndex: 'symbol',
      width: 120,
      ellipsis: true
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.leixing' }),
      align: 'left',
      dataIndex: 'rebateType',
      width: 120,
      valueEnum: getEnum().Enum.AgentRebateConfigType
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.fanyongpinlv' }),
      align: 'left',
      dataIndex: 'statisticPeriod',
      width: 120,
      valueEnum: getEnum().Enum.AgentRebateConfigStatisticsCycle
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.zhi' }),
      align: 'right',
      dataIndex: 'rebateValue',
      width: 100,
      fixed: 'right',
      renderText(text, record, index, action) {
        let unit = ''
        // 固定金额单位USD
        if (record.rebateType === 'FIXED_AMOUNT' && record.rebateValue) {
          unit = 'USD'
        } else if (record.rebateValue) {
          unit = '%'
        }
        return `${record.rebateValue} ${unit}`
      }
    }
  ]
}
