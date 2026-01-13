import { ProColumns, ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { useState } from 'react'

import { updateEmailStatus } from '@/services/api/email/emailChannel'
import { message } from '@/utils/message'

export const getColumns = (): ProColumns<EmailChannel.EmailChannelListItem>[] => {
  const [current, setCurrent] = useState({} as EmailChannel.EmailChannelListItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: <FormattedMessage id="mt.tongdaomingcheng" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'channelName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 160
    },
    {
      title: <FormattedMessage id="mt.youjiantongdaoleixing" />,
      dataIndex: 'channelTypeCode',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.zhuangtai" />,
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
      width: 120,
      renderText(text, record, index, action) {
        const isActive = record.status === 'ENABLE'
        return (
          <ProFormSwitch
            fieldProps={{
              value: isActive,
              loading: record.id === current?.id && loading,
              onChange: (value) => {
                setLoading(true)
                setCurrent(record)
                updateEmailStatus({
                  status: isActive ? 'DISABLE' : 'ENABLE',
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
      title: <FormattedMessage id="mt.chuangjianshijian" />,
      dataIndex: 'createTime',
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
      dataIndex: 'channelName',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.tongdaomingcheng' })
      },
      colSize: 0.9
    }
  ]
}
