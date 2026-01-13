import { ProColumns, ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { useState } from 'react'

import { getEnum } from '@/constants/enum'
import { getPaymentTypeList, switchReceiveResourceStatus } from '@/services/api/receivePayment/receiveManage'
import { getSymbolIcon } from '@/utils/business'
import { message } from '@/utils/message'

export const getColumns = (): ProColumns<PaymentReceiveManage.ReceiveResourceListItem>[] => {
  const intl = useIntl()

  const [current, setCurrent] = useState({} as PaymentReceiveManage.ReceiveResourceListItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.leixing" />,
      dataIndex: 'channelNo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.quanzhong" />,
      dataIndex: 'weight',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.kahao" />,
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
      width: 150
    },
    {
      title: <FormattedMessage id="mt.xingming" />,
      dataIndex: 'name',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.yinghangmingcheng" />,
      dataIndex: 'bankName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.shoukuanma" />,
      dataIndex: 'paymentCode',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      valueType: 'image', // 图片展示
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        return record.paymentCode ? getSymbolIcon(record.paymentCode) : ''
      }
    },
    {
      title: <FormattedMessage id="mt.jinrishouru" />,
      dataIndex: 'todayAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.leijishouru" />,
      dataIndex: 'totalAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.zhuangtai" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      valueEnum: getEnum().Enum.PaymentReceiveSourceStatus,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.kaiguan" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        const isActive = record.status === 'IDLE' || record.status === 'OCCUPY'
        return (
          <ProFormSwitch
            fieldProps={{
              disabled: record.status === 'OCCUPY', // 占用不能点击
              value: record.status === 'IDLE' || record.status === 'OCCUPY',
              loading: record.id === current?.id && loading,
              onChange: (value) => {
                setLoading(true)
                setCurrent(record)
                switchReceiveResourceStatus({
                  status: isActive ? 'DISABLE' : 'IDLE',
                  id: record.id
                })
                  .then((res) => {
                    if (res.success) {
                      // 刷新表格数据
                      action?.reload()
                      message.info(getIntl().formatMessage({ id: 'common.opSuccess' }))
                    }
                  })
                  .finally(() => {
                    setTimeout(() => {
                      setLoading(false)
                    }, 300)
                  })
              }
            }}
          />
        )
      }
    },
    {
      title: <FormattedMessage id="mt.gengxinshijian" />,
      dataIndex: 'updateTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
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
      dataIndex: 'account',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.kahao' })
      },
      colSize: 0.9
    },
    // {
    //   dataIndex: 'channelNoValue',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueType: 'cascader',
    //   request: async () => {
    //     const res = await getPaymentChannelType()
    //     const data = res?.data || []
    //     return data.map((item) => {
    //       // @ts-ignore
    //       item.label = item.dictValue
    //       // @ts-ignore
    //       item.value = item.dictKey
    //       if (item.children?.length) {
    //         item.children = item.children.map((child) => {
    //           child.label = child.dictValue
    //           child.value = child.dictKey
    //           return child
    //         })
    //       }
    //       return item
    //     })
    //   },
    //   search: {
    //     transform: (value: any) => {
    //       return {
    //         // 获取节点的最后一层值返回
    //         // [1,2,3,4] => 4
    //         channelNoValue: value.at(-1)
    //       }
    //     }
    //   },
    //   fieldProps: {
    //     className: '!w-[240px]',
    //     placeholder: useIntl().formatMessage({ id: 'mt.leixing' })
    //   },
    //   colSize: 0.9
    // }
    {
      dataIndex: 'channelNoValue',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      request: async () => {
        const res = await getPaymentTypeList()
        const data = res?.data || []
        return data.map((item: any) => {
          return {
            label: item.channelNo,
            value: item.channelNoValue
          }
        })
      },
      fieldProps: {
        className: '!w-[240px]',
        placeholder: useIntl().formatMessage({ id: 'mt.leixing' })
      },
      colSize: 0.9
    }
  ]
}
