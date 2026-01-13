import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib'
import React, { useCallback, useRef, useState } from 'react'

import { DragHandle } from '@/components/Admin/StandardTable/BaseDragSortTable/useDragSort'
import EditDragSortTable from '@/components/Admin/StandardTable/EditDragSortTable'
import { isTruthy } from '@/utils'
import { message } from '@/utils/message'

import { getColumns } from './tableConfig'

type IProps = {
  title?: React.ReactNode
  form: FormInstance
  name: string
  hideOptionColumn?: boolean
  hideAddBtn?: boolean
  hiddenDeleteBtn?: boolean
  hiddenDragBtn?: boolean
  canEditForm?: boolean
}

export default ({
  title,
  form,
  name,
  hideOptionColumn = false,
  canEditForm = true,
  hideAddBtn,
  hiddenDeleteBtn = false,
  hiddenDragBtn = false
}: IProps) => {
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly any[]>([])

  const intl = useIntl()

  const handleDragSortEnd = useCallback((beforeIndex: number, afterIndex: number, newDataSource: any) => {
    console.log('排序后的数据', newDataSource)
    // setDataSource(newDataSource);
    // message.info('修改列表排序成功')

    form.setFieldValue(
      name,
      newDataSource.map((item: any, idx: number) => ({ ...item, sortIndex: idx + 1 }))
    )
  }, [])

  return (
    <>
      <Form.Item
        rules={[
          {
            required: true,
            validateTrigger: 'onSubmit',
            validator(rule, value, callback) {
              console.log('value', value)
              const tableData = form.getFieldValue(name)
              if (editableKeys?.length) {
                return Promise.reject(intl.formatMessage({ id: 'mt.agent.qingxianbaocunbiaogebianjideshuju' }))
              }
              // if (!tableData || !tableData?.length) {
              //   return Promise.reject(intl.formatMessage({ id: 'mt.agent.duocengjimoshishujubunengweikong' }))
              // }
              return Promise.resolve()
            }
          }
        ]}
        required
        name="mul_table_item"
      >
        <EditDragSortTable
          // 获取table数据 const rows = editorFormRef.current?.getRowsData?.();
          bordered={false}
          showCustomBordered
          optionColumnAlign="right"
          // table 所有的 form，带了一些表格特有的操作
          editableFormRef={editorFormRef}
          showOptionColumn={!hideOptionColumn}
          hiddenAddBtn={hideAddBtn}
          hiddenDeleteBtn={hiddenDeleteBtn}
          name={name}
          columns={getColumns({ canEditForm })}
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
            if (!isTruthy(record.rebateValue)) {
              message.info(intl.formatMessage({ id: 'mt.agent.zhibunengweikong' }))
              return true
            }
            // 最大小数点后三位
            if (record.rebateValue && String(record.rebateValue).split('.')[1]?.length > 3) {
              message.info(intl.formatMessage({ id: 'mt.agent.xiaoshudianzuidawei3wei' }))
              return true
            }
            return false
          }}
          // request={async () => {
          //   return {
          //     data: defaultData
          //   }
          // }}
          onDragSortEnd={handleDragSortEnd}
          opColumnWidth={170}
          getOpColumnItems={(record, action) => {
            return <>{!hiddenDragBtn && <DragHandle />}</>
          }}
          getEditableKeys={(keys) => {
            console.log('keys', keys)
            setEditableRowKeys(keys)
          }}
        />
      </Form.Item>
    </>
  )
}
