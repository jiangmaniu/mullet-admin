import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  return [
    {
      title: intl.formatMessage({ id: 'mt.ipdizhi' }),
      dataIndex: 'ip',
      align: 'left',
      width: 200,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      }
    }
    // {
    //   title: intl.formatMessage({ id: 'mt.to' }),
    //   align: 'left',
    //   dataIndex: 'to',
    //   width: 150,
    //   formItemProps: {
    //     rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
    //   }
    // }
  ]
}
