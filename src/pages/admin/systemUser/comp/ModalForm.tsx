import { FormattedMessage, useIntl } from '@umijs/max'
import { md5 } from 'js-md5'
import { useRef, useState } from 'react'

import Modal from '@/components/Admin/Modal'
import Hidden from '@/components/Base/Hidden'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { addManager, updateManager } from '@/services/api/crm/manager'
import { getUid } from '@/utils'
import { message } from '@/utils/message'

import Auth from './form/Auth'
import IPWhiteList from './form/IPWhiteList'
import Permission from './form/Permission'
import Regular from './form/Regular'

type IProps = {
  trigger: JSX.Element
  info?: Manager.ListItem
  reload?: () => void
}

export default function ModalForm({ trigger, info, reload }: IProps) {
  const intl = useIntl()
  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.changgui' }),
      key: 'Regular',
      icon: 'qiehuan-gailan',
      component: Regular,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.quanxian' }),
      key: 'Permission',
      icon: 'qiehuan-jingliquanxian',
      component: Permission,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.ipbaimigndan' }),
      key: 'IPWhiteList',
      icon: 'qiehuan-zhanghuanquan',
      component: IPWhiteList,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.shuangchongyanzheng' }),
      key: 'Auth',
      icon: 'Authenticator',
      component: Auth,
      ref: useRef()
    }
  ]
  const [activeKey, setActiveKey] = useState(tabList[0]?.key)
  const isAdd = !info?.id

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
          {isAdd ? (
            <FormattedMessage id="common.add" />
          ) : (
            <span className="text-primary text-base font-semibold">
              {info?.account}
              <span className="text-sm text-primary pl-3">{info?.email}</span>
            </span>
          )}
        </div>
      }
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 校验表单
        const formData: any = await checkForm()
        let success: any = false
        // 表单校验成功
        if (formData) {
          // @ts-ignore
          const {
            clientGroup,
            ipWhitelist = [],
            phoneAreaCode,
            phone,
            status,
            roleIds = [],
            permissionIds = [],
            password,
            ...params
          } = formData
          const values = {
            id: info?.id,
            clientGroup: clientGroup.join(','),
            ipWhitelist: ipWhitelist?.map((item: any) => item.ip)?.join(','),
            status: formData.status ? 1 : 0,
            phoneAreaCode,
            phone,
            roleId: [...roleIds, ...permissionIds].join(','),
            password: md5(password || ''),
            ...params
          }
          if (phone && !phoneAreaCode) {
            return message.info(intl.formatMessage({ id: 'mt.qingxuanzequhao' }))
          }
          console.log('checkForm Success', values)
          const reqFn = isAdd ? addManager : updateManager
          // @ts-ignore
          const res = await reqFn(values)
          success = res?.success

          if (success) {
            message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
            reload?.()
          }
        }

        return success // true关闭弹窗
      }}
      // 新增没有谷歌验证码Tab
      tabList={isAdd ? tabList.slice(0, -1) : tabList}
      tabActiveKey={activeKey}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
      afterClose={() => {
        setActiveKey(tabList[0]?.key)
      }}
      hiddenSubmitter={['Auth'].includes(activeKey)}
    >
      {tabList.map((item: any, idx) => {
        const Component = item.component
        return (
          <Hidden show={activeKey === item.key} key={idx}>
            <Component
              ref={item.ref}
              initialValues={
                !isAdd
                  ? {
                      ...(info || {}),
                      status: info?.status ? true : false, // 回显
                      roleId: info?.roleId?.split(',') || [],
                      clientGroup: info?.clientGroup?.split(','),
                      ipWhitelist: (info?.ipWhitelist?.split(',') || []).map((item: any) => {
                        return {
                          ip: item,
                          id: getUid() // 回显表格数据，确保行id唯一
                        }
                      })
                    }
                  : {}
              }
            />
          </Hidden>
        )
      })}
    </Modal>
  )
}
