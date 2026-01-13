import { ProColumns, ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, getIntl } from '@umijs/max'
import { useState } from 'react'

import { getEnum } from '@/constants/enum'
import { updateABSwitch } from '@/services/api/version'
import { message } from '@/utils/message'

export const getColumns = (): ProColumns<Version.VersionItem>[] => {
  const [current, setCurrent] = useState({} as Version.VersionItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: <FormattedMessage id="mt.mingcheng" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'name',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
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
      title: <FormattedMessage id="mt.pingtai" />,
      dataIndex: 'platform',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.banbenhao" />,
      dataIndex: 'versionNumber',
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
        return text ? `v${text}` : '--'
      }
    },
    {
      title: <FormattedMessage id="mt.qudaohao" />,
      dataIndex: 'channelNumber',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      // valueEnum: getEnum().Enum.YesNo,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.shebei" />,
      dataIndex: 'device',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      valueEnum: getEnum().Enum.VersionDevice
    },
    {
      title: <FormattedMessage id="mt.zhuangtai" />,
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
      valueEnum: getEnum().Enum.VersionStatus
    },
    {
      title: <FormattedMessage id="mt.gengxinneirong" />,
      dataIndex: 'updateContent',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.xiazaidizhi" />,
      dataIndex: 'downloadUrl',
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
      title: <FormattedMessage id="mt.pingbiquyu" />,
      dataIndex: 'blockedRegionsName',
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
      title: <FormattedMessage id="mt.kaiqiweibmain" />,
      dataIndex: 'abControl',
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
        const isActive = record.abControl
        return (
          <ProFormSwitch
            fieldProps={{
              value: isActive,
              loading: record.id === current?.id && loading,
              onChange: (value) => {
                setLoading(true)
                setCurrent(record)
                updateABSwitch({
                  abControl: isActive ? false : true,
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
    {
      title: <FormattedMessage id="mt.beizhu" />,
      dataIndex: 'remark',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.chuangjianzhe" />,
      dataIndex: 'createdUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.gengxinshijian" />,
      dataIndex: 'updateTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    }
  ]
}
