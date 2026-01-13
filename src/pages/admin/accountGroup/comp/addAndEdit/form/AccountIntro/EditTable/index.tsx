import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { getIntl, useIntl } from '@umijs/max'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'
import React, { useRef, useState } from 'react'

import EditableTable from '@/components/Admin/StandardTable/EditableTable'
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
      deleteNeedConfirm={false}
      // hiddenAddBtn
      form={form}
      scroll={{ y: 400 }}
      maxLength={3}
      tableExtraRender={() => title}
      checkRowSaveBefore={(record) => {
        if (!record.title) {
          message.info(getIntl().formatMessage({ id: 'mt.qingshurubiaoti' }))
          return true
        }
        if (!record.content) {
          message.info(getIntl().formatMessage({ id: 'mt.qingshuneirong' }))
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
  )
}
