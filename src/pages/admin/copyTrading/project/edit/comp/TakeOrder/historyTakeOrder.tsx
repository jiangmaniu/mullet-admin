import { FormattedMessage } from '@umijs/max'

import { IStandardTableProps } from '@/components/Admin/StandardTable'
import { SOURCE_CURRENCY } from '@/constants'
import { push } from '@/utils/navigator'

import ModalForm from './comp/ModalForm'

export default (): IStandardTableProps<TradeFollowLead.TradeFollowHistoryLeadOrderItem, TradeFollowLead.TradeFollowLeadOrderParams> => ({
  showOptionColumn: true,
  opColumnWidth: 80,
  hideSearch: true,
  cardProps: { bodyStyle: { padding: 0 } },
  renderOptionColumn: (record) => {
    return (
      <ModalForm
        trigger={
          <a
            className="!text-primary font-medium text-sm cursor-pointer"
            onClick={() => {
              push(`/copy-trading/take/view/${record.id}?key=history`)
            }}
          >
            <FormattedMessage id="common.chakan" />
          </a>
        }
        info={record as Customer.ListItem}
      />
    )
  },
  columns: [
    {
      title: <FormattedMessage id="mt.symbol" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'symbol',
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
      title: <FormattedMessage id="mt.ganggan" />,
      dataIndex: 'gangan',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      renderText(text, record, index, action) {
        return 'X10'
      }
    },
    {
      title: <FormattedMessage id="mt.fangxiang" />,
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
        return <span className="text-green font-semibold">买入</span>
      }
    },
    {
      title: <FormattedMessage id="mt.shoushu" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.kaicangjunjia" />,
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
      title: <FormattedMessage id="mt.pingcangjia" />,
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
      title: <FormattedMessage id="mt.daidanhao" />,
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
      title: <FormattedMessage id="mt.fenrunjine" />,
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
      title: <FormattedMessage id="mt.gendanrenshu" />,
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
      title: (
        <>
          <FormattedMessage id="mt.zongyingkui" />
        </>
      ),
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
        return <span className="text-green font-semibold">+1000 {SOURCE_CURRENCY}</span>
      }
    },
    // {
    //   title: <FormattedMessage id="mt.fenrunjine" />,
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
    // {
    //   title: <FormattedMessage id="mt.yishixianyingkui" />,
    //   dataIndex: 'orderVolume',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     precision: 2,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 160
    // },
    // {
    //   title: <FormattedMessage id="mt.kaishishijian" />,
    //   dataIndex: 'createTime',
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
    {
      title: <FormattedMessage id="mt.shijian" />,
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
    }
  ]
})
