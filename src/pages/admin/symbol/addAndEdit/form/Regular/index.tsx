import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, FormInstance } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import AutoCompleteTree from '@/components/Admin/AutoCompleteTree'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import SpreadFormItem from '@/components/Admin/Form/SpreadFormItem'
import SymbolFormTreeSelect from '@/components/Admin/Form/SymbolFormTreeSelect'
import { getEnum } from '@/constants/enum'
import { useEnv } from '@/context/envProvider'
import { getSymbolCategory } from '@/services/api/common'
import { getSymbolTree } from '@/services/api/dataSource'

import MarketDepthFormItem from './comp/MarketDepthFormItem'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
  tabList?: any[]
}

function formatTreeData(treeData: any) {
  return treeData.map((node: any) => {
    // 创建新节点
    const newNode = {
      ...node,
      key: node.id, // 添加 key，值等于 id
      value: node.value, // 添加 key，值等于 id
      disabled: !node.isSymbol // 禁用非品种节点
    }

    // 递归处理子节点
    if (node.children && node.children.length > 0) {
      newNode.children = formatTreeData(node.children)
    }

    return newNode
  })
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, tabList }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const { breakPoint } = useEnv()
  const [treeExpandedKeys, setTreeExpandedKeys] = useState<React.Key[]>([])
  const [inputValue, setInputValue] = useState('')

  // 获取交易Tab下的form表单实例
  const tradeForm = tabList?.find((item) => item?.key === 'Trade')?.ref?.current as FormInstance
  // 交易Tab下的表单值 计算类型：FOREIGN_CURRENCY外汇 CFD差价合约
  const calculationType = Form.useWatch('calculationType', tradeForm)
  const isForex = calculationType === 'FOREIGN_CURRENCY' // 外汇

  useEffect(() => {
    // 初始化时展开树节点
    setTreeExpandedKeys([initialValues?.symbolGroupId])
  }, [initialValues])

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
        <div className="text-base font-semibold pb-7">
          <FormattedMessage id="mt.symbol.changgui.biaoti" />
        </div>
        <div className="w-full grid grid-cols-2 xxl:gap-x-[76px] max-xxl:gap-x-[20px] gap-y-5">
          <ProFormText
            autoFocus
            required
            name="symbol"
            label={intl.formatMessage({ id: 'mt.symbol' })}
            rules={[
              {
                required: true,
                len: isForex ? 6 : 20,
                validator(rule, value, callback) {
                  if (!value) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.shurujiaoyipinzhong' }))
                  } else if (value && /\s/.test(value)) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.konggebuyunxunshuru' }))
                  } else if (value && !/^[0-9A-Z]+$/gi.test(value)) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.jiaoyipinzhongyanzheng' }))
                  } else if (isForex && String(value).length !== 6) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.shuruliuweidepinzhongpingcheng' }))
                  }
                  return Promise.resolve()
                }
              }
            ]}
          />
          <ProFormText required maxLength={60} name="alias" label={intl.formatMessage({ id: 'mt.pingzhongbieming' })} />
          <SymbolFormTreeSelect
            label={intl.formatMessage({ id: 'mt.suoshuzubie' })}
            fieldProps={{
              size: 'large',
              treeCheckable: false,
              multiple: false,
              treeLine: true,
              // treeDefaultExpandAll: true, // 默认展开全部
              // 展开当前选中的key
              // @ts-ignore
              treeExpandedKeys: treeExpandedKeys,
              onTreeExpand: (expandedKeys: React.Key[]) => setTreeExpandedKeys(expandedKeys)
            }}
            name="symbolGroupId"
            hiddenChildren
            rules={[
              {
                message: intl.formatMessage({ id: 'mt.xuanzesuoshuzubie' }),
                required: true
              }
            ]}
          />
          <ProFormText required maxLength={60} name="remark" label={intl.formatMessage({ id: 'mt.shuoming' })} />

          <Form.Item name="subSymbol" label={intl.formatMessage({ id: 'mt.dingyuepinzhong' })}>
            <AutoCompleteTree
              multiple={false}
              onChange={setInputValue}
              value={inputValue}
              hideSearch
              name={'subSymbol'}
              form={form}
              treeData={treeData}
            />
          </Form.Item>

          <MarketDepthFormItem form={form} />
          <ProFormSelect
            name="symbolDecimal"
            required
            label={intl.formatMessage({ id: 'mt.xiaoshuwei' })}
            options={Array.from({ length: 9 }, (k, v) => ({ label: String(v), value: String(v) }))}
          />
          <SpreadFormItem form={form} />
          <ProFormSelect
            name="status"
            required
            label={intl.formatMessage({ id: 'common.status' })}
            options={getEnum().enumToOptions('Status')}
          />
          <ProFormSelect
            name="classify"
            required
            label={intl.formatMessage({ id: 'mt.pinzhongfenlei' })}
            request={async () => {
              const data = await getSymbolCategory()
              return data?.data || []
            }}
            placeholder={intl.formatMessage({ id: 'mt.xuanzepinzhongfenlei' })}
          />
        </div>
      </div>
    </Form>
  )
})
