import { FormattedMessage, useIntl, useLocation, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Modal, Spin } from 'antd'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import Button, { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { getDataSourceDetail, submitDataSource } from '@/services/api/dataSource'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import DataSourceConf from './form/DataSourceConf'
// import SubscribeList from './form/SubscribeList'
import Symbol from './form/Symbol'

export default function AddAndEdit() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  const [activeKey, setActiveKey] = useState('DataSourceConf')
  const params = useParams()
  const { pathname } = useLocation()
  const id = params.id
  const isAdd = !id

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.hangqingyuanpeizhi' }),
      key: 'DataSourceConf',
      icon: 'hangqingyuanpeizhi',
      component: DataSourceConf,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.yingyongpinzhong' }),
      key: 'Symbol',
      icon: 'pinzhongliebiao',
      component: Symbol,
      ref: useRef()
    }
    // {
    //   label: intl.formatMessage({ id: 'mt.guzhangchaoshipeizhi' }),
    //   key: 'Timeout',
    //   icon: 'guzhangchaoshipeizhi',
    //   component: TimeoutConf,
    //   ref: useRef()
    // },
    // {
    //   label: intl.formatMessage({ id: 'mt.dingyueliebiao' }),
    //   key: 'SubscribeList',
    //   icon: 'dingyueliebiao',
    //   component: SubscribeList,
    //   hidden: isAdd,
    //   ref: useRef()
    // }
    // ].filter((item) => !item.hidden)
  ]

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const { loading, data, run } = useRequest(getDataSourceDetail, { manual: true })
  const info = data?.data || {}

  useEffect(() => {
    if (id) {
      run({ id })
    }
  }, [id])

  const isFullScreen = ['SubscribeList'].includes(activeKey)

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
      icon="/img/emoji/8.png"
      pageTitle={isAdd ? <FormattedMessage id="mt.xinzengpeizhi" /> : <FormattedMessage id="mt.bianjipeizhi" />}
      renderRight={() => (
        <>
          {['DataSourceConf', 'Symbol'].includes(activeKey) && (
            <SaveButton
              onClick={async () => {
                // xiugaipeizhitips
                // 校验表单
                const formData: any = await checkForm()

                // 表单校验成功
                if (formData) {
                  Modal.info({
                    title: intl.formatMessage({ id: 'common.tips' }),
                    content: intl.formatMessage({ id: 'mt.xiugaipeizhitips' }),
                    centered: true,
                    footer: (
                      <div className="flex items-center justify-end gap-x-3 mt-4">
                        <Button onClick={() => Modal.destroyAll()}>{intl.formatMessage({ id: 'common.cancel' })}</Button>
                        <Button
                          type="primary"
                          onClick={async () => {
                            const { confInfo, ...params } = formData
                            const values = {
                              ...params,
                              // 数组对象转对象
                              confInfo: confInfo
                                ? JSON.stringify(
                                    confInfo
                                      .map((item: any) => {
                                        return {
                                          [item.key]: item.value
                                        }
                                      })
                                      .reduce((acc: any, obj: any) => ({ ...acc, ...obj }), {})
                                  )
                                : undefined,
                              id: info?.id
                            }

                            console.log('checkForm Success', values)

                            setSaveLoading(true)
                            const res = await submitDataSource(values)
                            if (res.success) {
                              Modal.destroyAll()
                              message.info(intl.formatMessage({ id: 'common.saveSuccess' }))

                              setTimeout(() => {
                                push('/datasources/list')
                              }, 300)
                            }
                            setSaveLoading(false)
                          }}
                        >
                          {intl.formatMessage({ id: 'common.confirm' })}
                        </Button>
                      </div>
                    )
                  })
                }
              }}
              loading={saveLoading}
            />
          )}
        </>
      )}
      pageBgColorMode={!isFullScreen ? 'white' : 'gray'}
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
