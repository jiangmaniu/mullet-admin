import { ProFormTreeSelect } from '@ant-design/pro-components'
import { ProFormTreeSelectProps } from '@ant-design/pro-form/es/components/TreeSelect'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useIntl } from '@umijs/max'
import { TreeSelectProps } from 'antd'
import { SHOW_PARENT } from 'rc-tree-select'

import SelectSuffixIcon from '@/components/Base/SelectSuffixIcon'
import { getSymbolGroupTree } from '@/services/api/tradeCore/symbolGroup'

type IProps = ProFormTreeSelectProps & {
  fieldProps?: TreeSelectProps
  /**隐藏子级品种名称，只保留目录 */
  hiddenChildren?: boolean
}

export default function SymbolFormTreeSelect({ fieldProps, hiddenChildren, ...res }: IProps) {
  const intl = useIntl()

  const rootClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-select-tree-treenode-active .ant-select-tree-node-content-wrapper': {
        outline: 'none !important'
      }
    }
  })

  return (
    <ProFormTreeSelect
      request={async () => {
        const res = await getSymbolGroupTree()
        const data = res?.data || []

        // 只保留文件夹结构，去掉文件夹下的品种列表
        // if (hiddenChildren) {
        //   // 先拍平去掉children的树结构
        //   const flattenData = flatTreeData<SymbolGroup.SymbolGroupTreeItem>(data, 'id')
        //     .filter((item) => item.hasChildren || Number(item.parentId) === 0)
        //     .map((item) => {
        //       const { children, ...result } = item
        //       return result
        //     })
        //   // 在转成tree
        //   return toTree(flattenData, 'parentId', 'id')
        // }

        return data
      }}
      // tree-select args
      fieldProps={{
        allowClear: true,
        rootClassName,
        suffixIcon: <SelectSuffixIcon opacity={0.4} />,
        filterTreeNode: true,
        treeCheckable: true,
        showSearch: true,
        showCheckedStrategy: SHOW_PARENT,
        maxTagCount: 'responsive',
        popupMatchSelectWidth: false,
        // labelInValue: true,
        autoClearSearchValue: true,
        multiple: true,
        treeLine: false,
        // treeNodeFilterProp: 'title',
        // @ts-ignore
        switcherIcon: ({ expanded }) => {
          return <SelectSuffixIcon style={{ opacity: 0.5, transform: `rotate(${expanded ? 0 : 270}deg)`, width: 18, height: 18 }} />
        },
        ...fieldProps
      }}
      {...res}
    />
  )
}
