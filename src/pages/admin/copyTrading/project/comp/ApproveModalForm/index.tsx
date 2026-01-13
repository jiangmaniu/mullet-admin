import { useIntl } from '@umijs/max'
import { forwardRef, useEffect, useRef, useState } from 'react'

import Modal from '@/components/Admin/Modal'
import Hidden from '@/components/Base/Hidden'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { tradeFollowLeadInfo } from '@/services/api/tradeFollow/lead'
import { message } from '@/utils/message'

import Approve from './form/Approve'

type IProps = {
  trigger?: JSX.Element
  info?: Record<string, any>
  tabActiveKey?: string
  close?: () => void
  /**刷新列表 */
  reload?: () => void
  open?: boolean
}

export default forwardRef(({ trigger, info, tabActiveKey, close, reload, open }: IProps, ref: any) => {
  const intl = useIntl()
  const [leadInfo, setLeadInfo] = useState<any>({})

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.shenpi' }),
      key: 'Approve',
      icon: 'shenpi',
      component: Approve,
      ref: useRef(),
      props: {
        close
      }
    }
  ]

  const [activeKey, setActiveKey] = useState(tabList[0]?.key)

  useEffect(() => {
    if (info && info.leadId) {
      tradeFollowLeadInfo({
        leadId: info.leadId
      })
        .then((res) => {
          if (res.success) {
            setLeadInfo({
              ...info,
              ...res.data
            })
          }
        })
        .catch(() => {
          message.info(intl.formatMessage({ id: 'mt.qingqiushibai' }))
        })

      // getClientDetail({ id }).then((res) => {
      //   if (res.success) {
      //     setLeadInfo({
      //       ...leadInfo,
      //       ...res.data,
      //       reason: '资质审核不通过'
      //     } as Customer.ListItem)
      //     return
      //   }

      //   setLeadInfo({
      //     ...leadInfo,
      //     reason: '资质审核不通过'
      //   })
      // })
    }
  }, [info])

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
      open={open}
      trigger={trigger}
      // title={<div>必胜请跟我 za@tedezu.sm #5000002</div>}
      title={<div>{`${leadInfo?.projectName} #${leadInfo?.leadId}`}</div>}
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
            <Component ref={item.ref} initialValues={leadInfo} {...item.props} />
          </Hidden>
        )
      })}
    </Modal>
  )
})
