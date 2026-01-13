import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import classNames from 'classnames'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import SymbolFormTreeSelect from '@/components/Admin/Form/SymbolFormTreeSelect'
import Modal from '@/components/Admin/ModalForm'
import StandardTable from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'

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

  const [dataSource, setDataSource] = useState<any[]>([])

  useImperativeHandle(ref, () => {
    return form
  })

  // useEffect(() => {
  //   form?.setFieldValue('symbolTableList', dataSource)
  //   console.log('dataSource', dataSource)
  // }, [dataSource])

  // 编辑弹窗保存
  const onModalFinish = (values: any) => {
    console.log('onModalFinish', values)
    setDataSource((dataSource) =>
      dataSource.map((item) => {
        if (item.id === values.id) {
          return {
            ...item,
            modalFormData: values
          }
        }
        return item
      })
    )
  }

  // 编辑弹窗取消
  const onModalCancel = () => {
    console.log('onModalCancel')
  }

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

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
          <StandardTable
            columns={getColumns(setDataSource)}
            onDelete={(record: any) => {
              setDataSource((dataSource: any) => dataSource.filter((item: any) => item?.id !== record?.id))
            }}
            renderEditBtn={(record: any) => {
              const isDefault = !record.config || record.config === '1' // 默认，编辑按钮禁用
              return (
                <ModalForm
                  trigger={
                    <a className={classNames('text-sm font-medium', isDefault ? '!text-gray-400 pointer-events-none' : '!text-gray')}>
                      <FormattedMessage id="common.bianji" />
                    </a>
                  }
                  info={record}
                  onFinish={onModalFinish}
                  onCancel={onModalCancel}
                  form={form}
                />
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

                    // 选择交易品种后，默认生成一行数据
                    setDataSource([
                      ...dataSource,
                      {
                        id: String(Date.now()),
                        symbol: values.symbol
                      }
                    ])

                    return true
                  }}
                  trigger={<AddButton />}
                >
                  <SymbolFormTreeSelect
                    name="symbol"
                    label={intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' }) }]}
                    placeholder={intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' })}
                    fieldProps={{ treeCheckable: false, multiple: false }}
                  />
                </Modal>
              </div>
            )}
            // ghost
            // action={{
            //   query: (params) =>
            //     request<{
            //       data: any[]
            //     }>('https://proapi.azurewebsites.net/github/issues', {
            //       params
            //     })
            // }}
            dataSource={dataSource}
          />
        </Form.Item>
      </Form>
    </>
  )
})
