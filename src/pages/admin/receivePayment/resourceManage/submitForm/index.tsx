import { FormattedMessage, useIntl, useLocation, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { addReceiveResource, getReceiveResourceInfo, updateReceiveResource } from '@/services/api/receivePayment/receiveManage'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import LimitCondition from './form/LimitCondition'
import Regular from './form/Regular'

export default function Add() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('Regular')
  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.shoukuanxinxi' }),
      key: 'Regular',
      icon: 'qiehuan-changgui',
      component: Regular,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.xianzhitiaojian' }),
      key: 'LimitCondition',
      icon: 'kehuzu',
      component: LimitCondition,
      ref: useRef()
    }
  ]

  const { pathname } = useLocation()
  const params = useParams()
  const id = params.id
  const isAdd = !id

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const { loading, data, run } = useRequest(getReceiveResourceInfo, { manual: true })
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
      pageTitle={<>{isAdd ? <FormattedMessage id="common.add" /> : <FormattedMessage id="mt.bianji" />}</>}
      renderRight={() => (
        <SaveButton
          onClick={async () => {
            // 校验表单
            const formData = (await checkForm()) as PaymentReceiveManage.SaveReceiveParams

            // 表单校验成功
            if (formData) {
              const values = {
                ...formData,
                id,
                // @ts-ignore
                paymentCode: formData?.paymentCode?.[0]?.response?.data?.name || formData?.paymentCode || ''
              } as any

              console.log('checkForm Success', values)

              setSaveLoading(true)
              const reqFn = isAdd ? addReceiveResource : updateReceiveResource
              const res = await reqFn(values)
              if (res.success) {
                message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                push('/receive-payment/resource-manage')
              }
              setSaveLoading(false)
            }
          }}
          loading={saveLoading}
        />
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
                  <Component ref={item.ref} tabList={tabList} initialValues={info} />
                </Hidden>
              )
            })}
          </div>
        </div>
      </Spin>
    </PageContainer>
  )
}
