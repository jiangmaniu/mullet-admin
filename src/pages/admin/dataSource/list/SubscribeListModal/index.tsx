import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ModalForm from '@/components/Admin/ModalForm'
import { getDataSourceDetail } from '@/services/api/dataSource'

import SubscribeList from './SubscribeList'

type IProps = {
  trigger?: JSX.Element
  info?: DataSource.DataSourceListItem
  onClose?: () => void
}

export default forwardRef(({ trigger, info, onClose }: IProps, ref: any) => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const { data, run, loading } = useRequest(getDataSourceDetail, { manual: true })
  const detailInfo = data?.data || {}
  const reload = () => run({ id: info?.id })

  useEffect(() => {
    if (info?.id) {
      reload()
    }
  }, [info])

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

  return (
    <>
      <ModalForm
        trigger={trigger}
        // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
        onFinish={async () => {
          close()
          // return success // true关闭弹窗
          return true
        }}
        open={open}
        width={1000}
        form={form}
        showHeaderBg
        hiddenSubmitter
        title={<FormattedMessage id="mt.dingyueliebiao" />}
        onCancel={() => {
          onClose?.()
          close()
        }}
      >
        <SubscribeList initialValues={detailInfo} />
      </ModalForm>
    </>
  )
})
