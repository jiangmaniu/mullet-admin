import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import EmailFormItem from '@/components/Admin/Form/EmailFormItem'
import PasswordCheckFormItem from '@/components/Admin/Form/PasswordCheckFormItem'
import PhoneSelectFormItem from '@/components/Admin/Form/PhoneSelectFormItem'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import FormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/Modal'
import Button from '@/components/Base/Button'
import { getEnum } from '@/constants/enum'
import { getEnv } from '@/env'
import { getClientGroupList } from '@/services/api/crm/customerGroup'
import { approveKycAuth, getKycAuthList } from '@/services/api/crm/kycAuth'
import { message } from '@/utils/message'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Customer.ListItem
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const ENV = getEnv()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const [approveInfo, setApproveInfo] = useState({} as KycAuth.ListItem)
  const id = initialValues?.id
  const isEdit = !!id

  useImperativeHandle(ref, () => {
    return form
  })

  const authImgsUrl = approveInfo.authImgsUrl?.split(',') || []

  const { remark: approveRemark, ...approveInfoData } = approveInfo || {}
  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    const { id, password, ...userInfo } = initialValues?.userInfo || {}
    if (isEdit) {
      form.setFieldsValue({
        ...userInfo,
        ...initialValues,
        ...approveInfoData,
        approveRemark
      })
    }
    return () => {
      form.resetFields()
    }
  }, [initialValues, approveInfo])

  useEffect(() => {
    if (id) {
      getKeyAuthInfo()
    }
  }, [id])

  // 获取kyc审核信息
  const getKeyAuthInfo = async () => {
    const res = await getKycAuthList({ clientId: id })
    if (res.success) {
      const data = (res.data?.records?.[0] || {}) as KycAuth.ListItem
      setApproveInfo(data)
    }
  }

  const handleApprove = async (status: API.ApproveStatus) => {
    const remark = form.getFieldValue('approveRemark')
    if (!remark) {
      return message.info(intl.formatMessage({ id: 'mt.qingtianxiebeizhu' }))
    }
    let res = await approveKycAuth({ status, id: approveInfo.id as number, remark })
    if (res.success) {
      // 刷新详情接口
      getKeyAuthInfo()
      message.info(intl.formatMessage({ id: 'common.opSuccess' }))
    }
  }

  const imgDomain = ENV.imgDomain

  return (
    <>
      <Form
        onFinish={async (values) => {
          // console.log('onFinish values', values)
        }}
        onFinishFailed={(errorInfo) => {
          // console.log('onFinishFailed', errorInfo)
        }}
        onValuesChange={async (values) => {
          const newValues = { ...formData, ...values }
          setFormData(newValues)
          onValuesChange?.(newValues)
        }}
        onFieldsChange={(changedFields, allFields) => {
          onFieldsChange?.(changedFields, allFields)
        }}
        initialValues={isEdit ? initialValues : undefined}
        form={form}
        layout="vertical"
        style={style}
      >
        <div className="w-full grid grid-cols-2 gap-5 my-5">
          <ProFormSelect
            name="clientGroupId"
            required
            label={intl.formatMessage({ id: 'mt.yewuxianming' })}
            request={async () => {
              const res = await getClientGroupList({ current: 1, size: 999 })
              return (res?.data?.records || []).map((item) => {
                return {
                  ...item,
                  label: item.groupName,
                  value: item.id
                }
              })
            }}
          />
          <EmailFormItem name="email" required={false} />
          <PhoneSelectFormItem names={['phone', 'phoneAreaCode']} form={form} />
          {/* <FormText name="account" label={intl.formatMessage({ id: 'mt.zhanghu' })} /> */}
        </div>
        {/* 新增隐藏检查变更按钮组 */}
        <PasswordCheckFormItem showAction={isEdit} required={!isEdit} form={form} userId={id} />

        {isEdit && approveInfo.id && (
          <div>
            <div className="pt-8 pb-5 flex items-center">
              <span className="text-primary font-semibold text-base">
                <FormattedMessage id="mt.shenfenxinxi" />
              </span>
              <span className="text-secondary text-sm ml-6">
                <FormattedMessage id="common.status" />：{getEnum().Enum.ApproveStatus[approveInfo.status!]?.text}
              </span>
              {approveInfo.status === 'DISALLOW' && (
                <span className="text-red text-sm ml-2">
                  <FormattedMessage id="mt.shenheshibai" />
                </span>
              )}
            </div>
            {approveInfo.status === 'DISALLOW' && (
              <div className="text-red text-sm break-all pb-3">
                <FormattedMessage id="mt.shibaiyuanyin" />：{approveInfo.remark}
              </div>
            )}
            <div className="text-secondary text-sm pb-4">
              <FormattedMessage id="mt.zhuceshijian" />：{approveInfo?.createdTime}
            </div>
            <div className="w-full grid grid-cols-3 gap-x-4 mb-5">
              <ProFormSelect
                name="identificationType"
                label={intl.formatMessage({ id: 'mt.zhengjianleixing' })}
                options={getEnum().enumToOptions('IdentificationType')}
                disabled
              />
              <FormText name="lastName" disabled label={intl.formatMessage({ id: 'mt.xing' })} />
              <FormText name="firstName" disabled label={intl.formatMessage({ id: 'mt.ming' })} />
            </div>
            <div className="w-full flex items-center gap-x-4 mb-5">
              <FormText name="identificationCode" disabled width={320} label={intl.formatMessage({ id: 'mt.zhengjianhao' })} />
              <FormText
                name="approveRemark"
                formItemProps={{ style: { flex: 1 } }}
                label={intl.formatMessage({ id: 'mt.beizhu' })}
                initialValue={approveInfo.remark}
                disabled={approveInfo.status !== 'TODO'}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center overflow-x-auto flex-1">
                {authImgsUrl.map((item, idx) => {
                  return (
                    <Modal
                      title={<FormattedMessage id="mt.yulantupian" />}
                      trigger={
                        <div className="mr-2 cursor-pointer" key={idx}>
                          <img src={`${imgDomain}/${item}`} width={196} height={124} />
                        </div>
                      }
                      key={idx}
                      width={540}
                      footer={null}
                      maskClosable
                    >
                      <img src={`${imgDomain}/${item}`} className="w-full h-full rounded-xl" />
                    </Modal>
                  )
                })}
              </div>
              {approveInfo.status === 'TODO' && (
                <div className="flex justify-center flex-col pl-10 gap-y-3 group">
                  <Button
                    className="!text-white !bg-green-700 !w-[150px] !h-10 !border-none group-hover:!text-white"
                    onClick={() => {
                      handleApprove('SUCCESS')
                    }}
                    type="primary"
                  >
                    <FormattedMessage id="mt.shenhetongguo" />
                  </Button>
                  <Button
                    className="!text-white !bg-red-700 !w-[150px] !h-10 !border-none group-hover:!text-white"
                    onClick={() => {
                      handleApprove('DISALLOW')
                    }}
                    type="primary"
                  >
                    <FormattedMessage id="mt.shenhejujue" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Form>
    </>
  )
})
