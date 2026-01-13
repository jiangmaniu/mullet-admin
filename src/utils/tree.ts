/**
 * 根据数据源转化成一棵树
 * @param nodes 数组
 * @param parendId 父节点id
 * @param id 数据id
 * @returns
 */

import { TreeDataNode } from 'antd'

export const toTree = <TreeNode extends Record<string, any>>(
  nodes: TreeNode[],
  parendId: keyof TreeNode,
  id: keyof TreeNode,
  // 遍历过程中，需要排序的字段
  sortBy?: keyof TreeNode
): TreeNode[] => {
  let result: TreeNode[] = []

  if (!Array.isArray(nodes)) {
    return result
  }

  // 深拷贝，否则会影响原数组
  let node: TreeNode[] = JSON.parse(JSON.stringify(nodes))

  // 根据父节点进行拼接子节点
  node.forEach((item) => delete item.children)

  //把每一项的引用放入map对象里
  let map: Record<string, TreeNode> = {}
  node.forEach((item) => (map[item[id]] = item))

  let newNode: TreeNode[] = []
  node.forEach((dt) => {
    let parents = map[dt[parendId]]
    if (parents) {
      //如果 map[dt.pId] 有值 则 parents 为 dt 的父级
      //判断 parents 里有无child 如果没有则创建 如果有则直接把 dt push到children里
      if (!parents.children) {
        // @ts-ignore
        parents.children = []
      }
      // @ts-ignore
      dt.key = dt[id]
      parents.children.push(dt)

      if (sortBy) {
        // @ts-ignore
        parents.children = parents.children.sort((a, b) => b[sortBy] - a[sortBy])
      }
    } else {
      // @ts-ignore
      dt.key = dt[id]
      newNode.push(dt)
    }
  })

  if (sortBy) {
    return newNode.sort((a, b) => b[sortBy] - a[sortBy])
  }

  return newNode
}

/**
 * 拍平一颗树
 * @param {*} data
 * @param {*} key data item的key字段 如id
 * @param {*} parentId 父级Id
 * @returns
 */
export const flatTreeData = <TreeNode>(data: TreeNode[], key: keyof TreeNode, parentId?: keyof TreeNode): TreeNode[] => {
  if (!data?.length) return []
  return data.reduce((prev: TreeNode[], curr: TreeNode) => {
    if (parentId !== undefined) {
      // @ts-ignore
      curr.parentId = parentId
    }
    prev.push(curr)
    // @ts-expect-error
    if (curr.children && curr.children.length > 0) {
      // @ts-ignore
      prev.push(...flatTreeData(curr.children, key, curr[key] as string))
    }
    return prev
  }, [])
}

// 树状数据去除空children
export const removeEmptyChildren = (treeData: any) => {
  treeData.forEach((item: any) => {
    if ('children' in item && item.children?.length === 0) {
      delete item.children
    } else if ('children' in item && item.children?.length) {
      removeEmptyChildren(item.children)
    }
  })
  return treeData
}

// 树状数据筛出祖父节点

/**
 * 筛选出树的顶点节点
 * @param nodes 节点数组，如 ['0-0','0-1','0-0-1','1-0-1','0-0-2']
 * @param separator 分隔符，如 '-'
 * @returns 顶点节点数组
 */
export const findRootNodes = (nodes: string[], separator: string): string[] => {
  // 创建一个 Set 来存储所有可能的父节点
  const possibleParents = new Set<string>()

  // 遍历所有节点，找出所有可能的父节点
  nodes.forEach((node) => {
    const parts = node.split(separator)
    // 如果节点可以被分割（不是根节点），则将其父节点加入到 Set 中
    if (parts.length > 1) {
      parts.pop() // 移除最后一个部分
      possibleParents.add(parts.join(separator))
    }
  })

  // 过滤出不在可能父节点集合中的节点，这些就是顶点节点
  return nodes.filter((node) => !possibleParents.has(node))
}

export type ITreeSelectKeys = Record<string, boolean>
/**
 * 筛选出被选中的独立的叶子节点和子节点被选中的所有节点
 * @param nodes 选中的节点 key 数组，如 ['0-0-1', '0-0-1-0', '0-0-1-1']
 * @param separator 分隔符，如 '-'
 * @param treeNodes 树结构
 * @returns 父节点数组
 */
