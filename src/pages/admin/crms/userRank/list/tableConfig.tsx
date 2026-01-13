import { FormattedMessage, getIntl, useIntl, useLocation } from '@umijs/max'
import { useLayoutEffect, useState } from 'react'

import { ProColumns } from '@/components/Admin/StandardTable'
import { DEFAULT_PRECISION } from '@/constants'
import { addAllOptionToEnum } from '@/constants/enum'
import { getFindAllClientGroup } from '@/services/api/crmManage/trading'
import { sysPush } from '@/utils/navigator'

export const getColumns = (): ProColumns<CrmTrading.TradingUserItem>[] => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const fastAStartTime = queryParams.get('fastAStartTime')
  const fastAEndTime = queryParams.get('fastAEndTime')

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
      title: <FormattedMessage id="mt.paiming" />,
      dataIndex: 'num',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 80,
      fixed: 'left',
      align: 'center',
      renderText(text, record, index, action) {
        // 获取当前页码和每页显示数量
        const { current = 1, pageSize = 10 } = action?.pageInfo || {}

        // 计算实际序号
        const actualIndex = (current - 1) * pageSize + index + 1
        return actualIndex <= 3 ? (
          <img src="/img/huo.png" width={20} height={20} />
        ) : (
          <span className="text-gray font-semibold">{actualIndex}</span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.yonghuuid" />,
      dataIndex: 'account',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      renderText(text, record, index, action) {
        return (
          <span className="cursor-pointer underline" onClick={() => sysPush(`/crms/customer/view/${record.clientId}`)}>
            {text}
          </span>
        )
      },
      formItemProps: {
        label: '' // 去掉form label
      },

      width: 120,
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.mingcheng" />,
      // dataIndex: 'account',
      dataIndex: 'realName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      // fieldProps: {
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 120
    },
    // {
    //   title: <FormattedMessage id="mt.xing" />,
    //   // dataIndex: 'account',
    //   dataIndex: 'lastName',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   // fieldProps: {
    //   //   placeholder: ''
    //   // },
    //   // formItemProps: {
    //   //   label: '' // 去掉form label
    //   // },
    //   renderText(text, record, index, action) {
    //     return text || '‑‑'
    //   },
    //   width: 120
    // },
    // {
    //   title: <FormattedMessage id="mt.ming" />,
    //   // dataIndex: 'account',
    //   dataIndex: 'firstName',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   // fieldProps: {
    //   //   placeholder: ''
    //   // },
    //   // formItemProps: {
    //   //   label: '' // 去掉form label
    //   // },
    //   renderText(text, record, index, action) {
    //     return text || '‑‑'
    //   },
    //   width: 120
    // },
    {
      title: <FormattedMessage id="mt.jiaoyiliang" />,
      dataIndex: 'volume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      sorter: true,
      // sortPostData: (key, sort) => {
      //   return ['orderBy', sort === 'ascend' ? 'DEFAULTASC' : 'DEFAULTDESC']
      // },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.rujin" />,
      dataIndex: 'deposit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      sorter: true,
      // sorter: (a, b) => {
      //   return (b.deposit || 0) - (a.deposit || 0)
      // },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.chujin" />,
      dataIndex: 'withdrawal',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: '0'
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      sorter: true,
      // sorter: (a, b) => {
      //   return (b.withdrawal || 0) - (a.withdrawal || 0)
      // },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.jingrujin" />,
      dataIndex: 'netIncome',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      sorter: true,
      // sorter: (a, b) => {
      //   return (b.netIncome || 0) - (a.netIncome || 0)
      // },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.kaihuchannel" />,
      dataIndex: 'channelId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      // fieldProps: {
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      // sorter: (a, b) => {
      //   return (b.channelId || 0) - (a.channelId || 0)
      // },
      renderText(text, record, index, action) {
        return text || '‑‑'
      },
      width: 180
    },
    {
      title: <FormattedMessage id="mt.shourujine" />,
      dataIndex: 'fastAMoney',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      // sorter: (a, b) => {
      //   return (b.fastAMoney || 0) - (a.fastAMoney || 0)
      // },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.yishixianyingkui" />,
      dataIndex: 'profit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      sorter: true,
      // sorter: (a, b) => {
      //   return (b.profit || 0) - (a.profit || 0)
      // },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.yue" />,
      dataIndex: 'availableBalance',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      sorter: true,
      // sorter: (a, b) => {
      //   return (b.availableBalance || 0) - (a.availableBalance || 0)
      // },
      width: 180
    },
    {
      title: <FormattedMessage id="mt.kaihushijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      // sorter: (a, b) => {
      //   return dayjs(b.createTime).isAfter(dayjs(a.createTime)) ? 1 : -1
      // },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.shourushijian" />,
      dataIndex: 'fastATime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      // sorter: (a, b) => {
      //   return dayjs(b.fastATime).isAfter(dayjs(a.fastATime)) ? 1 : -1
      // },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.zuihoujiaoyishijian" />,
      dataIndex: 'lastTradeTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      // sorter: (a, b) => {
      //   return dayjs(b.fastATime).isAfter(dayjs(a.fastATime)) ? 1 : -1
      // },
      width: 200,
      fixed: 'right',
      align: 'right'
    },
    // 表单搜索项
    {
      dataIndex: 'regTime',
      search: {
        transform: (value) => {
          return { regStartTime: value[0], regEndTime: value[1] }
        }
      },
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[240px]',
        placeholder: [useIntl().formatMessage({ id: 'mt.regStartTime' }), useIntl().formatMessage({ id: 'mt.regEndTime' })]
      },
      colSize: 0.9
    },
    {
      dataIndex: 'fastATime',
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
      initialValue: fastAStartTime && fastAEndTime ? [fastAStartTime, fastAEndTime] : undefined,
      fieldProps: {
        className: '!w-[240px]',
        placeholder: [useIntl().formatMessage({ id: 'mt.fastAStartTime' }), useIntl().formatMessage({ id: 'mt.fastAEndTime' })]
      },
      colSize: 0.9
    },
    {
      dataIndex: 'lastTradeTime',
      search: {
        transform: (value) => {
          return { lastTradeStartTime: value[0], lastTradeEndTime: value[1] }
        }
      },
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[240px]',
        placeholder: [
          useIntl().formatMessage({ id: 'mt.zuihoujiaoyikaishijian' }),
          useIntl().formatMessage({ id: 'mt.zuihoujiaoyijieshushijian' })
        ]
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
          width: 160
        }
      },
      colSize: 0.9
    },
    {
      dataIndex: 'userUid',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[140px]',
        placeholder: useIntl().formatMessage({ id: 'mt.yonghuuid' })
      },
      colSize: 0.9
    }
  ]
}
