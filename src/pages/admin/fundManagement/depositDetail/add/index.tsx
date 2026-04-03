import { ProCard, ProForm, ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components'
import { FormattedMessage, history, useIntl } from '@umijs/max'
import { useDebounceFn } from 'ahooks'
import { Form, message, Typography } from 'antd'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import { saveDepositFillOrder, validateTxHash } from '@/services/api/fundManagement/depositDetail'

interface DepositSupplementFormValues {
  tradeAccountId: string
  tradeAccountAddress: string
  actualAmount: number
  txHash: string
  isCollected: boolean
}

export default function DepositSupplementAdd() {
  const intl = useIntl()
  const [form] = Form.useForm()

  const { run: debouncedValidate } = useDebounceFn(
    async (txHash: string, tradeAccountId: string) => {
      try {
        const response = await validateTxHash({ txHash, tradeAccountId })

        if (response.data && !response.data.valid) {
          const errorMsg =
            response.data.msg ||
            (response.data.reason === 'WRONG_ACCOUNT'
              ? intl.formatMessage({ id: 'fundManagement.depositSupplement.txHashWrongAccount' })
              : intl.formatMessage({ id: 'fundManagement.depositSupplement.txHashNotInDb' }))
          form.setFields([{ name: 'txHash', errors: [errorMsg] }])
          return
        }

        form.setFields([{ name: 'txHash', errors: [] }])
      } catch (error: unknown) {
        const errorMsg = (error as { msg?: string })?.msg || intl.formatMessage({ id: 'fundManagement.depositSupplement.txHashInvalid' })
        form.setFields([{ name: 'txHash', errors: [errorMsg] }])
      }
    },
    { wait: 500 }
  )

  const triggerValidate = (changedField: 'txHash' | 'tradeAccountId') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value?.trim()
    const txHash = changedField === 'txHash' ? value : form.getFieldValue('txHash')?.trim()
    const tradeAccountId = changedField === 'tradeAccountId' ? value : form.getFieldValue('tradeAccountId')?.trim()

    if (changedField === 'txHash' && !value) {
      form.setFields([{ name: 'txHash', errors: [] }])
      return
    }

    if (txHash && tradeAccountId) {
      debouncedValidate(txHash, tradeAccountId)
    }
  }

  const handleSubmit = async (values: DepositSupplementFormValues) => {
    try {
      const response = await saveDepositFillOrder({
        tradeAccountId: values.tradeAccountId,
        tradeAccountAddress: values.tradeAccountAddress,
        actualAmount: values.actualAmount,
        txHash: values.txHash,
        isCollected: values.isCollected
      })

      if (response.success) {
        message.success(intl.formatMessage({ id: 'common.saveSuccess' }))
        history.back()
      } else {
        message.error(response.msg || intl.formatMessage({ id: 'common.saveFailed' }))
      }
    } catch (error) {
      message.error(intl.formatMessage({ id: 'common.saveFailed' }))
    }
  }

  return (
    <PageContainer
      icon="/img/emoji/4.png"
      pageBgColorMode="gray"
      renderRight={() => (
        <SaveButton onClick={() => form.submit()}>
          <FormattedMessage id="common.save" />
        </SaveButton>
      )}
    >
      <ProCard bodyStyle={{ height: 500, paddingTop: 50 }}>
        <ProForm form={form} layout="vertical" onFinish={handleSubmit} submitter={false}>
          <Typography.Title level={5} style={{ marginBottom: 24 }}>
            <FormattedMessage id="fundManagement.depositSupplement.pageTitle" />
          </Typography.Title>

          <div className="grid grid-cols-2 gap-10">
            <ProFormText
              name="tradeAccountId"
              label={<FormattedMessage id="fundManagement.depositSupplement.tradeAccountId" />}
              placeholder={intl.formatMessage({ id: 'fundManagement.depositSupplement.tradeAccountIdPlaceholder' })}
              fieldProps={{ onChange: triggerValidate('tradeAccountId') }}
              rules={[{ required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.tradeAccountIdRequired' }) }]}
            />
            <ProFormText
              name="tradeAccountAddress"
              label={<FormattedMessage id="fundManagement.depositSupplement.tradeAccountAddress" />}
              placeholder={intl.formatMessage({ id: 'fundManagement.depositSupplement.tradeAccountAddressPlaceholder' })}
              rules={[
                { required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.tradeAccountAddressRequired' }) }
              ]}
            />
            <ProFormDigit
              name="actualAmount"
              label={<FormattedMessage id="fundManagement.depositSupplement.actualAmount" />}
              placeholder={intl.formatMessage({ id: 'fundManagement.depositSupplement.actualAmountPlaceholder' })}
              fieldProps={{ precision: 6, min: 0 }}
              rules={[{ required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.actualAmountRequired' }) }]}
            />
            <ProFormText
              name="txHash"
              label={<FormattedMessage id="fundManagement.depositSupplement.txHash" />}
              placeholder={intl.formatMessage({ id: 'fundManagement.depositSupplement.txHashPlaceholder' })}
              fieldProps={{ onChange: triggerValidate('txHash') }}
              rules={[{ required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.txHashRequired' }) }]}
            />
            <ProFormRadio.Group
              name="isCollected"
              label={<FormattedMessage id="fundManagement.depositSupplement.isCollected" />}
              initialValue={true}
              options={[
                { label: intl.formatMessage({ id: 'common.yes' }), value: true },
                { label: intl.formatMessage({ id: 'common.no' }), value: false }
              ]}
              rules={[{ required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.isCollectedRequired' }) }]}
            />
          </div>
        </ProForm>
      </ProCard>
    </PageContainer>
  )
}
