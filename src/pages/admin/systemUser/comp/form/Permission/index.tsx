import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import PermissionTree from '@/components/Admin/Form/PermissionTree'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getPresetsPermissions } from '@/services/api/common'
import { getClientGroupList } from '@/services/api/crm/customerGroup'
import { getRoleTree } from '@/services/api/crm/manager'
import { flatTreeData } from '@/utils/tree'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
}

function formatPerssionsData(originalData: any) {
  const result: any = []
  const groupedData: any = {}

  // 遍历原始数据，对数据进行分组
  originalData.forEach((item: any) => {
    const [prefix, suffix] = item.key.split('_')
    if (!suffix) {
      // 处理父级项
      groupedData[prefix] = {
        key: prefix,
        value: item.value,
        children: []
      }
    } else {
      // 处理子级项
      if (!groupedData[prefix]) {
        groupedData[prefix] = {
          key: prefix,
          children: []
        }
      }
      groupedData[prefix].children.push({
        key: suffix, // 移除前缀
        value: item.value
      })
    }
  })

  // 将分组后的数据转换为数组形式
  // eslint-disable-next-line guard-for-in
  for (const key in groupedData) {
    result.push(groupedData[key])
  }

  return result
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const { data, run, loading } = useRequest(getRoleTree, { manual: true })
  const [permissionIds, setPermissionIds] = useState<any>([])

  const { run: queryPresetsPermissions, data: presetsPermissionsRes } = useRequest(getPresetsPermissions, { manual: true })
  const presetsPermissionsData = presetsPermissionsRes?.data || []
  const perssionsData = formatPerssionsData(presetsPermissionsData)

  const permissionTreeData = data?.data?.[1]?.children || [] // 第二条是功能权限树
  const flatPermissionTreeData = flatTreeData(permissionTreeData, 'id') // 拍平树结构

  const roleList = (data?.data?.[0]?.children || []).map((item) => {
    // 根据角色预设权限
    const seniorAlias = (perssionsData.find((item: any) => item.key === 'senior')?.children || []).map((v: any) => v.key) || [] // 字典配置的权限别名预设
    const ordinaryAlias = (perssionsData.find((item: any) => item.key === 'ordinary')?.children || []).map((v: any) => v.key) || [] // 字典配置的权限别名预设

    const presetsPermissions =
      {
        // 高级经理
        senior: flatPermissionTreeData.filter((v) => seniorAlias.includes(v.value)).map((v) => v.id), // 根据权限别名获取id
        // 客户经理
        ordinary: flatPermissionTreeData.filter((v) => ordinaryAlias.includes(v.value)).map((v) => v.id)
      }[item.value] || []
    return { value: item.key, label: item.title, alias: item.value, presetsPermissions }
  }) // 第一条是角色列表

  // 角色ids
  const roleIds = formData?.roleIds || []

  // 根据选择的角色，选中对应的预设权限
  const presetsPermissionIds = roleIds?.length
    ? roleList
        .filter((item) => roleIds.includes(item.value))
        ?.map((item) => item.presetsPermissions)
        .flat() || []
    : []

  useImperativeHandle(ref, () => {
    return form
  })

  useEffect(() => {
    run?.()
    queryPresetsPermissions?.()
  }, [])

  useEffect(() => {
    // 编辑回显的角色roleId，roleId合并保存了roleIds和permissionIds的值
    const roleIds = initialValues?.roleId || []
    if (roleIds?.length && roleList?.length) {
      // 角色ids
      initialValues.roleIds = roleList.map((item) => item.value).filter((id) => roleIds.includes(id)) // 找出勾选的角色id回显
      // 权限ids
      initialValues.permissionIds = flatPermissionTreeData.map((item) => item.id).filter((id) => roleIds.includes(id))
      form.setFieldsValue(initialValues)
      setPermissionIds(initialValues.permissionIds)
    }
  }, [data, initialValues])

  useEffect(() => {
    setPermissionIds(presetsPermissionIds)
    form.setFieldValue('permissionIds', presetsPermissionIds)
  }, [presetsPermissionIds.length])

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
        console.log('onValuesChange', newValues)
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="w-full">
        <div className="grid grid-cols-2 gap-7">
          <ProFormSelect
            label={intl.formatMessage({ id: 'mt.role' })}
            name="roleIds"
            required
            options={roleList}
            width="lg"
            fieldProps={{ maxTagCount: 'responsive', mode: 'multiple' }}
          />
          {/* 分配该经理的客户权限，分配后即可在“客户管理”中管理对应组的客户 */}
          <ProFormSelect
            label={intl.formatMessage({ id: 'mt.kehuzuquanxian' })}
            mode="multiple"
            name="clientGroup"
            required
            fieldProps={{ maxTagCount: 'responsive' }}
            request={async () => {
              const res = await getClientGroupList({ current: 1, size: 999 })
              return (res?.data?.records || []).map((item) => {
                return {
                  label: item.groupName,
                  value: item.id
                }
              })
            }}
            width="lg"
          />
        </div>
        {/* 系统权限（仅展示），即后台的菜单权限，由所选角色决定 */}
        <Form.Item
          name="permissionIds"
          label={intl.formatMessage({ id: 'mt.xitongquanxian' })}
          // rules={[
          //   {
          //     required: false,
          //     validator(rule, value, callback) {
          //       if (!form.getFieldValue('permissionIds')?.length) {
          //         return Promise.reject(intl.formatMessage({ id: 'mt.xuanzexitongquanxian' }))
          //       }
          //       return Promise.resolve()
          //     }
          //   }
          // ]}
          className="!mt-5"
        >
          <PermissionTree treeData={permissionTreeData} />
        </Form.Item>
      </div>
    </Form>
  )
})
