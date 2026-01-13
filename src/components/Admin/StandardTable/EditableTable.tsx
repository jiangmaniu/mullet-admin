import {
  ActionType,
  EditableFormInstance,
  EditableProTable,
  EditableProTableProps,
  ParamsType,
  ProColumns,
  ProFormInstance,
  RowEditableConfig
} from '@ant-design/pro-components'
import { RecordCreatorProps } from '@ant-design/pro-table/es/components/EditableTable'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl } from '@umijs/max'
import { ButtonProps, Popconfirm, TablePaginationConfig } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'
import { cloneDeep } from 'lodash'
import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import Empty from '@/components/Base/Empty'
import Iconfont from '@/components/Base/Iconfont'
import { isTruthy } from '@/utils'
import { cn } from '@/utils/cn'

// @ts-ignore
interface IProps<T, U> extends EditableProTableProps<T, U> {
  /**@name 表格 */
  columns?: ProColumns<T>[]
  editable?: RowEditableConfig<T>
  /** @name 新建按钮的设置 */
  recordCreatorProps?:
    | (RecordCreatorProps<any> &
        ButtonProps & {
          creatorButtonText?: React.ReactNode
        })
    | false
  /**@name 默认分页数量 */
  pageSize?: number
  /**@name 分页配置 */
  pagination?: false | TablePaginationConfig
  /**是否显示操作列 */
  showOptionColumn?: boolean
  opColumnWidth?: number
  /**操作栏items */
  getOpColumnItems?: (record: T, actionRef: ActionType, formRef?: FormInstance) => ReactNode
  form?: FormInstance
  /**隐藏复制按钮 */
  hiddenCopyBtn?: boolean
  /**隐藏新增按钮 */
  hiddenAddBtn?: boolean
  /**隐藏表头背景颜色 */
  hiddenHeaderBg?: boolean
  /**自定义表格边框，带有圆角 */
  showCustomBordered?: boolean
  /**操作栏对齐方式 */
  optionColumnAlign?: 'left' | 'right' | 'center'
  onRowSave?: (key: any, row: any) => void
  onRowCancel?: (key: any, row: any) => void
  onRowDelete?: (key: any, row: any) => void
  /**初始值 */
  initialValue?: any[]
  /**表单的name */
  name?: NamePath
  /**表格边框颜色 */
  borderColor?: 'light' | 'weak'
  /**隐藏操作栏删除按钮 */
  hiddenDeleteBtn?: boolean
  /**删除需要二次确认 */
  deleteNeedConfirm?: boolean
  /**行保存之前校验字段是否必填，提示用户，返回false校验通过 */
  checkRowSaveBefore?: (record: T) => boolean
  /** 获取正在编辑的key */
  getEditableKeys?: (editableKeys: any[]) => void
  /**删除使用图标，不展示文字 */
  showDeleteIcon?: boolean
  /**操作栏样式*/
  optionColumnStyle?: React.CSSProperties
}

export type EditableTableRef = {
  /**取消编辑 */
  cancelEditable?: () => void
  /**该属性是 ProForm 在原有的 Antd 的 FormInstance 的基础上做的一个上层分装，增加了一些更加便捷的方法
   * 获取被 ProForm 格式化后的所有数据
   *  getFieldsFormatValue?: (nameList?: true) => T;
   *  获取格式化之后的单个数据
   *  getFieldFormatValue?: (nameList?: NamePath) => T;
   *  获取格式化之后的单个数据
   *  getFieldFormatValueObject?: (nameList?: NamePath) => T;
   *  验字段后返回格式化之后的所有数据
   *  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
   * https://procomponents.ant.design/components/form#proform-demo-formref-1
   */
  formRef?: ProFormInstance
  action?: ActionType
}

