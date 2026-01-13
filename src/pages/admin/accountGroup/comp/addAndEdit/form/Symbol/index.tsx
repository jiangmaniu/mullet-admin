import { FormattedMessage, useIntl, useParams } from '@umijs/max'
import { Form } from 'antd'
import classNames from 'classnames'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { deleteAccountGroupSymbol, getAccountGroupSymbolList, saveAccountGroupSymbol } from '@/services/api/tradeCore/accountGroup'

import ModalForm from './comp/ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

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
  const [currentRow, setCurrentRow] = useState<Partial<AccountGroup.AccountGroupSymbolPageListItem>>({})
  const [open, setOpen] = useState(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const instanceRef = useRef<Instance>()

  const params = useParams()
  const accountGroupId = params.id // 账户组id

  useImperativeHandle(ref, () => {
    return form
  })

  useEffect(() => {
    form?.setFieldValue('symbolTableList', dataSource)
    console.log('dataSource', dataSource)
  }, [dataSource])

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  // 刷新列表
  const reload = () => {
    instanceRef.current?.action?.reload()
  }

  return (
    <>
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
        <Form.Item name="symbolTableList" noStyle>
          <StandardTable<AccountGroup.AccountGroupSymbolPageListItem, AccountGroup.AccountGroupSymbolPageListParam>
            columns={getColumns({ setOpen, setCurrentRow })}
            renderEditBtn={(record) => {
              const isDefault = record.isDefault // 默认，编辑按钮禁用
              return (
                <a
                  className={classNames('text-sm font-medium', isDefault ? '!text-gray-400 pointer-events-none' : '!text-gray')}
                  onClick={() => {
                    setCurrentRow(record)
                    setOpen(true)
                  }}
                >
                  <FormattedMessage id="common.bianji" />
                </a>
              )
            }}
            showOptionColumn
            hideSearch
            pageSize={999}
            stripe={false}
            hasTableBordered
            bodyStyle={{ paddingInline: 0, paddingTop: 0, paddingBottom: 50 }}
            tableExtraRender={() => (
              <div className="flex gap-3">
                <Modal
                  width={500}
                  title={<FormattedMessage id="mt.xuanzepinzhong" />}
                  onFinish={async (values: any) => {
                    console.log('values', values)

                    // 保存交易品种
                    const res = await saveAccountGroupSymbol({
                      accountGroupId,
                      isDefault: true,
                      symbols: values.symbol,
                      status: 'ENABLE'
                    })
                    const success = res.success

                    if (success) {
                      // 刷新列表
                      reload()
                    }

                    return res.success
                  }}
                  trigger={<AddButton />}
                >
                  {/* <SymbolFormTreeSelect
                    name="symbol"
                    label={intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' }) }]}
                    placeholder={intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' })}
                    fieldProps={{ treeCheckable: false, multiple: false }}
                  /> */}
                  <ProFormText required name="symbol" label={intl.formatMessage({ id: 'mt.symbol' })} />
                </Modal>
              </div>
            )}
            // ghost
            action={{
              query: (params) =>
                getAccountGroupSymbolList({
                  ...params,
                  accountGroupId
                }),
              del: (params) => deleteAccountGroupSymbol({ id: params.id })
            }}
            getInstance={(instance) => (instanceRef.current = instance)}
          />
        </Form.Item>
      </Form>
      {/* 编辑配置弹窗 */}
      <ModalForm
        info={currentRow}
        reload={reload}
        onClose={() => {
          // 重置
          setCurrentRow({})
          setOpen(false)
        }}
        open={open}
      />
    </>
  )
})
