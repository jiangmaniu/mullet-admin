import {
  ActionType,
  BaseQueryFilterProps,
  DragTableProps,
  ProColumns as ProColumnType,
  ProFormInstance,
  ProFormProps,
  ProTableProps,
  QueryFilterProps
} from '@ant-design/pro-components'
import type { ParamsType } from '@ant-design/pro-provider'
import type { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender'
import type { OptionConfig } from '@ant-design/pro-table/es/components/ToolBar'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl, useLocation, useModel } from '@umijs/max'
import { FormInstance, message, Popconfirm, TablePaginationConfig } from 'antd'
import { type TableProps as RcTableProps } from 'antd/es/table/InternalTable'
import classNames from 'classnames'
import moment from 'moment'
import { forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { IconFontButton } from '@/components/Base/Button'
import DeleteConfirmModal from '@/components/Base/DeleteConfirmModal'
import Empty from '@/components/Base/Empty'
import Iconfont from '@/components/Base/Iconfont'
import SelectSuffixIcon from '@/components/Base/SelectSuffixIcon'
import { useLang } from '@/context/languageProvider'
import useStyle from '@/hooks/useStyle'
import { formatNum, formatTime, isTruthy } from '@/utils'
import { cn } from '@/utils/cn'

import BaseDragSortTable from './BaseDragSortTable'
import Export from './Export'

export type Instance = {
  /**表单实例 */
  form?: ProFormInstance
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
  /**actionType */
  action?: ActionType
}

export type DragSortTableRef = Instance

export interface ProColumns<T> extends ProColumnType<T> {
  /** 20241107：表单排序方法 */
  sortPostData?: (key: any, sort: any) => [string, string]
}

// @ts-ignore
export interface IStandardTableProps<T, U> extends DragTableProps<T, U> {
  /**@name 表格 */
  columns: ProColumns<T>[]
  /**@name 默认分页数量 */
  pageSize?: number
  /**@name 分页配置 */
  pagination?: false | TablePaginationConfig
  /**@name 配置 */
  options?: false | OptionConfig
  /**@name 是否隐藏options配置 */
  hideOptions?: boolean
  /**@name 搜索表单配置 */
  search?: false | SearchConfig
  /**@name 是否隐藏search表单配置 */
  hideSearch?: boolean
  /**@name 仅仅只有导出按钮 */
  showOnlyExportBtn?: boolean
  /**@name 是否隐藏form配置 */
  hideForm?: boolean
  /**@name 基本配置与 antd Form 相同, 但是劫持了 form onFinish 的配置 */
  form?: Omit<ProFormProps & QueryFilterProps, 'form'>
  /**@name 是否显示导出按钮 */
  showExportBtn?: boolean
  scroll?: RcTableProps<T>['scroll'] & {
    scrollToFirstRowOnChange?: boolean
  }
  /**导出 */
  onExport?: (values?: any) => void
  /**导入 */
  onImport?: () => void
  /**斑马线表格 */
  stripe?: boolean
  /**去掉表格底部边框 */
  hasTableBordered?: boolean
  /**表单、表格等实例 */
  getInstance?: (instance: Instance) => void
  /**table cardProps body 样式 */
  bodyStyle?: React.CSSProperties
  /**table cardProps 头部 样式 */
  headStyle?: React.CSSProperties
  /**表格样式类名 */
  className?: string
  /**操作栏items */
  getOpColumnItems?: (record: T, actionRef: ActionType, formRef?: FormInstance) => ReactNode
  /**操作栏表头宽度 */
  opColumnWidth?: number
  /**操作栏表头文字*/
  opColumnTitle?: React.ReactNode
  /**隐藏删除按钮 */
  hiddenDeleteBtn?: boolean
  /**隐藏编辑按钮 */
  hiddenEditBtn?: boolean
  /**列表增删改接口 */
  action?: {
    query: (params: U) => Promise<any>
    create?: (params: U) => Promise<any>
    update?: (params: U & { id: string | number }) => Promise<any>
    del?: (params: any) => Promise<any>
    info?: (params: any) => Promise<any>
  }
  /** 请求结果适配器 */
  adapter?: (data: any[]) => T[]
  /**是否显示操作列 */
  showOptionColumn?: boolean
  /**处理点击编辑 */
  onEditItem?: (record: T) => void
  /**渲染编辑按钮 */
  renderEditBtn?: (record: T, index: number, action?: ActionType) => React.ReactNode
  /**渲染删除按钮 */
  renderDeleteBtn?: (record: T, index: number, action?: ActionType, defaultDom?: React.ReactNode) => React.ReactNode
  /**定义渲染操作栏 */
  renderOptionColumn?: (entity: T, index: number) => React.ReactNode
  onDelete?: (record: T) => void
  /**搜索区域表单背景颜色 */
  searchFormBgColor?: string
  /**展示删除弹窗 */
  showDeleteModal?: boolean
  setDeleteModalText?: (record: T) => React.ReactNode
  /**
   * @name 设置可展开表格的样式
   * @desc 注意：如果表格columns设置了renderText，render函数自定义渲染
   * @desc 需要使用className="relative zIndex=18"包裹元素提高层级，避免hover的时候背景覆盖
   **/
  showExpandRowStyle?: boolean
  /**获取request返回的结果 */
  getRequestResult?: (result: { total: number; data: T[]; success: boolean }) => void
  /**操作栏类名 */
  optionColumnClassName?: string
  optionClassName?: string
  /**表格卡片边框 */
  cardBordered?: boolean
}

const DragSortTable = <T extends Record<string, any>, U extends ParamsType = ParamsType>(
  {
    columns = [],
    pageSize = 12,
    pagination = {},
    scroll = {},
    options = false,
    hideOptions = true,
    search = false,
    hideSearch = false,
    form,
    hideForm = false,
    showExportBtn = false,
    showOnlyExportBtn = false,
    onExport,
    onImport,
    stripe = true,
    hasTableBordered = false,
    getInstance,
    bodyStyle,
    headStyle,
    className,
    getOpColumnItems,
    hiddenDeleteBtn = false,
    hiddenEditBtn = false,
    showOptionColumn = false,
    opColumnWidth,
    opColumnTitle,
    action,
    onEditItem,
    renderOptionColumn,
    renderEditBtn,
    renderDeleteBtn,
    onDelete,
    searchFormBgColor,
    setDeleteModalText,
    showDeleteModal,
    showExpandRowStyle,
    expandable,
    getRequestResult,
    optionColumnClassName,
    optionClassName,
    cardBordered = true,
    columnEmptyText = '‑‑',
    adapter,
    ...res
  }: IStandardTableProps<T, U>,
  ref: React.Ref<DragSortTableRef>
) => {
  const proTableOptions: ProTableProps<T, U> = { search: false }
  const intl = useIntl()
  const dateRangeRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const formRef = useRef<ProFormInstance>()
  const { lng } = useLang()
  const { pathname } = useLocation()
  const isZh = lng === 'zh-TW'
  const actionRef = useRef<ActionType>(null)
  const { customTableExpandRowName } = useStyle()
  // 记录列表request请求结果
  const [requestResult, setRequestResult] = useState({} as { total: number; data: T[]; success: boolean })
  const [tableColumns, setTableColumns] = useState<ProColumns<T>[]>([])
  const { setHasProList } = useModel('global')
  const [showQueryBtn, setShowQueryBtn] = useState(false) // 避免切换页面，表单项没渲染出来，先出现查询按钮，页面闪动

  const [showExportWhenData, setShowExportWhenData] = useState(false)
  const handleExport = async (searchConfig: Omit<BaseQueryFilterProps, 'submitter' | 'isForm'>) => {
    const values = searchConfig?.form?.getFieldsValue()
    return onExport?.(values)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowQueryBtn(true)
    }, 100)
  }, [])

  // 兼容
  useEffect(() => {
    getInstance?.({
      form: formRef.current,
      formRef: formRef.current,
      action: actionRef.current as ActionType
    })
  }, [formRef.current])

  // 对外暴露属性
  useImperativeHandle(ref, () => {
    return {
      form: formRef.current,
      formRef: formRef.current,
      action: actionRef.current as ActionType
    }
  })

  useEffect(() => {
    // 需要提交一次表单，获取tableconfig中配置的initialValue表单参数
    setTimeout(() => {
      formRef.current?.submit?.()
    }, 100)
  }, [formRef.current])

  useEffect(() => {
    getRequestResult?.(requestResult)
  }, [requestResult])

  // 格式化参数
  // antd form 的配置
  if (!hideForm) {
    // 配合 label 属性使用，表示是否显示 label 后面的冒号
    // 标签宽度设置为0
    proTableOptions.form = {
      // 设置默认配置
      colon: false, // 配合 label 属性使用，表示是否显示 label 后面的冒号
      labelWidth: 0, // 文字标签宽
      ...form
    }
  }
  if (!hideSearch) {
    const getExportBtn = (searchConfig: Omit<BaseQueryFilterProps, 'submitter' | 'isForm'>) => (
      <Export onClick={() => handleExport(searchConfig)} key="export" />
    )
    // table顶部的搜索表单配置
    proTableOptions.search = {
      collapsed: false, // 是否收起
      collapseRender: false, // 收起按钮的 render
      // 设置默认配置
      searchGutter: 12, // 查询表单Item项栅格间隔,
      span: 4, // 控制搜索表单的宽 col ant-col-5
      // 控制 查询、重置按钮距离左侧的距离
      submitterColSpanProps: { span: showExportBtn ? 4 : 2, offset: 0, ...((search && search.submitterColSpanProps) || {}) },
      // @ts-ignore
      optionRender: (searchConfig, props, dom) => {
        return [
          <div key="action" className="flex items-center">
            {showQueryBtn && (
              <div className="flex items-center gap-3">
                {/* {dom.reverse()} */}
                <IconFontButton
                  type="primary"
                  icon="sousuo"
                  loading={loading}
                  onClick={() => {
                    searchConfig?.form?.submit()
                  }}
                  style={{ paddingLeft: 10 }}
                >
                  {intl.formatMessage({ id: 'common.query' })}
                </IconFontButton>
                <IconFontButton
                  icon="qingli"
                  onClick={() => {
                    searchConfig?.form?.resetFields()
                    searchConfig?.form?.submit()
                  }}
                  style={{ paddingLeft: 10 }}
                >
                  {intl.formatMessage({ id: 'common.reset' })}
                </IconFontButton>
                {/* {showExportWhenData && showExportBtn && getExportBtn(searchConfig)} */}
              </div>
            )}
          </div>
        ]
      },
      style: { background: 'var(--bg-base-gray)', padding: 0 },
      ...search
    }
    if (showOnlyExportBtn) {
      proTableOptions.search = {
        ...proTableOptions.search,
        submitterColSpanProps: {
          span: 1,
          offset: 0
        },
        optionRender: (searchConfig, props, dom) => {
          return [getExportBtn(searchConfig)]
        }
      }
    }
  }

  const onDeleteConfirm = async (record: any) => {
    if (onDelete) {
      onDelete(record)
    } else {
      const res = await action?.del?.({ id: record.id })
      // @ts-ignore
      if (res?.success) {
        // 删除重构刷新列表
        actionRef.current?.reload()
        message.success(intl.formatMessage({ id: 'common.deleteSuccess' }))
      }
    }
  }

  // 渲染默认删除按钮
  const renderDefaultDeleteBtn = (record: any) => {
    return (
      <>
        {showDeleteModal && (
          <DeleteConfirmModal
            trigger={
              <a className="!text-primary font-medium text-sm ml-6" key="delete">
                <FormattedMessage id="common.delete" />
              </a>
            }
            text={() => setDeleteModalText?.(record)}
            onConfirm={() => {
              onDeleteConfirm(record)
            }}
          />
        )}
        {!showDeleteModal && (
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmDelete' })}
            onConfirm={() => {
              onDeleteConfirm(record)
            }}
            key="delete"
          >
            <a className="!text-primary font-medium text-sm ml-6">
              <FormattedMessage id="common.delete" />
            </a>
            {/* <LoadingOutlined /> */}
          </Popconfirm>
        )}
      </>
    )
  }

  useEffect(() => {
    // 显示操作项
    if (showOptionColumn && !columns.some((v) => v.key === 'option')) {
      columns.push({
        title: opColumnTitle || <FormattedMessage id="common.op" />,
        key: 'option',
        fixed: 'right',
        width: opColumnWidth || 120,
        align: 'right',
        hideInForm: true,
        hideInSearch: true,
        className: `option-column ${optionClassName}`,
        render: (text, record, index, _action) => {
          const defaultDeleteDom = renderDefaultDeleteBtn(record)
          return [
            <div key={record.id || index} className={optionColumnClassName}>
              {renderOptionColumn?.(record, index)}
              {!renderOptionColumn && (
                <>
                  {!hiddenEditBtn &&
                    (renderEditBtn ? (
                      renderEditBtn(record, index, _action)
                    ) : (
                      <a
                        key="edit"
                        onClick={async () => {
                          onEditItem?.(record)
                        }}
                        className="!text-primary text-sm font-medium"
                      >
                        <FormattedMessage id="common.bianji" />
                      </a>
                    ))}
                  {renderDeleteBtn ? renderDeleteBtn(record, index, _action, defaultDeleteDom) : !hiddenDeleteBtn && defaultDeleteDom}
                </>
              )}
              {getOpColumnItems?.(record, actionRef.current as ActionType, formRef.current as FormInstance)}
            </div>
          ]
        }
      })
    }

    columns.forEach((v) => {
      // 这里只针对可展开表格，提高层级，避免hover的时候被覆盖
      if (!v.renderText && showExpandRowStyle) {
        v.renderText = (text: any, record: any, index: number, action: any) => {
          return <span className="relative z-[18]">{text || '‑‑'}</span>
        }
      }
      // 格式化小数位
      // @ts-ignore
      const precision = v.fieldProps?.precision
      if (isTruthy(precision)) {
        v.renderText = (text, record, index, action) => {
          return (
            <span className="text-primary !font-dingpro-medium">
              {formatNum(text, { precision, placeholder: columnEmptyText === false ? '' : columnEmptyText })}
            </span>
          )
        }
      }
      if (!v.valueType && (v.className || '')?.indexOf('!px-5') === -1) {
        v.className = classNames('!px-5', v.className) // 统一修改单元格间距
      }

      // 多语言 统一修改单元格宽度
      if (!isZh) {
        v.width = v.width ? Number(v.width) + 40 : v.width
      }

      if (v.tooltip) {
        // @ts-ignore
        v.title = <span className="font-pf-bold">{v.title}</span>
      }

      if (v.valueType === 'select') {
        v.fieldProps = {
          showSearch: true,
          ...v.fieldProps,
          suffixIcon: <SelectSuffixIcon opacity={0.4} />
        }
      }
      // 统一格式化时间
      if (typeof v.dataIndex === 'string' && (v.dataIndex.endsWith('Time') || v.dataIndex.endsWith('Date'))) {
        v.renderText = (text: any, record: any, index: number) => {
          const dataIndex = v.dataIndex as any
          return record[dataIndex] ? formatTime(record[dataIndex]) : '‑‑'
        }
      }
      // 统一限制时间选择
      if (v.valueType === 'dateRange') {
        // @ts-ignore
        const [start = 'startTime', end = 'endTime'] = v.fieldProps?.dateFileds || []
        v.fieldProps = {
          ...v.fieldProps,
          search: {
            // 转化值的 key, 一般用于时间区间的转化
            transform: (value: any) => {
              return {
                [start]: `${value[0]} : 00:00:00`,
                [end]: `${value[1]} 23:59:59`
              }
            }
          },
          onCalendarChange: (value: any) => {
            console.log('val', value)
            dateRangeRef.current = value
          },
          // 监听日期选择面板打开状态
          onOpenChange: (open: boolean) => {
            const dates = dateRangeRef.current
            setTimeout(() => {
              if (!open && dates && Math.abs(moment(dates?.[0]).diff(dates?.[1], 'days')) > 91) {
                // 当天在内和之前90天
                dateRangeRef.current = null
                // 重置日期表单
                formRef.current?.resetFields(['dates'])

                message.warning(intl.formatMessage({ id: 'mt.shijianbunengdayusangeyue' }))
              }
            }, 300)
          }
        }
      }
    })

    setTableColumns(columns)
  }, [columns])

  const classNameWrapper = useEmotionCss(({ token }) => {
    return {
      // 表格圆角
      '.ant-table-content': {
        borderTopLeftRadius: '12px !important',
        borderTopRightRadius: '12px !important'
      },
      '.ant-table .ant-table-content': {
        scrollbarWidth: 'thin',
        scrollbarColor: '#fff #fff'
      },
      '.ant-table:hover .ant-table-content': {
        scrollbarColor: 'rgba(0, 0, 0, 0.05)  #fff'
      },
      '.ant-form': {
        background: `${searchFormBgColor || 'rgb(248, 248, 248)'} !important`
      },
      // 设置表头圆角样式
      '.ant-table-container table > thead > tr:first-child > *:first-child': {
        borderTopLeftRadius: '12px !important'
      },
      '.ant-table-container table > thead > tr:last-child > *:last-child': {
        borderTopRightRadius: '12px !important'
      },
      '.ant-table-thead > tr > th': {
        padding: '12px 20px !important',
        fontFamily: 'pf-bold',
        fontWeight: 500
      },
      '.ant-table-footer': {
        background: 'transparent !important'
      },
      // 去掉表头列之间的分割线
      '.ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before':
        {
          width: '0 !important'
        },
      // 修改antd排序
      '.ant-table-column-sorters': {
        justifyContent: 'flex-start !important',
        '.ant-table-column-title': {
          flex: 'none !important'
        }
      }
    }
  })

  const [dataSource, setDataSource] = useState<T[]>([])
  const dataShow = useMemo(() => {
    return adapter ? adapter(dataSource) : dataSource
  }, [dataSource, adapter])

  const DragHandle = (rowData: any, idx: any) => (
    <div className="hover:bg-gray-150 px-3 -ml-3 py-1 flex rounded-lg">
      <Iconfont name="paixu" style={{ cursor: 'move' }} />
    </div>
  )

  return (
    // https://procomponents.ant.design/components/drag-sort-table
    <BaseDragSortTable<T, U>
      cardBordered={false}
      columns={tableColumns}
      columnEmptyText={columnEmptyText}
      dataSource={dataShow}
      actionRef={actionRef}
      rowKey="id"
      // false则不显示table工具栏
      // @ts-ignore
      options={!hideOptions ? { ...options } : false}
      // 表格默认的 size
      defaultSize="middle"
      dateFormatter="string"
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
      locale={{ emptyText: <Empty /> }}
      // 幽灵模式，是否取消表格区域的 padding
      ghost={false}
      scroll={{ x: 1200, ...scroll }}
      debounceTime={100}
      request={async (
        // params:{pageSize,current} ，这两个参数是 antd 的规范。ProTable 会根据列来生成一个 Form，用于筛选列表数据，最后的值会根据通过 request 的第一个参数返回
        params = {} as U,
        sort,
        filter
      ) => {
        const queryParams: any = {
          ...params
        }
        if (Object.keys(sort).length) {
          Object.keys(sort).forEach((key) => {
            let sortPostData = columns.find((v) => v.dataIndex === key)?.sortPostData

            /** 新增一个自定义解析排序字段的方法 */
            if (sortPostData) {
              let [_key, _value] = sortPostData(key, sort[key])
              queryParams[_key] = _value
            } else {
              // 排序方式
              queryParams.orderBy = sort[key] === 'ascend' ? 'ASC' : 'DESC'
              // 排序字段
              queryParams.orderByField = key
            }
          })
        }

        // 这里需要返回一个 Promise,在返回之前你可以进行数据转化、如果需要转化参数可以在这里进行修改
        const res = (await action?.query(queryParams).finally(() => {
          setLoading(false)
        })) as any

        const records = res?.data?.records || []
        const isArray = Array.isArray(res?.data)
        let dataList = isArray ? res.data : records
        const total = isArray ? dataList.length : res?.data?.total

        if (adapter) {
          dataList = adapter(dataList)
        }

        setDataSource(dataList)

        const result = {
          data: dataList,
          success: res?.success,
          total
        }

        setHasProList(dataList?.length > 0)

        setRequestResult(result)

        return result
        // return request<{
        //   data: any[]
        // }>('https://proapi.azurewebsites.net/github/issues', {
        //   params
        // })
        // const msg = await myQuery({
        //   page: params.current,
        //   pageSize: params.pageSize,
        // });
        // return {
        //   data: msg.result,
        //   // success 请返回 true，
        //   // 不然 table 会停止解析数据，即使有数据
        //   success: boolean,
        //   // 不传会使用 data 的长度，如果是分页一定要传
        //   total: number,
        // };
      }}
      // 搜索前参数统一处理入口
      beforeSearchSubmit={(params) => {
        // console.log('params', params)
        setLoading(true)

        const { dateRange, dateRangeNoTime, ...reqParams } = params
        // 统一处理时间范围搜索
        if (dateRange) {
          // @ts-ignore
          reqParams.startTime = `${dateRange[0]} 00:00:00`
          // @ts-ignore
          reqParams.endTime = `${dateRange[1]} 23:59:59`
        }
        // 使用日期，不需要时分秒格式
        if (dateRangeNoTime) {
          // @ts-ignore
          reqParams.startTime = `${dateRangeNoTime[0]}`
          // @ts-ignore
          reqParams.endTime = `${dateRangeNoTime[1]}`
        }

        if (Object.keys(reqParams).length) {
          // 提交搜索时，统一去掉输入框空格
          Object.keys(reqParams).forEach((key) => {
            if (reqParams[key] && typeof reqParams[key] === 'string') {
              // @ts-ignore
              reqParams[key] = reqParams[key].trim()
            }
          })
        }

        return reqParams
      }}
      postData={(data: T[]) => {
        setShowExportWhenData(data?.length > 0)
        setLoading(false)
        return data
      }}
      cardProps={{
        bodyStyle: { padding: '16px', ...bodyStyle },
        className: cardBordered ? '!rounded-2xl border border-gray-150' : '!rounded-2xl',
        headStyle: { borderRadius: '12px 12px 0px 0px', ...headStyle },
        bordered: cardBordered
      }}
      rowClassName={(record, i) => {
        if (showExpandRowStyle) {
          return 'custom-expand-row'
        }
        if (stripe) {
          // 添加斑马线
          return i % 2 === 1 ? 'table-even' : 'table-odd'
        }
        return ''
      }}
      expandable={{
        // defaultExpandAllRows: true,
        // expandRowByClick: true, // 点击行展开
        // expandedRowKeys, // 已展开的key
        // defaultExpandedRowKeys: [], // 默认展开的key
        // showExpandColumn: true, // 是否显示展开图标
        // onExpand: (expanded: boolean, record) => {
        //   console.log('expanded', expanded)
        //   console.log('record', record)
        // },
        // onExpandedRowsChange: (expandedKeys) => {
        //   // console.log('expandedKeys', expandedKeys)
        //   setExpandedRowKeys(expandedKeys)
        // },
        // expandIcon: (props) => {
        //   const { expanded, onExpand, record, expandable } = props
        //   // 占位符
        //   if (!expandable)
        //     return <button type="button" className="ant-table-row-expand-icon ant-table-row-expand-icon-spaced"></button>
        //   return (
        //     <div className={classNames('inline-block cursor-pointer', { 'mr-1': expanded })}>
        //       <img
        //         width={22}
        //         height={22}
        //         className="inline-block relative -top-[3px]"
        //         src={`/img/arrow-${expanded ? 'down' : 'right'}.svg`}
        //         onClick={(e) => {
        //           e.stopPropagation()
        //           onExpand(record, e)
        //         }}
        //         // style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
        //       />
        //     </div>
        //   )
        // }
        ...expandable
      }}
      // 自定义渲染搜索表单区域，不满足需求考虑重写搜索表单
      // searchFormRender={(props) => {
      //   return (
      //     <Form
      //       onFinish={(value) => {
      //         console.log('values', value)
      //       }}
      //       className="!mb-3"
      //     >
      //       <div className="flex items-center justify-between">
      //         <div className="flex items-center gap-3">
      //           <Form.Item className="w-[200px]" name="test1">
      //             <ProFormSelect options={[{ value: 'test1', label: '测试1' }]} />
      //           </Form.Item>
      //           <Form.Item className="w-[200px]" name="test2">
      //             <ProFormSelect options={[{ value: 'test2', label: '测试2' }]} />
      //           </Form.Item>
      //           <Form.Item className="w-[200px]" name="test3">
      //             <ProFormSelect options={[{ value: 'test3', label: '测试3' }]} />
      //           </Form.Item>
      //           <div className="flex items-center gap-3">
      //             <Button type="primary" htmlType="submit">
      //               查询
      //             </Button>
      //             <Button>重置</Button>
      //           </div>
      //         </div>
      //         <div>客户数量：9001</div>
      //       </div>
      //     </Form>
      //   )
      // }}
      className={cn(
        'standard-table',
        classNameWrapper,
        { 'no-table-bordered': !hasTableBordered, [className as string]: true },
        className,
        { [customTableExpandRowName]: showExpandRowStyle }
      )}
      formRef={formRef}
      loading={loading}
      // 自定义排序手柄
      dragSortHandlerRender={DragHandle}
      {...proTableOptions}
      {...res}
    />
  )
}

export default forwardRef(DragSortTable)
