import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useEffect, useState } from 'react'

import { getRoleTree } from '@/services/api/crm/manager'

export const getColumns = (): ProColumns<Manager.ListItem>[] => {
  const [roleList, setRoleList] = useState<any>([])
  const [current, setCurrent] = useState({} as Manager.ListItem)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRoleTree().then((res) => {
      const roleList = (res?.data?.[0]?.children || []).map((item) => ({ value: item.key, label: item.title })) // 第一条是角色列表
      setRoleList(roleList)
    })
  }, [])

  return [
    {
      title: <FormattedMessage id="mt.dengluzhanghao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'account',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 200
    },
    {
      title: <FormattedMessage id="mt.youxiang" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'email',
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
      title: <FormattedMessage id="mt.shouji" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'phone',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.role" />,
      dataIndex: 'roleName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 300,
      renderText(text, record, index, action) {
        const roleIds = (record?.roleId || '').split(',')
        return record?.roleId
          ? roleList
              .filter((item: any) => roleIds.includes(item.value))
              .map((item: any) => item.label)
              .join(',')
          : '-'
      }
    },
    {
      title: <FormattedMessage id="mt.qiyonglianjie" />,
      dataIndex: 'status',
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
        return text === 1 ? <FormattedMessage id="mt.qiyong" /> : <FormattedMessage id="mt.jinyong" />
      }
    },
    // @TODO 缺少接口
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
    {
      title: <FormattedMessage id="mt.miaoshu" />,
      dataIndex: 'remark',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180
    },
    {
      title: <FormattedMessage id="mt.zuijinfangwen" />,
      dataIndex: 'lastLoginTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
      // renderText(text, record, index, action) {
      //   return (
      //     <div className="flex flex-col">
      //       <span className="text-primary text-sm pb-1 font-semibold">183.14.29.142</span>
      //       <span className="text-secondary text-xs">2023.10.08 03:14</span>
      //     </div>
      //   )
      // }
    },
    // {
    //   title: <FormattedMessage id="mt.role" />,
    //   dataIndex: 'roleName',
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

    // 表单搜索项
    // {
    //   dataIndex: 'roleName',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'select', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueEnum: {
    //     // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
    //     1: { text: '角色1' },
    //     2: { text: '角色2' }
    //   },
    //   fieldProps: {
    //     showSearch: true,
    //     placeholder: <FormattedMessage id="mt.selectRole" />
    //   }
    // },
    {
      dataIndex: 'userAccount',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[160px]',
        placeholder: useIntl().formatMessage({ id: 'mt.dengluzhanghao' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'name',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[160px]',
        placeholder: useIntl().formatMessage({ id: 'mt.inputName' })
      },
      colSize: 0.9
    }
  ]
}
