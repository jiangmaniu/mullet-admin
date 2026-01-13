import { FormattedMessage, useIntl, useLocation, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { getClientGroupDetail, submitClientGroup } from '@/services/api/crm/customerGroup'
import { message } from '@/utils/message'

import Base from './form/Base'
import FundConfig from './form/FundConfig'
import TradeConfig from './form/TradeConfig'

export default function AddAndEdit() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  const [activeKey, setActiveKey] = useState('Base')
  const params = useParams()
  const { pathname } = useLocation()
  const id = params.id
  const isAdd = !id

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.jichuxinxi' }),
      key: 'Base',
      icon: 'qiehuan-changgui',
      component: Base,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.jiaoyipeizhi' }),
      key: 'TradeConfig',
      icon: 'qiehuan-yufukuan',
      component: TradeConfig,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.zijinpeizhi' }),
      key: 'FundConfig',
      icon: 'qiehuan-jiaoyibizhong',
      component: FundConfig,
      ref: useRef()
    }
  ]

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const { loading, data, run } = useRequest(getClientGroupDetail, { manual: true })
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
      icon="/img/emoji/21.png"
      pageTitle={isAdd ? <FormattedMessage id="mt.xinzengyewuxian" /> : <FormattedMessage id="mt.bianjiyewuxian" />}
      renderRight={() => (
        <>
          <SaveButton
            onClick={async () => {
              // 校验表单
              const formData = await checkForm()

              // 表单校验成功
              if (formData) {
                const { realAccountGroupId, demoAccountGroupId, ...rest } = formData as any
                const accountGroupId = [...(realAccountGroupId || []), ...(demoAccountGroupId || [])].join(',')
                setSaveLoading(true)
                // @ts-ignore
                const res = await submitClientGroup({
                  ...rest,
                  id: info?.id,
                  accountGroupId
                })
                if (res.success) {
                  message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                  history.back()
                }
                setSaveLoading(false)
              }
            }}
            loading={saveLoading}
          />
        </>
      )}
      pageBgColorMode="white"
      contentStyle={{ paddingTop: 57, paddingInline: 83 }}
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
          <div className="w-[60%]">
            {tabList.map((item: any, idx) => {
              const Component = item.component
              return (
                <Hidden show={activeKey === item.key} key={idx}>
                  {useMemo(
                    () => (
                      <Component ref={item.ref} initialValues={info} />
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
