import { useIntl } from '@umijs/max'
import { AutoComplete, Empty, Select } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'
import { useEffect, useMemo, useState } from 'react'

import { findCheckedNodes, findParentNodes, flatTreeData, ITreeSelectKeys } from '@/utils/tree'

import Tree, { TreeDataNode } from './Tree'

type IProps = {
  multiple?: boolean
  style?: React.CSSProperties
  form?: FormInstance
  name?: NamePath
  hideSearch?: boolean
  useTitle?: boolean
  value?: string
  onChange?: (value: string) => void
  treeData: any
  /**路径分隔符 */
  separator?: string
  /**返回父子节点完整路径 */
  selectedFullPath?: boolean
  /**是否为treeSelect模式，不使用autocomplete input输入的值，必须手动选择列表的值 */
  treeSelectMode?: boolean
}

/**
 * @hack 根据多语言来判断是否是全部
 * @param key
 * @returns
 */
export const isAllSymbolByLng = (key: any) => {
  return key === '全部' || key === 'All'
}

export default function AutoCompleteTree({
  selectedFullPath,
  separator = '/',
  hideSearch,
  multiple,
  style,
  useTitle = true,
  value,
  onChange,
  form,
  name,
  treeData,
  treeSelectMode
}: IProps) {
  const intl = useIntl()
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]) // 实际选中的keys
  const [checkedTitles, setCheckedTitles] = useState<string[]>([]) // 实际选中的需要展示的title
  const dataList: TreeDataNode[] = useMemo(() => flatTreeData(treeData, 'key'), [treeData])
  const [open, setOpen] = useState(false)

  const [searchValue, setSearchValue] = useState('')

  const onSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleCheck = (keys: string[]) => {
    // setCheckedKeys(keys)

    const newCheckedKeys = keys.map((key) => {
      const node = dataList.find((item) => item.key === key)
      return useTitle ? node?.title : key
    })

    setCheckedTitles(newCheckedKeys as string[])
  }

  useEffect(() => {
    let topNodes: ITreeSelectKeys = {}

    let retValue = ''
    // 多选才需要处理父子关系
    if (checkedTitles.length > 0) {
      if (multiple || selectedFullPath) {
        treeData.forEach((node: any) => {
          const res = findParentNodes(checkedTitles, [node], useTitle, separator, multiple)
          topNodes = { ...topNodes, ...res }
        })
        retValue = Object.keys(topNodes)
          .map((key) => {
            // @hack 根据多语言临时处理
            if (isAllSymbolByLng(key)) {
              return key
            }
            return topNodes[key] ? key : `${key}${separator}*`
          })
          .join(',')
      } else {
        retValue = checkedTitles[0]
      }
    }

    console.log('retValue', retValue)
    onChange?.(retValue)
  }, [checkedTitles])

  useEffect(() => {
    // 根据格式化的value找到对应的key，只传递最后一级的key
    const initKey = (value || '')
      .split(',')
      .map((item) => {
        const splitItem = item.split(separator)
        const lts = splitItem.at(-1) || item
        // （如果带*）找到最后一级
        const _item = /\*/.test(lts) ? splitItem.at(-2) : lts

        // 根据title或者key找到对应的key
        const key = useTitle ? 'title' : 'key'
        return dataList.find((node) => node[key] === _item)?.key || ''
      })
      .filter((v) => v)

    // 3. 使用 findCheckedNodes 找出实际选中的 keys
    let _keys = findCheckedNodes(initKey, treeData)

    // 4. 设置默认值
    setCheckedKeys(_keys)
  }, [value, dataList])

  useEffect(() => {
    if (name) {
      // 保存到form提交
      form?.setFieldValue(name, value)
    }
  }, [value])

  const renderTree = () => {
    return (
      <Tree
        searchValue={searchValue}
        treeData={treeData}
        dataList={dataList}
        setSearchValue={setSearchValue}
        checkedKeys={checkedKeys}
        onCheck={handleCheck}
        selectedKeys={checkedKeys}
        onSelect={(keys) => {
          handleCheck(keys as string[])
          // 单选选择后关闭dropdown
          setOpen(false)
        }}
        multiple={multiple}
        hideSearch
      />
    )
  }

  // 只能选择，不能输入
  if (treeSelectMode) {
    return (
      <Select
        dropdownRender={() => (
          <div>
            {treeData.length > 0 ? (
              renderTree()
            ) : (
              <div className="p-2">
                <Empty description={intl.formatMessage({ id: 'common.noData' })} />
              </div>
            )}
          </div>
        )}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        value={value || undefined}
        open={open}
        onDropdownVisibleChange={(open) => setOpen(open)}
        allowClear={false}
        onChange={onChange}
        style={{ height: 40 }}
        showSearch
        onSearch={onSearch}
        searchValue={searchValue}
        placeholder={intl.formatMessage({ id: 'mt.xuanzejiaoyipinzhong' })}
      />
    )
  }

  // 可以输入，可以选择
  return (
    <AutoComplete
      style={style}
      onSearch={onSearch}
      size="large"
      placeholder={intl.formatMessage({ id: 'mt.shurujiaoyipinzhong' })}
      dropdownRender={(menu) => <>{renderTree()}</>}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      value={value}
      onChange={onChange}
      options={dataList}
      open={open}
      onDropdownVisibleChange={(open) => setOpen(open)}
    />
  )
}
