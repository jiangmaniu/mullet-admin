import { FormattedMessage, useIntl, useLocation, useSearchParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { cloneAccountGroup, getAccountGroupDetail } from '@/services/api/tradeCore/accountGroup'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import Base from './form/Base'

export default function Clone() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  const [activeKey, setActiveKey] = useState('Base')
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const id = searchParams.get('id')
  const isDemoAccount = pathname?.indexOf('/account-group/demo') !== -1 // 模拟账户

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.jibenxinxi' }),
      key: 'Base',
      icon: 'qiehuan-changgui',
      component: Base,
      ref: useRef()
    }
  ]

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const { loading, data, run } = useRequest(getAccountGroupDetail, { manual: true })
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
      icon="/img/emoji/6.png"
      pageTitle={<FormattedMessage id="mt.kelongzhanghuzufuben" />}
      renderRight={() => (
        <>
          <SaveButton
            onClick={async () => {
              // 校验表单
              const formData = (await checkForm()) as AccountGroup.CloneAccountGroupParams

              // 表单校验成功
              if (formData) {
                const values = {
                  ...formData,
                  id: info?.id,
                  isSimulate: isDemoAccount
                } as AccountGroup.CloneAccountGroupParams

                console.log('checkForm Success', values)

                setSaveLoading(true)
                const res = await cloneAccountGroup(values)
                if (res.success) {
                  message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                  push(isDemoAccount ? '/account-group/demo' : '/account-group/real')
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
          <div style={{ width: '60%' }}>
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
