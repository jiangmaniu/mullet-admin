import { FormattedMessage } from '@umijs/max'
import { Popconfirm } from 'antd'

import { IStandardTableProps } from '@/components/Admin/StandardTable'
import { push } from '@/utils/navigator'

import ModalForm from './comp/ModalForm'

export default (): IStandardTableProps<
  TradeFollowFollower.TradeFollowFollowerOrderItem,
  TradeFollowFollower.TradeFollowFollowerOrderParams
> => ({
  showOptionColumn: true,
  opColumnWidth: 140,
  hideSearch: true,
  cardProps: { bodyStyle: { padding: 0 } },
  columns: [
    {
      title: <FormattedMessage id="mt.yonghuuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'tradeAccountId1',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 200,
      fieldProps: {},
      renderText(text, record, index, action) {
        return record.tradeAccountId
      }
    },
    {
      title: <FormattedMessage id="mt.gendanjiaoyizhanghao" />,
      dataIndex: 'tradeAccountId',
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
      title: <FormattedMessage id="mt.leixing" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      renderText(text, record, index, action) {
        return '比例跟单'
      }
    },
    {
      title: <FormattedMessage id="mt.zhanghuyue" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.weishixianyingkui" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.yishixianyingkui" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.jingyingkui" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    // {
    //   title: <FormattedMessage id="mt.shouyilv" />,
    //   dataIndex: 'orderVolume',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 160
    // },
    {
      title: <FormattedMessage id="mt.fenrunjine" />,
      dataIndex: 'orderVolume',
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
      title: <FormattedMessage id="mt.yunxingshijian" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      renderText(text, record, index, action) {
        return '34d'
      }
    }
  ],
  renderOptionColumn: (record) => {
    return (
      <div className="flex gap-x-5 justify-end">
        <ModalForm
          trigger={
            <a
              className="!text-primary font-medium text-sm cursor-pointer"
              onClick={() => {
                push(`/copy-trading/list/view/${record.id}`)
              }}
            >
              <FormattedMessage id="common.chakan" />
            </a>
          }
          info={record as Customer.ListItem}
        />
        <Popconfirm
          title={<FormattedMessage id="mt.querenjieshugaibidingdanma" />}
          onConfirm={() => {
            // @TODO
          }}
        >
          <a className="!text-primary font-medium text-sm cursor-pointer">
            <FormattedMessage id="mt.jieshu" />
          </a>
        </Popconfirm>
      </div>
    )
  }
})
