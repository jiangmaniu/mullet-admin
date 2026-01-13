import { ProFormSwitch, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, TreeSelect } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import SelectSuffixIcon from '@/components/Base/SelectSuffixIcon'
import { getEnum } from '@/constants/enum'
import { addVersion, getVersionRegionList, updateVersion } from '@/services/api/version'
import { message } from '@/utils/message'

type IProps = {
  trigger?: JSX.Element
  info?: Version.VersionItem
  reload?: () => void
  onClose?: () => void
}

function ModalForm({ trigger, info, reload, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const isAdd = !info?.id

  const { data: versionRegionRes } = useRequest(getVersionRegionList)
  const versionRegionList = versionRegionRes?.data || []
  const treeData = useMemo(() => {
    return versionRegionList.map((item) => ({
      title: item.name,
      value: item.code,
      key: item.code,
      children: item.children?.map((child) => ({
        title: child.name,
        value: child.code,
        key: child.code
      }))
    }))
  }, [versionRegionList])

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
    const { blockedRegions, ...values } = info || {}
    if (treeData.length && blockedRegions) {
      form.setFieldsValue({
        blockedRegions: blockedRegions?.split(',') || []
      })
    }
    form.setFieldsValue(values)
  }, [info, treeData.length])

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={isAdd ? <FormattedMessage id="mt.xinzengbanben" /> : <FormattedMessage id="mt.bianjibanben" />}
      form={form}
      showHeaderBg
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values: any) => {
        console.log('formData', values)

        const params = {
          ...values,
          blockedRegions: (values.blockedRegions || [])?.join(','),
          id: info?.id
        }
        const reqFn = isAdd ? addVersion : updateVersion
        // @ts-ignore
        const res = await reqFn(params)
        const success = res?.success

        if (success) {
          message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
          reload?.()
          close()
        }

        return success // true关闭弹窗
      }}
      // initialValues={info}
      onCancel={close}
      afterClose={() => {
        onClose?.()
      }}
    >
      <div className="grid grid-cols-2 gap-5 mb-4">
        <ProFormText autoFocus required name="name" label={intl.formatMessage({ id: 'mt.mingcheng' })} />
        <ProFormText name="platform" required label={intl.formatMessage({ id: 'mt.pingtai' })} />
        <ProFormText
          name="versionNumber"
          required
          label={intl.formatMessage({ id: 'mt.banbenhao' })}
          fieldProps={{
            prefix: <span className="text-gray-500">V</span>
          }}
          rules={[
            {
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.qingshurubanbenhao' }))
                }
                if (!/^\d+\.\d+\.\d+$/.test(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.banbenhaogeshibuzhengque' }))
                }
                return Promise.resolve()
              }
            }
          ]}
        />
        <ProFormText name="channelNumber" required label={intl.formatMessage({ id: 'mt.qudaohao' })} />
        <ProFormSelect
          name="device"
          showSearch={false}
          required
          label={intl.formatMessage({ id: 'mt.shebei' })}
          options={getEnum().enumToOptions('VersionDevice')}
        />
        <ProFormSelect
          name="status"
          required
          showSearch={false}
          label={intl.formatMessage({ id: 'mt.zhuangtai' })}
          options={getEnum().enumToOptions('VersionStatus')}
        />

        <ProFormText required name="downloadUrl" label={intl.formatMessage({ id: 'mt.xiazaidizhi' })} />
        <ProFormTreeSelect
          name="blockedRegions"
          required={false}
          label={intl.formatMessage({ id: 'mt.pingbiquyu' })}
          fieldProps={{
            treeData,
            treeCheckable: true,
            maxTagCount: 'responsive',
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            size: 'large',
            suffixIcon: <SelectSuffixIcon opacity={0.5} />
          }}
          // rules={
          //   [{
          //     required: false,
          //     validator: (rule, value, callback) => {
          //       if (!value || value?.length === 0) {
          //         return Promise.reject(intl.formatMessage({ id: 'mt.xuanzepingbiquyu' }))
          //       }
          //       return Promise.resolve()
          //     }
          //   }]
          // }
        />
        <ProFormSwitch name="abControl" label={intl.formatMessage({ id: 'mt.kaiqiweibmain' })} initialValue={false} />
      </div>
      <div className="flex flex-col gap-y-5 mt-5">
        {/* <Form.Item
          name="updateContent"
          required
          label={intl.formatMessage({ id: 'mt.gengxinneirong' })}
        >
          <MdEditorLite name="updateContent" simple height={300} form={form} />
        </Form.Item> */}
        <ProFormTextArea
          required
          name={'updateContent'}
          label={intl.formatMessage({ id: 'mt.gengxinneirong' })}
          fieldProps={{ showCount: true, maxLength: 1000, autoSize: { minRows: 6, maxRows: 12 } }}
          rules={[
            {
              required: true,
              // @ts-ignore
              validator: (rule, value, callback) => {
                if (!value) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.qingshuruneirong' }))
                }
                return Promise.resolve()
              }
            }
          ]}
        />
        <ProFormTextArea
          name={'remark'}
          label={intl.formatMessage({ id: 'mt.beizhu' })}
          fieldProps={{ showCount: true, maxLength: 200, autoSize: { minRows: 2, maxRows: 4 } }}
        />
      </div>
    </Modal>
  )
}

export default forwardRef(ModalForm)
