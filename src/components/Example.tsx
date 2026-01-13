import React from 'react'

import Tree from './Tree'

const ExampleComponent: React.FC = () => {
  const treeData = [
    {
      id: '1',
      label: '父节点 1',
      children: [
        { id: '1-1', label: '子节点 1-1' },
        { id: '1-2', label: '子节点 1-2' }
      ]
    },
    {
      id: '2',
      label: '父节点 2',
      children: [{ id: '2-1', label: '子节点 2-1' }]
    }
  ]

  // 自定义节点内容渲染
  const customRenderContent = (node: any) => <div style={{ color: node.children ? 'blue' : 'black' }}>{node.label}</div>

  // 自定义复选框
  const customRenderCheckbox = (checked: boolean, onChange: () => void) => (
    <div
      onClick={onChange}
      style={{
        width: 16,
        height: 16,
        border: '1px solid #999',
        backgroundColor: checked ? '#1890ff' : 'white',
        cursor: 'pointer'
      }}
    />
  )

  return (
    <Tree
      data={treeData}
      expandIcon="+"
      collapseIcon="-"
      renderContent={customRenderContent}
      renderCheckbox={customRenderCheckbox}
      onCheck={(node, checked) => {
        console.log('节点选中状态变化：', node.label, checked)
      }}
    />
  )
}

export default ExampleComponent
