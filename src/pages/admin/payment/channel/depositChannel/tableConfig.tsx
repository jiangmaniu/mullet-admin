import { ProColumns, ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import { useState } from 'react'

import { getEnum } from '@/constants/enum'
import { updateChannelConfigStatus } from '@/services/api/payment/channel'
import { message } from '@/utils/message'

export const getColumns = (): ProColumns<PaymentChannel.ChannelConfigListItem>[] => {
  const intl = useIntl()
  const [current, setCurrent] = useState({} as PaymentChannel.ChannelConfigListItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: <FormattedMessage id="mt.qudaomingcheng" />,
      dataIndex: 'channelName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.zhifutongdao" />,
      dataIndex: 'channelRevealName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.zhifutongdaobianhao" />,
      dataIndex: 'channelNo',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.qudaobizhong" />,
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    // {
    //   title: <FormattedMessage id="mt.qudaoleixing" />,
    //   dataIndex: 'channelName',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150
    // },
    {
      title: <FormattedMessage id="mt.shoukuanleixing" />,
      dataIndex: 'collectionType',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueEnum: getEnum().Enum.PaymentChannelCollectionType
    },
    {
      title: <FormattedMessage id="mt.jizhuihuobi" />,
      dataIndex: 'baseCurrency',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.quanzhongpaixu" />,
      dataIndex: 'channelSort',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.kehurujinshouxufei" />,
      dataIndex: 'userTradePercentageFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 180,
      renderText(text, record, index, action) {
        const userSingleFixedFee = record?.userSingleFixedFee || 0
        const userSingleLeastFee = record?.userSingleLeastFee || 0
        const fee = userSingleFixedFee > userSingleLeastFee ? userSingleFixedFee : userSingleLeastFee
        return (
          <div>
            <div>
              {intl.formatMessage({ id: 'mt.zonge' })}：{record.userTradePercentageFee}%
            </div>
            <div>
              {intl.formatMessage({ id: 'mt.danbi' })}：{fee}
            </div>
          </div>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.danbirujinxianzhi" />,
      dataIndex: 'singleAmountMax',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        return !!record.singleAmountMin && !!record.singleAmountMax ? (
          <div>
            {record.singleAmountMin}-{record.singleAmountMax}
          </div>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.kaiguan" />,
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        const isActive = record.status === 'OPEN'
        return (
          <ProFormSwitch
            fieldProps={{
              value: record.status === 'OPEN',
              loading: record.id === current?.id && loading,
              onChange: (value) => {
                setLoading(true)
                setCurrent(record)
                updateChannelConfigStatus({
                  status: isActive ? 'CLOSE' : 'OPEN',
                  fundsType: 'DEPOSIT',
                  id: record.id
                })
                  .then((res) => {
                    if (res.success) {
                      // 刷新表格数据
                      action?.reload()
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

    // 表单搜索项
    {
      dataIndex: 'channelName',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.qudaomingcheng' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'symbol',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.qudaobizhong' })
      },
      colSize: 0.9
    }
  ]
}
