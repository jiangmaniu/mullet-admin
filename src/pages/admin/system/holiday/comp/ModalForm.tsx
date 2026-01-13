import { FormattedMessage, useIntl } from '@umijs/max'
import { useRef, useState } from 'react'

import Modal from '@/components/Admin/Modal'
import Hidden from '@/components/Base/Hidden'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { submitHoliday } from '@/services/api/tradeCore/holiday'
import { getUid } from '@/utils'
import { message } from '@/utils/message'

import Regular from './form/Regular'
import Symbol from './form/Symbol'

type IProps = {
  trigger: JSX.Element
  info?: Holiday.HolidayPageListItem
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
      label: intl.formatMessage({ id: 'mt.symbol' }),
      key: 'Symbol',
      icon: 'pinzhong',
      component: Symbol,
      ref: useRef()
    }
  ]
  const [activeKey, setActiveKey] = useState(tabList[0]?.key)
  const modalRef = useRef<any>()

  const isAdd = Object.keys(info || {}).length === 0

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const initialValues = info
    ? {
        ...info,
        status: info?.status === 'ENABLE',
        symbolTable: info?.symbols?.split(',')?.map((item: string) => ({ symbol: item, id: getUid() }))
      }
    : undefined

  return (
    <Modal
      trigger={trigger}
      title={<div>{isAdd ? <FormattedMessage id="mt.xinzengjiaqi" /> : <FormattedMessage id="mt.bianjijiaqi" />}</div>}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 校验表单
        const formData = await checkForm()
        let success: any = false
        // 表单校验成功
        if (formData) {
          console.log('formData', formData)
          // @ts-ignore
          const { endTime, symbolTable = [], status, repeatYear, ...params } = formData
          // @ts-ignore
          const symbols = symbolTable
            ?.map((item: any) => item?.symbol)
            .filter((v: any) => v)
            ?.join(',')

          const values = {
            id: info?.id,
            endTime,
            symbols,
            status: status ? 'ENABLE' : 'DISABLED',
            repeatYear: !!repeatYear,
            ...params
          } as Holiday.SubmitHolidayParams

          console.log('checkForm Success', values)

          const res = await submitHoliday(values)
          success = res?.success
          if (success) {
            message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
            reload?.()
          }
        }

        return success // true关闭弹窗
      }}
      ref={modalRef}
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
            <Component ref={item.ref} initialValues={initialValues} />
          </Hidden>
        )
      })}
    </Modal>
  )
}
