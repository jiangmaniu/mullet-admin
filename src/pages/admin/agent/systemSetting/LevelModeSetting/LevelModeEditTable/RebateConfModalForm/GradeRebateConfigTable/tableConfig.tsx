import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Tooltip } from 'antd'
import { useRef } from 'react'

import { getEnum } from '@/constants/enum'
import { accountGroupList } from '@/services/api/agent/settings'
import { cn } from '@/utils/cn'

import EditTableRowAddAccountGroup from './EditTableRowAddAccountGroup'
import EditTableRowAddSymbolModal from './EditTableRowAddSymbolModal'
import EditTableRowSelectType from './EditTableRowSelectType'

export const getColumns = (): ProColumns<AgentUser.RebateConfigItem>[] => {
  const intl = useIntl()
  const addSymbolModalRef = useRef<any>(null)
  const addAccountGroupModalRef = useRef<any>(null)

  const { data: accountGroupRes } = useRequest(accountGroupList)
  const accountGroupOptions = accountGroupRes?.data || []

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
      align: 'left',
      dataIndex: 'accountGroupId',
      width: 150,
      valueType: 'select',
      request: async () => {
        const res = await accountGroupList()
        return res?.data || []
      },
      renderText(text, record, index, action) {
        const name = text === '-1' ? '*' : text
        return name || '--'
      },
      renderFormItem(schema, config, form, action) {
        const record = config?.record
        const accountGroupId = record?.accountGroupId
        const accountGroupName = accountGroupId === '-1' ? '*' : accountGroupOptions.find((item) => item.id === accountGroupId)?.groupName
        return (
          <EditTableRowAddAccountGroup
            trigger={
              <span
                className="text-sm text-primary !cursor-pointer"
                onClick={() => {
                  addAccountGroupModalRef.current?.setFormValue?.()
                }}
              >
                {accountGroupId ? (
                  <span className="flex items-center">
                    <Tooltip title={accountGroupName} placement="bottom">
                      <span className="truncate max-w-[100px] pr-[1px]">{accountGroupName}</span>
                    </Tooltip>
                    <EditOutlined />
                  </span>
                ) : (
                  <span className="flex items-center">
                    <PlusOutlined /> <FormattedMessage id="mt.agent.tianjia" />
                  </span>
                )}
              </span>
            }
            ref={addAccountGroupModalRef}
          />
        )
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.jiaoyipinzhong' }),
      align: 'left',
      dataIndex: 'symbol',
      width: 150,
      ellipsis: true,
      renderText(text, record, index, action) {
        return record.symbol
      },
      renderFormItem(schema, config, form, action) {
        const record = config?.record
        const symbol = record?.symbol
        const accountGroupId = record?.accountGroupId
        return (
          <EditTableRowAddSymbolModal
            trigger={
              <span
                className={cn('text-sm text-primary !cursor-pointer', !accountGroupId && '!pointer-events-none !text-gray-900 opacity-40')}
                onClick={() => {
                  addSymbolModalRef.current?.setFormValue?.()
                }}
              >
                {symbol ? (
                  <span className="flex items-center">
                    <Tooltip title={symbol} placement="bottom">
                      <span className="truncate max-w-[100px] pr-[1px]">{symbol}</span>
                    </Tooltip>
                    <EditOutlined />
                  </span>
                ) : (
                  <span className="flex items-center">
                    <PlusOutlined /> <FormattedMessage id="mt.agent.tianjia" />
                  </span>
                )}
              </span>
            }
            ref={addSymbolModalRef}
            info={record}
          />
        )
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.leixing' }),
      align: 'left',
      dataIndex: 'rebateType',
      width: 150,
      // valueType: 'select',
      // valueEnum: getEnum().Enum.AgentRebateConfigType
      renderFormItem: () => <EditTableRowSelectType />,
      renderText(text, record, index, action) {
        return getEnum().Enum.AgentRebateConfigType[text]?.text || ''
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.fanyongpinlv' }),
      align: 'left',
      dataIndex: 'statisticPeriod',
      width: 120,
      valueType: 'select',
      valueEnum: getEnum().Enum.AgentRebateConfigStatisticsCycle
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.zhi' }),
      align: 'left',
      dataIndex: 'rebateValue',
      width: 120,
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
