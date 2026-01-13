import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import { getEnum } from '@/constants/enum'
import { getRegisterWay } from '@/services/api/common'
import { submitClientGroup } from '@/services/api/crm/customerGroup'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'
import { message } from '@/utils/message'

type IProps = {
  trigger?: JSX.Element
  info?: CustomerGroup.ListItem
  reload?: () => void
  onClose?: () => void
}

function ModalForm({ trigger, info, reload, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  // 获取注册方式
  const { data, run } = useRequest(getRegisterWay, { manual: true })
  const registerWay = data?.data || 'EMAIL'

  useEffect(() => {
    run?.()
  }, [])

  const registerType: any = info?.registerWay || registerWay // // 默认值
  // @ts-ignore
  const registerWayName = {
    PHONE: intl.formatMessage({ id: 'mt.shouji' }),
    EMAIL: intl.formatMessage({ id: 'mt.youxiang' })
  }[registerType]

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

  const initialValues = useMemo(() => {
    return {
      ...info,
      registerWayName,
      isKyc: info?.id ? (info?.isKyc ? 'true' : 'false') : undefined
    }
  }, [info])

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  const groupName = Form.useWatch('groupName', form)
  const payWay = Form.useWatch('payWay', form)
  const code = Form.useWatch('code', form)
  const disabledConfirmBtn = !groupName || !payWay || !code

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={
        <div>
          <span className="text-primary text-base font-semibold">{info?.groupName || <FormattedMessage id="common.add" />}</span>
        </div>
      }
      form={form}
      showHeaderBg
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values: CustomerGroup.AddOrUpdateParams) => {
        console.log('formData', values)

        const res = await submitClientGroup({
          id: info?.id,
          ...values,
          registerWay: registerWay || 'PHONE',
          // @ts-ignore
          isKyc: values.isKyc === '1' ? true : false,
          code: (values.code || '').trim(), // 去除空格
          accountGroupId: (values.accountGroupId || [])?.join(',') // 账户组id格式化
        })
        const success = res?.success

        if (success) {
          message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
          reload?.()
          close()
        }

        return success // true关闭弹窗
      }}
      // initialValues={initialValues}
      onCancel={close}
      afterClose={() => {
        onClose?.()
      }}
      disabledConfirmBtn={disabledConfirmBtn}
    >
      <div className="w-full grid grid-cols-2 gap-x-[40px] gap-y-5">
        <ProFormText autoFocus required name="groupName" label={intl.formatMessage({ id: 'mt.yewuxianming' })} />
        {/* 不可编辑 显示预设值（邮箱/手机） */}
        <ProFormText name="registerWayName" label={intl.formatMessage({ id: 'mt.zhucefangshi' })} disabled />
        <ProFormText name="remark" label={intl.formatMessage({ id: 'mt.beizhu' })} />
        <ProFormSelect name="isKyc" label={intl.formatMessage({ id: 'mt.kycrenzheng' })} options={getEnum().enumToOptions('YesNo')} />
        {/* 下拉框，多选，获取账户组列表，决定该客户组拥有的账户组权限（即不同的客户可以开设的账户类型不同） */}
        <ProFormSelect
          name="accountGroupId"
          mode="multiple"
          label={intl.formatMessage({ id: 'mt.zhanghuzu' })}
          request={async () => {
            const res = await getAccountGroupPageList({ size: 999, current: 1 })
            const data = res.data?.records || []
            return data.map((item) => ({ label: item.groupName, value: item.id }))
          }}
          fieldProps={{
            maxTagCount: 'responsive'
          }}
        />
        {/* <AccountGroupSelectFormItem form={form} fieldProps={{ mode: 'multiple', maxTagCount: 'responsive' }} /> */}
        {/* 用户在前端注册后，根据对应注册方式（识别码/渠道号），会自动分配到对应的客户组。 */}
        <ProFormText required name="code" label={intl.formatMessage({ id: 'mt.shibiema' })} />
        {/* 多选，获取支付通道的列表，可以决定该客户可以采用哪些支付渠道 */}
        {/*  这个传什么，是否多选？ 暂时还没有渠道 */}
        <ProFormSelect
          name="payWay"
          // mode="multiple"
          required
          label={intl.formatMessage({ id: 'mt.zhifuqudao' })}
          options={[
            { label: '微信', value: '1' },
            { label: '支付宝', value: '2' }
          ]}
        />
      </div>
    </Modal>
  )
}

export default forwardRef(ModalForm)
