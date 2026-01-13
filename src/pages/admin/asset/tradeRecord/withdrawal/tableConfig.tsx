import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<any>[] => {
  return [
    {
      title: <FormattedMessage id="mt.xuhao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'OrderId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 80
    },
    {
      title: <FormattedMessage id="mt.chujindanhao" />,
      dataIndex: 'Login',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      // valueType: 'avatar',
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.zhifuqudao" />,
      dataIndex: 'name',
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
      title: <FormattedMessage id="mt.chujinbizhong" />,
      dataIndex: 'na2me',
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
      title: <FormattedMessage id="mt.chujinjine" />,
      dataIndex: 'nam1e',
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
      title: <FormattedMessage id="mt.shouxufei" />,
      dataIndex: 'nam2222e',
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
      title: <FormattedMessage id="mt.daozhangjine" />,
      dataIndex: 'nddame',
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
      title: <FormattedMessage id="mt.chujinzhuangtai" />,
      dataIndex: 'nddame',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      valueEnum: {
        // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
        1: { text: <FormattedMessage id="mt.jinxingzhong" /> },
        2: { text: <FormattedMessage id="mt.yiwancheng" /> },
        3: { text: <FormattedMessage id="mt.yiquxiao" /> }
      },
      renderText(text, record, index, action) {
        return <span className="text-yellow text-sm">進行中</span>
        // return <span className='text-red text-sm'>已取消</span>
      }
    },
    {
      title: <FormattedMessage id="mt.meiyuanedu" />,
      dataIndex: 'nddame',
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
      title: <FormattedMessage id="mt.tijiaoshijian" />,
      dataIndex: 'type',
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
      title: <FormattedMessage id="mt.daozhangshijian" />,
      dataIndex: 'ty2pe',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      align: 'right',
      fixed: 'right'
    },

    // 表单搜索项
    {
      dataIndex: 'tim2e2',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      valueType: 'dateRange',
      fieldProps: {
        placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
      }
    },
    {
      dataIndex: 'time2',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      valueType: 'dateRange',
      fieldProps: {
        placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
      }
    },
    {
      dataIndex: 'symbol',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: {
        // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
        OP_BUY: { text: <FormattedMessage id="mt.mairu" /> },
        OP_SELL: { text: <FormattedMessage id="mt.maichu" /> }
      },
      fieldProps: {
        showSearch: true,
        className: '!w-[150px]',
        placeholder: <FormattedMessage id="mt.zhifuqudao" />
      },
      colSize: 0.9
    },
    {
      dataIndex: 'symbol',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: {
        // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
        OP_BUY: { text: <FormattedMessage id="mt.mairu" /> },
        OP_SELL: { text: <FormattedMessage id="mt.maichu" /> }
      },
      fieldProps: {
        className: '!w-[180px]',
        placeholder: getIntl().formatMessage({ id: 'mt.shurubizhong' })
      },
      colSize: 1
    },
    {
      dataIndex: 'symbol22',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: {
        // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
        OP_BUY: { text: <FormattedMessage id="mt.mairu" /> },
        OP_SELL: { text: <FormattedMessage id="mt.maichu" /> }
      },
      fieldProps: {
        showSearch: true,
        className: '!w-[150px]',
        placeholder: <FormattedMessage id="mt.xuanzechujinzhuangtai" />
      },
      colSize: 0.9
    }
  ]
}
