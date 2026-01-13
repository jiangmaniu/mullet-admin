import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { getEnum } from '@/constants/enum'
import { useStores } from '@/context/mobxProvider'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Account.AccountPageListItem & {
    clientInfo: User.UserInfo
  }
  iconDom?: React.ReactNode
  active?: boolean
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, iconDom, active }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const { trade } = useStores()
  const { currentAccountInfo } = trade

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  const currencyDecimal = initialValues?.currencyDecimal

  // 当前账户占用的保证金 = 逐仓保证金 + 全仓保证金（可用保证金）
  const occupyMargin = Number(initialValues?.margin || 0) + Number(initialValues?.isolatedMargin || 0)

  console.log('initialValues', initialValues)

  return (
    <>
      {active && (
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
            <div className="flex items-center justify-between w-full px-[43px] py-[37px]">
              <div className="flex w-[60%] items-start">
                <div className="text-base font-semibold">{iconDom}</div>
                <div className="flex items-start flex-col pl-7 w-full">
                  <div className="text-primary font-semibold text-lg pb-5">
                    <FormattedMessage id="mt.zhanghuxinxi" />
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.zhanghumingcheng" />：{initialValues?.name}
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.jiaoyizhanghao" />：{initialValues?.id}
                  </div>
                  {initialValues?.userPhone && (
                    <div className="text-primary text-sm pb-3">
                      <FormattedMessage id="mt.shoujihao" />：{initialValues?.userPhoneAreaCode + ' ' + initialValues?.userPhone}
                    </div>
                  )}
                  {initialValues?.userEmail && (
                    <div className="text-primary text-sm pb-3">
                      <FormattedMessage id="mt.youxiang" />：{initialValues?.userEmail}
                    </div>
                  )}
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.zhuceshijian" />：{initialValues?.createTime}
                  </div>
                  <div className="text-primary text-sm">
                    <FormattedMessage id="mt.zuijinfangwen" />：{initialValues?.clientInfo.userInfo?.lastLoginTime}
                  </div>
                  <div className="text-primary font-semibold text-lg py-5">
                    <FormattedMessage id="mt.zhanghuzubiexinxi" />
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.zhanghuleixing" />：
                    {initialValues?.isSimulate ? <FormattedMessage id="mt.moni" /> : <FormattedMessage id="mt.zhenshi" />}
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.zubie" />：{initialValues?.groupCode}
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.huobidanwei" />：{initialValues?.currencyUnit}
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.shifouqiyongzuicang" />：
                    {initialValues?.enableIsolated ? <FormattedMessage id="mt.shi" /> : <FormattedMessage id="mt.fou" />}
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.qiangpinghoubuchangfujieyuan" />：
                    {initialValues?.enableQphbcfjy ? <FormattedMessage id="mt.shi" /> : <FormattedMessage id="mt.fou" />}
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.cangweileixing" />：{getEnum().Enum.OrderMode[currentAccountInfo?.orderMode as string]?.text}
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.keyongyufukuan" />：
                    {getEnum().Enum.UsableAdvanceCharge[currentAccountInfo?.usableAdvanceCharge as string]?.text}
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.zhunjiayufukuanbili" />：{initialValues?.addAdvanceCharge}%
                  </div>
                  <div className="text-primary text-sm pb-3">
                    <FormattedMessage id="mt.qiangzhipingcangbili" />：{initialValues?.compelCloseRatio}%
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </>
  )
})
