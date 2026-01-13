import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { ProColumns, ProFormSelect } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Tooltip } from 'antd'
import { useRef } from 'react'

import { isAllSymbolByLng } from '@/components/Admin/AutoCompleteTree'
import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import { getEnum } from '@/constants/enum'
import { accountGroupList } from '@/services/api/agent/settings'
import { isTruthy } from '@/utils'
import { cn } from '@/utils/cn'

import EditTableRowAddAccountGroup from '../LevelModeEditTable/RebateConfModalForm/GradeRebateConfigTable/EditTableRowAddAccountGroup'
import EditTableRowAddSymbolModal from '../LevelModeEditTable/RebateConfModalForm/GradeRebateConfigTable/EditTableRowAddSymbolModal'
import EditTableRowSelectType from '../LevelModeEditTable/RebateConfModalForm/GradeRebateConfigTable/EditTableRowSelectType'

export const getColumns = ({ canEditValue, canEditForm }: any): ProColumns<AgentSettings.CommonMultiLevelConfigItem>[] => {
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
      width: 120,
      valueType: 'select',
      ellipsis: true,
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
        // 是否是新增的行数据
        const isNewRow = String(record?.id || '').indexOf('row_') !== -1
        if (!isNewRow && !canEditForm) return <span className="truncate w-full max-w-full inline-block">{accountGroupName || '--'}</span>
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
                      <span className="truncate max-w-full pr-[1px]">{accountGroupName}</span>
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
        let symbol = record?.symbol
        return (isAllSymbolByLng(symbol) ? '*' : symbol) || '--'
      },
      renderFormItem(schema, config, form, action) {
        const record = config?.record
        let symbol = record?.symbol
        symbol = isAllSymbolByLng(symbol) ? '*' : symbol
        const accountGroupId = record?.accountGroupId
        // 是否是新增的行数据
        const isNewRow = String(record?.id || '').indexOf('row_') !== -1
        if (!isNewRow && !canEditForm) return <span className="truncate w-full max-w-full inline-block">{symbol || '--'}</span>
        return (
          <EditTableRowAddSymbolModal
            trigger={
              <span
                className={cn(
                  'text-sm text-primary !cursor-pointer',
                  !accountGroupId && '!cursor-not-allowed pointer-events-none !text-gray-900 opacity-40'
                )}
                onClick={() => {
                  addSymbolModalRef.current?.setFormValue?.()
                }}
              >
                {symbol ? (
                  <span className="flex items-center">
                    <Tooltip title={symbol} placement="bottom">
                      <span className="truncate max-w-full pr-[1px]">{symbol}</span>
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
      ellipsis: true,
      // valueType: 'select',
      // valueEnum: getEnum().Enum.AgentRebateConfigType
      renderFormItem: (schema, config, form, action) => {
        const record = config?.record
        const rebateType = record?.rebateType as string
        const rebateTypeName = getEnum().Enum.AgentRebateConfigType[rebateType]?.text
        // 是否是新增的行数据
        const isNewRow = String(record?.id || '').indexOf('row_') !== -1
        if (!isNewRow && !canEditForm) return <span className="truncate w-full max-w-full inline-block">{rebateTypeName || '--'}</span>
        return <EditTableRowSelectType />
      },
      renderText(text, record, index, action) {
        return getEnum().Enum.AgentRebateConfigType[text]?.text || ''
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.fanyongpinlv' }),
      align: 'left',
      dataIndex: 'statisticPeriod',
      width: 150,
      valueType: 'select',
      valueEnum: getEnum().Enum.AgentRebateConfigStatisticsCycle,
      renderFormItem(schema, config, form, action) {
        const record = config?.record
        const statisticPeriod = record?.statisticPeriod as string
        const statisticPeriodName = getEnum().Enum.AgentRebateConfigStatisticsCycle[statisticPeriod]?.text
        // 是否是新增的行数据
        const isNewRow = String(record?.id || '').indexOf('row_') !== -1
        if (!isNewRow && !canEditForm) return <span className="truncate w-full max-w-full inline-block">{statisticPeriodName || '--'}</span>
        return (
          <ProFormSelect
            options={getEnum().enumToOptions('AgentRebateConfigStatisticsCycle')}
            placeholder={intl.formatMessage({ id: 'mt.agent.fanyongpinlv' })}
            fieldProps={{ style: { height: 30, width: '100%' } }}
            allowClear={false}
          />
        )
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.zhi' }),
      align: 'left',
      dataIndex: 'rebateValue',
      width: 150,
      renderText(text, record, index, action) {
        let unit = ''
        // 固定金额单位USD
        if (record.rebateType === 'FIXED_AMOUNT' && isTruthy(record.rebateValue)) {
          unit = 'USD'
        } else if (isTruthy(record.rebateValue)) {
          unit = '%'
        }
        return `${record.rebateValue} ${unit}`
      },
      renderFormItem(schema, config, form, action) {
        const record = config?.record
        const rebateType = record?.rebateType
        const rebateValue = record?.rebateValue

        let unit = ''
        // 固定金额单位USD
        if (rebateType === 'FIXED_AMOUNT' && isTruthy(rebateValue)) {
          unit = 'USD'
        } else if (isTruthy(rebateValue)) {
          unit = '%'
        }

        return (
          <ProFormDigit
            fieldProps={{
              precision: undefined,
              controls: false,
              autoComplete: 'off',
              size: 'middle',
              style: { width: '100%', height: 30 },
              suffix: unit
            }}
          />
        )
      }
    }
  ]
}
