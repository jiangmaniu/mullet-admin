import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useState } from 'react'

import { getEnum } from '@/constants/enum'

export const getColumns = (showActivityDetailModal: (record: any) => void): ProColumns<Activity.ListItem>[] => {
  const [current, setCurrent] = useState({} as Activity.ListItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: <FormattedMessage id="mt.huodongdanhao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'activityOrderNo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 150
    },
    {
      title: <FormattedMessage id="mt.kehuuid" />,
      dataIndex: 'customerUid',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.youxiang" />,
      dataIndex: 'email',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.shoujihao" />,
      dataIndex: 'phone',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      // valueEnum: getEnum().Enum.YesNo,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    // {
    //   title: <FormattedMessage id="mt.shouchongjiaoyizhanghao" />,
    //   dataIndex: 'device',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150
    // },
    {
      title: <FormattedMessage id="mt.huodongleijichongzhijine" />,
      dataIndex: 'totalRechargeAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180,
      tooltip: <FormattedMessage id="mt.huodongleijichongzhijinetips" />
    },
    {
      title: <FormattedMessage id="mt.shengyuzengsongjie" />,
      dataIndex: 'remainingRewardAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      tooltip: <FormattedMessage id="mt.shengyuzengsongjietips" />
    },
    {
      title: <FormattedMessage id="mt.leijilingqujine" />,
      dataIndex: 'totalClaimedAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      tooltip: <FormattedMessage id="mt.leijilingqujinetips" />
    },
    {
      title: <FormattedMessage id="mt.zhuangtai" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueEnum: getEnum().Enum.ActivityStatus
    },
    {
      title: <FormattedMessage id="mt.jiaoyidingdan" />,
      dataIndex: 'tradeOrderNum',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      renderText(text, record, index, action) {
        return (
          <a className="!text-primary !underline" onClick={() => showActivityDetailModal(record)}>
            {text}
          </a>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.baomingshijian" />,
      dataIndex: 'signupTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.jieshushijian" />,
      dataIndex: 'endTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },

    // 表单搜索项
    {
      dataIndex: 'customerUid',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[140px]',
        placeholder: useIntl().formatMessage({ id: 'mt.kehuuid' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'emailOrPhone',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[140px]',
        placeholder: useIntl().formatMessage({ id: 'mt.phoneOrEmail' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'activityOrderNo',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[140px]',
        placeholder: useIntl().formatMessage({ id: 'mt.huodongdanhao' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[140px]',
        placeholder: useIntl().formatMessage({ id: 'mt.huodongzhuangtai' })
      },
      colSize: 0.9,
      valueType: 'select',
      valueEnum: getEnum().Enum.ActivityStatus
    },
    {
      dataIndex: 'dateRange',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            signupStartTime: `${value[0]} 00:00:00`,
            signupEndTime: `${value[1]} 23:59:59`
          }
        }
      },
      fieldProps: {
        className: '!w-[250px]',
        placeholder: [
          useIntl().formatMessage({ id: 'mt.baomingkaishishijian' }),
          useIntl().formatMessage({ id: 'mt.baomingjieshushijian' })
        ]
      },
      colSize: 0.9
    }
  ]
}
