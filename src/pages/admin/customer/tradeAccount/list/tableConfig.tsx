import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'
import { formatNum } from '@/utils'
import { cn } from '@/utils/cn'

export const getColumns = (): ProColumns<Customer.ListItem>[] => {
  return [
    {
      title: (
        <span>
          <FormattedMessage id="mt.yonghuuid" />/<FormattedMessage id="mt.jiaoyizhanghao" />
        </span>
      ), // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      // fixed: 'left',
      width: 240,
      renderText(text, record, index, action) {
        return <span className="z-[18] relative">{text || ' '}</span>
      },
      onCell: (record) => {
        return {
          onClick: (e) => {
            e.stopPropagation()
          }
        }
      }
    },
    {
      title: <FormattedMessage id="mt.shouji" />,
      dataIndex: ['userInfo', 'phone'],
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        // @ts-ignore
        return <span className="z-[18] relative">{text}</span>
      },
      onCell: (record) => {
        return {
          onClick: (e) => {
            e.stopPropagation()
          }
        }
      }
    },
    {
      title: <FormattedMessage id="mt.youxiang" />,
      dataIndex: ['userInfo', 'email'],
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        // @ts-ignore
        return <span className="z-[18] relative">{text}</span>
      },
      onCell: (record) => {
        return {
          onClick: (e) => {
            e.stopPropagation()
          }
        }
      }
    },
    {
      title: <FormattedMessage id="mt.mingcheng" />,
      dataIndex: 'name',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        // @ts-ignore
        return <span className="z-[18] relative">{text}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.yue" />,
      dataIndex: 'money',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        return <span className="z-[18] relative !font-dingpro-medium">{formatNum(text, { precision: 2 })}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.zhanghuzu" />,
      dataIndex: 'groupName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        // @ts-ignore
        const isSimulate = record.isSimulate
        // @ts-ignore
        const tagName = record.isChild ? (
          <span
            className={cn(
              'flex h-5 min-w-[42px] items-center justify-center rounded px-1 !text-xs font-normal text-white',
              isSimulate ? 'bg-green' : 'bg-blue-500'
            )}
          >
            {isSimulate ? <FormattedMessage id="mt.moni" /> : <FormattedMessage id="mt.zhenshi" />}
          </span>
        ) : (
          ''
        )
        // @ts-ignore
        return (
          <div className="relative z-[18] flex items-center gap-x-2">
            {/* @ts-ignore */}
            {record.isChild ? text : ''}
            {tagName}
          </div>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.zhanghushu" />,
      dataIndex: 'num',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        const num = record.children?.length
        return num ? (
          <div className="relative z-[18] flex items-center">
            <img src="/img/account.png" width={16} height={16} />
            <span className="pl-[2px]">{num}</span>
          </div>
        ) : (
          ' '
        )
      }
    },

    // 表单搜索项
    // @TODO 暂时没有
    // {
    //   dataIndex: 'accountGroupId',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'select', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   // request: async () => {
    //   //   const res = await getAccountGroupPageList({ current: 1, size: 999 })
    //   //   return (res.data?.records || []).map((item) => ({
    //   //     ...item,
    //   //     value: item.id,
    //   //     label: item.groupName
    //   //   }))
    //   // },
    //   fieldProps: {
    //     showSearch: true,
    //     placeholder: <FormattedMessage id="mt.zhanghuzu" />
    //   },
    //   renderFormItem: () => <AccountGroupSelectFormItem size="middle" required={false} />
    // },
    // {
    //   dataIndex: 'type',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'select', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueEnum: {
    //     // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
    // OP_BUY: { text: <FormattedMessage id="mt.mairu" /> },
    // OP_SELL: { text: <FormattedMessage id="mt.maichu" /> }
    //   },
    //   fieldProps: {
    //     showSearch: true,
    //     placeholder: <FormattedMessage id="mt.xuanzezubie" />
    //   }
    // },

    // @TODO 缺少字段 核对一下
    // {
    //   dataIndex: 'accountGroupId',
    //   hideInTable: true,
    //   hideInSearch: false,
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fieldProps: {
    //     placeholder: useIntl().formatMessage({ id: 'mt.shuruzhanghu' })
    //   }
    // },
    // {
    //   dataIndex: 'name',
    //   hideInTable: true,
    //   hideInSearch: false,
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fieldProps: {
    //     placeholder: useIntl().formatMessage({ id: 'mt.xingming' })
    //   }
    // },
    {
      dataIndex: 'accountGroupId',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        mode: 'multiple',
        // 响应式
        maxTagCount: 'responsive',
        className: '!w-[250px]',
        placeholder: useIntl().formatMessage({ id: 'mt.zhanghuzu' })
      },
      valueType: 'select',
      search: {
        transform: (value) => {
          return (value || []).join(',')
        }
      },
      request: async () => {
        const res = await getAccountGroupPageList({ current: 1, size: 999 })
        return (res.data?.records || []).map((item) => ({
          ...item,
          value: item.id,
          label: item.groupName
        }))
      },
      colSize: 0.9
    },
    {
      dataIndex: 'userAccount',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[140px]',
        placeholder: useIntl().formatMessage({ id: 'mt.yonghuuid' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'tradeAccountId',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[140px]',
        placeholder: useIntl().formatMessage({ id: 'mt.jiaoyizhanghao' })
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
    }
  ]
}
