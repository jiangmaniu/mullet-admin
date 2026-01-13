import { GetProps, TreeProps } from 'antd'
import React, { useEffect, useState } from 'react'

import TreeComp from '@/components/Base/Tree'

type IProps = {
  initialValues?: any
  treeData?: any
  onChange?: (checkedKeys: any[]) => void
} & GetProps<typeof TreeComp>

export default function PermissionTree({ initialValues = [], treeData, onChange, ...res }: IProps) {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

  useEffect(() => {
    setCheckedKeys(initialValues)

    // 根据初始值展开
    setExpandedKeys(initialValues)
  }, [initialValues])

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    const value = checkedKeysValue as React.Key[]
    setCheckedKeys(value)

    onChange?.(value)

    console.log('onCheck', value)
  }

  return (
    <TreeComp
      checkable
      // defaultCheckedKeys={initialValues}
      // defaultExpandedKeys={initialValues}
      defaultExpandParent
      defaultExpandAll
      autoExpandParent
      // onExpand={onExpand}
      // expandedKeys={expandedKeys}
      // autoExpandParent={autoExpandParent}
      // @ts-ignore
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={treeData}
      {...res}
    />
  )
}
