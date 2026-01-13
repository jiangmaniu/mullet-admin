import { FormattedMessage, useSearchParams } from '@umijs/max'
import qs from 'qs'
import { useEffect, useMemo, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton, IconFontButton } from '@/components/Base/Button'
import { getClientList } from '@/services/api/crm/customer'
import { removeAccount } from '@/services/api/tradeCore/account'
import { toFixed } from '@/utils'
import { push } from '@/utils/navigator'

import AddOrEditModalForm from './AddOrEditModalForm'
import PrePayModal from './PrePayModal'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const instanceRef = useRef<Instance>()
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([])

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('expandedRowKeys')) {
      const keys = searchParams.get('expandedRowKeys')?.split(',')
      setTimeout(() => {
        setExpandedRowKeys(keys)
      }, 300)
    }
    if (searchParams.get('userAccount') || searchParams.get('tradeAccountId')) {
      instanceRef.current?.form?.setFieldsValue({
        userAccount: searchParams.get('userAccount') || undefined,
        tradeAccountId: searchParams.get('tradeAccountId') || undefined
      })
    }
  }, [searchParams, instanceRef.current])

  const locationParams = useMemo(() => {
    return Object.fromEntries(searchParams.entries())
  }, [searchParams])

  const onJumpDetail = (record: Customer.ListItem) => {
    const values = instanceRef.current?.form?.getFieldsValue()
    console.log('==values==', values)
    push(`/customer/account/edit/${record.id}?expandedRowKeys=${expandedRowKeys.join(',')}&${qs.stringify(values)}`)
  }

  return (
    <PageContainer icon="/img/emoji/6.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        stripe={false}
        showExpandRowStyle
        tableExtraRender={() => (
          <div className="flex gap-3">
            <AddOrEditModalForm
              trigger={
                <AddButton>
                  <FormattedMessage id="mt.xinzengjiaoyizhanghao" />
                </AddButton>
              }
              reload={instanceRef.current?.action?.reload}
            />
            <PrePayModal
              trigger={
                <IconFontButton icon="minganzhanghuzhuizong">
                  <FormattedMessage id="mt.zuijiayufukuanzhanghulibiao" />
                </IconFontButton>
              }
            />
            {/* <IconFontButton icon="daoru">
              <FormattedMessage id="common.export" />
            </IconFontButton>
            <IconFontButton icon="daochu">
              <FormattedMessage id="common.import" />
            </IconFontButton> */}
          </div>
        )}
        optionColumnClassName="z-[18] relative"
        renderEditBtn={(record: any) => {
          return (
            <>
              {record?.accountGroupId ? (
                <a
                  className="!text-primary text-sm font-medium"
                  onClick={() => {
                    onJumpDetail(record)
                  }}
                >
                  <FormattedMessage id="common.bianji" />
                </a>
              ) : (
                ''
              )}
            </>
          )
        }}
        // @TODO 暂时隐藏删除按钮
        renderDeleteBtn={(record, index, action, defaultDom) => {
          // @ts-ignore
          // return record?.accountGroupId ? defaultDom : ''
          return ''
        }}
        // ghost
        action={{
          // 编辑、删除 按钮只展示在二级结构：对应的交易账号，一级结构展示客户信息
          query: (params: any) => {
            const reqParams = {
              ...params
            }
            if (searchParams.get('pageNum')) {
              reqParams.current = Number(searchParams.get('pageNum'))
            }
            return getClientList(reqParams).then((res) => {
              if (res.success && res.data?.records?.length) {
                if (params.userAccount || params.tradeAccountId) {
                  // 展开搜索的项
                  setExpandedRowKeys(res.data.records.map((item) => item.id))
                }
                res.data.records = res.data.records.map((item) => {
                  const accountList = item.accountList
                  if (accountList?.length) {
                    // @ts-ignore
                    // 不统计模拟账户
                    item.money = accountList
                      .filter((v) => !v.isSimulate)
                      .reduce((total, curr) => total + toFixed(Number(curr.money || 0), curr.currencyDecimal), 0)
                    item.children = accountList.map((v) => ({
                      ...v,
                      isChild: true,
                      userId: v.id // 交易账号
                    }))
                  }
                  return {
                    ...item,
                    userId: item.userInfo?.account, // 用户uid
                    name: item.userInfo?.realName // 真名
                  }
                })
              }
              return res
            })
          },
          del: (params) => removeAccount(params)
        }}
        beforeSearchSubmit={(params) => {
          setExpandedRowKeys([])
        }}
        // dataSource={dataSource}
        getInstance={(instance) => (instanceRef.current = instance)}
        expandable={{
          expandRowByClick: true,
          expandedRowKeys,
          onExpandedRowsChange(expandedKeys) {
            setExpandedRowKeys(expandedKeys)
          }
        }}
        onRow={(record: any) => {
          return {
            onClick: (e) => {
              if (record?.accountGroupId) {
                onJumpDetail(record)
              }
            }
          }
        }}
        onReset={() => {
          setSearchParams({})
        }}
        debounceTime={500}
      />
    </PageContainer>
  )
}
