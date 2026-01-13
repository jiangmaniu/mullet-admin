import { FormattedMessage, useIntl } from '@umijs/max'
import { Form, Popconfirm } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import FormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/Modal'
import Button from '@/components/Base/Button'
import Empty from '@/components/Base/Empty'
import { getEnum } from '@/constants/enum'
import { getBankCardList, updateBankCard } from '@/services/api/crm/bankCard'
import { message } from '@/utils/message'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Customer.ListItem
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const [approveInfo, setApproveInfo] = useState<BankCard.ListItem>({}) // 银行卡审批记录

  const id = initialValues?.id

  useImperativeHandle(ref, () => {
    return form
  })

  const authImgsUrl = approveInfo.authImgsUrl?.split(',') || []
  const { remark: approveRemark, ...approveInfoData } = approveInfo || {}
  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue({
      ...initialValues,
      ...approveInfoData,
      approveRemark
    })
  }, [initialValues, approveInfo])

  useEffect(() => {
    if (id) {
      getApproveInfo()
    }
  }, [id])

  // 获取审核信息
  const getApproveInfo = async () => {
    const res = await getBankCardList({ clientId: id })
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
    let res = await updateBankCard({ status, id: approveInfo.id as number, remark })
    if (res.success) {
      // 刷新记录接口
      getApproveInfo()
      message.info(intl.formatMessage({ id: 'common.opSuccess' }))
    }
  }

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
        initialValues={initialValues}
        form={form}
        layout="vertical"
        style={style}
      >
        <div>
          {approveInfo?.id && (
            <div>
              <div className="pb-7 flex items-center">
                <span className="text-primary font-semibold text-base">
                  <FormattedMessage id="mt.yinhangkaxinxi" />
                </span>
                <span className="text-secondary text-sm ml-6">
                  <FormattedMessage id="common.status" />：{getEnum().Enum.ApproveStatus[approveInfo.status!]?.text}
                </span>
                {approveInfo.status === 'DISALLOW' && (
                  <span className="text-red text-sm ml-2">
                    <FormattedMessage id="mt.shenheshibai" />：{approveInfo.remark}
                  </span>
                )}
              </div>
              <div className="w-full grid grid-cols-3 gap-x-4 mb-5">
                <ProFormSelect
                  name="bankCardType"
                  label={intl.formatMessage({ id: 'mt.yinhangkaleixing' })}
                  options={getEnum().enumToOptions('BankCardType')}
                  disabled
                />
                <FormText disabled name="bankName" label={intl.formatMessage({ id: 'mt.yinhangkamingcheng' })} />
                <FormText disabled name="bankCardCode" label={intl.formatMessage({ id: 'mt.kahao' })} />
              </div>
              <FormText
                name="approveRemark"
                width="lg"
                disabled={approveInfo.status !== 'TODO'}
                label={intl.formatMessage({ id: 'mt.beizhu' })}
                initialValue={approveInfo.remark}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center overflow-x-auto flex-1">
                  {authImgsUrl.map((item, idx) => {
                    return (
                      <Modal
                        title={<FormattedMessage id="mt.yulantupian" />}
                        trigger={
                          <div className="mr-2 cursor-pointer" key={idx}>
                            <img src={item} width={196} height={124} />
                          </div>
                        }
                        key={idx}
                        width={540}
                        footer={null}
                        maskClosable
                      >
                        <img src={item} className="w-full h-full rounded-xl" />
                      </Modal>
                    )
                  })}
                </div>
                {approveInfo.status === 'TODO' && (
                  <div className="flex justify-center flex-col pl-10 gap-y-3 group">
                    <Popconfirm
                      title={<FormattedMessage id="mt.querentongguoma" />}
                      onConfirm={() => {
                        handleApprove('SUCCESS')
                      }}
                    >
                      <Button type="primary" className="!text-white !bg-green-700 !w-[150px] !h-10 !border-none group-hover:!text-white">
                        <FormattedMessage id="mt.shenhetongguo" />
                      </Button>
                    </Popconfirm>
                    <Popconfirm
                      title={<FormattedMessage id="mt.querenjujuemma" />}
                      onConfirm={() => {
                        handleApprove('DISALLOW')
                      }}
                    >
                      <Button type="primary" className="!text-white !bg-red-700 !w-[150px] !h-10 !border-none group-hover:!text-white">
                        <FormattedMessage id="mt.shenhejujue" />
                      </Button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            </div>
          )}
          {!approveInfo?.id && <Empty description={<FormattedMessage id="mt.zanwushenpijilu" />} />}
        </div>
      </Form>
    </>
  )
})
