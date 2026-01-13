import { FormattedMessage, useIntl, useLocation, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import IconUpload from '@/components/Base/IconUpload'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { getChannelConfigDetail, saveChannelConfig, updateChannelConfig } from '@/services/api/payment/channel'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import Fee from './form/Fee'
import LanageConfig from './form/LanageConfig'
import LimitCondition from './form/LimitCondition'
import Regular from './form/Regular'
import SystemConfig from './form/SystemConfig'

export default function Add() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('Regular')
  const { pathname } = useLocation()
  const isDepositChannel = pathname.indexOf('payment/deposit-channel') !== -1

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.changgui' }),
      key: 'Regular',
      icon: 'qiehuan-changgui',
      component: Regular,
      ref: useRef()
    },
    {
      label: isDepositChannel ? intl.formatMessage({ id: 'mt.rujinshouxufei' }) : intl.formatMessage({ id: 'mt.chujinshouxufei' }),
      key: 'Fee',
      icon: 'shouxufei',
      component: Fee,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.xianzhitiaojian' }),
      key: 'LimitCondition',
      icon: 'kehuzu',
      component: LimitCondition,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.xitongpeizhi' }),
      key: 'SystemConfig',
      icon: 'shezhi',
      component: SystemConfig,
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

  const { loading, data, run } = useRequest(getChannelConfigDetail, { manual: true })
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
            uploadIconRef?.current?.checkField?.()

            const channelIcon = uploadIconRef.current?.fileName
            if (!channelIcon) return message.info(intl.formatMessage({ id: 'mt.qingshangchuantupian' }))

            // 校验表单
            const formData = (await checkForm()) as PaymentChannel.SubmitChannelConfigParams

            console.log('formData', formData)

            // 表单校验成功
            if (formData) {
              const values = {
                ...formData,
                id,
                channelIcon,
                channelLanguageAddDTOList: (formData.channelLanguageAddDTOList || []).map((item) => ({
                  ...item,
                  // @ts-ignore
                  explanation: JSON.stringify(item.explanation)
                })),
                status: formData.status ? 'OPEN' : 'CLOSE',
                fundsType: isDepositChannel ? 'DEPOSIT' : 'WITHDRAWAL' // 入金渠道
              } as any

              console.log('checkForm Success', values)

              setSaveLoading(true)
              const reqFn = isAdd ? saveChannelConfig : updateChannelConfig
              const res = await reqFn(values)
              if (res.success) {
                message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                push(isDepositChannel ? '/payment/deposit-channel' : '/payment/withdrawal-channel')
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
          <div className="mr-[60px]">
            <div style={{ display: activeKey === 'Regular' ? 'block' : 'none' }}>
              <IconUpload
                fileSize={0.5}
                helpTips={intl.formatMessage({ id: 'mt.shangchuanqudaotubiaotips' })}
                value={info.channelIcon}
                ref={uploadIconRef}
              />
            </div>
            {activeKey !== 'Regular' && IconDom}
          </div>
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
                          ...info,
                          status: info?.status === 'OPEN' ? true : false
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
