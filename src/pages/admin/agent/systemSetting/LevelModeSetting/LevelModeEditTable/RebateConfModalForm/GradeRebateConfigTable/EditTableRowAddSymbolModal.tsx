import { FormattedMessage, useIntl } from '@umijs/max'
import { usePrevious, useRequest } from 'ahooks'
import { Form, Spin } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import AutoCompleteTree from '@/components/Admin/AutoCompleteTree'
import Modal from '@/components/Admin/ModalForm'
import { tradeSymbolsTree } from '@/services/api/agent/settings'

type IProps = {
  trigger?: JSX.Element
  // 可编辑表格自动注入的属性
  value?: any
  // 可编辑表格自动注入的属性，用于触发onChange事件修改value值回填到表格的row中
  onChange?: (value: any) => void
  info?: any
  onClose?: () => void
}

function formatTreeData(treeData: any, parentId = '0', isRootLevel = true): any[] {
  return treeData.map((item: any) => {
    const isSymbolLeaf = !item?.children && item?.symbolList && item?.symbolList?.length > 0
    const isLeafFolder = !isSymbolLeaf && Array.isArray(item?.children) && item.children.length === 0

    // 创建基础节点结构
    const newNode: any = {
      id: item?.id,
      parentId: item?.parentId || parentId,
      title: item?.groupName || item?.symbol || item?.id,
      key: item?.id,
      value: item?.id,
      disabled: false, // 默认不禁用
      isSymbol: false
    }

    // 处理子节点或symbolList
    if (item?.children && item?.children?.length > 0) {
      // 非叶子节点，有children
      newNode.children = formatTreeData(item.children, item.id, false)
      newNode.hasChildren = true
    } else if (isSymbolLeaf) {
      // 由symbolList转换的叶子节点
      newNode.title = item?.symbol || item?.id
      // 不添加children属性
    } else if (item?.symbolList && item?.symbolList?.length > 0) {
      // 将symbolList转换为children
      newNode.children = item.symbolList.map((symbolInfo: any) => ({
        id: symbolInfo?.id,
        parentId: item?.id,
        title: symbolInfo?.symbol || symbolInfo?.id,
        key: symbolInfo?.id,
        value: symbolInfo?.id,
        iconUrl: symbolInfo?.imgUrl,
        disabled: false,
        isSymbol: true
      }))
      newNode.hasChildren = newNode.children.length > 0
    } else {
      // 其他情况（包括空文件夹）
      newNode.children = []
    }

    // 只有非根级别的空文件夹才禁用
    // if (!isRootLevel && isLeafFolder) {
    //   newNode.disabled = true
    // }

    // 移除不需要的原始属性
    ;['symbolList', 'groupName', 'symbol', 'remark'].forEach((prop) => {
      if (newNode[prop] !== undefined) delete newNode[prop]
    })

    return newNode
  })
}

function EditTableRowAddSymbolModal({ trigger, value, onChange, info, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState<any>('')

  const { run, data, loading } = useRequest(tradeSymbolsTree, { manual: true })
  const treeData = useMemo(() => {
    const options = formatTreeData(data?.data || [])
    return [
      {
        id: '*',
        parentId: '0',
        title: intl.formatMessage({ id: 'common.all' }),
        key: '*',
        value: '*',
        disabled: false,
        isSymbol: false,
        hasChildren: false
      },
      ...options
    ]
  }, [data])
  const accountGroupId = info?.accountGroupId
  const prevAccountGroupId = usePrevious(accountGroupId)

  const show = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  const setFormValue = () => {
    const symbol = value === '*' ? intl.formatMessage({ id: 'common.all' }) : value
    // 使用trigger 需要重新调用一次，否则设置值不生效
    form.setFieldValue('symbol', symbol)
    setInputValue(symbol)
  }

  useEffect(() => {
    if (accountGroupId) {
      run({ accountGroupId })
    }
  }, [accountGroupId])

  useEffect(() => {
    // 切换多层级账户组需要清除交易品种信息，不同账户组下的品种不一样
    if (prevAccountGroupId && accountGroupId && prevAccountGroupId !== accountGroupId) {
      setInputValue('')
      onChange?.(undefined)
    }
  }, [prevAccountGroupId, accountGroupId])

  useImperativeHandle(ref, () => {
    return {
      show,
      close,
      setFormValue
    }
  })

  useEffect(() => {
    setInputValue(value)
    form.setFieldsValue(info)
  }, [value, info])

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={<FormattedMessage id="mt.agent.tianjijiaoyipinzhong" />}
      form={form}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values: any) => {
        console.log('values', values)

        // 变更到表格记录中
        onChange?.(values?.symbol)

        close()

        return true // true关闭弹窗
      }}
      onCancel={close}
      afterClose={() => {
        onClose?.()
      }}
      width={700}
    >
      <Spin spinning={loading}>
        <Form.Item
          rules={[
            {
              required: true,
              validator(rule, value, callback) {
                const symbol = form.getFieldValue('symbol') || ''
                if (!symbol) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' }))
                }
                return Promise.resolve()
              }
            }
          ]}
          required
          name="symbol"
          label={<FormattedMessage id="mt.agent.jiaoyipinzhong" />}
        >
          <AutoCompleteTree
            multiple={false}
            onChange={setInputValue}
            value={inputValue}
            name={'symbol'}
            form={form}
            treeData={treeData}
            separator="\"
            selectedFullPath
            treeSelectMode
          />
        </Form.Item>
      </Spin>
    </Modal>
  )
}

export default forwardRef(EditTableRowAddSymbolModal)
