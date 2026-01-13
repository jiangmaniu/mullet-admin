import { AlertOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import classNames from 'classnames'
import { useState } from 'react'

import Modal from '@/components/Admin/ModalForm'
import StandardTable from '@/components/Admin/StandardTable'
import { getOrderCrossHighList } from '@/services/api/tradeCore/order'
import { red } from '@/theme/theme.config'
import { toFixed } from '@/utils'

type IProps = {
  trigger: JSX.Element
  info?: any
}

export default function PrePayModal({ trigger, info = {} }: IProps) {
  const isAdd = Object.keys(info).length === 0
  const intl = useIntl()
  const [total, setTotal] = useState(0)

  const columns: ProColumns<Order.CrossHightListItem>[] = [
    {
      title: <FormattedMessage id="mt.zhanghu" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'accountId',
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
      title: <FormattedMessage id="mt.suoshukehu" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'client',
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
      title: <FormattedMessage id="mt.zubie" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'accountGroup',
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
      title: <FormattedMessage id="mt.yue" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'money',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.yufukuanbili" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'marginRatio',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      fixed: 'right',
      align: 'right',
      renderText(text, record, index, action) {
        const marginRatio = toFixed(record?.marginRatio || 0)
        return (
          <>
            {/* 注：到达“追加预付款比例”的客户标黄色，预付款比例达到“强制平仓”+5%的客户标红色 */}
            {/* {!!marginRatio && (
              <>
                <div className="">
                  {index % 2 === 0 ? (
                    <span className="text-yellow-550 text-sm font-semibold">40 %</span>
                  ) : (
                    <span>
                      <img src="/img/warn.png" width={20} height={20} />
                      <span className="text-red text-sm font-semibold pl-1">20 %</span>
                    </span>
                  )}
                </div>
              </>
            )} */}
            {!!marginRatio ? (
              <span
                className={classNames(
                  'text-primary text-sm font-semibold',
                  marginRatio > 20 ? '!text-yellow-560' : '',
                  marginRatio <= 20 ? '!text-red-700' : ''
                )}
              >
                <AlertOutlined color={red['700']} style={{ marginRight: 4 }} />
                {marginRatio}%
              </span>
            ) : (
              '‑‑'
            )}
          </>
        )
      }
    }
  ]

  return (
    <Modal
      title={<FormattedMessage id="mt.zuijiayufukuanzhanghulibiao" />}
      onFinish={async (values: any) => {
        console.log('values', values)

        return true
      }}
      trigger={trigger}
      submitter={{
        submitButtonProps: {
          icon: <AlertOutlined style={{ paddingRight: 8 }} />,
          style: { height: 38 }
        },
        searchConfig: {
          // 按钮“一键提醒”：点击后对列表客户发送消息提示（优先级低，因为到达线后系统会自动提醒）
          submitText: <FormattedMessage id="mt.yijiantixing" />
        }
      }}
    >
      <div className="text-primary text-sm pb-3">
        <FormattedMessage id="mt.minganzhanghushuliang" />：{total}
      </div>
      <StandardTable
        columns={columns}
        hideSearch
        cardProps={{ bodyStyle: { padding: 0 } }}
        pageSize={50}
        scroll={{ x: 300 }}
        // ghost
        action={{
          query: (params) => getOrderCrossHighList(params)
        }}
        getRequestResult={(result) => {
          setTotal(result?.total)
        }}
      />
    </Modal>
  )
}
