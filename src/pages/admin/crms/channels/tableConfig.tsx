import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl, useLocation } from '@umijs/max'
import { useLayoutEffect, useState } from 'react'

import { addAllOptionToEnum, getEnum } from '@/constants/enum'
import { getFindAllClientGroup } from '@/services/api/crmManage/trading'
import { sysPush } from '@/utils/navigator'

export const getColumns = (): ProColumns<CrmTrading.findChannelUserItem>[] => {
  const [channels, setChannels] = useState<any>([])

  const location = useLocation()

  useLayoutEffect(() => {
    getFindAllClientGroup().then((res) => {
      const channels = res?.data?.reduce((pre: any, cur: any) => {
        return { ...pre, [cur.id]: { text: cur.groupName } }
      }, {})
      setChannels(channels)
    })
  }, [])

  return [
    {
      title: <FormattedMessage id="mt.yonghuuid" />,
      dataIndex: 'account',
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
        return (
          <span className="cursor-pointer underline" onClick={() => sysPush(`/crms/customer/view/${record.clientId}`)}>
            {text}
          </span>
        )
      },
      width: 120
    },
    // {
    //   title: <FormattedMessage id="mt.jiaoyizhanghao" />,
    //   dataIndex: 'tradeAccountId',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 140
    // },
    {
      title: <FormattedMessage id="mt.guojia" />,
      dataIndex: 'country',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      fieldProps: {
        placeholder: '',
        className: '!min-w-[200px]',
        align: 'center'
      },
      renderText(text, record, index, action) {
        return `${text ?? '‑‑'}`
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.shoujihao" />,
      dataIndex: 'phone',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      fieldProps: {
        placeholder: '',
        minWidth: 240
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return `${record.phoneAreaCode ?? ''} ${text ?? ''}`
      },
      width: 240
    },
    {
      title: <FormattedMessage id="mt.youxiang" />,
      dataIndex: 'email',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },

    {
      title: <FormattedMessage id="mt.kaihushijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: '',
        minWidth: 200
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      align: 'center',
      width: 200
    },
    {
      title: <FormattedMessage id="mt.shoucirujinshijian" />,
      dataIndex: 'firstAtime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: '',
        minWidth: 200
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      align: 'center',
      width: 200
    },
    {
      title: <FormattedMessage id="mt.zuihoudenglu" />,
      dataIndex: 'lastLoginTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: '',
        minWidth: 200
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      align: 'center',
      width: 200
    },
    {
      title: <FormattedMessage id="mt.kaihuqudao" />,
      dataIndex: 'channelId',
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
        return `${text ?? '‑‑'}`
      },
      align: 'center',
      width: 140
    },
    {
      title: <FormattedMessage id="mt.quyu" />,
      dataIndex: 'lastLoginAddress',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      align: 'center',
      fieldProps: {
        // precision: 0,
        placeholder: ''
      },
      renderText(text, record, index, action) {
        return `${text ?? '‑‑'}`
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 240
    },
    {
      title: <FormattedMessage id="mt.ip" />,
      dataIndex: 'lastLoginIp',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      fieldProps: {
        placeholder: ''
      },
      renderText(text, record, index, action) {
        return `${text ?? '‑‑'}`
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },

    // 表单搜索项
    {
      dataIndex: 'time1',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      search: {
        transform: (value) => {
          return { startTime: value[0], endTime: value[1] }
        }
      },
      hideInTable: true,
      fieldProps: {
        style: {
          width: 240
        },
        placeholder: [useIntl().formatMessage({ id: 'mt.kaihushijian' }), useIntl().formatMessage({ id: 'mt.kaihushijian' })]
      },
      colSize: 1.5
    },
    {
      dataIndex: 'time2',
      search: {
        transform: (value) => {
          return { fastAStartTime: value[0], fastAEndTime: value[1] }
        }
      },
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        style: {
          width: 240
        },
        placeholder: [useIntl().formatMessage({ id: 'mt.shourushijian' }), useIntl().formatMessage({ id: 'mt.shourushijian' })]
      },

      colSize: 1.5
    },

    {
      dataIndex: 'time3',
      search: {
        transform: (value) => {
          return { lastLoginStartTime: value[0], lastLoginEndTime: value[1] }
        }
      },
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        style: {
          width: 240
        },
        placeholder: [useIntl().formatMessage({ id: 'mt.zuihoudenglushijian' }), useIntl().formatMessage({ id: 'mt.zuihoudenglushijian' })]
      },
      colSize: 1.5
    },

    {
      dataIndex: 'clientId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[130px]',
        placeholder: getIntl().formatMessage({ id: 'mt.yonghuuid' })
      },
      colSize: 0.9
    },
    // {
    //   dataIndex: 'tradeAccountId',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   fieldProps: {
    //     placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' })
    //   },
    //   colSize: 0.9
    // },
    {
      dataIndex: 'isKycAuth',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: addAllOptionToEnum(getEnum().Enum.KYC),
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.shifouwanchengkyc' }),
        style: {
          width: 150
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
          width: 150
        }
      },
      colSize: 0.9
    }
  ]
}
