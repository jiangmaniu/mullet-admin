import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<Log.UsualLogListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.rizhishijian" />,
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
      width: 200,
      fixed: 'left'
    },
    // {
    //   title: <FormattedMessage id="mt.rizhizhuangtai" />,
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
    //   width: 150
    // },
    // {
    //   title: <FormattedMessage id="mt.yunyingshang" />,
    //   dataIndex: 'test',
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
      title: <FormattedMessage id="mt.rizhishuju" />,
      dataIndex: 'logData',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 240,
      renderText(text, record, index, action) {
        let params = record.logData
        let description = ''
        if (record.logData) {
          try {
            let data = JSON.parse(record.logData)
            params = data?.params
            description = data?.description
          } catch (e) {}
        }
        return (
          <span>
            {description} {params}
          </span>
        )
      }
    },
    // {
    //   title: <FormattedMessage id="mt.caozuoyuan" />,
    //   dataIndex: 'createBy',
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
    // {
    //   title: <FormattedMessage id="mt.shoujihaoma" />,
    //   dataIndex: 'phone',
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
      title: <FormattedMessage id="mt.fuwuhid" />,
      dataIndex: 'serviceId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.fuwuhost" />,
      dataIndex: 'serverHost',
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
      title: <FormattedMessage id="mt.fuwuip" />,
      dataIndex: 'serverIp',
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
    // {
    //   title: <FormattedMessage id="mt.qingqiujiekou" />,
    //   dataIndex: 'requestUri',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 200
    // },

    // 表单搜索项
    // {
    //   dataIndex: 'createBy',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   fieldProps: {
    //     className: '!w-[180px]',
    //     placeholder: useIntl().formatMessage({ id: 'mt.caozuoyuan' })
    //   },
    //   colSize: 0.9
    // },
    {
      dataIndex: 'logData',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.shoujihaoma' })
      },
      colSize: 0.9
    },
    // {
    //   dataIndex: 'status',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueType: 'select',
    //   valueEnum: {
    //     1: { text: '成功' }
    //   },
    //   fieldProps: {
    //     className: '!w-[180px]',
    //     placeholder: useIntl().formatMessage({ id: 'mt.rizhizhuangtai' })
    //   },
    //   colSize: 0.9
    // },
    {
      dataIndex: 'dateRange',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'dateRange',
      fieldProps: {
        className: '!w-[240px]',
        placeholder: [useIntl().formatMessage({ id: 'mt.kaishishijian' }), useIntl().formatMessage({ id: 'mt.jieshushijian' })]
      },
      colSize: 0.9
    }
  ]
}
