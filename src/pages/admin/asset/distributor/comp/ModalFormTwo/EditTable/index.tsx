import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { FormInstance } from 'antd/lib'
import React, { useRef, useState } from 'react'

import EditableTable from '@/components/Admin/StandardTable/EditableTable'

import { getColumns } from './tableConfig'

type IProps = {
  title?: React.ReactNode
  form: FormInstance
  name: string
}

export default ({ title, form, name }: IProps) => {
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly any[]>([])

  const intl = useIntl()

  // useEffect(() => {
  //   // 模拟数据回显设置表格回显
  //   setTimeout(() => {
  //     // form.setFieldValue('table', [defaultData[0], defaultData[1], ...(form.getFieldValue('table') || [])])
  //     form.setFieldValue(name, [
  //       { from: '192.0.0.1', to: '192.0.0.1', id: '1xxx' },
  //       { from: '192.0.0.2', to: '192.0.0.2', id: '2ddd' }
  //     ])
  //   }, 1000)
  // }, [])

  return (
    <EditableTable
      // 获取table数据 const rows = editorFormRef.current?.getRowsData?.();
      bordered={false}
      showCustomBordered
      hiddenAddBtn
      optionColumnAlign="right"
      // table 所有的 form，带了一些表格特有的操作
      editableFormRef={editorFormRef}
      name={name}
      columns={getColumns()}
      // hiddenAddBtn
      form={form}
      scroll={{ y: 400 }}
      tableExtraRender={() => title}
      // request={async () => {
      //   return {
      //     data: defaultData
      //   }
      // }}
    />
  )
}
