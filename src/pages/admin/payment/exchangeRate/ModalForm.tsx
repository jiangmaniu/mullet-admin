import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import { saveExchangeRate, updateExchangeRate } from '@/services/api/payment/exchangeRate'

type IProps = {
  reload?: () => void
}

function ModalForm({ reload }: IProps, ref: any) {
  const [modalInfo, setModalInfo] = useState<any>({})
  const isAdd = Object.keys(modalInfo || {}).length === 0
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const show = () => setOpen(true)
  const close = () => {
    setOpen(false)
    setModalInfo({})
  }

  useImperativeHandle(ref, () => {
    return {
      show: (info?: any) => {
        setModalInfo(info)
        show()
      },
      close
    }
  })

  useEffect(() => {
    if (modalInfo) {
      form.setFieldsValue(modalInfo)
    }
  }, [modalInfo])

  return (
    <>
      <Modal
        title={isAdd ? <FormattedMessage id="common.add" /> : <FormattedMessage id="common.bianji" />}
        onFinish={async (values: any) => {
          const params = { ...values }

          if (!isAdd) {
            params.id = modalInfo.id
          }

          let res
          if (isAdd) {
            res = await saveExchangeRate(params)
          } else {
            res = await updateExchangeRate({
              id: modalInfo.id,
              exchangeRatio: params.exchangeRatio
            })
          }

          const isSuccess = res?.success

          if (isSuccess) {
            // 刷新列表
            reload?.()

            // 关闭弹窗
            close()
          }

          return isSuccess
        }}
        width={760}
        open={open}
        onCancel={() => {
          setOpen(false)
          close()
        }}
        form={form}
      >
        <div className="grid gap-y-5 my-5 gap-x-7 grid-cols-2">
          <ProFormText
            required={isAdd}
            name="currencyName"
            maxLength={20}
            fieldProps={{ showCount: true }}
            disabled={!isAdd}
            label={intl.formatMessage({ id: 'mt.huobimingcheng' })}
          />
          <ProFormText
            required={isAdd}
            name="currencyCode"
            maxLength={20}
            fieldProps={{ showCount: true }}
            disabled={!isAdd}
            rules={[
              {
                required: isAdd,
                validateTrigger: 'onChange',
                validator(rule, value, callback) {
                  if (!value) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.shuruhuobijiancheng' }))
                  } else if (!/^[a-zA-Z]*$/gi.test(value)) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.shuruqingwenzimu' }))
                  }
                  return Promise.resolve()
                }
              }
            ]}
            label={intl.formatMessage({ id: 'mt.huobibianhao' })}
          />
          <ProFormText
            required={isAdd}
            name="currencySymbol"
            maxLength={20}
            fieldProps={{ showCount: true }}
            disabled={!isAdd}
            label={intl.formatMessage({ id: 'mt.huobifuhao' })}
          />
          {/* 基准货币 */}
          <ProFormSelect
            initialValue={'USD'}
            name="baseCurrency"
            label={intl.formatMessage({ id: 'mt.jizhunhuobi' })}
            options={[{ label: 'USD', value: 'USD' }]}
            required={isAdd}
            disabled={!isAdd}
          />
        </div>
        <ProFormDigit
          required
          name="exchangeRatio"
          placeholder={intl.formatMessage({ id: 'mt.shuruhuanhuibilitips' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'mt.shuruhuanhuibilitips' })
            }
          ]}
          maxLength={50}
          min={0.00000001}
          label={intl.formatMessage({ id: 'mt.huanhuibilitips' })}
        />
      </Modal>
    </>
  )
}

export default forwardRef(ModalForm)
