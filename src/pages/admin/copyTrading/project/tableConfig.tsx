import { RightOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl } from '@umijs/max'
import { useState } from 'react'

import Button from '@/components/Base/Button'
import { getEnum } from '@/constants/enum'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'
import { push } from '@/utils/navigator'

//
export const getColumns = (): {
  columns: ProColumns<TradeFollowProject.TradeFollowPageItem>[]
  modalInfo: any
  setModalInfo: (info: any) => void
} => {
  const [modalInfo, setModalInfo] = useState<any>(undefined)

  const columns: ProColumns<TradeFollowProject.TradeFollowPageItem>[] = [
    {
      title: <FormattedMessage id="mt.yonghuuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'leadId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 200,
      fieldProps: {}
    },
    {
      title: <FormattedMessage id="mt.xiangmumingcheng" />,
      dataIndex: 'projectName',
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
    {
      title: <FormattedMessage id="mt.jiaoyizhanghu" />,
      dataIndex: 'tradeAccountId',
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
      title: <FormattedMessage id="mt.jiaoyizhanghuzu" />,
      dataIndex: 'groupName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 240
    },
    {
      title: <FormattedMessage id="mt.gendanrenshu" />,
      dataIndex: 'followerNumber',
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
      title: <FormattedMessage id="mt.fenrunbili" />,
      dataIndex: 'profitSharingRatio',
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
      title: <FormattedMessage id="mt.xiangmuzhuangtai" />,
      dataIndex: 'auditStatus',
      valueEnum: getEnum().Enum.Status,
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      renderText(text, record, index, action) {
        return (
          <span className=" pl-2 rounded p-1">
            {record.enabledFlag === 0 ? (
              <span className=" text-primary">
                <FormattedMessage id="mt.qiyong" />
              </span>
            ) : (
              <span className=" text-gray-400">
                <FormattedMessage id="mt.jinyong" />
              </span>
            )}
          </span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.shenhezhuangtai" />,
      dataIndex: 'auditStatus',
      valueEnum: getEnum().Enum.Status,
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      sorter: true,
      width: 140,
      renderText(text, record, index, action) {
        // @ts-ignore
        // const auditStatus = (Math.floor(Math.random() * 100) + 1) % 3
        const auditStatus = record.auditStatus

        return (
          <div
            onClick={() => {
              setModalInfo(record)
            }}
          >
            {auditStatus === 0 ? (
              <span className="text-yellow hover:!text-primary pl-2 cursor-pointer hover:bg-gray-150 rounded p-1">
                <FormattedMessage id="mt.daishenhe" />
                <RightOutlined />
              </span>
            ) : auditStatus === 1 ? (
              <span className="text-green hover:!text-primary pl-2 cursor-pointer hover:bg-gray-150 rounded p-1">
                <FormattedMessage id="mt.shenhetongguo" />
                {/* <RightOutlined /> */}
              </span>
            ) : (
              <span className="text-red hover:!text-primary pl-2 cursor-pointer hover:bg-gray-150 rounded p-1">
                <FormattedMessage id="mt.shenheweitongguo" />
                <RightOutlined />
              </span>
            )}
          </div>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.chuangjianshijian" />,
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
    {
      title: <FormattedMessage id="mt.shezhi" />,
      dataIndex: 'setting',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      align: 'right',
      fixed: 'right',
      width: 80,
      renderText(text, record, index, action) {
        return (
          <Button
            type="text"
            onClick={() => {
              push(`/copy-trading/project/edit/${record.leadId}#Setting`)
            }}
          >
            <FormattedMessage id="mt.bianji" />
          </Button>
        )
      }
    },

    // 表单搜索项
    {
      dataIndex: 'groupName',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      request: async () => {
        const res = await getAccountGroupPageList({ current: 1, size: 9999 })
        return (res.data?.records || [])
          .filter((item) => !item.isSimulate)
          .map((item) => ({ ...item, value: item.groupName, label: item.groupName }))
      },
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.xuanzezhanghuzu' })
      }
    },
    {
      dataIndex: 'openFlag',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.OpenFlag,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.xiangmuzhuangtai' })
      }
    },
    {
      dataIndex: 'leadId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.shurukehu' })
      }
    }
  ]

  return {
    columns,
    modalInfo,
    setModalInfo
  }
}
