import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, Spin } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import { getFirstDepositConfigQuery, saveOrUpdateActivityConfig } from '@/services/api/activity'
import { message } from '@/utils/message'

import ConfEditTable from './ConfEditTable'

type IProps = {
  trigger?: JSX.Element
  onClose?: () => void
}

function ModalForm({ trigger, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const { data, loading, run } = useRequest(getFirstDepositConfigQuery, { manual: true })
  const info = data?.data || {}

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

  useEffect(() => {
    if (open) {
      run()
    }
  }, [open])

  useEffect(() => {
    form.setFieldsValue(info)
  }, [info])

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={<FormattedMessage id="mt.huodongpeizhi" />}
      form={form}
      showHeaderBg
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values: any) => {
        console.log('formData', values)

        const { varietyRewards, ...rest } = values || {}

        const params = {
          ...rest,
          varietyRewards: varietyRewards.map((item: any) => {
            return {
              rewardAmount: item.rewardAmount,
              symbolGroupId: String(item.symbolGroupId),
              symbolGroupName: undefined
            }
          }),
          id: info?.id
        }
        // @ts-ignore
        const res = await saveOrUpdateActivityConfig(params)
        const success = res?.success

        if (success) {
          message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
          run()
          close()
        }

        return success // true关闭弹窗
      }}
      initialValues={info}
      onCancel={close}
      afterClose={() => {
        onClose?.()
      }}
    >
      <Spin spinning={loading}>
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div>
            <ProFormSwitch name="activitySwitch" initialValue={false} label={intl.formatMessage({ id: 'mt.huodongkaiguan' })} />
            <div className="text-xs text-primary mt-2">
              <FormattedMessage id="mt.huodongkaiguantips" />
            </div>
          </div>
          <ProFormText required name="activityName" label={intl.formatMessage({ id: 'mt.huodongmingcheng' })} />
          <ProFormDigit
            tooltip={<FormattedMessage id="mt.huodongshichangtips" />}
            required
            name="activityDuration"
            hiddenPrecision
            label={intl.formatMessage({ id: 'mt.huodongshichang' })}
          />
          <ProFormDigit
            tooltip={<FormattedMessage id="mt.chongzhizuidichufajinetips" />}
            name="minRechargeAmount"
            required
            label={intl.formatMessage({ id: 'mt.chongzhizuidichufajine' })}
          />
          <ProFormDigit name="rewardPercentage" required label={intl.formatMessage({ id: 'mt.zengsongjiangliedubaifenbi' })} />
        </div>
        <Form.Item
          tooltip={<FormattedMessage id="mt.jiaoyihouzengsongjinepeizhitips" />}
          name="conf"
          label={intl.formatMessage({ id: 'mt.jiaoyihouzengsongjinepeizhi' })}
        >
          <ConfEditTable form={form} name="varietyRewards" />
        </Form.Item>
      </Spin>
    </Modal>
  )
}

export default forwardRef(ModalForm)
