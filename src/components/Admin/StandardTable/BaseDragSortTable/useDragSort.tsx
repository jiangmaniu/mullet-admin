import { useRefFunction } from '@ant-design/pro-utils'
import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, MouseSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FormInstance } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import type { TableComponents } from 'rc-table/lib/interface'
import React, { createContext, useCallback, useContext, useMemo } from 'react'

import Iconfont from '@/components/Base/Iconfont'

const SortableItemContextValue = createContext<{
  handle: React.ReactNode
}>({ handle: null })

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void
  listeners?: SyntheticListenerMap
}

const RowContext = React.createContext<RowContextProps>({})

/**
 * 拖拽排序表格的行，
 * 如果有 DragHandle 回给 dragSortKey 所在的行注入 provide 和 handle
 * 如果没有整个行都支持拖拽
 * @param props
 * @returns
 */
const SortableRow = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, setActivatorNodeRef } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    ...props?.style
  }
  const { DragHandle, dragSortKey, ...rest } = props

  // 如果存在 dragSortKey，则给 dragSortKey 所在的列注入 handle
  // 参考 https://procomponents.ant.design/components/drag-sort-table
  if (dragSortKey) {
    const doms: React.ReactNode[] = []
    React.Children.forEach(rest.children, (child: any, index) => {
      if (child.key === dragSortKey) {
        doms.push(
          <SortableItemContextValue.Provider
            key={child.key || index}
            value={{
              handle: <DragHandle rowData={child?.props?.record} index={child?.props?.index} {...listeners} {...attributes} />
            }}
          >
            {child}
          </SortableItemContextValue.Provider>
        )
        return
      }
      doms.push(child)
    })
    return (
      <tr {...rest} ref={setNodeRef} style={style}>
        {doms}
      </tr>
    )
  }

  const contextValue = useMemo<RowContextProps>(() => ({ setActivatorNodeRef, listeners }), [setActivatorNodeRef, listeners])

  // 可以自定义展示 handle 位置
  // 参考 https://ant.design/components/table-cn#table-demo-drag-sorting-handler
  return (
    <RowContext.Provider value={contextValue}>
      <tr {...rest} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  )
}

/**
 * 拖拽排序表格的 cell，用与判断要不要展示 handle
 */
const SortableItemCell = React.memo((props: any) => {
  const { dragSortKey, sortClassName, ...rest } = props
  const { handle } = useContext(SortableItemContextValue)

  if (handle) {
    return (
      <td {...rest}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {rest.children} {handle}
        </div>
      </td>
    )
  }

  return <td {...rest} />
})

/**
 * 自定义拖拽手柄 可以在表格中自定义位置渲染
 */
export const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext)
  return (
    <span ref={setActivatorNodeRef} style={{ cursor: 'move' }} {...listeners}>
      <Iconfont name="tuodong" className="!size-8" />
    </span>
  )
}

export interface UseDragSortOptions<T> {
  dataSource?: T[]
  onDragSortEnd?: (beforeIndex: number, afterIndex: number, newDataSource: T[]) => Promise<void> | void
  dragSortKey?: string
  components?: TableComponents<T>
  rowKey: any
  DragHandle: React.FC<any>
  /**使用表单模式管理拖拽数据 */
  useFormMode?: boolean
  form?: FormInstance
  name?: NamePath
  /**拖拽结束之前 */
  onDragEndBefore?: () => boolean
}

const SortContainer = (p: any) => <tbody {...p} />

export function useDragSort<T>(props: UseDragSortOptions<T>) {
  let { dataSource = [], onDragSortEnd, DragHandle, dragSortKey, useFormMode, form, name, onDragEndBefore } = props
  const sensors = useSensors(useSensor(PointerSensor), useSensor(MouseSensor))

  const getDatasource = useCallback(() => {
    const formDataSource = form?.getFieldValue(name) || []
    return useFormMode ? formDataSource || [] : dataSource
    // 如果是使用表单管理数据，则不需要根据dataSource变化，否则需要深度监听dataSource变化
  }, [useFormMode ? dataSource.length : dataSource, useFormMode, form])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (over?.id?.toString() && active.id !== over?.id) {
        // 拖拽前判断
        if (onDragEndBefore?.() === false) {
          return
        }
        const newData = arrayMove<T>(getDatasource() || [], parseInt(active.id as string), parseInt(over.id as string))
        onDragSortEnd?.(parseInt(active.id as string), parseInt(over.id as string), newData.filter((v) => v) || [])
      }
    },
    [getDatasource, onDragSortEnd, onDragEndBefore]
  )

  const DraggableContainer = useRefFunction((p: any) => (
    <SortableContext items={getDatasource().map((_: any, index: number) => index?.toString())} strategy={verticalListSortingStrategy}>
      <SortContainer {...p} />
    </SortableContext>
  ))

  const DraggableBodyRow = useRefFunction((p: any) => {
    const { ...restProps } = p
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = getDatasource()
      .findIndex((item: any) => item[props.rowKey ?? 'index'] === restProps['data-row-key'])
      ?.toString()

    return <SortableRow id={index} dragSortKey={dragSortKey} DragHandle={DragHandle} key={index} {...restProps} />
  })

  const components: TableComponents<T> = props.components || {}

  // 不需要判断
  // if (dragSortKey) {
  components.body = {
    wrapper: DraggableContainer,
    row: DraggableBodyRow,
    cell: SortableItemCell,
    ...(props.components?.body || {})
  }
  // }

  const memoDndContext = useMemo(
    () => (contextProps: any) => {
      return (
        <DndContext modifiers={[restrictToVerticalAxis]} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {contextProps.children}
        </DndContext>
      )
    },
    [handleDragEnd, sensors]
  )

  return {
    DndContext: memoDndContext,
    components
  }
}
