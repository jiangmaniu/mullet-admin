import { ProColumns, ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { useState } from 'react'

import { getEnum, ILanguage, LanguageMap } from '@/constants/enum'
import { getMessageTemplateCode } from '@/services/api/common'
import { updateSwitch } from '@/services/api/email/emailTemplate'
import { message } from '@/utils/message'

export const getColumns = (): ProColumns<EmailTemplate.EmailTemplateListItem>[] => {
  const [current, setCurrent] = useState({} as EmailTemplate.EmailTemplateListItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: <FormattedMessage id="mt.mubanmingcheng" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'title',
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
      title: <FormattedMessage id="mt.xiaoxichufa" />,
      dataIndex: 'code',
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
      valueType: 'select',
      request: async () => {
        const res = await getMessageTemplateCode()
        return res.data || []
      },
      className: '!pl-5'
    },
    {
      title: <FormattedMessage id="mt.fasongfangshi" />,
      dataIndex: 'type',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      valueEnum: getEnum().Enum.MessageType,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.yuyan" />,
      dataIndex: 'language',
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
        return record.language ? LanguageMap[record.language as ILanguage]?.label || record.language : '--'
      }
    },
    {
      title: <FormattedMessage id="mt.fasongkaiguan" />,
      dataIndex: 'sendSwitch',
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
        const isActive = record.sendSwitch
        return (
          <ProFormSwitch
            fieldProps={{
              value: isActive,
              loading: record.id === current?.id && loading,
              onChange: (value) => {
                setLoading(true)
                setCurrent(record)
                updateSwitch({
                  sendSwitch: isActive ? false : true,
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
      title: <FormattedMessage id="mt.mubanmiaoshu" />,
      dataIndex: 'remark',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 300
    },

    // 表单搜索项
    {
      dataIndex: 'title',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.mubanmingcheng' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'code',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.xiaoxichufa' })
      },
      colSize: 0.9,
      valueType: 'select',
      request: async () => {
        const res = await getMessageTemplateCode()
        return res.data || []
      }
    }
  ]
}
