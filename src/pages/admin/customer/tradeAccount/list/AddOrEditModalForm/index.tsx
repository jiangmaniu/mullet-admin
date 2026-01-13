import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'

import AccountGroupSelectFormItem from '@/components/Admin/Form/AccountGroupSelectFormItem'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import FormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import { getClientList } from '@/services/api/crm/customer'
import { AddAccount, UpdateAccount } from '@/services/api/tradeCore/account'
import { message } from '@/utils/message'

type IProps = {
  trigger: JSX.Element
  info?: Partial<Account.AccountPageListItem>
  reload?: () => void
}

export default function ModalFormComp({ trigger, info = {}, reload }: IProps) {
  const isAdd = Object.keys(info).length === 0
  const intl = useIntl()
  const [form] = Form.useForm()

  const { data: clientRes } = useRequest(getClientList, { defaultParams: [{ current: 1, size: 999 }] })
  const clientOptions = (clientRes?.data?.records || []).map((item) => ({
    ...item,
    value: item.id,
    label: item?.userInfo?.email || item?.userInfo?.phone,
    uid: item?.userInfo?.account
  }))

  return (
    <Modal
      title={isAdd ? <FormattedMessage id="mt.xinzengjiaoyizhanghao" /> : <FormattedMessage id="mt.bianjijiaoyizhanghao" />}
      onFinish={async (values: Account.SubmitAccount) => {
        console.log('values', values)

        const reqFn = isAdd ? AddAccount : UpdateAccount
        const res = await reqFn(values)
        const success = res.success

        if (success) {
          message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
          // 刷新列表
          reload?.()
        }

        return success
      }}
      width={500}
      trigger={trigger}
      form={form}
    >
      <div className="grid gap-y-7 grid-cols-1">
        {/* <FormText required name="account" label={intl.formatMessage({ id: 'mt.zhanghao' })} /> */}
        {/* @TODO 暂时没有字段 */}
        {/* <ProFormText.Password
          required
          name="password"
          label={intl.formatMessage({ id: 'common.mima' })}
          fieldProps={{ size: 'large' }}
          placeholder={intl.formatMessage({ id: 'mt.shuruzhumima' })}
          rules={[{ message: intl.formatMessage({ id: 'mt.shuruzhumima' }), required: true }]}
        /> */}
        <ProFormSelect
          name="clientId"
          required
          label={intl.formatMessage({ id: 'mt.suoshukehu' })}
          options={clientOptions}
          fieldProps={{
            labelRender: (item: any) => {
              return (
                <div>
                  <span>{item.title}</span>
                </div>
              )
            },
            optionItemRender(item: any) {
              return (
                <div>
                  <span>{item.label}</span>
                  <span className="text-weak">/uid:{item.uid}</span>
                </div>
              )
            },
            filterOption: (input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) ||
              (option?.uid ?? '').toLowerCase().includes(input.toLowerCase())
          }}
        />
        <FormText
          required
          name="name"
          fieldProps={{ showCount: true, maxLength: 20 }}
          label={intl.formatMessage({ id: 'mt.jiaoyizhanghaomingcheng' })}
        />
        <AccountGroupSelectFormItem form={form} />
        <FormText name="remark" label={intl.formatMessage({ id: 'mt.beizhu' })} />
      </div>
    </Modal>
  )
}
