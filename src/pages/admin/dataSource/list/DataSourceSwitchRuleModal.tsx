import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import Modal from '@/components/Admin/ModalForm'
import { getDataSourceTimeout, setDataSourceTimeout } from '@/services/api/dataSource'

type IProps = {
  trigger?: JSX.Element
}

export default forwardRef(({ trigger }: IProps, ref: any) => {
  const intl = useIntl()
  const [tradeAccountNum, setTradeAccountNum] = useState(0)
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const { data, run, loading } = useRequest(getDataSourceTimeout, { manual: true })

  const show = () => {
    setOpen(true)
    run()
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

  useEffect(() => {
    form.setFieldValue('timeout', data?.data || '')
  }, [data])

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={<FormattedMessage id="mt.shujuyuanqiehuanguize" />}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        const values = await form.getFieldsValue()
        console.log('values', values)
        // return success // true关闭弹窗
        await setDataSourceTimeout(values)
        run()
        close()
        return true
      }}
      width={544}
      form={form}
      showHeaderBg
      onCancel={close}
      renderTitle={() => {
        return (
          <div className="w-full">
            <div className="text-lg text-primary font-extrabold">
              <FormattedMessage id="mt.shujuyuanqiehuanguize" />
            </div>
            <div className="flex items-center justify-center w-full">
              <img src="/img/switch-datasource-header-icon.png" width={78} height={78} />
            </div>
          </div>
        )
      }}
    >
      <div className="text-primary pb-1 text-lg font-pf-bold">
        <FormattedMessage id="mt.shujuchaoshi" />
      </div>
      <div className="text-secondary pb-4 text-sm">
        <FormattedMessage id="mt.shujuchaoshitips" />
      </div>
      <ProFormDigit
        required
        name="timeout"
        placeholder={intl.formatMessage({ id: 'mt.qingshurumiao' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'mt.qingshurumiao' })
          }
        ]}
        fieldProps={{
          controls: false,
          suffix: <FormattedMessage id="mt.miao" />
        }}
      />
    </Modal>
  )
})
