import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { getIntl, useIntl } from '@umijs/max'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'
import React, { useRef, useState } from 'react'

import EditableTable from '@/components/Admin/StandardTable/EditableTable'
import { getEnum } from '@/constants/enum'
import { isTruthy } from '@/utils'
import { message } from '@/utils/message'

import ProFormSelect from '../ProFormSelect'
import { getColumns } from './tableConfig'

type IProps = {
  title?: React.ReactNode
  form: FormInstance
  name: NamePath
}

export default ({ title, form, name }: IProps) => {
  const intl = useIntl()
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly any[]>([])

  return (
    <>
      <ProFormSelect
        name={['transactionFeeConf', 'type']}
        // required
        initialValue="trade_hand"
        label={intl.formatMessage({ id: 'mt.fanwei' })}
        options={getEnum().enumToOptions('FeeRange')}
        fieldProps={{ allowClear: false, size: 'middle', style: { width: 200 } }}
      />
      <EditableTable
        // 获取table数据 const rows = editorFormRef.current?.getRowsData?.();
        bordered={false}
        // table 所有的 form，带了一些表格特有的操作
        editableFormRef={editorFormRef}
        name={name}
        deleteNeedConfirm
        optionColumnAlign="right"
        columns={getColumns()}
        // hiddenAddBtn
        form={form}
        scroll={{ y: 400 }}
        tableExtraRender={() => title}
        checkRowSaveBefore={(record) => {
          console.log('record', record)
          if (
            !isTruthy(record.from) ||
            !record.to ||
            !record.compute_mode ||
            !isTruthy(record.market_fee) ||
            !isTruthy(record.limit_fee) ||
            !isTruthy(record?.maxMinMap?.min_value) ||
            !record?.maxMinMap?.max_value
          ) {
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
    </>
  )
}
