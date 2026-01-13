import { InfoCircleOutlined } from '@ant-design/icons'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, Spin } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ModalForm from '@/components/Admin/ModalForm'
import { getDataSourceSubAliasList, removeDataSourceSubAlias, submitDataSourceSubAlias } from '@/services/api/dataSource'
import { getUid } from '@/utils'
import { message } from '@/utils/message'

import EditTable from './EditTable'

type IProps = {
  trigger?: JSX.Element
  info?: DataSource.DataSourceListItem
  onClose?: () => void
}

export default forwardRef(({ trigger, info, onClose }: IProps, ref: any) => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const { data, run, loading } = useRequest(getDataSourceSubAliasList, { manual: true })

  const show = () => {
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
  }

  const reload = () => run({ dsId: info?.id })

  useEffect(() => {
    if (info?.id) {
      reload()
    }
  }, [info])

  useEffect(() => {
    // 重新生成可编辑表格的id，保留原始id
    form.setFieldsValue({ list: (data?.data || []).map((item: any) => ({ ...item, dataId: item.id, id: getUid() })) })
  }, [data])

  useImperativeHandle(ref, () => {
    return {
      show,
      close
    }
  })

  return (
    <ModalForm
      trigger={trigger}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        const values = await form.getFieldsValue()
        console.log('values', values)
        close()
        // return success // true关闭弹窗
        return true
      }}
      open={open}
      width={700}
      form={form}
      showHeaderBg
      onCancel={() => {
        onClose?.()
        close()
      }}
      renderTitle={() => {
        return (
          <div className="w-full">
            <div className="text-lg text-primary font-extrabold">
              <FormattedMessage id="mt.chongmingming" />
            </div>
            <div className="flex items-center justify-center w-full">
              <img src="/img/rename-header-icon.png" width={78} height={78} />
            </div>
            <div className="text-sm text-center text-secondary py-3">
              <InfoCircleOutlined style={{ fontSize: 14, marginRight: 4 }} />
              {intl.formatMessage({ id: 'mt.xiugaipeizhitips' })}
            </div>
          </div>
        )
      }}
    >
      <Spin spinning={loading}>
        <EditTable
          name="list"
          form={form}
          onRowSave={async (record) => {
            // Modal.info({
            //   title: intl.formatMessage({ id: 'common.tips' }),
            //   content: intl.formatMessage({ id: 'mt.xiugaipeizhitips' }),
            //   centered: true,
            //   footer: <div className='flex items-center justify-end gap-x-3 mt-4'>
            //     <Button onClick={() => Modal.destroyAll()}>{intl.formatMessage({ id: 'common.cancel' })}</Button>
            //     <Button type='primary' onClick={async () => {

            //     }}>{intl.formatMessage({ id: 'common.confirm' })}</Button>
            //   </div>,
            // })

            // @ts-ignore
            const { id, datasourceId, dataId, createTime, index, ...params } = record || {}
            const res = await submitDataSourceSubAlias({
              ...params,
              datasourceId: info?.id, // 数据源id
              id: dataId ? dataId : undefined // 区分编辑和新建
            })
            console.log('onRowSave', record)
            if (res.success) {
              message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
              reload()
              //  Modal.destroyAll()
            }
          }}
          onRowDelete={async (record) => {
            const res = await removeDataSourceSubAlias({ ids: record.dataId })
            if (res.success) {
              message.info(intl.formatMessage({ id: 'common.deleteSuccess' }))
              reload()
            }
          }}
        />
      </Spin>
    </ModalForm>
  )
})
