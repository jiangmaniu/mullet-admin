import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { getClientGroupList } from '@/services/api/crm/customerGroup'
import { formatNum } from '@/utils'

export const getColumns = ({ showModal, setModalInfo, setTabActiveKey }: any): ProColumns<Customer.ListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.yewuxianming" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'clientGroupId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 140,
      valueType: 'select',
      className: '!pl-5',
      request: async () => {
        const res = await getClientGroupList({ current: 1, size: 999 })
        return (res?.data?.records || []).map((item) => {
          return {
            ...item,
            label: item.groupName,
            value: item.id
          }
        })
      }
    },
    {
      title: <FormattedMessage id="mt.yonghuuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: ['userInfo', 'account'],
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.youxiang" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: ['userInfo', 'email'],
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
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
      dataIndex: ['userInfo', 'phone'],
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
    // {
    //   title: <FormattedMessage id="mt.xingming" />,
    //   dataIndex: ['userInfo', 'name'],
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
      title: <FormattedMessage id="mt.xing" />,
      dataIndex: ['kycAuth', 'lastName'],
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
      title: <FormattedMessage id="mt.ming" />,
      dataIndex: ['kycAuth', 'firstName'],
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
        const accountList = record.accountList || []
        // 不统计模拟账户
        const totalMoney = accountList.filter((v) => !v.isSimulate).reduce((total, current) => total + Number(current.money || 0), 0)
        return <span className="!font-dingpro-medium">{formatNum(totalMoney, { precision: 2 })}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.shenfenyanzheng" />,
      dataIndex: ['kycAuth', 'status'],
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
        if (!text) return '‑‑'
        const statusMap = getEnum().Enum.ApproveStatus[text]
        const approveText = statusMap?.text
        const color = statusMap?.color

        return (
          <div className="flex items-center">
            <span style={{ color }}>{approveText}</span>
            {text === 'TODO' && (
              <span
                className="flex items-center justify-center bg-brand text-white rounded px-2 py-[5px] text-xs ml-2 cursor-pointer"
                onClick={() => {
                  setModalInfo(record)
                  setTabActiveKey('AccountInfo')
                  showModal()
                }}
              >
                <FormattedMessage id="mt.qushenhe" />
                <img src="/img/right-icon.png" width={14} height={14} />
              </span>
            )}
          </div>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.yinhangyanzheng" />,
      dataIndex: ['bankCardAuth', 'status'],
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
        if (!text) return '‑‑'
        const statusMap = getEnum().Enum.ApproveStatus[text]
        const approveText = statusMap?.text
        const color = statusMap?.color
        return (
          <div className="flex items-center">
            <span style={{ color }}>{approveText}</span>
            {text === 'TODO' && (
              <span
                className="flex items-center justify-center bg-brand text-white rounded px-2 py-[5px] text-xs ml-2 cursor-pointer"
                onClick={() => {
                  setTabActiveKey('BankCard')
                  setModalInfo(record)
                  showModal()
                }}
              >
                <FormattedMessage id="mt.qushenhe" />
                <img src="/img/right-icon.png" width={14} height={14} />
              </span>
            )}
          </div>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.zhuceshijian" />,
      dataIndex: 'createTime',
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
      dataIndex: 'groupName',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.yewuxianming' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'account',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.yonghuuid' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'email',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.youxiang' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'phone',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.shouji' })
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
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.xingming' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'dateRange',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      valueType: 'dateRange',
      fieldProps: {
        className: '!w-[250px]',
        placeholder: [useIntl().formatMessage({ id: 'mt.zhucekaishishijian' }), useIntl().formatMessage({ id: 'mt.zhucejieshushijian' })]
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: {
        // TODO,SUCCESS,DISALLOW,CANCEL
        TODO: {
          text: <FormattedMessage id="mt.daishenhe" />
        },
        SUCCESS: {
          text: <FormattedMessage id="mt.yishenhe" />
        }
      },
      fieldProps: {
        className: '!w-[120px]',
        placeholder: <FormattedMessage id="mt.shenfenyanzheng" />
      },
      colSize: 0.9
    },
    // {
    //   dataIndex: 'isKycAuth',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'select', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueEnum: {
    //     true: {
    //       text: <FormattedMessage id="mt.yirenzheng" />
    //     },
    //     false: {
    //       text: <FormattedMessage id="mt.weirenzheng" />
    //     }
    //   },
    //   fieldProps: {
    //     className: '!w-[120px]',
    //     placeholder: <FormattedMessage id="mt.shenfenyanzheng" />
    //   },
    //   colSize: 0.9
    // },
    {
      dataIndex: 'isBankcardBind',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: {
        true: {
          text: <FormattedMessage id="mt.yirenzheng" />
        },
        false: {
          text: <FormattedMessage id="mt.weirenzheng" />
        }
      },
      fieldProps: {
        className: '!w-[120px]',
        placeholder: <FormattedMessage id="mt.yinhangyanzheng" />
      },
      colSize: 0.9
    }
  ]
}
