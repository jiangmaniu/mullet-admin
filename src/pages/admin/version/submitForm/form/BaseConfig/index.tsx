import { ProFormSwitch, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, TreeSelect } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import SelectSuffixIcon from '@/components/Base/SelectSuffixIcon'
import { getEnum } from '@/constants/enum'
import { getVersionRegionList } from '@/services/api/version'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

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

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    const { blockedRegions, ...values } = initialValues || {}
    if (treeData.length && blockedRegions) {
      form.setFieldsValue({
        blockedRegions: blockedRegions?.split(',') || []
      })
    }
    form.setFieldsValue(values)
  }, [initialValues, treeData.length])

  return (
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
      <div className="grid grid-cols-2 gap-5 mb-4 w-[80%]">
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
        <ProFormSwitch name="abControl" label={intl.formatMessage({ id: 'mt.abmiankongzhikaiguan' })} />
      </div>
      <div className="flex flex-col gap-y-5 mt-5 w-[80%]">
        {/* <Form.Item
          name="updateContent"
          required
          label={intl.formatMessage({ id: 'mt.gengxinneirong' })}
        >
          <MdEditorLite name="updateContent" simple height={300} form={form} />
        </Form.Item> */}
        <ProFormTextArea
          name={'updateContent'}
          label={intl.formatMessage({ id: 'mt.gengxinneirong' })}
          fieldProps={{ showCount: true, maxLength: 1000, autoSize: { minRows: 6, maxRows: 12 } }}
        />
        <ProFormTextArea
          name={'remark'}
          label={intl.formatMessage({ id: 'mt.beizhu' })}
          fieldProps={{ showCount: true, maxLength: 500, autoSize: { minRows: 3, maxRows: 10 } }}
        />
      </div>
    </Form>
  )
})
