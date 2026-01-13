import { getIntl } from '@umijs/max'
import type { TreeDataNode as AntTreeDataNode, TreeProps } from 'antd'
import { Input,Tree as AntTree } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { getEnv } from '@/env'

export interface TreeDataNode extends AntTreeDataNode {
  title: string
  key: string
  icon: string
  children?: TreeDataNode[]
  disabled?: boolean
  parentId?: string
}

const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key[] => {
  let parentKey: React.Key[] = []
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node?.children) {
      if (node.children.some((item) => item.key === key)) {
        // parentKey.push(node.key)
        return [node.key]
      } else {
        const childParentKey = getParentKey(key, node.children)

        if (childParentKey.length > 0) {
          parentKey = [node.key, ...childParentKey]
        }
      }
    }
  }
  return parentKey
}

type MyTreeProps = {
  treeData: TreeDataNode[]
  dataList: TreeDataNode[]
  checkedKeys: string[]
  onCheck: (keys: string[]) => void
  selectedKeys: string[]
  onSelect?: (selectedKeys: React.Key[]) => void
  searchValue: string
  setSearchValue: (val: string) => void
  multiple?: boolean
  hideSearch?: boolean
}

const Tree: React.FC<MyTreeProps> = ({
  treeData: defaultTreeData,
  dataList,
  checkedKeys,
  selectedKeys,
  searchValue,
  setSearchValue,
  onCheck,
  onSelect,
  multiple = false,
  hideSearch
}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data?.map((item) => {
        const strTitle = typeof item.title === 'string' ? item.title : String(item.title)
        const index = item.title?.toLowerCase().indexOf((searchValue || '').toLocaleLowerCase())
        const beforeStr = strTitle.substring(0, index)
        const afterStr = strTitle.slice(index + searchValue.length)
        const originValue = item.title.substring(index, index + searchValue.length) // name被替换前的原始值和搜索值匹配的，不需要转化大小写，原样截取

        const title =
          index > -1 ? (
            <span key={item.key}>
              {beforeStr}
              <span className="text-red">{originValue || searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span key={item.key}>{strTitle}</span>
          )

        // @ts-ignore
        item.showName = title

        if (item.children) {
          return {
            title: title as any,
            key: item.key,
            children: loop(item.children),
            // 文件夹
            icon: '/img/emoji/9.png',
            disabled: item.disabled
          }
        }

        const getIconUrl = (iconUrl: string) => {
          if (iconUrl) {
            return iconUrl?.indexOf('http') !== -1 ? iconUrl : `${getEnv().imgDomain}${iconUrl}`
          }
          return '/img/default-symbol-icon.png'
        }

        return {
          title: title as any,
          key: item.key,
          // 品种icon
          // @ts-ignore
          icon: item.parentId === '0' ? '/img/emoji/9.png' : getIconUrl(item?.iconUrl),
          disabled: item.disabled
        }
      })

    return loop(defaultTreeData)
  }, [searchValue])

  useEffect(() => {
    if (!searchValue) return

    const newExpandedKeys = dataList
      .flatMap((item) => {
        if (item.title.toLowerCase().indexOf((searchValue || '').toLocaleLowerCase()) > -1) {
          return getParentKey(item.key, treeData)
        }
        return []
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i))

    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(true)
  }, [searchValue])

  // 根据keys自动展开-单选
  // useEffect(() => {
  //   if (selectedKeys.length) {
  //     setExpandedKeys(Array.from(new Set([...selectedKeys, ...expandedKeys])))
  //     setAutoExpandParent(true)
  //   }
  // }, [selectedKeys])

  // 根据keys自动展开-多选
  // useEffect(() => {
  //   if (checkedKeys.length) {
  //     setExpandedKeys(Array.from(new Set([...checkedKeys, ...expandedKeys])))
  //     setAutoExpandParent(true)
  //   }
  // }, [checkedKeys])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }

  const handleCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    onCheck(checkedKeys as string[])
  }

  // 点击行标题时，手动切换复选框
  const handleSelect: TreeProps['onSelect'] = useCallback(
    (selectedKeys: React.Key[], { node }: { node: any }) => {
      const key = node.key as string

      if (multiple) {
        const newCheckedKeys = checkedKeys.includes(key)
          ? checkedKeys.filter((k) => k !== key) // 取消选中
          : [...checkedKeys, key] // 选中

        onCheck?.(newCheckedKeys)
      } else {
        if (node.disabled) {
          return
        }

        onSelect?.(selectedKeys)
      }
    },
    [checkedKeys]
  )

  // useEffect(() => {
  //   if (defaultSearchValue !== searchValue) setSearchValue(defaultSearchValue)
  // }, [defaultSearchValue])

  return (
    <div>
      {!hideSearch && (
        <Input
          variant="underlined"
          style={{ marginBottom: 8 }}
          placeholder={getIntl().formatMessage({ id: 'mt.jiaoyipinzhong' })}
          onChange={onChange}
        />
      )}
      <AntTree
        checkable={multiple}
        selectable={!multiple}
        className="custom-tree"
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        blockNode
        multiple={multiple}
        switcherIcon={(props) => {
          return (
            <>
              {props.expanded ? (
                <img src="/img/icons/arrow.svg" alt="arrow" className="w-5 h-5 transition-transform duration-300" />
              ) : (
                <img src="/img/icons/arrow.svg" alt="arrow" className="w-5 h-5 transition-transform duration-300 transform rotate-180" />
              )}
            </>
          )
        }}
        treeData={treeData}
        titleRender={(node) => {
          return (
            <div className="flex items-center gap-1">
              <img src={node.icon} alt="icon" className="w-5 h-5 rounded-full" />
              {/* @ts-ignore */}
              <span>{node.showName || node.title}</span>
            </div>
          )
        }}
        selectedKeys={selectedKeys}
        onSelect={handleSelect}
        checkedKeys={checkedKeys}
        onCheck={handleCheck}
      />
    </div>
  )
}

export default Tree
