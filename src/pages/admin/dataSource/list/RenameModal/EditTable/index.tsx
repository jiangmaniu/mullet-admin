import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { getIntl, useIntl } from '@umijs/max'
import { FormInstance } from 'antd/lib'
import React, { useRef, useState } from 'react'

import EditableTable from '@/components/Admin/StandardTable/EditableTable'
import { message } from '@/utils/message'

import { getColumns } from './tableConfig'

type IProps = {
  title?: React.ReactNode
  form: FormInstance
  name: string
  onRowDelete: (record: DataSource.DataSourceSubAliasListItem & { dataId: any }) => void
  onRowSave: (record: DataSource.DataSourceSubAliasListItem & { dataId: any }) => void
}

export default ({ title, form, name, onRowSave, onRowDelete }: IProps) => {
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly any[]>([])

  const intl = useIntl()

  return (
    <EditableTable
      // 获取table数据 const rows = editorFormRef.current?.getRowsData?.();
      bordered={false}
      showCustomBordered
      optionColumnAlign="right"
      // table 所有的 form，带了一些表格特有的操作
      editableFormRef={editorFormRef}
      name={name}
      columns={getColumns()}
      // hiddenAddBtn
      form={form}
      scroll={{ y: 400 }}
      tableExtraRender={() => title}
      checkRowSaveBefore={(record) => {
        if (!record.alias) {
          message.info(getIntl().formatMessage({ id: 'mt.biemingbunengweikong' }))
          return true
        }
        if (!record.subscribe) {
          message.info(getIntl().formatMessage({ id: 'mt.dingyuepinzhongbunengweikong' }))
          return true
        }
        return false
      }}
      onRowSave={(_, record) => {
        onRowSave?.(record)
      }}
      onRowDelete={(_, record) => {
        onRowDelete?.(record)
      }}
      // request={async () => {
      //   return {
      //     data: defaultData
      //   }
      // }}
    />
  )
}
