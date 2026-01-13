import { ProColumns, ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { useState } from 'react'

import { switchDataSourceStatus } from '@/services/api/dataSource'
import { message } from '@/utils/message'

export const getColumns = (reload: () => void): ProColumns<DataSource.DataSourceListItem>[] => {
  const intl = useIntl()
  const [current, setCurrent] = useState({} as Symbol.SymbolListItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: <FormattedMessage id="mt.paixu" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'num',
      hideInSearch: false, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 100,
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: 'Code',
      dataIndex: 'code',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.mingcheng" />,
      dataIndex: 'name',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.lianjiezhuangtai" />,
      dataIndex: 'connectStatus',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100,
      renderText(text, record, index, action) {
        return (
          <div>
            {record.connectStatus === 'CONNECTING' ? (
              <div className="flex items-center gap-x-1">
                <img src="/img/wifi-on.png" className="size-4" />
                <FormattedMessage id="mt.zaixian" />
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <img src="/img/wifi-off.png" className="size-4" />
                <FormattedMessage id="mt.duankai" />
              </div>
            )}
          </div>
        )
      }
    },
    // {
    //   title: <FormattedMessage id="mt.hangqingyuandizhi" />,
    //   dataIndex: 'address',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150
    // },
    {
      title: <FormattedMessage id="mt.yingyongpinzhong" />,
      dataIndex: 'symbols',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.shangcilianjiechenggong" />,
      dataIndex: 'lastConnectTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.qiyongzhuangtai" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      renderText(text, record, index, action) {
        // @ts-ignore
        const isActive = record.status === 'ENABLE'
        return (
          <ProFormSwitch
            fieldProps={{
              // @ts-ignore
              value: record.status === 'ENABLE',
              loading: record.id === current?.id && loading,
              onChange: (value) => {
                setLoading(true)
                // @ts-ignore
                setCurrent(record)
                switchDataSourceStatus({
                  id: record.id as string,
                  status: isActive ? 'DISABLED' : 'ENABLE'
                })
                  .then((res) => {
                    if (res.success) {
                      // 刷新表格数据
                      reload?.()
                      message.info(getIntl().formatMessage({ id: 'common.opSuccess' }))
                    }
                  })
                  .finally(() => {
                    setTimeout(() => {
                      setLoading(false)
                    }, 300)
                  })
              }
            }}
          />
        )
      }
    },

    {
      title: <FormattedMessage id="mt.paixu" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'sort',
      hideInSearch: false, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100,
      align: 'center'
    }
  ]
}
