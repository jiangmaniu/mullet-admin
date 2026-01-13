import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import classNames from 'classnames'
import { useState } from 'react'

import { getEnum } from '@/constants/enum'

export const getColumns = (): ProColumns<Holiday.HolidayPageListItem>[] => {
  const [current, setCurrent] = useState({} as Holiday.HolidayPageListItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: <FormattedMessage id="common.startTime" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'startTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
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
      title: <FormattedMessage id="common.endTime" />,
      dataIndex: 'endTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.miaoshu" />,
      dataIndex: 'describeInfo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.symbol" />,
      dataIndex: 'symbols',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="common.status" />,
      dataIndex: 'status',
      valueEnum: getEnum().Enum.Status,
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
        return <span className={classNames(text === 'DISABLED' ? 'text-red' : 'text-gray')}>{getEnum().Enum.Status[text].text}</span>
      }
    },

    // @TODO 暂时没接口
    // {
    //   title: <FormattedMessage id="mt.qiyonglianjie" />,
    //   dataIndex: 'status',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150,
    //   renderText(text, record, index, action) {
    //     const isActive = record.status === 1
    //     return (
    //       <ProFormSwitch
    //         fieldProps={{
    //           value: record.status === 1,
    //           loading: record.id === current?.id && loading,
    //           onChange: (value) => {
    //             setLoading(true)
    //             setCurrent(record)
    //             updateManager({
    //               status: isActive ? 1 : 0,
    //               id: record.id
    //             })
    //               .then((res) => {
    //                 if (res.success) {
    //                   // 刷新表格数据
    //                   action?.reload()
    //                   message.info(getIntl().formatMessage({ id: 'common.opSuccess' }))
    //                 }
    //               })
    //               .finally(() => {
    //                 setTimeout(() => {
    //                   setLoading(false)
    //                 }, 300)
    //               })
    //           }
    //         }}
    //       />
    //     )
    //   }
    // },

    // 表单搜索项
    {
      dataIndex: 'status',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.Status,
      fieldProps: {
        placeholder: <FormattedMessage id="mt.xuanzezhuangtai" />
      }
    }
  ]
}
