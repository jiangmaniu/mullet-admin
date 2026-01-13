import { ProFormDatePicker, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import FormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import { getEnum } from '@/constants/enum'
import { getClientList } from '@/services/api/crm/customer'
import { getClientGroupList } from '@/services/api/crm/customerGroup'
import { submitMessageSend } from '@/services/api/message/messageSend'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'
import { message } from '@/utils/message'

type IProps = {
  trigger?: JSX.Element
  info?: any
  reload?: () => void
  onClose?: () => void
}

function ModalForm({ trigger, info = {}, reload, onClose }: IProps, ref: any) {
  const isAdd = Object.keys(info).length === 0
  const intl = useIntl()
  const [open, setOpen] = useState(false)

  const [form] = Form.useForm()
  const immediateSend = Form.useWatch('immediateSend', form)
  const recipientType = Form.useWatch('recipientType', form)
  const content = Form.useWatch('content', form)
  const textAreaWrapClassName = useEmotionCss(() => {
    return {
      '.ant-form-item-required': {
        width: '100% !important'
      }
    }
  })

  const show = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  useImperativeHandle(ref, () => {
    return {
      show,
      close
    }
  })

  const { data: clientRes, run: queryClientList } = useRequest(getClientList, { manual: true })
  const { data: clientGroupRes, run: queryClientGroupList } = useRequest(getClientGroupList, { manual: true })
  const { data: accountGroupRes, run: queryAccountGroupList } = useRequest(getAccountGroupPageList, { manual: true })
  const clientOptions = (clientRes?.data?.records || [])?.map((item) => ({
    uid: item.userInfo?.account,
    label: item.userInfo?.email
      ? item.userInfo?.email
      : item?.userInfo?.phone
      ? '+' + item?.userInfo?.phoneAreaCode?.replace('+', '') + ' ' + item?.userInfo?.phone
      : '',
    value: item.id
  }))
  const clientGroupOptions = (clientGroupRes?.data?.records || [])?.map((item) => ({ label: item.groupName, value: item.id }))
  const accountGroupOptions = (accountGroupRes?.data?.records || [])?.map((item) => ({ label: item.groupName, value: item.id }))

  useEffect(() => {
    // 客户
    if (recipientType === 'CUSTOMER') {
      queryClientList({ size: 999, current: 1 })
    }
    // 业务线
    if (recipientType === 'BUSINESS_LINE') {
      queryClientGroupList({ size: 999, current: 1 })
    }
    // 账户类型
    if (recipientType === 'ACCOUNT_TYPE') {
      queryAccountGroupList({ size: 999, current: 1 })
    }
  }, [recipientType])

  useEffect(() => {
    form.setFieldsValue({
      ...info,
      userUid: info?.userUid?.split(',') || [],
      accountGroupId: info?.accountGroupId?.split(',') || [],
      businessLine: info?.businessLine?.split(',') || []
    })
  }, [info])

  return (
    <>
      <Modal
        title={isAdd ? <FormattedMessage id="mt.xinzhenggonggao" /> : <FormattedMessage id="mt.chakangongao" />}
        onFinish={async (values: any) => {
          const params = {
            ...values
          }

          if (values.businessLine?.length) {
            params.businessLine = values.businessLine?.join(',')
          }
          if (values.userUid?.length) {
            params.userUid = values.userUid?.join(',')
          }
          if (values.accountGroupId?.length) {
            params.accountGroupId = values.accountGroupId?.join(',')
          }

          if (values.scheduledTime) {
            params.scheduledTime = `${values.scheduledTime}:00`
          }

          console.log('params', params)
          const res = await submitMessageSend(params)
          const success = res?.success

          if (success) {
            message.info(intl.formatMessage({ id: 'common.opSuccess' }))
            reload?.()
            close()
          }

          return success
        }}
        width={760}
        trigger={trigger}
        open={open}
        form={form}
        hiddenSubmitter={!isAdd}
        onCancel={close}
        afterClose={() => {
          onClose?.()
        }}
      >
        <div className="grid gap-y-5 my-5 gap-x-7 grid-cols-2">
          <ProFormRadio.Group
            name="immediateSend"
            required={isAdd}
            label={intl.formatMessage({ id: 'mt.fasongfangshi' })}
            options={getEnum().enumToOptions('MessageSendType')}
            initialValue={'IMMEDIATE'}
            disabled={!isAdd}
          />
          {immediateSend === 'SCHEDULED' && (
            <ProFormDatePicker
              required={isAdd}
              name="scheduledTime"
              fieldProps={{
                showTime: true,
                format: 'YYYY-MM-DD HH:mm',
                style: { width: '100%', height: 40 }
              }}
              disabled={!isAdd}
              label={intl.formatMessage({ id: 'mt.dingshifasongshijian' })}
            />
          )}
          <ProFormRadio.Group
            name="recipientType"
            required={isAdd}
            label={intl.formatMessage({ id: 'mt.jieshouduixiang' })}
            options={getEnum().enumToOptions('MessageRecipientType')}
            initialValue={'ALL_USERS'}
            disabled={!isAdd}
          />
          {recipientType === 'BUSINESS_LINE' && (
            <ProFormSelect
              label={intl.formatMessage({ id: 'mt.yewuxian' })}
              name="businessLine"
              required={isAdd}
              mode="multiple"
              fieldProps={{
                maxTagCount: 'responsive'
              }}
              options={clientGroupOptions}
              readonly={!isAdd}
            />
          )}
          {recipientType === 'ACCOUNT_TYPE' && (
            <ProFormSelect
              label={intl.formatMessage({ id: 'mt.zhanghuleixing' })}
              name="accountGroupId"
              required={isAdd}
              mode="multiple"
              fieldProps={{
                maxTagCount: 'responsive'
              }}
              options={accountGroupOptions}
              readonly={!isAdd}
            />
          )}
          {recipientType === 'CUSTOMER' && (
            <ProFormSelect
              label={intl.formatMessage({ id: 'mt.kehu' })}
              name="userUid"
              required={isAdd}
              mode="multiple"
              fieldProps={{
                maxTagCount: 'responsive',
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
              options={clientOptions}
              readonly={!isAdd}
            />
          )}
          <FormText required={isAdd} name="title" label={intl.formatMessage({ id: 'mt.biaoti' })} disabled={!isAdd} />
        </div>
        <div className={textAreaWrapClassName}>
          <ProFormTextArea
            name={'content'}
            rules={[{ required: isAdd, message: intl.formatMessage({ id: 'mt.shuruneirong' }) }]}
            label={
              <div className="flex items-center justify-between w-full">
                <span>
                  <FormattedMessage id="mt.neirong" />
                </span>
              </div>
            }
            fieldProps={{ autoSize: { minRows: 4, maxRows: 10 } }}
            required={isAdd}
            placeholder={intl.formatMessage({ id: 'mt.shuruneirong' })}
            disabled={!isAdd}
          />
        </div>
      </Modal>
    </>
  )
}

export default forwardRef(ModalForm)
