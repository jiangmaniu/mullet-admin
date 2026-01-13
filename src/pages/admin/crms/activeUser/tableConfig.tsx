import { InfoCircleOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useLayoutEffect, useState } from 'react'

import { addAllOptionToEnum, getEnum } from '@/constants/enum'
import { getFindAllClientGroup } from '@/services/api/crmManage/trading'
import { get3MonBeforeRange } from '@/utils'

import { formatNum } from '..'

export const getColumns = (): ProColumns<CrmTrading.ActiveUsersTableItem>[] => {
  const intl = useIntl()
  const [selectStat, setSelectStat] = useState('retention')

  const [channels, setChannels] = useState<any>([])

  useLayoutEffect(() => {
    getFindAllClientGroup().then((res) => {
      const channels = res?.data?.reduce((pre: any, cur: any) => {
        return { ...pre, [cur.id]: { text: `${cur.groupName} (${cur.code})` } }
      }, {})
      setChannels(channels)
    })
  }, [])
  return [
    {
      title: <FormattedMessage id="mt.riqi" />,
      dataIndex: '',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return record.statisticsDate
      },
      width: 200,
      fixed: 'left'
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.huoyueyonghu" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.huoyueyonghutips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'totalFirstAMoney',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'left',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      renderText(text, record, index, action) {
        if (selectStat === 'retention') {
          return record.activeUserCount
            ? `${formatNum(record.activeUserCount, { precision: 0 })}/${formatNum(record.activeUserPercentage)}%`
            : ''
        }
        if (selectStat === 'deposit') {
          return record.activeUserCount
            ? `${formatNum(record.activeUserCount, { precision: 0 })}/${formatNum(Number(record.activeUserDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'withdraw') {
          return record.activeUserCount
            ? `${formatNum(record.activeUserCount, { precision: 0 })}/${formatNum(Number(record.activeUserWithdrawalAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'netdeposit') {
          return record.activeUserCount
            ? `${formatNum(record.activeUserCount, { precision: 0 })}/${formatNum(Number(record.activeUserNetDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'lot') {
          return record.activeUserCount
            ? `${formatNum(record.activeUserCount, { precision: 0 })}/${formatNum(Number(record.activeUserTotalSize), { precision: 2 })}`
            : ''
        }

        return ''
      }
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.shouayonghu" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.shouayonghutips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'firstAUserCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'left',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        if (selectStat === 'retention') {
          return formatNum(record.firstAUserCount, { precision: 0 })
        }
        if (selectStat === 'deposit') {
          return record.firstAUserCount
            ? `${formatNum(record.firstAUserCount, { precision: 0 })}/${formatNum(Number(record.firstAUserDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'withdraw') {
          return record.firstAUserCount
            ? `${formatNum(record.firstAUserCount, { precision: 0 })}/${formatNum(Number(record.firstAUserWithdrawalAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'netdeposit') {
          return record.firstAUserCount
            ? `${formatNum(record.firstAUserCount, { precision: 0 })}/${formatNum(Number(record.firstAUserNetDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'lot') {
          return record.firstAUserCount
            ? `${formatNum(record.firstAUserCount, { precision: 0 })}/${formatNum(Number(record.firstAUserTotalSize), { precision: 2 })}`
            : ''
        }

        return ''
      },
      width: 160
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.huiliuyonghu" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.huiliuyonghutips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'returningUserCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'left',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        if (selectStat === 'retention') {
          return formatNum(record.returningUserCount, { precision: 0 })
        }
        if (selectStat === 'deposit') {
          return record.returningUserCount
            ? `${formatNum(record.returningUserCount, { precision: 0 })}/${formatNum(Number(record.returningUserDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'withdraw') {
          return record.returningUserCount
            ? `${formatNum(record.returningUserCount, { precision: 0 })}/${formatNum(Number(record.returningUserWithdrawalAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'netdeposit') {
          return record.returningUserCount
            ? `${formatNum(record.returningUserCount, { precision: 0 })}/${formatNum(Number(record.returningUserNetDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'lot') {
          return record.returningUserCount
            ? `${formatNum(record.returningUserCount, { precision: 0 })}/${formatNum(Number(record.returningUserTotalSize), {
                precision: 2
              })}`
            : ''
        }

        return ''
      },
      width: 160
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.zhengchangyonghu" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.zhengchangyonghutips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'normalUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'left',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        if (selectStat === 'retention') {
          return formatNum(record.normalUserCount, { precision: 0 })
        }
        if (selectStat === 'deposit') {
          return record.normalUserCount
            ? `${formatNum(record.normalUserCount, { precision: 0 })}/${formatNum(Number(record.normalUserDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'withdraw') {
          return record.normalUserCount
            ? `${formatNum(record.normalUserCount, { precision: 0 })}/${formatNum(Number(record.normalUserWithdrawalAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'netdeposit') {
          return record.normalUserCount
            ? `${formatNum(record.normalUserCount, { precision: 0 })}/${formatNum(Number(record.normalUserNetDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'lot') {
          return record.normalUserCount
            ? `${formatNum(record.normalUserCount, { precision: 0 })}/${formatNum(Number(record.normalUserTotalSize), { precision: 2 })}`
            : ''
        }

        return ''
      },
      width: 160
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.liushishouayonghu" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.liushishouayonghutips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'lossFirstAUserCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'left',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        if (selectStat === 'retention') {
          return formatNum(record.lossFirstAUserCount, { precision: 0 })
        }
        if (selectStat === 'deposit') {
          return record.lossFirstAUserCount
            ? `${formatNum(record.lossFirstAUserCount, { precision: 0 })}/${formatNum(Number(record.lossFirstAUserDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'withdraw') {
          return record.lossFirstAUserCount
            ? `${formatNum(record.lossFirstAUserCount, { precision: 0 })}/${formatNum(Number(record.lossFirstAUserWithdrawalAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'netdeposit') {
          return record.lossFirstAUserCount
            ? `${formatNum(record.lossFirstAUserCount, { precision: 0 })}/${formatNum(Number(record.lossFirstAUserNetDepositAmount), {
                precision: 2
              })}`
            : ''
        }
        if (selectStat === 'lot') {
          return record.lossFirstAUserCount
            ? `${formatNum(record.lossFirstAUserCount, { precision: 0 })}/${formatNum(Number(record.lossFirstAUserTotalSize), {
                precision: 2
              })}`
            : ''
        }

        return ''
      },
      width: 160
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.liushihuiliukehu" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.liushihuiliukehutips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'lossReturningUserCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'left',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        if (selectStat === 'retention') {
          return formatNum(record.lossReturningUserCount, { precision: 0 })
        }
        if (selectStat === 'deposit') {
          return record.lossReturningUserCount
            ? `${formatNum(record.lossReturningUserCount, { precision: 0 })}/${formatNum(Number(record.lossReturningUserDepositAmount))}`
            : ''
        }
        if (selectStat === 'withdraw') {
          return record.lossReturningUserCount
            ? `${formatNum(record.lossReturningUserCount, { precision: 0 })}/${formatNum(Number(record.lossReturningUserWithdrawalAmount))}`
            : ''
        }
        if (selectStat === 'netdeposit') {
          return record.lossReturningUserCount
            ? `${formatNum(record.lossReturningUserCount, { precision: 0 })}/${formatNum(Number(record.lossReturningUserNetDepositAmount))}`
            : ''
        }
        if (selectStat === 'lot') {
          return record.lossReturningUserCount
            ? `${formatNum(record.lossReturningUserCount, { precision: 0 })}/${formatNum(Number(record.lossReturningUserTotalSize))}`
            : ''
        }

        return ''
      },
      width: 160
    },
    {
      title: (
        <div className="flex flex-row items-center justify-end gap-1">
          <FormattedMessage id="mt.liushizhengchangkehu" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.liushizhengchangkehutips" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      dataIndex: 'lossNormalUserCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'right',
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        if (selectStat === 'retention') {
          return formatNum(record.lossNormalUserCount, { precision: 0 })
        }
        if (selectStat === 'deposit') {
          return record.lossNormalUserCount
            ? `${formatNum(record.lossNormalUserCount, { precision: 0 })}/${formatNum(Number(record.lossNormalUserDepositAmount))}`
            : ''
        }
        if (selectStat === 'withdraw') {
          return record.lossNormalUserCount
            ? `${formatNum(record.lossNormalUserCount, { precision: 0 })}/${formatNum(Number(record.lossNormalUserWithdrawalAmount))}`
            : ''
        }
        if (selectStat === 'netdeposit') {
          return record.lossNormalUserCount
            ? `${formatNum(record.lossNormalUserCount, { precision: 0 })}/${formatNum(Number(record.lossNormalUserNetDepositAmount))}`
            : ''
        }
        if (selectStat === 'lot') {
          return record.lossNormalUserCount
            ? `${formatNum(record.lossNormalUserCount, { precision: 0 })}/${formatNum(Number(record.lossNormalUserTotalSize))}`
            : ''
        }

        return ''
      },
      width: 160,
      fixed: 'right'
    },

    // 表单搜索项
    {
      dataIndex: 'dateRangeNoTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateMonthRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      initialValue: get3MonBeforeRange(),
      search: {
        transform: (value) => {
          return { startTime: dayjs(value[0]).format('YYYY-MM'), endTime: dayjs(value[1]).format('YYYY-MM') }
        }
      },
      fieldProps: {
        placeholder: [intl.formatMessage({ id: 'common.startDate' }), intl.formatMessage({ id: 'common.endDate' })]
      }
    },
    {
      dataIndex: 'countType',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      initialValue: 'retention',
      valueEnum: getEnum().Enum.ActiveUserStatItem,
      formItemProps: {
        label: '', // 去掉form label
        required: true,
        rules: [{ required: true, message: '请选择统计项目' }]
      },
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.tongjixiangmu' }),
        required: true,
        clearable: false,
        allowClear: false,
        style: {
          width: 200
        },
        onChange: (value: any) => {
          console.log('value', value)
          setSelectStat(value)
        }
      },
      colSize: 0.9
    },
    {
      dataIndex: 'channelId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: addAllOptionToEnum(channels),
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.kaihuqudao' }),
        style: {
          width: 180
        }
      },
      colSize: 0.9
    }
  ]
}
