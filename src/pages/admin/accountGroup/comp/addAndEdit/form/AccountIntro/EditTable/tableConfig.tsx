import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  return [
    {
      title: intl.formatMessage({ id: 'mt.biaoti' }),
      dataIndex: 'title',
      align: 'left',
      width: 200,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      },
      fieldProps: { showCount: true, maxLength: 10 }
    },
    {
      title: intl.formatMessage({ id: 'mt.neirong' }),
      dataIndex: 'content',
      align: 'left',
      width: 260,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      },
      fieldProps: { showCount: true, maxLength: 10 }
    }
  ]
}
