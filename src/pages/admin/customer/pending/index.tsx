import { FormattedMessage, useIntl } from '@umijs/max'
import { Popconfirm } from 'antd'
import { useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { cancelOrder, getOrderPage } from '@/services/api/tradeCore/order'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const [total, setTotal] = useState(0)
  const instanceRef = useRef<Instance>()
  const intl = useIntl()

  return (
    <PageContainer
      icon="/img/emoji/2.png"
      pageBgColorMode="gray"
      subTitle={
        <>
          {!!total && (
            <div>
              <FormattedMessage id="mt.guadanshuliang" />：{total}
            </div>
          )}
        </>
      }
    >
      <StandardTable
        columns={getColumns()}
        // ghost
        showOptionColumn
        opColumnWidth={140}
        renderOptionColumn={(record) => {
          // 撤单：点击后二次弹窗确认是否撤单（仅在未成交或部分成交状态的订单处可以点击）
          return (
            <div className="flex gap-3 justify-end">
              <Popconfirm
                title={<FormattedMessage id="mt.quedingcexiaodingdan" />}
                onConfirm={async () => {
                  cancelOrder({ id: record.id }).then((res) => {
                    if (res.success) {
                      instanceRef.current?.action?.reload()
                      message.info(intl.formatMessage({ id: 'common.opSuccess' }))
                    }
                  })
                }}
                key="delete"
              >
                <a className="!text-primary font-medium text-sm mr-3">
                  <FormattedMessage id="mt.chedan" />
                </a>
              </Popconfirm>
              <a
                className="!text-primary font-medium text-sm"
                onClick={() => {
                  // 跳转到交易页面，带上交易品种等信息，填入交易输入框
                  push(`/customer/pending/edit/${record.tradeAccountId}?key=Trade`)
                }}
              >
                <FormattedMessage id="common.bianji" />
              </a>
            </div>
          )
        }}
        action={{
          // 查询挂单类型
          query: (params) =>
            getOrderPage({
              ...params
              // status: 'ENTRUST'
            })
        }}
        getRequestResult={(result) => {
          setTotal(result?.total)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
