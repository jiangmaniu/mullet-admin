import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { FormInstance } from 'antd/lib'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { DragHandle } from '@/components/Admin/StandardTable/BaseDragSortTable/useDragSort'
import EdiDragSortTable, { EditDragSortTableRef } from '@/components/Admin/StandardTable/EditDragSortTable'
import { accountGroupList } from '@/services/api/agent/settings'
import { message } from '@/utils/message'

import { getColumns } from './tableConfig'

type IProps = {
  title?: React.ReactNode
  form: FormInstance
  name: string
  getEditableKeys?: (keys: any[]) => void
}

export default forwardRef(({ title, form, name, getEditableKeys }: IProps, ref: React.Ref<EditDragSortTableRef>) => {
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly any[]>([])
  const tableRef = useRef<EditDragSortTableRef>(null)
  const intl = useIntl()

  const { data: accountGroupRes } = useRequest(accountGroupList)

  const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    console.log('排序后的数据', newDataSource)
    // setDataSource(newDataSource);
    // message.info('修改列表排序成功')

    form.setFieldValue(
      name,
      newDataSource.map((item: any, idx: number) => ({ ...item, sortIndex: idx + 1 }))
    )
  }

  useImperativeHandle(ref, () => {
    return tableRef?.current as EditDragSortTableRef
  })

  return (
    <>
      <EdiDragSortTable
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
        useFormMode
        checkRowSaveBefore={(record) => {
          if (!record.accountGroupId) {
            message.info(intl.formatMessage({ id: 'mt.agent.zhanghuzubunengweikong' }))
            return true
          }
          if (!record.symbol) {
            message.info(intl.formatMessage({ id: 'mt.agent.jiaoyipinzhongbunengweikong' }))
            return true
          }
          if (!record.rebateType) {
            message.info(intl.formatMessage({ id: 'mt.agent.leixingbunengweikong' }))
            return true
          }
          if (!record.statisticPeriod) {
            message.info(intl.formatMessage({ id: 'mt.agent.fanyongpinlvbunengweikong' }))
            return true
          }
          if (!record.rebateValue) {
            message.info(intl.formatMessage({ id: 'mt.agent.zhibunengweikong' }))
            return true
          }
          return false
        }}
        // request={async () => {
        //   return {
        //     data: defaultData
        //   }
        // }}
        pageSize={100}
        onDragSortEnd={handleDragSortEnd}
        ref={tableRef}
        getEditableKeys={getEditableKeys}
        opColumnWidth={170}
        getOpColumnItems={(record, action) => {
          return (
            <>
              <DragHandle />
            </>
          )
        }}
        optionColumnStyle={{ gap: 12 }}
      />
    </>
  )
})
