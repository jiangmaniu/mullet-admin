import './styles.css'

import React, { useState } from 'react'

interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  checked?: boolean
}

interface TreeProps {
  data: TreeNode[]
  // 自定义展开/折叠图标
  expandIcon?: React.ReactNode
  collapseIcon?: React.ReactNode
  // 自定义节点渲染
  renderContent?: (node: TreeNode) => React.ReactNode
  // 自定义复选框
  renderCheckbox?: (checked: boolean, onChange: () => void) => React.ReactNode
  // 节点选择回调
  onCheck?: (node: TreeNode, checked: boolean) => void
}

const Tree: React.FC<TreeProps> = ({ data, expandIcon = '▶', collapseIcon = '▼', renderContent, renderCheckbox, onCheck }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string | number>>(new Set())
  const [checkedNodes, setCheckedNodes] = useState<Set<string | number>>(new Set())

  const toggleExpand = (nodeId: string | number) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const handleCheck = (node: TreeNode) => {
    const newChecked = new Set(checkedNodes)
    const isCurrentlyChecked = newChecked.has(node.id)

    if (isCurrentlyChecked) {
      newChecked.delete(node.id)
    } else {
      newChecked.add(node.id)
    }

    setCheckedNodes(newChecked)
    onCheck?.(node, !isCurrentlyChecked)
  }

  const renderNode = (node: TreeNode) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)
    const isChecked = checkedNodes.has(node.id)

    return (
      <div key={node.id} className="tree-node">
        <div className="tree-node-content">
          {hasChildren && (
            <span className="expand-icon" onClick={() => toggleExpand(node.id)}>
              {isExpanded ? collapseIcon : expandIcon}
            </span>
          )}

          {renderCheckbox ? (
            renderCheckbox(isChecked, () => handleCheck(node))
          ) : (
            <input type="checkbox" checked={isChecked} onChange={() => handleCheck(node)} />
          )}

          {renderContent ? renderContent(node) : <span className="node-label">{node.label}</span>}
        </div>

        {hasChildren && isExpanded && <div className="tree-children">{node.children?.map((child) => renderNode(child))}</div>}
      </div>
    )
  }

  return <div className="tree-container">{data.map((node) => renderNode(node))}</div>
}

export default Tree
