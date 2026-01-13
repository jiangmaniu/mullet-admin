import { useIntl } from '@umijs/max'
import { useRef, useState } from 'react'

import Modal from '@/components/Admin/Modal'
import Hidden from '@/components/Base/Hidden'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'

import AccountGroup from './form/AccountGroup'

type IProps = {
  trigger: JSX.Element
  info?: any
}

export default function ModalForm({ trigger, info = {} }: IProps) {
  const intl = useIntl()
  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.quanxianjimingming' }),
      key: 'accountGroup',
      icon: 'qiehuan-jingliquanxian',
      component: AccountGroup,
      ref: useRef()
    }
  ]
  const [activeKey, setActiveKey] = useState(tabList[0]?.key)

  const isAdd = Object.keys(info).length === 0

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  return (
    <Modal
      trigger={trigger}
      title={
        <div>
          <span className="text-primary text-base font-semibold">
            {isAdd ? intl.formatMessage({ id: 'mt.xinzengzhanghuzu' }) : intl.formatMessage({ id: 'mt.bianjizhanghuzu' })}
          </span>
        </div>
      }
      width={600}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 校验表单
        const formData = await checkForm()
        // 表单校验成功
        if (formData) {
          const values = {
            ...formData
          }
          console.log('checkForm Success', values)

          return true
        }

        return false // true关闭弹窗
      }}
      tabList={tabList}
      tabActiveKey={activeKey}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
      afterClose={() => {
        setActiveKey(tabList[0]?.key)
      }}
    >
      {tabList.map((item: any, idx) => {
        const Component = item.component
        return (
          <Hidden show={activeKey === item.key} key={idx}>
            <Component
              ref={item.ref}
              initialValues={{
                per: ['0-0-1-2'],
                loginName: 'poetry'
              }}
            />
          </Hidden>
        )
      })}
    </Modal>
  )
}
