import { ProCard, ProForm } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { Button, Dropdown, Form, Image, MenuProps, Popconfirm } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormText from '@/components/Admin/Form/ProFormText'
// import Dropdown from '@/components/Base/Dropdown'
import Iconfont from '@/components/Base/Iconfont'
import { DEFAULT_ASSET_REQUIREMENT, DEFAULT_ASSET_SCALE, DEFAULT_FOLLOWER_NUMBER, DEFAULT_PROFIT_SHARING_RATIO } from '@/constants'
import { tradeFollowSymbolAudit } from '@/services/api/tradeFollow/project'
import { formatNum } from '@/utils'
import { message } from '@/utils/message'

import ConfirmModal from './ConfirmModal'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Record<string, any>
  close?: () => void
  // initialValues?: Record<string,any> & Customer.ListItem
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, close }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  const img = useMemo(() => initialValues?.imageUrl || '/img/default-avatar.png', [initialValues?.imageUrl])

  useEffect(() => {
    console.log('initialValues', initialValues)
  }, [initialValues])

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    const { id, password, ...userInfo } = initialValues?.userInfo || {}
    form.setFieldsValue({
      /** 跟隨人數 */
      maxSupportCountLimit: initialValues?.maxSupportCountLimit || DEFAULT_FOLLOWER_NUMBER,
      /** 资产要求限制 */
      assetRequirementLimit: initialValues?.assetRequirementLimit || DEFAULT_ASSET_REQUIREMENT,
      /** 资产规模限制 */
      assetScaleLimit: initialValues?.assetScaleLimit || DEFAULT_ASSET_SCALE,
      /** 利润分成比例限制 */
      profitSharingRatioLimit: initialValues?.profitSharingRatioLimit || DEFAULT_PROFIT_SHARING_RATIO,
      /** 審核原因 */
      auditReason: initialValues?.auditReason || '',
      /** 审核状态 */
      auditStatus: initialValues?.auditStatus || 0,
      leadId: initialValues?.leadId
    })
  }, [initialValues])

  const onFinish = async (values: any) => {
    console.log('onFinish', values)

    tradeFollowSymbolAudit(values)
      .then((res) => {
        // form.setFieldsValue(formDefault) // 重置
        if (res.success) {
          message.info(getIntl().formatMessage({ id: 'common.opSuccess' }))
        }
      })
      .catch((error) => {
        message.info(getIntl().formatMessage({ id: 'common.opFailed' }))
      })
  }

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    form.setFieldValue('auditReason', intl.formatMessage({ id: e.key }))
    form.setFieldValue('auditStatus', 2)

    form.submit()
    close?.()
  }

  const btn2ClassName = useEmotionCss(() => ({
    '&': {
      height: '40px !important',
      width: '32px !important',
      padding: '0px !important'
    },
    '&:before': {
      backgroundColor: 'unset !important'
    }
  }))

  const [modalConfirm, setModalConfirm] = useState<boolean>(false)

  const auditReason = Form.useWatch('auditReason', form)
  const auditStatus = Form.useWatch('auditStatus', form)

  return (
    <ProCard bordered>
      <ProForm
        onFinish={onFinish}
        submitter={false}
        // onFinish={async (values) => {
        //   // console.log('onFinish values', values)
        // }}
        // onFinishFailed={(errorInfo) => {
        //   // console.log('onFinishFailed', errorInfo)
        // }}
        // onValuesChange={async (values) => {
        //   const newValues = { ...formData, ...values }
        //   setFormData(newValues)
        //   onValuesChange?.(newValues)
        // }}
        // onFieldsChange={(changedFields, allFields) => {
        //   onFieldsChange?.(changedFields, allFields)
        // }}
        // initialValues={initialValues}
        form={form}
        style={style}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-[50px]">
            <div>
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`)
                }}
              >
                <Image src={img} width={66} height={66} className="border-gray-150 border rounded-full" />
              </Image.PreviewGroup>
            </div>
            <div className="w-full grid grid-cols-4 gap-x-7">
              <div className="flex flex-col items-center">
                <ProFormDigit
                  name="maxSupportCountLimit"
                  required
                  fieldProps={{ size: 'middle', controls: false, style: { height: 32 } }}
                  width={100}
                  placeholder={intl.formatMessage({ id: 'mt.shuru' })}
                />
                <div className="text-secondary text-xs pt-1">
                  <FormattedMessage id="mt.daidanrenshu" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <ProFormDigit
                  name="assetRequirementLimit"
                  required
                  fieldProps={{ size: 'middle', controls: false, style: { height: 32 } }}
                  width={100}
                  placeholder={intl.formatMessage({ id: 'mt.shuru' })}
                />
                <div className="text-secondary text-xs pt-1">
                  <FormattedMessage id="mt.zichanyaoqiu" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <ProFormDigit
                  name="assetScaleLimit"
                  required
                  fieldProps={{ size: 'middle', controls: false, style: { height: 32 } }}
                  width={100}
                  placeholder={intl.formatMessage({ id: 'mt.shuru' })}
                />
                <div className="text-secondary text-xs pt-1">
                  <FormattedMessage id="mt.daidanguimo" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <ProFormDigit
                  name="profitSharingRatioLimit"
                  required
                  fieldProps={{
                    size: 'middle',
                    controls: false,
                    style: { height: 32 },
                    precision: 2,
                    suffix: '%',
                    formatter: (value) => formatNum(value)
                  }}
                  width={100}
                  placeholder={intl.formatMessage({ id: 'mt.shuru' })}
                />
                <div className="text-secondary text-xs pt-1">
                  <FormattedMessage id="mt.fenrunbili" />
                </div>
              </div>
            </div>
          </div>
          <div className=" hide-form-item">
            {/* 隱藏的字段 */}
            <ProFormText name="auditReason"></ProFormText>
            <ProFormText name="auditStatus"></ProFormText>
            <ProFormText name="leadId"></ProFormText>
          </div>
          {auditStatus !== 1 && (
            <div className="flex justify-center items-end flex-col pl-10 gap-y-3 group">
              <Popconfirm
                title={<FormattedMessage id="mt.querentongguoma" />}
                onConfirm={() => {
                  form.setFieldValue('auditReason', intl.formatMessage({ id: 'mt.shenhetongguo' }))
                  form.setFieldValue('auditStatus', 1)

                  form.submit()
                  close?.()
                }}
              >
                <Button type="primary" className="!text-white !bg-green-700 !w-[150px] !h-10 !border-none group-hover:!text-white">
                  <span className=" w-full indent-4 text-start">
                    <FormattedMessage id="mt.shenhetongguo" />
                  </span>
                </Button>
              </Popconfirm>

              <Dropdown.Button
                danger
                trigger={['click']}
                buttonsRender={(btns) => [
                  <Button
                    key={0}
                    onClick={() => {
                      setModalConfirm(true)
                    }}
                    type="primary"
                    danger
                    className="!h-10 flex-grow "
                  >
                    <FormattedMessage id="mt.shenhejujue" />
                  </Button>,
                  <Button key={1} danger type="primary" className={btn2ClassName}>
                    <Iconfont name="xialakuang" color="#fff" />
                  </Button>
                ]}
                dropdownRender={(menu) => <div className="flex flex-col">{menu}</div>}
                rootClassName="flex-grow flex-1 !w-[150px]"
                menu={{
                  onClick: handleMenuClick,
                  items: [
                    {
                      key: 'mt.liyou1',
                      label: <span>{getIntl().formatMessage({ id: 'mt.liyou1' })}</span>
                    },
                    {
                      key: 'mt.liyou2',
                      label: <span>{getIntl().formatMessage({ id: 'mt.liyou2' })}</span>
                    },
                    {
                      key: 'mt.liyou3',
                      label: <span>{getIntl().formatMessage({ id: 'mt.liyou3' })}</span>
                    }
                  ]
                }}
              ></Dropdown.Button>
            </div>
          )}
        </div>
        <div className="mb-6 mt-4">
          <div className="text-secondary text-sm mb-1">
            <FormattedMessage id="mt.mingcheng" />
          </div>
          <div className="text-primary text-base font-semibold">{initialValues?.projectName || 'Aaron Almaraz'}</div>
        </div>
        <div className="mb-6">
          <div className="text-secondary text-sm mb-1">
            <FormattedMessage id="mt.jianjie" />
          </div>
          <div className="text-primary text-base font-medium leading-6">
            {initialValues?.projectDesc ||
              'Jennifer Reid Aaron Almaraz Jennifer Reid Aaron AlmarazJennifer Reid Aaron AlmarazJennifer Reid Aaron AlmarazJennifer Reid Aaron Almaraz'}
          </div>
        </div>

        {initialValues?.contractProof && (
          <div className="mb-6">
            <div className="text-secondary text-sm mb-1">
              <FormattedMessage id="mt.heyuejiaoyizhengming" />
            </div>
            <div className="text-primary text-base font-medium leading-6">
              {/* 用逗号分割字符串 */}

              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`)
                }}
              >
                {initialValues.contractProof.split(',').map((item: string, index: number) => (
                  <Image key={item} src={item} width={66} height={66} className="border-gray-150 border " />
                ))}
              </Image.PreviewGroup>
            </div>
          </div>
        )}
        {auditStatus !== 0 && (
          <div className="h-16 leading-[64px] text-base">
            <FormattedMessage id="mt.shenhejieguo" />
            :&nbsp;
            {auditStatus === 1 ? (
              <span className=" text-green">
                <FormattedMessage id="mt.shenhetongguo" />
              </span>
            ) : (
              <span className=" text-red">{auditReason}</span>
            )}
          </div>
        )}
        <ConfirmModal
          form={form}
          open={modalConfirm}
          close={(val) => {
            form.setFieldValue('auditReason', val)
            setModalConfirm(false)
          }}
          onFinish={() => {
            form.setFieldValue('auditStatus', 2)
            form.submit()
            setModalConfirm(false)
            close?.()
          }}
        ></ConfirmModal>
      </ProForm>
    </ProCard>
  )
})
