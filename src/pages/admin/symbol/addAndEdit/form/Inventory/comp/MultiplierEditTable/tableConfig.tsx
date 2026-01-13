import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  return [
    {
      title: intl.formatMessage({ id: 'mt.xingqi' }),
      dataIndex: 'weekDayName',
      align: 'center',
      width: 150,
      readonly: true
    },
    {
      title: intl.formatMessage({ id: 'mt.chengshu' }),
      align: 'center',
      dataIndex: 'num',
      width: 150,
      valueType: 'digit',
      fieldProps: {
        min: 0,
        max: 99
      },
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      }
    }
  ]
}
