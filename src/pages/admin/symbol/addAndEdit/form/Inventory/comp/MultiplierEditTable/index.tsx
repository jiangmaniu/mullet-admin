import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { getIntl, useIntl } from '@umijs/max'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'
import React, { useEffect, useRef, useState } from 'react'

import EditableTable, { EditableTableRef } from '@/components/Admin/StandardTable/EditableTable'
import { transferWeekDay } from '@/constants/enum'
import { getUid, isTruthy } from '@/utils'
import { message } from '@/utils/message'

import PresetsButton from '../PresetsButton'
import { getColumns } from './tableConfig'

export type ISymbolFormLayout = 'UPDATE_ACCOUNT_GROUP_SYMBOL' | 'CREATE_SYMBOL'

type IProps = {
  form: FormInstance
  name?: NamePath
  showCustomBordered?: boolean
  initialValues?: any
  /**库存费乘数表格类型布局：修改账户组品种布局、品种创建布局 */
  layout: ISymbolFormLayout
}

export default ({ form, layout, name = ['holdingCostConf', 'multiplier'], showCustomBordered = true, initialValues = {} }: IProps) => {
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly any[]>([])
  const [presetsButtonType, setPresetsButtonType] = useState('') // 预设按钮类型
  const isAdd = !initialValues?.id
  const isForex = presetsButtonType === 'FOREIGN' // 是否是外汇
  const multiplier = initialValues?.holdingCostConf?.multiplier
  const editableTableRef = useRef<EditableTableRef>(null)

  console.log('MultiplierEditTable initialValues', initialValues)

  const intl = useIntl()

  // 交易页面选择外汇类型默认启动外汇展示周三乘数为3，周六日为0，其他默认是1
  // 整个星期：交易页面选择差价合约类型默认启用整个星期展示周一至周天乘数为1
  useEffect(() => {
    // 处理默认值
    // 新增、详情数据不存在、选择了预设值 覆盖表格的
    if (isAdd || presetsButtonType || !multiplier?.length) {
      const defaultData = [
        { weekDay: 'MONDAY', num: 1 },
        { weekDay: 'TUESDAY', num: 1 },
        { weekDay: 'WEDNESDAY', num: isForex ? 3 : 1 },
        { weekDay: 'THURSDAY', num: 1 },
        { weekDay: 'FRIDAY', num: 1 },
        { weekDay: 'SATURDAY', num: isForex ? 0 : 1 },
        { weekDay: 'SUNDAY', num: isForex ? 0 : 1 }
      ].map((item: any, idx) => ({ ...item, id: getUid(), weekDayName: transferWeekDay(item.weekDay) }))

      // 创建的时候默认的初始值
      setTimeout(() => {
        form.setFieldValue(name, defaultData)
      }, 100)

      setTimeout(() => {
        // 关闭表格的编辑状态
        editableTableRef.current?.cancelEditable?.()
      }, 200)
    }
  }, [presetsButtonType, multiplier])

  useEffect(() => {
    if (multiplier?.length) {
      setTimeout(() => {
        form.setFieldValue(name, multiplier)
      }, 500)
    }
  }, [multiplier])

  // 预设按钮组
  const PresetButtonDom = (
    <PresetsButton
      onChange={(value) => {
        setPresetsButtonType(value)
      }}
    />
  )

  return (
    <>
      <EditableTable
        // 获取table数据 const rows = editorFormRef.current?.getRowsData?.();
        bordered
        showCustomBordered={showCustomBordered}
        // table 所有的 form，带了一些表格特有的操作
        editableFormRef={editorFormRef}
        name={name}
        hiddenDeleteBtn
        borderColor="light"
        cardProps={{ style: { borderLeftWidth: 0 } }}
        columns={getColumns()}
        hiddenAddBtn
        form={form}
        ref={editableTableRef}
        tableExtraRender={() => {
          if (layout === 'UPDATE_ACCOUNT_GROUP_SYMBOL') {
            return <div className="text-base text-primary font-semibold">{intl.formatMessage({ id: 'mt.kucunfeichengshu' })}</div>
          }
          return <div className="px-4">{PresetButtonDom}</div>
        }}
        checkRowSaveBefore={(record) => {
          if (!isTruthy(record.num)) {
            message.info(getIntl().formatMessage({ id: 'mt.qingwanshanbiaodanxiang' }))
            return true
          }
          return false
        }}
      />
      {layout === 'UPDATE_ACCOUNT_GROUP_SYMBOL' && <div className="pt-4">{PresetButtonDom}</div>}
    </>
  )
}