const EditableTable = <T extends Record<string, any>, U extends ParamsType>(
  {
    columns = [],
    editable,
    recordCreatorProps,
    showOptionColumn = true,
    opColumnWidth,
    hiddenCopyBtn = true,
    hiddenAddBtn = false,
    form,
    name,
    hiddenHeaderBg = true,
    showCustomBordered = true,
    optionColumnAlign,
    onRowSave,
    onRowCancel,
    onRowDelete,
    initialValue,
    borderColor = 'light',
    hiddenDeleteBtn,
    deleteNeedConfirm = true,
    checkRowSaveBefore,
    getOpColumnItems,
    pagination,
    pageSize = 12,
    getEditableKeys,
    showDeleteIcon = true,
    optionColumnStyle,
    ...res
  }: IProps<T, U>,
  ref: React.Ref<EditableTableRef>
) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly T[]>([])
  const editorFormRef = useRef<EditableFormInstance<T>>()
  const [currentRow, setCurrentRow] = useState<any>(undefined) // 点击编辑保存当前行数据
  const formRef = useRef<ProFormInstance>()
  const intl = useIntl()
  const [tableColumns, setTableColumns] = useState<ProColumns<T>[]>([])

  useEffect(() => {
    if (initialValue?.length) {
      setDataSource(initialValue)
    }
  }, [initialValue])

  const handleDeleteConfirm = (record: T) => {
    const tableDataSource = form?.getFieldValue(name) || []
    // 注意：这个需要通过外部的form来接管状态
    form?.setFieldValue(
      name,
      tableDataSource.filter((item: any) => item?.id !== record?.id)
    )
  }

  // 显示操作项
  if (showOptionColumn && !columns.some((v) => v.key === 'option')) {
    columns.push({
      title: <FormattedMessage id="common.op" />,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      width: opColumnWidth || 160,
      align: optionColumnAlign || 'center',
      hideInForm: true,
      hideInSearch: true,
      render: (text, record, _, action) => [
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: optionColumnAlign || 'center',
            width: '100%',
            alignItems: 'center',
            ...optionColumnStyle
          }}
          key="action"
        >
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record?.id)
              setCurrentRow(record)
            }}
            className="!text-primary flex items-center"
          >
            <Iconfont name="bianji" className="!size-5" />
            {intl.formatMessage({ id: 'common.bianji' })}
          </a>
          {getOpColumnItems?.(record, actionRef.current as ActionType, formRef.current as FormInstance)}
          {!hiddenDeleteBtn && (
            <>
              {deleteNeedConfirm && (
                <Popconfirm
                  title={intl.formatMessage({ id: 'common.confirmDelete' })}
                  onConfirm={() => {
                    handleDeleteConfirm(record)
                    onRowDelete?.('', record)
                  }}
                  key="delete"
                >
                  {
                    <a key="delete" className="!text-primary">
                      {showDeleteIcon ? <Iconfont name="shanchu" /> : intl.formatMessage({ id: 'common.delete' })}
                    </a>
                  }
                </Popconfirm>
              )}
              {!deleteNeedConfirm && (
                <a
                  key="delete"
                  className="!text-primary"
                  onClick={() => {
                    handleDeleteConfirm(record)
                    onRowDelete?.('', record)
                  }}
                >
                  {showDeleteIcon ? (
                    <a>
                      <Iconfont name="shanchu" />
                    </a>
                  ) : (
                    intl.formatMessage({ id: 'common.delete' })
                  )}
                </a>
              )}
            </>
          )}
          {!hiddenCopyBtn && (
            <EditableProTable.RecordCreator
              record={{
                ...record,
                id: (Math.random() * 1000000).toFixed(0)
              }}
            >
              <a className="!text-gray">{intl.formatMessage({ id: 'common.copy' })}</a>
            </EditableProTable.RecordCreator>
          )}
        </div>
      ]
    })
  }

  columns.forEach((v) => {
    v.className = '!px-5' // 统一修改单元格间距
  })

  const tableClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-table-thead >tr>th': {
        background: hiddenHeaderBg ? '#fff !important' : ''
      },
      // 去掉表格边框线，重新定义新的
      '.ant-table-container': {
        borderLeft: 'none !important',
        borderTop: 'none !important',
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important'
      },
      '.ant-table-thead > tr > th:before': {
        display: 'none !important'
      }
    }
  })

  const borderColorName = {
    weak: '#D9DDE3',
    light: '#f0f0f0'
  }[borderColor]

  // 定义表格边框线，因没有圆角
  const tableBorderClassName = useEmotionCss(({ token }) => {
    return {
      // 把表格最后一行的底部线条删除
      '.ant-table-tbody > .ant-table-row:last-child > td': {
        borderBottom: 'none !important',
        borderColor: '#f0f0f0 !important'
      },
      '.ant-table-tbody > .ant-table-row > td:last-child': {
        borderRight: 'none !important'
      },
      '.ant-table-thead > tr > th:last-child': {
        borderRight: 'none !important'
      },
      '.ant-table': {
        border: `1px solid ${borderColorName} !important`,
        borderRadius: '10px !important',
        overflow: 'hidden'
      }
    }
  })

  const actionRef = useRef<ActionType>()

  const cancelEditable = () => {
    // 取消单行的编辑
    const recordKey = editableKeys[0]
    if (isTruthy(recordKey)) {
      actionRef.current?.cancelEditable(recordKey)
    }
    // 重置当前编辑的key
    setEditableRowKeys([])
  }

  // 对外暴露属性
  useImperativeHandle(ref, () => {
    return {
      cancelEditable,
      formRef: formRef.current,
      action: actionRef.current as ActionType
    }
  })

  useEffect(() => {
    getEditableKeys?.(editableKeys)
  }, [editableKeys])

  const renderTable = useMemo(() => {
    return (
      <EditableProTable<T, U>
        // 注意：id必须为字符串，否则编辑不成功
        rowKey={(record) => {
          // id不能使用数字，可以使用字符串，否则编辑报错
          return String(record?.id)
        }}
        // name="table"
        name={name}
        formRef={formRef}
        actionRef={actionRef}
        className={cn(tableClassName, { [tableBorderClassName]: showCustomBordered })}
        // scroll={{
        //   x: 960,
        // }}
        // value	同 dataSource，传入一个数组，是 table 渲染的元数据
        // value: [],
        // onChange	dataSource 修改时触发，删除和修改都会触发，如果设置了 value，Table 会成为一个受控组件。
        // value={dataSource}
        // onChange={setDataSource}
        bordered
        // table 所有的 form，带了一些表格特有的操作
        editableFormRef={editorFormRef}
        pagination={
          pagination === false
            ? false
            : {
                showSizeChanger: false,
                defaultPageSize: pageSize,
                hideOnSinglePage: true, // 在没有数据或只有一页数据时隐藏分页栏
                size: 'default',
                ...pagination
              }
        }
        // headerTitle="可编辑表格"
        // 最大的行数，到达最大行数新建按钮会自动消失
        // maxLength={5}
        // 保存后通知 Form
        // 是否受控，如果受控每次编辑都会触发 onChange，并且会修改 dataSource
        // 如果为 true，每次 value 更新都会重置表单
        controlled={false}
        // recordCreatorProps={false}就可以关掉按钮
        // 同时使用 actionRef.current?.addEditRecord(row) 来控制新建行
        // actionRef={actionRef.current?.cancelEditable()}
        // @ts-ignore
        recordCreatorProps={
          hiddenAddBtn
            ? false
            : {
                // 顶部添加还是末尾添加
                position: 'bottom',
                // record 可以配置新增行的默认数据
                // 不写 key ，会使用 index 当行 id
                record: () => ({ id: `row_${(Math.random() * 1000000).toFixed(0)}` }),
                // 设置按钮文案
                creatorButtonText: intl.formatMessage({ id: 'mt.xinzengyihang' }),
                ...recordCreatorProps
                // 按钮的样式设置，可以设置按钮是否显示
                // 这样可以做最大行限制和最小行限制之类的功能
                // style: {
                //   display: 'none',
                // },
                // https://ant.design/components/button-cn/#API
                // ...antButtonProps,
              }
        }
        columns={columns}
        editable={{
          form,
          // 可编辑表格的类型，单行编辑或者多行编辑 single | multiple
          type: 'single',
          // 正在编辑的行，受控属性。 默认 key 会使用 rowKey 的配置，如果没有配置会使用 index，建议使用 rowKey
          editableKeys,
          formProps: {}, // 可以配置 form 的属性，但是不支持 onFinish
          // form, // form实例
          // 行数据被修改的时候触发
          onChange: setEditableRowKeys,
          // 自定义编辑模式的操作栏 defaultDom = {save,cancel,delete}
          actionRender: (row, config, defaultDom) => {
            console.log('row', row)
            return [
              <div
                key="action"
                className="flex gap-3 w-full"
                style={{
                  justifyContent: optionColumnAlign || 'center'
                }}
              >
                {/* {defaultDom.save} */}
                <a
                  onClick={() => {
                    // 行保存之前校验字段是否必填，提示用户
                    // 为了解决传name嵌套数组，通过formItemProps设置必填字段没有生效问题
                    if (checkRowSaveBefore?.(row)) {
                      return
                    }
                    // @ts-ignore
                    config?.onSave?.(row.id, row)
                  }}
                  className="flex items-center !text-primary"
                >
                  <Iconfont name="baocun" className="!size-5" />
                  <FormattedMessage id="common.save" />
                </a>
                {/* <a
              onClick={() => {
                // 自定义校验值
                // if (!row.from) {
                //   return alert('from不能为空')
                // }
                // config.onSave(row.id, row)
              }}
            >
              保存1
            </a> */}
                {/* {defaultDom.cancel} */}
                {/* @TODO 使用默认的取消导致崩溃 rowKey导致的? */}
                {/* {defaultDom.cancel} */}
                <a
                  onClick={() => {
                    if (name) {
                      const tableData: any = cloneDeep(form?.getFieldValue(name))
                      const idx: number = tableData?.findIndex?.((item: any) => item?.id === row?.id)
                      console.log('idx', idx)
                      if (idx !== -1 && tableData) {
                        // 取消编辑
                        cancelEditable()
                        // 新建行取消，直接删除新建的行
                        if (!currentRow) {
                          handleDeleteConfirm(row)
                          return
                        }
                        // 回显上次值
                        tableData[idx] = currentRow
                        form?.setFieldValue(name, tableData)
                        // 重置当前行数据
                        setCurrentRow(undefined)
                      }
                    }
                  }}
                  className="flex items-center !text-primary"
                >
                  <Iconfont name="quxiao" className="!size-5" />
                  {intl.formatMessage({ id: 'common.cancel' })}
                </a>
              </div>
            ]
          },
          // 保存一行的时候触发
          onSave: async (key, row) => {
            console.log('onSave', key, row)
            onRowSave?.(key, row)
          },
          saveText: intl.formatMessage({ id: 'common.save' }), // 保存一行的文字
          // 删除一行的时候触发
          onDelete: async (key, row) => {
            console.log('onDelete', key, row)

            onRowDelete?.(key, row)
          },
          deleteText: intl.formatMessage({ id: 'common.delete' }), // 删除一行的文字
          // 取消编辑一行时触发
          onCancel: async (key, row, originRow) => {
            // 这里如果表单name传['user','age']多个形式row返回undefined
            const rowData = {
              id: key,
              ...(row || {})
            }
            console.log('onCancel', key, rowData)
            onRowCancel?.(key, rowData)

            // 修复取消编辑没有回显上次的值
            if (name) {
              const tableData: any = cloneDeep(form?.getFieldValue(name))
              const idx: number = tableData?.findIndex?.((item: any) => item?.id === rowData?.id)

              if (idx !== -1 && tableData) {
                // 新建行取消，直接删除新建的行
                if (!currentRow) {
                  handleDeleteConfirm(rowData)
                  return
                }
                // 回显上次值
                tableData[idx] = currentRow
                form?.setFieldValue(name, tableData)
                // 重置当前行数据
                setCurrentRow(undefined)
              }
            }
          },
          cancelText: intl.formatMessage({ id: 'common.cancel' }), // 取消编辑一行的文字
          deletePopconfirmMessage: intl.formatMessage({ id: 'mt.shanchucixiang' }), // 删除时弹出的确认框提示消息
          onlyOneLineEditorAlertMessage: intl.formatMessage({ id: 'mt.zhinengtongshibiaojiyihang' }), // 只能编辑一行的的提示
          onlyAddOneLineAlertMessage: intl.formatMessage({ id: 'mt.zhinengxinzengyihang' }), // 只能同时新增一行的提示
          onValuesChange: (record, recordList) => {
            console.log('onValuesChange', recordList)
          },
          ...editable
        }}
        locale={{ emptyText: <Empty /> }}
        {...res}
      />
    )
  }, [editableKeys])

  // 获取table数据 const rows = editorFormRef.current?.getRowsData?.();
  return <>{renderTable}</>
}

export default forwardRef(EditableTable)
