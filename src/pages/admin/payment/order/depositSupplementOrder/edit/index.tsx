import { FormattedMessage, useIntl, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { getDepositFillOrderDetail, saveDepositFillOrder } from '@/services/api/payment/depositFillOrder'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import Regular from './form/Regular'

export default function Add() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('Regular')
  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.changgui' }),
      key: 'Regular',
      icon: 'qiehuan-changgui',
      component: Regular,
      ref: useRef()
    }
  ]

  const params = useParams()
  const id = params.id
  const isAdd = !id

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const { loading, data, run } = useRequest(getDepositFillOrderDetail, { manual: true })
  const info = data?.data || {}

  useEffect(() => {
    if (id) {
      run({ id })
    }
  }, [id])

  const activeIcon = tabList.find((item) => item.key === activeKey)?.icon as string
  const IconDom = (
    <div className="border-gray-150 border-[2px] rounded-full w-[125px] h-[125px] flex items-center justify-center">
      <Iconfont name={activeIcon} width={40} height={40} />
    </div>
  )

  return (
    <PageContainer
      tabList={tabList}
      showBack
      icon="/img/emoji/12.png"
      // pageTitle={
      //   <Breadcrumb items={breadcrumbItems} separator={<span className="text-[rgba(0,0,0,0.45)] text-base relative top-[2px]">/</span>} />
      // }
      pageTitle={<>{isAdd ? <FormattedMessage id="mt.chuangjianbudanjilu" /> : <FormattedMessage id="mt.chakanbudanjilu" />}</>}
      renderRight={() => (
        <>
          {isAdd && (
            <SaveButton
              onClick={async () => {
                // uploadIconRef?.current?.checkField?.()

                // const imgUrl = uploadIconRef.current?.fileName
                // if (!imgUrl) return message.info(intl.formatMessage({ id: 'mt.qingshangchuantupian' }))

                // 校验表单
                const formData: any = await checkForm()

                console.log('formData', formData)
                const params = {
                  actualAmount: formData?.actualAmount,
                  remark: formData?.remark,
                  userOrderNo: formData?.userOrderNo,
                  voucherPicture: (formData?.voucherPicture || [])?.map((item: any) => item?.response?.data?.name).join(',')
                } as PaymentDepositFillOrder.SaveDepositFillOrderParams

                if (formData) {
                  const res = await saveDepositFillOrder(params)
                  if (res.success) {
                    message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                    setTimeout(() => {
                      push('/payment/deposit-supplement')
                    }, 1200)
                  }
                }
              }}
              loading={saveLoading}
            />
          )}
        </>
      )}
      pageBgColorMode="white"
      contentStyle={{ paddingTop: 57 }}
      onChangeTab={(activeKey) => {
        startTransition(() => {
          setActiveKey(activeKey)
        })
      }}
      tabActiveKey={activeKey}
    >
      <Spin spinning={loading}>
        <div className="flex items-start">
          <div className="mr-[60px]">{IconDom}</div>
          <div className="w-[80%]">
            {tabList.map((item: any, idx) => {
              const Component = item.component
              return (
                <Hidden show={activeKey === item.key} key={idx}>
                  {useMemo(
                    () => (
                      <Component ref={item.ref} tabList={tabList} initialValues={info} />
                    ),
                    [info]
                  )}
                </Hidden>
              )
            })}
          </div>
        </div>
      </Spin>
    </PageContainer>
  )
}
