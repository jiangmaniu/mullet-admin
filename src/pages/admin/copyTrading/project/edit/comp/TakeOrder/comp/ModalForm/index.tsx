import { useIntl } from '@umijs/max'
import { forwardRef, useEffect, useRef, useState } from 'react'

import Modal from '@/components/Admin/Modal'
import Hidden from '@/components/Base/Hidden'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'

import Overview from './form/Overview'

type IProps = {
  trigger: JSX.Element
  info?: Customer.ListItem
  tabActiveKey?: string
  close?: () => void
  /**刷新列表 */
  reload?: () => void
}

export default forwardRef(({ trigger, info, tabActiveKey, close, reload }: IProps, ref: any) => {
  const intl = useIntl()
  const id = info?.id
  const isAdd = !id
  const [clientInfo, setClientInfo] = useState({} as Customer.ListItem)

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.gailan' }),
      key: 'Approve',
      icon: 'qiehuan-gailan',
      component: Overview,
      ref: useRef()
    }
  ]

  const [activeKey, setActiveKey] = useState(tabList[0]?.key)

  useEffect(() => {
    if (tabActiveKey) {
      setActiveKey(tabActiveKey)
    }
  }, [tabActiveKey])

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  return (
    <Modal
      trigger={trigger}
      title={<div>带单号：2012122</div>}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 校验表单
        const formData = await checkForm()
        let success: any = false
        // 表单校验成功
        if (formData) {
          console.log('checkForm Success formData', formData)

          // const res = await reqFn(values)
          // success = res.success
          // if (success) {
          //   message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
          //   // 刷新列表
          //   reload?.()
          // }
        }

        return success // true关闭弹窗
      }}
      tabList={tabList}
      tabActiveKey={activeKey}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
      afterClose={() => {
        setActiveKey(tabList[0]?.key)
        close?.()
      }}
      width={1000}
      hiddenSubmitter
    >
      {tabList.map((item: any, idx) => {
        const Component = item.component
        return (
          <Hidden show={activeKey === item.key} key={idx}>
            <Component ref={item.ref} initialValues={clientInfo} />
          </Hidden>
        )
      })}
    </Modal>
  )
})
