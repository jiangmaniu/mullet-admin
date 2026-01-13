import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import AutoCompleteTree from '@/components/Admin/AutoCompleteTree'
import { getSymbolTree } from '@/services/api/dataSource'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
}

export function formatTreeData(treeData: any[], parentLevel = 0) {
  return treeData.map((node: any) => {
    // 创建新节点
    const newNode = {
      ...node,
      key: node.id, // 添加 key，值等于 id
      value: node.id, // 添加 value，值等于 id
      disabled: false // 默认不禁用
    }

    // 判断是否需要禁用
    // 条件：不是第一层 && isSymbol=false && children为空数组
    if (parentLevel > 0 && node.isSymbol === false && (!node.children || node.children.length === 0)) {
      // 文件夹也能选择，后续可能会在空文件夹中添加品种
      // newNode.disabled = true
    }

    // 递归处理子节点，增加层级计数
    if (node.children && node.children.length > 0) {
      newNode.children = formatTreeData(node.children, parentLevel + 1)
    }

    return newNode
  })
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  const { pathname } = useLocation()
  const [inputValue, setInputValue] = useState('')

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  const treeDataRes = useRequest(getSymbolTree)
  const treeData = useMemo(() => formatTreeData(treeDataRes?.data?.data || []), [treeDataRes])

  // console.log('treeData', treeData)

  return (
    <Form
      onFinish={async (values) => {}}
      onFinishFailed={(errorInfo) => {}}
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
      <div className="flex items-start flex-col w-full">
        <div className="text-primary mb-5 font-pf-bold text-[22px]">
          <FormattedMessage id="mt.pinzhongliebiao" />
          <FormattedMessage id="mt.peizhi" />
        </div>
        <div className="w-[70%]">
          <div className="flex flex-col">
            <span className="text-primary font-medium text-lg ">
              <FormattedMessage id="mt.yingyongpinzhong" />
            </span>
            <span className="text-weak text-sm mt-2">
              <FormattedMessage id="mt.peizhipingzhongliebiaohou" />
            </span>
            <div className="mt-[18px]">
              <Form.Item
                rules={[
                  {
                    required: true,
                    validator(rule, value, callback) {
                      if (!form.getFieldValue('symbols')) {
                        return Promise.reject(intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' }))
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
                name="symbols"
              >
                <AutoCompleteTree
                  multiple={true}
                  style={{ width: '100%' }}
                  hideSearch
                  name={'symbols'}
                  form={form}
                  value={inputValue}
                  onChange={setInputValue}
                  treeData={treeData}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
})