export const findParentNodes = (
  nodes: string[],
  treeNodes: TreeDataNode[],
  useTitle = true,
  separator: string,
  multiple: any
): ITreeSelectKeys => {
  // 用Set存储结果，避免重复
  const result: ITreeSelectKeys = {}

  const nodeKey = useTitle ? 'title' : 'key'

  // 递归检查节点
  const checkNode = (node: TreeDataNode, key?: TreeDataNode['key']): boolean => {
    const resKey = key ? `${key}${separator}${node[nodeKey]}` : `${node[nodeKey]}`
    // console.log('resKey', resKey)
    // 如果没被选中，则不检查
    if (!nodes.includes(node[nodeKey] as string)) {
      return false
    }

    // 如果是叶子节点，检查是否被选中
    if (!node.children || node.children.length === 0) {
      const isSelected = nodes.includes(node[nodeKey] as string)
      // console.log('node', node)
      if (isSelected) {
        // 如果是空文件夹，返回False
        // @ts-ignore
        result[resKey] = node?.isSymbol === false ? false : true
      }
      return isSelected
    }

    // 如果是父节点，检查所有子节点
    const allChildrenSelected = multiple ? node.children.some((child) => checkNode(child, resKey)) : true
    // 如果所有子节点都被选中，将当前节点加入结果并从 result 中删除子节点
    if (allChildrenSelected) {
      // 从 result 中移除所有子节点
      node.children.forEach((child) => {
        delete result[`${resKey}${separator}${child[nodeKey]}`]
      })
      result[resKey] = false
    }

    return allChildrenSelected
  }

  // 遍历顶层节点
  // 从叶子节点开始遍历
  const traverseLeafFirst = (nodes: TreeDataNode[], key?: TreeDataNode['key']) => {
    nodes.forEach((node) => {
      const resKey = key ? `${key}${separator}${node[nodeKey]}` : `${node[nodeKey]}`
      if (node.children && node.children.length > 0) {
        traverseLeafFirst(node.children, resKey)
      }
      checkNode(node, key)
    })
  }

  treeNodes.forEach((node) => {
    traverseLeafFirst([node])
  })

  return result
}

// 在树结构中找到当前节点
const findCurrentNode = (topKey: string, nodes: TreeDataNode[]): TreeDataNode | undefined => {
  for (const node of nodes) {
    // 如果找到匹配的节点，直接返回
    if (node.key === topKey) {
      return node
    }

    // 如果当前节点有子节点，递归搜索
    if (node.children && node.children.length > 0) {
      const found = findCurrentNode(topKey, node.children)
      if (found) {
        return found
      }
    }
  }

  // 如果没找到匹配的节点，返回 undefined
  return undefined
}

/**
 * 找到所有被選中的節點
 * @param nodes
 * @param treeNodes
 * @returns
 */
export const findCheckedNodes = (nodes: string[], treeNodes: TreeDataNode[]): string[] => {
  const result: string[] = []
  // const reg = /(.*)\/*/
  nodes.forEach((node) => {
    // if (reg.test(node)) {
    //   const parts = node.split('/*')
    // const currentNode = findCurrentNode(parts[0], treeNodes)
    const currentNode = findCurrentNode(node, treeNodes)

    if (currentNode) {
      // 拉平 currentNode 的 children 节点
      const children = flatTreeData([currentNode], 'key')
      result.push(...children.map((item) => item.key as string))
    }
    // } else {
    //   result.push(node)
    // }
  })

  return result
}

/**
 * 获取一个节点下的所有子节点路径 [1,2,3]
 * @param nodes
 * @returns
 */
export const getAllIdsWithChildren = (nodes: any) => {
  const ids: any = []

  function traverse(node: any) {
    if (node.id) {
      ids.push(node.id)
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => traverse(child))
    }
  }

  nodes.forEach((node: any) => traverse(node))
  return ids
}

/**
 * 更新树形数据中指定节点的children
 * @param {Array} treeData 原始树形数据
 * @param {Object} targetNode 要更新的目标节点
 * @param {Array} newChildren 新的子节点数组
 * @returns {Array} 更新后的新树形数据
 */
export function updateTreeNodeChildren(treeData: any, targetNode: any, newChildren: any) {
  // 深度拷贝原始数据以避免直接修改
  const newTreeData = JSON.parse(JSON.stringify(treeData))

  // 递归查找并更新目标节点
  function traverse(nodes: any) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      // 找到目标节点
      if (node.id === targetNode.id) {
        node.children = newChildren
        return true // 找到并更新了节点
      }

      // 如果有子节点，继续递归查找
      if (node.children && node.children.length > 0) {
        if (traverse(node.children)) {
          return true // 子节点中找到并更新了
        }
      }
    }
    return false // 当前分支未找到
  }

  traverse(newTreeData)
  return newTreeData
}
