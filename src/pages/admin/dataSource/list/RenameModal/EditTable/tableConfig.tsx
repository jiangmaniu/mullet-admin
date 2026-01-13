import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<DataSource.DataSourceSubAliasListItem>[] => {
  const intl = useIntl()
  return [
    {
      title: intl.formatMessage({ id: 'mt.pinzhongmingcheng' }),
      dataIndex: 'alias',
      align: 'left',
      width: 120
    },
    {
      title: intl.formatMessage({ id: 'mt.shujuyuanpinzhongmingcheng' }),
      dataIndex: 'subscribe',
      align: 'left',
      width: 120,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      }
    }
  ]
}
