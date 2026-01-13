import type { ProColumns } from '@ant-design/pro-components'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'

import EdiDragSortTable from '@/components/Admin/StandardTable/EditDragSortTable'
import { message } from '@/utils/message'

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

type DataSourceType = {
  id: React.Key
  title?: string
  readonly?: string
  decs?: string
  state?: string
  created_at?: number
  update_at?: number
  children?: DataSourceType[]
}

const defaultData: DataSourceType[] = [
  {
    id: '624748504',
    title: '活动名称一',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: 1590486176000,
    update_at: 1590486176000
  },
  {
    id: '624691229',
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: 1590481162000,
    update_at: 1590481162000
  },
  {
    id: '624691221',
    title: '活动名称3',
    readonly: '活动名称3',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: 1590481162000,
    update_at: 1590481162000
  }
]

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(defaultData)
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom')

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 100,
      editable: false,
      align: 'center',
      renderText(text, record, index, action) {
        return ' '
      }
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
        }
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0
      },
      width: '15%'
    },
    {
      title: '活动名称二',
      dataIndex: 'readonly',
      tooltip: '只读，使用form.getFieldValue可以获取到值',
      readonly: true,
      width: '15%'
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error'
        },
        closed: {
          text: '已解决',
          status: 'Success'
        }
      }
    },
    {
      title: '描述',
      dataIndex: 'decs',
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true
          }
        }
        if (rowIndex > 9) {
          return {
            disabled: true
          }
        }
        return {}
      }
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date'
    }
  ]

  const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    console.log('排序后的数据', newDataSource)
    // setDataSource(newDataSource);
    message.info('修改列表排序成功')

    form.setFieldValue('testTable', newDataSource)
  }

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldValue('testTable', defaultData)
    form.setFieldValue('test', defaultData)
  }, [])

  return (
    <>
      <Form form={form}>
        <EdiDragSortTable
          dragSortKey="sort"
          // @ts-ignore
          columns={columns}
          onDragSortEnd={handleDragSortEnd}
          useFormMode
          showOptionColumn
          name="testTable"
          form={form}
        />
        {/* <EdiDragSortTable
          rowKey="id"
          dragSortKey='sort'
          columns={columns}
          onDragSortEnd={handleDragSortEnd}
          form={form}
          name="testTable"
        /> */}
        {/* <EditTable name="test" form={form} /> */}
      </Form>
    </>
  )
}
