import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Button, Dropdown, Input, Skeleton, Tooltip, Tree } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useEffect, useState } from 'react'

import DeleteConfirmModal from '@/components/Base/DeleteConfirmModal'
import Empty from '@/components/Base/Empty'
import SelectSuffixIcon from '@/components/Base/SelectSuffixIcon'
import { getSymbolGroupTree, removeSymbolGroup, submitSymbol } from '@/services/api/tradeCore/symbolGroup'
import { message } from '@/utils/message'
import { flatTreeData } from '@/utils/tree'

import ModalForm from './ModalForm'

type IProps = {
  onChange: (key: string, path: string) => void
  activeKeys?: any[]
}

type GroupTreeItem = SymbolGroup.SymbolGroupTreeItem

const SymbolTree = ({ onChange, activeKeys }: IProps) => {
  const [treeData, setTreeData] = useState([] as GroupTreeItem[]) // 树状结构
  const [autoExpandParent, setAutoExpandParent] = useState(true) // 展开父级
  const [searchValue, setSearchValue] = useState('') // 搜索值
  const [expandedKeys, setExpandedKeys] = useState([]) // 展开的keys
  const [selectedKeys, setSelectedKeys] = useState<any>([]) // 选中的keys
  const [currentSelectItem, setCurrentSelectItem] = useState<any>({})
  const [currentSelectParentId, setCurrentSelectParentId] = useState('0') // 当前选择的父级id
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false) // 弹窗
  const [currentMenuKey, setCurrentMenuKey] = useState('') // 当前菜单key
  const intl = useIntl()

  const initData = async () => {
    const res = await getSymbolGroupTree()
    setTreeData((res?.data || []) as GroupTreeItem[])
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }

  useEffect(() => {
    if (activeKeys?.length) {
      setSelectedKeys(activeKeys)
    }
  }, [activeKeys])

  useEffect(() => {
    setLoading(true)
    initData()
  }, [])

  // 根据id查找父级id
  const getParentId = (id: string | number) => {
    // @ts-ignore
    const flatData = flatTreeData(treeData, 'id')
    let item = flatData.find((v: any) => v.id === id) || {}
    // @ts-ignore
    return item?.parentId
  }

  // 递归查找给定id所在tree中的完整路径keys返回 => [1,2,3,4]
  const getTreePosById = (id: any) => {
    // @ts-ignore
    const flatData = flatTreeData(treeData, 'id')
    let arr = []
    let parentId = id
    while (parentId) {
      let parentItem = flatData.find((v: any) => v.id === parentId) || {}
      // @ts-ignore
      parentId = parentItem?.parentId
      // @ts-ignore
      arr.unshift(parentItem)
    }
    return arr
  }

  // 渲染下拉菜单项
  const renderDropdownMenu = (item: any) => {
    // 是否还需要默认后期可能需要
    const isDefault = item.id === 'default'
    const items: any = [
      !isDefault && {
        key: 'rename',
        icon: <EditOutlined />,
        label: (
          <a>
            <FormattedMessage id="mt.rename" />
          </a>
        )
      },
      {
        key: 'sameLevel',
        icon: <PlusOutlined />,
        label: (
          <a>
            <FormattedMessage id="mt.newSameLevel" />
          </a>
        )
      },
      {
        key: 'subLevel',
        icon: <PlusOutlined />,
        label: (
          <a>
            <FormattedMessage id="mt.newSubLevel" />
          </a>
        )
      },
      ...(!isDefault
        ? [
            {
              type: 'divider' as const,
              key: 'divider'
            },
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              danger: true,
              label: (
                <DeleteConfirmModal
                  trigger={
                    <a target="_blank">
                      <FormattedMessage id="common.delete" />
                    </a>
                  }
                  onConfirm={() => {
                    onDelete(item.id)

                    // 删除后，当前选中项需要更新
                    if (selectedKeys.includes(item.id)) {
                      onChange?.('', '')
                    }
                  }}
                  text={() => (
                    <span>
                      <FormattedMessage id="mt.querenshanchuxxwenjianjia" values={{ title: item.title }} />
                    </span>
                  )}
                ></DeleteConfirmModal>
              )
            }
          ]
        : [])
      // @ts-ignore
    ].filter((item) => item?.key)

    const onMenuClick = (event: MenuInfo) => {
      const { key } = event

      // 阻止冒泡
      event.domEvent.stopPropagation()

      setCurrentMenuKey(key)

      const id: any = item.id
      switch (key) {
        case 'rename':
          setOpen(true)
          setCurrentSelectItem(item)
          // 设置当前选中的父级id
          setCurrentSelectParentId(getParentId(id))
          break
        case 'sameLevel':
          if (checkBeforeCreate(id)) {
            setOpen(true)
            // 设置当前选中的父级id
            setCurrentSelectParentId(getParentId(id))
          }
          break
        case 'subLevel':
          if (checkBeforeCreate(id)) {
            setOpen(true)
            // 新建子级：设置父级id为当前的id
            setCurrentSelectParentId(id)
          }
          break
        case 'delete':
          break
      }
    }

    return { items, onClick: onMenuClick }
  }

  const checkBeforeCreate = (id: string) => {
    const len = getTreePosById(id).length
    if (len > 5) {
      message.info(intl.formatMessage({ id: 'mt.createSymbolTips' }))
      return false
    }
    return true
  }

  // 独立按钮，创建一级菜单新组
  const onCreateOneLevel = () => {
    setCurrentMenuKey('oneLevel')
    setOpen(true)
  }

  // 删除
  const onDelete = (id: string) => {
    removeSymbolGroup({ id }).then((res) => {
      if (res.success) {
        initData()
      }
    })
  }

  // 弹窗确认完成
  const handleModalFinish = async (values: any) => {
    console.log('values', values)

    const isEdit = currentMenuKey === 'rename'
    const id = currentSelectItem.id

    const res = await submitSymbol({
      groupName: values?.title,
      id: isEdit ? id : '', // 重命名需要带上id,
      parentId: currentSelectParentId || '0' // 新建一级菜单传0
    })
    if (res.success) {
      initData()
      setOpen(false)
    }
  }

  // 展开事件
  const onExpand = (newExpandedKeys: any) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  // 搜索
  const onSearch = (e: any) => {
    const searchValue = e.target.value
    // 把树拍平
    // @ts-ignore
    const data = flatTreeData(treeData, 'id')
    const searchData = data.filter(
      (item: any) => searchValue && item?.title && String(item.title).toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
    )
    // @ts-ignore
    // 获取展开的key
    const newExpandedKeys = Array.from(
      new Set(
        searchData
          .map((item: any) => {
            return getTreePosById(item.id).map((item: any) => item.parentId)
          })
          .flat()
      )
    )

    // @ts-ignore
    setExpandedKeys(newExpandedKeys)
    setSearchValue(searchValue)
    setTreeData(handleSearchList(searchValue))
    setAutoExpandParent(true)

    // console.log('flatTreeData', data)
    // console.log('searchData', searchData)
    // console.log('newExpandedKeys', newExpandedKeys)
  }

  // 搜索值变化对数据进行处理
  const handleSearchList = (searchValue: any) => {
    const loop = (data: any) => {
      return data.map((item: any) => {
        const strTitle = item?.title
        const index = item.title?.toLowerCase().indexOf(searchValue?.toLowerCase())
        const beforeStr = strTitle?.substring(0, index)
        const afterStr = strTitle?.slice(index + searchValue.length)
        const originValue = item.title?.substring(index, index + searchValue.length) // name被替换前的原始值和搜索值匹配的，不需要转化大小写，原样截取

        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="text-brand font-semibold">{originValue || searchValue}</span>
              {afterStr}
            </span>
          ) : (
            strTitle
          )

        item.showName = title

        // 递归处理
        if (item?.children?.length) {
          return { ...item, children: loop(item.children) }
        }
        return item
      })
    }
    return loop(treeData)
  }

  const className = useEmotionCss(({ token }) => {
    return {
      '&': {
        '.ant-tree-treenode': {
          marginTop: 1,
          marginBottom: 1,
          padding: '8px 10px !important',
          borderRadius: 8,
          overflow: 'hidden',
          '&.ant-tree-treenode-selected': {
            backgroundColor: '#f6f6f6 !important',
            '.dropDown': {
              display: 'block'
            }
          },
          '&:hover': {
            backgroundColor: '#f6f6f6',
            '.dropDown': {
              display: 'block'
            }
          }
        },
        '.ant-tree-node-content-wrapper:hover': {
          background: 'none !important'
        },
        '.ant-tree-switcher': {
          position: 'relative',
          top: -1,
          width: '18px !important',
          height: '18px !important',
          '&:hover': {
            background: 'none !important'
          }
        }
      }
    }
  })

  const modalTitle = {
    oneLevel: <FormattedMessage id="mt.xinjianfenzu" />,
    rename: <FormattedMessage id="mt.rename" />,
    sameLevel: <FormattedMessage id="mt.newSameLevel" />,
    subLevel: <FormattedMessage id="mt.newSubLevel" />
  }[currentMenuKey]

  return (
    <div>
      <div className="flex items-center justify-between pb-7 px-[14px]">
        <span className="text-base text-primary font-medium">
          <FormattedMessage id="mt.fileList" />
        </span>
        <Button style={{ height: 30 }} onClick={onCreateOneLevel} disabled={loading}>
          <FormattedMessage id="mt.newGroup" />
        </Button>
      </div>
      {!loading && treeData?.length > 0 && (
        <div className="mx-[14px] mb-4">
          <Input
            placeholder={intl.formatMessage({ id: 'common.search' })}
            suffix={
              <Tooltip title="Extra information">
                <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
            allowClear
            onChange={onSearch}
          />
        </div>
      )}
      <div style={{ height: 'calc(100vh - 410px)', overflowY: 'auto', paddingRight: 14, marginLeft: 14 }}>
        <Skeleton loading={loading} />
        {!loading && (
          <Tree
            className={className}
            // defaultExpandedKeys={expandedKeys}
            // draggable
            // onDragEnter={onDragEnter}
            // onDrop={onDrop}
            blockNode
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            // @ts-ignore
            treeData={treeData}
            // @ts-ignore
            switcherIcon={({ expanded, showInput }) => {
              return <SelectSuffixIcon style={{ opacity: 0.5, transform: `rotate(${expanded ? 0 : 270}deg)`, width: 18, height: 18 }} />
            }}
            selectedKeys={selectedKeys}
            onSelect={(keys, info) => {
              // @ts-ignore
              const key = keys[0] as string
              // @ts-ignore
              setSelectedKeys(keys)
              const pathName = key
                ? getTreePosById(key)
                    .map((item: any) => item.title)
                    .join('_')
                : ''

              onChange?.(key, pathName)

              console.log('onSelect', keys, info)
            }}
            titleRender={(data) => {
              // @ts-ignore
              data.value = (
                <div className="flex custom-title-wrapper">
                  <div className="flex-1 flex items-center max-w-[220px]">
                    <img src="/img/emoji/9.png" className="w-[22px] h-[22px]" />
                    {/* @ts-ignore */}
                    <span className="text-primary text-sm pl-1 truncate" title={data.title}>
                      {/* @ts-ignore */}
                      {data.showName || data.title}
                    </span>
                  </div>
                  <div className="pl-[10px] dropDown hidden absolute right-0">
                    <Dropdown menu={renderDropdownMenu(data)} placement="bottomRight">
                      <span onClick={(e) => e.preventDefault()} className="cursor-pointer">
                        <MoreOutlined style={{ fontSize: 16, transform: 'rotate(90deg)' }} />
                      </span>
                    </Dropdown>
                  </div>
                </div>
              )
              // @ts-ignore
              return <div>{data.value}</div>
            }}
          />
        )}
        {!loading && treeData?.length === 0 && <Empty />}
      </div>
      <ModalForm
        title={modalTitle}
        info={currentSelectItem}
        open={open}
        onFinish={handleModalFinish}
        onClose={() => {
          setOpen(false)
          // 重置选择的值
          setCurrentSelectItem({})
        }}
      />
    </div>
  )
}

export default SymbolTree
