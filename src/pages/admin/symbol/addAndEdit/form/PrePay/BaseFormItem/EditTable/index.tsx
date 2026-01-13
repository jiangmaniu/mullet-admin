import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { getIntl, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'
import React, { useRef, useState } from 'react'

import EditableTable from '@/components/Admin/StandardTable/EditableTable'
import { isTruthy } from '@/utils'
import { message } from '@/utils/message'

import { getColumns } from './tableConfig'

type IProps = {
  title?: React.ReactNode
  form: FormInstance
  name: NamePath
}

export default ({ title, form, name }: IProps) => {
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly any[]>([])

  const intl = useIntl()

  const defaultData = [
    { num: 7, num2: 1 },
    { num: 31, num2: 2 },
    { num: 32, num2: 2, maxMinMap: { min: 100, max: 200 } },
    { num: 3, num2: 2 },
    { num: 3, num2: 2 },
    { num: 3, num2: 2 },
    { num: 3, num2: 2 }
  ].map((item, idx) => ({ ...item, id: String(idx) }))

  // useEffect(() => {
  //   // 模拟数据回显设置表格回显
  //   setTimeout(() => {
  //     // form.setFieldValue('table', [defaultData[0], defaultData[1], ...(form.getFieldValue('table') || [])])
  //     form.setFieldValue(name, defaultData.slice(0, 4))
  //   }, 1000)
  // }, [])

  return (
    <Form.Item
      rules={[
        {
          required: true,
          validator(rule, value, callback) {
            const formData = form.getFieldValue(name)
            let values = []
            if (formData && formData?.length) {
              values = formData.filter(
                (item: any) => item.bag_nominal_value && item?.maxMinMap?.lever_start_value && item?.maxMinMap?.lever_end_value
              )
            }
            if (!values?.length) {
              return Promise.reject(intl.formatMessage({ id: 'mt.qingwanshanxiefudonggangganfengxiankongzhi' }))
            }
            return Promise.resolve()
          }
        }
      ]}
      required
      name="float_leverage_item"
    >
      <EditableTable
        // 获取table数据 const rows = editorFormRef.current?.getRowsData?.();
        bordered={false}
        // table 所有的 form，带了一些表格特有的操作
        editableFormRef={editorFormRef}
        name={name}
        deleteNeedConfirm={false}
        optionColumnAlign="right"
        columns={getColumns()}
        // hiddenAddBtn
        form={form}
        scroll={{ y: 300 }}
        tableExtraRender={() => title}
        checkRowSaveBefore={(record) => {
          if (!record.bag_nominal_value || !isTruthy(record?.maxMinMap?.lever_start_value) || !record?.maxMinMap?.lever_end_value) {
            message.info(getIntl().formatMessage({ id: 'mt.qingwanshanbiaodanxiang' }))
            return true
          }
          return false
        }}
        // request={async () => {
        //   return {
        //     data: defaultData
        //   }
        // }}
      />
    </Form.Item>
  )
}
