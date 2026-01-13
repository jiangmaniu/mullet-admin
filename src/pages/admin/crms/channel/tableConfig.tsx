import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { useLayoutEffect, useState } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { addAllOptionToEnum } from '@/constants/enum'
import { getFindAllClientGroup } from '@/services/api/crmManage/trading'
import { sysPush } from '@/utils/navigator'

import { formatNum } from '..'

export const getColumns = (): ProColumns<CrmTrading.ChannelListItem>[] => {
  const intl = useIntl()
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
      dataIndex: 'dateStr',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.qudao" />,
      dataIndex: 'channelId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'center',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    // {
    //   title: <FormattedMessage id="mt.qudaoid" />,
    //   dataIndex: 'clientGroupId',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 200
    // },
    {
      title: <FormattedMessage id="mt.huodong" />,
      dataIndex: 'active',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'center',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.zu" />,
      dataIndex: 'group',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'center',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.zhucerenshu" />,
      dataIndex: 'regUserCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      renderText(text, record, index, action) {
        return (
          <span
            className="cursor-pointer underline"
            onClick={() => {
              sysPush(`/crms/channels`, `startDate=${record.dateStr}&endDate=${record.dateStr}`)
            }}
          >
            {text}
          </span>
        )
      },
      align: 'right',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.shimingrenshu" />,
      dataIndex: 'kycAuthCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      renderText(text, record, index, action) {
        return (
          <span
            className="cursor-pointer underline"
            onClick={() => {
              sysPush(`/crms/channels`, `startDate=${record.dateStr}&endDate=${record.dateStr}&isKycAuth=1`)
            }}
          >
            {text}
          </span>
        )
      },
      align: 'right',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.shouarujinrenshu" />,
      dataIndex: 'firstDepositUserCount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      renderText(text, record, index, action) {
        return (
          <span
            className="cursor-pointer underline"
            onClick={() => {
              sysPush(`/crms/channels`, `fastAStartTime=${record.dateStr}&fastAEndTime=${record.dateStr}`)
            }}
          >
            {text}
          </span>
        )
      },
      align: 'right',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.shoucirujin" />,
      dataIndex: 'totalFirstAMoney',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      align: 'right',
      renderText(text, record, index, action) {
        return (
          <span
          // className="cursor-pointer underline"
          // onClick={() => {
          //   sysPush(`/crms/customer`, `startDate=${record.dateStr}&endDate=${record.dateStr}`)
          // }}
          >
            {formatNum(text, { precision: DEFAULT_PRECISION })}
          </span>
        )
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.kedanjiezhi" />,
      dataIndex: 'customerTransaction',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      renderText(text, record, index, action) {
        return (
          <span>
            {/* @ts-ignore */}
            {!Number.isNaN(Number(record.totalFirstAMoney)) && Number(record.totalFirstAMoney) !== 0
              ? // @ts-ignore
                (Number(record.totalFirstAMoney) / record.regUserCount).toFixed(DEFAULT_PRECISION)
              : '0'}
          </span>
        )
      },
      width: 140,
      fixed: 'right',
      align: 'right'
    },

    // 表单搜索项
    {
      dataIndex: 'dateRangeNoTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      // initialValue: [DATE.DATE_TODAY, DATE.DATE_TODAY],
      // initialValue: get3MonBeforeRange(),
      fieldProps: {
        placeholder: [intl.formatMessage({ id: 'common.startDate' }), intl.formatMessage({ id: 'common.endDate' })]
      }
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
