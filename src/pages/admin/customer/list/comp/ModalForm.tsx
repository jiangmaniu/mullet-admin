import { FormattedMessage, useIntl } from '@umijs/max'
import { md5 } from 'js-md5'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import Modal from '@/components/Admin/Modal'
import Hidden from '@/components/Base/Hidden'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { addClient, getClientDetail, updateClient } from '@/services/api/crm/customer'
import { isEmail } from '@/utils'
import { message } from '@/utils/message'

import AccountInfo from './form/AccountInfo'
import BankCard from './form/BankCard'
import Overview from './form/Overview'
import TradeAccount from './form/TradeAccount'

type IProps = {
  trigger?: JSX.Element
  info?: Customer.ListItem
  tabActiveKey?: string
  close?: () => void
  /**刷新列表 */
  reload?: () => void
}

export default forwardRef(({ trigger, info, tabActiveKey, close, reload }: IProps, ref: any) => {
  const intl = useIntl()
  const [tradeAccountNum, setTradeAccountNum] = useState(0)
  const id = info?.id
  const isAdd = !id
  const [clientInfo, setClientInfo] = useState({} as Customer.ListItem)
  const modalRef = useRef<any>()

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.gailan' }),
      key: 'Overview',
      icon: 'qiehuan-gailan',
      component: Overview,
      ref: useRef(),
      hidden: isAdd
    },
    {
      label: (
        <div>
          {intl.formatMessage({ id: 'mt.jiaoyizhanghao' })}
          {tradeAccountNum ? `(${tradeAccountNum})` : ''}
        </div>
      ),
      key: 'TradeAccount',
      icon: 'qiehuan-jiaoyizhanghao',
      component: TradeAccount,
      ref: useRef(),
      hidden: isAdd
    },
    {
      label: intl.formatMessage({ id: 'mt.zhanghuxinxi' }),
      key: 'AccountInfo',
      icon: 'qiehuan-zhanghuxinxi',
      component: AccountInfo,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.yinhangka' }),
      key: 'BankCard',
      icon: 'yinhangka',
      component: BankCard,
      ref: useRef(),
      hidden: isAdd
    }
  ].filter((v) => !v.hidden)
  const [activeKey, setActiveKey] = useState(tabList[0]?.key)

  useEffect(() => {
    if (id) {
      getClientDetail({ id }).then((res) => {
        if (res.success) {
          setClientInfo(res?.data as Customer.ListItem)
        }
      })
    }
  }, [id])

  useEffect(() => {
    if (tabActiveKey) {
      setActiveKey(tabActiveKey)
    }
  }, [tabActiveKey])

  useImperativeHandle(ref, () => {
    return modalRef.current
  })

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  return (
    <Modal
      trigger={trigger}
      ref={modalRef}
      title={
        <div>
          {isAdd ? (
            <FormattedMessage id="mt.xinzhengkehu" />
          ) : (
            <span className="text-primary text-base font-semibold">
              <FormattedMessage id="mt.kehu" />
              <span className="text-sm text-primary pl-3">{info?.userInfo?.email}</span>
            </span>
          )}
        </div>
      }
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 校验表单
        const formData = await checkForm()
        let success: any = false
        // 表单校验成功
        if (formData) {
          console.log('checkForm Success formData', formData)

          const { email, phone, password, address, clientGroupId, name, account } = formData as Customer.AddOrUpdateParams
          // @ts-ignore
          const phoneAreaCode = formData.phoneAreaCode
          const values = {
            id,
            email,
            password: md5(password || ''),
            address,
            clientGroupId,
            name,
            account,
            phoneAreaCode,
            phone
          } as Customer.AddOrUpdateParams
          if (!values?.email && !values?.phone) {
            return message.info(intl.formatMessage({ id: 'mt.youxianghedianhuabixutianyige' }))
          }
          if (values?.email && !isEmail(values?.email)) {
            return message.info(intl.formatMessage({ id: 'mt.youxianggeshibuzhengque' }))
          }
          if (values?.phone && !phoneAreaCode) {
            return message.info(intl.formatMessage({ id: 'mt.qingxuanzequhao' }))
          }
          // 处理新增客户请求
          const reqFn = isAdd ? addClient : updateClient
          const res = await reqFn(values)
          success = res.success
          if (success) {
            message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
            // 刷新列表
            reload?.()
            modalRef?.current?.close()
          }
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
        modalRef?.current?.close()
        setClientInfo({})
      }}
      hiddenSubmitter={['Overview', 'TradeAccount', 'BankCard'].includes(activeKey)}
    >
      {tabList.map((item: any, idx) => {
        const Component = item.component
        return (
          <Hidden show={activeKey === item.key} key={idx}>
            <Component
              ref={item.ref}
              initialValues={clientInfo}
              getTotal={(total: number) => {
                if (item.key === 'TradeAccount' && total) {
                  setTradeAccountNum(total)
                }
              }}
            />
          </Hidden>
        )
      })}
    </Modal>
  )
})
