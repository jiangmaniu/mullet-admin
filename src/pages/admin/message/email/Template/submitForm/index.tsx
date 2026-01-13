import { FormattedMessage, history, useIntl, useLocation, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { getEmailTemplateDetail, submitEmailTemplate } from '@/services/api/email/emailTemplate'
import { message } from '@/utils/message'

import BaseConfig from './form/BaseConfig'
import LanageConfig from './form/LanageConfig'

export default function Add() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('BaseConfig')
  const { pathname } = useLocation()
  const isDepositChannel = pathname.indexOf('payment/deposit-channel') !== -1

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.jichuxinxi' }),
      key: 'BaseConfig',
      icon: 'qiehuan-gailan',
      component: BaseConfig,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.guojihuapeizhi' }),
      key: 'Lanage',
      icon: 'zhanghujieshao',
      component: LanageConfig,
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

  const { loading, data, run } = useRequest(getEmailTemplateDetail, { manual: true })
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
      icon="/img/emoji/16.png"
      pageTitle={<>{isAdd ? <FormattedMessage id="mt.xinjianyoujianmuban" /> : <FormattedMessage id="mt.bianjiyoujianmuban" />}</>}
      renderRight={() => (
        <SaveButton
          onClick={async () => {
            // 校验表单
            const formData = (await checkForm()) as any

            console.log('formData', formData)

            // 表单校验成功
            if (formData) {
              const { templateLanguageAddDTOList, ...params } = formData
              const values = {
                ...params,
                templateLanguageAddDTOList: templateLanguageAddDTOList?.map((item: any) => ({
                  ...item,
                  // 使用base64编码
                  // content: Base64.encode(item.content)
                  content: encodeURIComponent(item.content)
                })),
                id
              } as any

              console.log('checkForm Success', values)

              setSaveLoading(true)
              const res = await submitEmailTemplate(values)
              if (res.success) {
                message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                history.back()
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
                  {useMemo(() => {
                    return (
                      <Component
                        ref={item.ref}
                        tabList={tabList}
                        initialValues={{
                          ...info
                        }}
                      />
                    )
                  }, [info])}
                </Hidden>
              )
            })}
          </div>
        </div>
      </Spin>
    </PageContainer>
  )
}
