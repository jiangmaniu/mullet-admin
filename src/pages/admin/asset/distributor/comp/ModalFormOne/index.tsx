import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRef } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import IconUpload from '@/components/Base/IconUpload'

import ModalFormTwo from '../ModalFormTwo'

type IProps = {
  trigger: JSX.Element
  info?: any
}

export default function ModalFormOne({ trigger, info = {} }: IProps) {
  const isAdd = Object.keys(info).length === 0
  const intl = useIntl()
  const modalFormTwoRef = useRef<any>()

  return (
    <>
      <Modal
        title={isAdd ? <FormattedMessage id="common.add" /> : <FormattedMessage id="common.bianji" />}
        onFinish={async (values: any) => {
          console.log('values', values)

          // 弹窗 ModalFormTwo
          modalFormTwoRef.current?.setOpen?.(true)
          return true
        }}
        width={760}
        trigger={trigger}
        submitter={{
          searchConfig: {
            submitText: <FormattedMessage id="common.next" />
          }
        }}
      >
        <div className="grid gap-y-5 gap-x-7 grid-cols-2">
          <div>
            <IconUpload
              value=""
              contentStyle={{ flexDirection: 'row', gap: 20 }}
              width={170}
              height={170}
              shape="square"
              helpTitle={
                <div className="text-primary text-base font-semibold">
                  <FormattedMessage id="mt.shangchuantubiao" />
                </div>
              }
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <span className="text-primary text-sm pr-3 font-semibold">
                <FormattedMessage id="mt.qidong" />
              </span>
              <ProFormSwitch />
            </div>
            <ProFormSelect
              name="type111"
              // required
              label={intl.formatMessage({ id: 'mt.qudaomingcheng' })}
              options={[
                { label: '全部', value: 'all' },
                { label: '未解决', value: 'open' },
                { label: '已解决', value: 'closed' },
                { label: '解决中', value: 'processing' }
              ]}
              width="lg"
              fieldProps={{ size: 'middle' }}
              required
            />
            <ProFormText width="lg" required name="shangjiahao" label={intl.formatMessage({ id: 'mt.shangjiahao' })} />
          </div>
        </div>
        <div className="grid gap-y-5 my-5 gap-x-7 grid-cols-2">
          <ProFormText required name="mingcheng" label={intl.formatMessage({ id: 'mt.wangguandizhi' })} />
          <ProFormText required name="mingcheng2" label={intl.formatMessage({ id: 'mt.shangjiakey' })} />
        </div>
        <ProFormText required name="remark" label={intl.formatMessage({ id: 'mt.beizhu' })} />
      </Modal>
      <ModalFormTwo ref={modalFormTwoRef} />
    </>
  )
}
