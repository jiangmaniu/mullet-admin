import { ProCard, ProForm, ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components'
import { FormattedMessage, history, useIntl } from '@umijs/max'
import { Form, message, Typography } from 'antd'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'

interface DepositSupplementFormValues {
  userId: string
  tradeAccountAddress: string
  amount: number
  txHash: string
  isCollected: boolean
}

export default function DepositSupplementAdd() {
  const intl = useIntl()
  const [form] = Form.useForm()

  const handleSubmit = async (values: DepositSupplementFormValues) => {
    try {
      // const response = await submitDepositSupplement(values)
      // if (response.success) {
      //   message.success(intl.formatMessage({ id: 'fundManagement.depositSupplement.submitSuccess' }))
      //   history.back()
      //   return true
      // }
      // message.error(response.message || intl.formatMessage({ id: 'fundManagement.depositSupplement.submitFailed' }))
      return false
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : intl.formatMessage({ id: 'fundManagement.depositSupplement.submitFailed' })
      message.error(errorMessage)
      return false
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
              name="userId"
              label={<FormattedMessage id="fundManagement.depositSupplement.userId" />}
              placeholder={intl.formatMessage({ id: 'fundManagement.depositSupplement.userIdPlaceholder' })}
              rules={[{ required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.userIdRequired' }) }]}
            />
            <ProFormText
              name="tradeAccountAddress"
              label={<FormattedMessage id="fundManagement.depositSupplement.tradeAccountAddress" />}
              placeholder={intl.formatMessage({ id: 'fundManagement.depositSupplement.tradeAccountAddressPlaceholder' })}
              rules={[
                { required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.tradeAccountAddressRequired' }) },
                { pattern: /^0x[a-fA-F0-9]{40}$/, message: '請輸入有效的以太坊地址格式' }
              ]}
            />
            <ProFormDigit
              name="amount"
              label={<FormattedMessage id="fundManagement.depositSupplement.amount" />}
              placeholder={intl.formatMessage({ id: 'fundManagement.depositSupplement.amountPlaceholder' })}
              fieldProps={{ precision: 2, min: 0 }}
              rules={[{ required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.amountRequired' }) }]}
            />
            <ProFormText
              name="txHash"
              label={<FormattedMessage id="fundManagement.depositSupplement.txHash" />}
              placeholder={intl.formatMessage({ id: 'fundManagement.depositSupplement.txHashPlaceholder' })}
              rules={[
                { required: true, message: intl.formatMessage({ id: 'fundManagement.depositSupplement.txHashRequired' }) },
                { pattern: /^0x[a-fA-F0-9]{64}$/, message: '請輸入有效的交易哈希格式' }
              ]}
            />

            <ProFormRadio.Group
              name="isCollected"
              label={<FormattedMessage id="fundManagement.depositSupplement.isCollected" />}
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
