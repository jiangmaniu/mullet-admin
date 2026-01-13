import { FormattedMessage, useIntl, useLocation, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { addAccountGroup, getAccountGroupDetail, updateAccountGroup } from '@/services/api/tradeCore/accountGroup'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import AccountIntro from './form/AccountIntro'
import PrePay from './form/PrePay'
import Regular from './form/Regular'
import Symbol from './form/Symbol/index'

export default function AddAndEdit() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  const [activeKey, setActiveKey] = useState('Regular')
  const params = useParams()
  const { pathname } = useLocation()
  const id = params.id
  const isAdd = !id
  const isDemoAccount = pathname?.indexOf('/account-group/demo') !== -1 // 模拟账户

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.changgui' }),
      key: 'Regular',
      icon: 'qiehuan-changgui',
      component: Regular,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.yufukuan' }),
      key: 'PrePay',
      icon: 'qiehuan-yufukuan',
      component: PrePay,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.symbol' }),
      key: 'Symbol',
      icon: 'qiehuan-jiaoyibizhong',
      component: Symbol,
      ref: useRef(),
      hidden: isAdd
    },
    {
      label: intl.formatMessage({ id: 'mt.zhanghujieshao' }),
      key: 'AccountIntro',
      icon: 'zhanghujieshao',
      component: AccountIntro,
      ref: useRef()
    }
    // 手续费不放这里，放交易品种编辑弹窗里面了
    // {
    //   label: intl.formatMessage({ id: 'mt.shouxufei' }),
    //   key: 'Fee',
    //   icon: 'shouxufei',
    //   component: Fee,
    //   ref: useRef(),
    //   hidden: isAdd
    // }
  ].filter((item) => !item.hidden)

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

  const isFullScreen = ['Symbol', 'Fee'].includes(activeKey)

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
      pageTitle={isAdd ? <FormattedMessage id="mt.addAccount" /> : <FormattedMessage id="mt.editAccount" />}
      renderRight={() => (
        <>
          {['Regular', 'PrePay', 'AccountIntro'].includes(activeKey) && (
            <SaveButton
              onClick={async () => {
                // 校验表单
                const formData = (await checkForm()) as AccountGroup.SubmitAccountGroupParams

                // 表单校验成功
                if (formData) {
                  // 账户组前缀
                  const groupCodePrefix = isDemoAccount ? 'demo/' : 'real/'

                  console.log('formData.synopsis', formData.synopsis)

                  const values = {
                    ...formData,
                    id: info?.id,
                    isSimulate: isDemoAccount,
                    synopsis: formData.synopsis ? JSON.stringify(formData.synopsis) : ''
                    // groupCode: `${groupCodePrefix}${formData.groupCode}`
                  } as AccountGroup.SubmitAccountGroupParams

                  console.log('checkForm Success', values)

                  setSaveLoading(true)
                  const reqFn = isAdd ? addAccountGroup : updateAccountGroup
                  const res = await reqFn(values)
                  if (res.success) {
                    message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                    push(isDemoAccount ? '/account-group/demo' : '/account-group/real')
                  }
                  setSaveLoading(false)
                }
              }}
              loading={saveLoading}
            />
          )}
        </>
      )}
      pageBgColorMode="white"
      contentStyle={{ paddingTop: isFullScreen ? 20 : 57, paddingInline: isFullScreen ? 40 : 83 }}
      onChangeTab={(activeKey) => {
        startTransition(() => {
          setActiveKey(activeKey)
        })
      }}
      tabActiveKey={activeKey}
    >
      <Spin spinning={loading}>
        <div className="flex items-start">
          {!isFullScreen && <div className="mr-[60px]">{IconDom}</div>}
          <div style={{ width: isFullScreen ? '100%' : '75%' }}>
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
