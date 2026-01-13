import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { getEnv } from '@/env'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'
import { getFundsMethodPageList } from '@/services/api/wallet'

export const getColumns = (): ProColumns<CustomerGroup.ListItem>[] => {
  const env = getEnv()
  const intl = useIntl()
  const language = intl.locale.replace('-', '').replace('_', '').toUpperCase() as Wallet.Language

  return [
    {
      title: <FormattedMessage id="mt.yewuxianming" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'groupName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 150
    },
    {
      title: <FormattedMessage id="mt.yewuxianbianhao" />,
      dataIndex: 'code',
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
      title: <FormattedMessage id="mt.zhongduanfangwendizhi" />,
      dataIndex: 'url',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        const code = record.code
        return code ? `${env.BASE_URL}?code=${code}` : '--'
      }
    },
    {
      title: <FormattedMessage id="mt.zhanghu" />,
      dataIndex: 'accountGroupId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      valueType: 'select',
      request: async () => {
        const res = await getAccountGroupPageList({
          size: 1000,
          current: 1
        })
        return (res.data?.records || []).map((item) => ({ label: item.groupName, value: item.id }))
      },
      className: '!pl-5',
      width: 240
    },
    {
      title: <FormattedMessage id="mt.kycrenzheng" />,
      dataIndex: 'kycAuth',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      // valueEnum: getEnum().Enum.YesNo,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueType: 'select',
      valueEnum: getEnum().Enum.KycAuthType,
      className: '!pl-5'
    },
    {
      title: <FormattedMessage id="mt.zhucefangshi" />,
      dataIndex: 'registerWay',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      // valueEnum: getEnum().Enum.YesNo,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      valueType: 'select',
      valueEnum: getEnum().Enum.RegisterWay,
      className: '!pl-5'
    },
    {
      title: <FormattedMessage id="mt.rujinqudao" />,
      dataIndex: 'payWay',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueType: 'select',
      request: async () => {
        const res = await getFundsMethodPageList({
          size: 1000,
          current: 1,
          fundsType: 'DEPOSIT',
          language
        })
        return (res.data?.records || []).map((item) => ({ label: item.channelRevealName, value: item.id }))
      },
      className: '!pl-5'
    },
    {
      title: <FormattedMessage id="mt.chujinqudao" />,
      dataIndex: 'withdrawalWay',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueType: 'select',
      request: async () => {
        const res = await getFundsMethodPageList({
          size: 1000,
          current: 1,
          fundsType: 'WITHDRAWAL',
          language
        })
        return (res.data?.records || []).map((item) => ({ label: item.channelRevealName, value: item.id }))
      },
      className: '!pl-5'
    },
    {
      title: <FormattedMessage id="mt.beizhu" />,
      dataIndex: 'remark',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },

    // 表单搜索项
    {
      dataIndex: 'groupName',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[140px]',
        placeholder: useIntl().formatMessage({ id: 'mt.yewuxianming' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'dateRange',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      valueType: 'dateRange',
      fieldProps: {
        className: '!w-[250px]',
        placeholder: [useIntl().formatMessage({ id: 'mt.kaishishijian' }), useIntl().formatMessage({ id: 'mt.jieshushijian' })]
      },
      colSize: 0.9
    }
  ]
}
