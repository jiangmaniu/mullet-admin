import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  return [
    {
      title: intl.formatMessage({ id: 'mt.canshu' }),
      dataIndex: 'key',
      align: 'left',
      editable: false,
      width: 200
    },
    {
      title: intl.formatMessage({ id: 'mt.zhi' }),
      dataIndex: 'value',
      align: 'left',
      width: 200
    }
  ]
}
