import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import Iconfont from '@/components/Base/Iconfont'

export const getColumns = (setDataSource: any): ProColumns<any>[] => {
  const intl = useIntl()

  const options = [
    { label: <FormattedMessage id="mt.moren" />, value: '1' },
    { label: <FormattedMessage id="mt.zidingyi" />, value: '2' }
  ]

  return [
    {
      title: <FormattedMessage id="mt.symbol" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 120
    },
    {
      title: <FormattedMessage id="mt.morenpeizhi" />,
      dataIndex: 'config',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record: any, index, action) {
        return (
          <div className="flex items-center gap-6">
            {options.map((item, idx) => {
              const isActive = record.config === item.value || (!record.config && item.value === '1')
              return (
                <div
                  className="flex items-center cursor-pointer"
                  key={idx}
                  onClick={() => {
                    setDataSource((dataSource: any) =>
                      dataSource.map((v: any) => {
                        if (v.id === record.id) {
                          return {
                            ...v,
                            config: item.value
                          }
                        }
                        return v
                      })
                    )
                  }}
                >
                  <Iconfont
                    name={isActive ? 'gouxuan-xuanzhong' : 'a-gouxuanwei'}
                    width={18}
                    height={18}
                    color={isActive ? 'var(--color-brand-primary)' : ''}
                  />
                  <span className="text-sm text-primary pl-[6px]">{item.label}</span>
                </div>
              )
            })}
          </div>
        )
      }
    }
  ]
}
