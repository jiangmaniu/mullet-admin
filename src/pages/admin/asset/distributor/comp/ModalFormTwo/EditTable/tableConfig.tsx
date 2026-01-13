import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  return [
    {
      title: intl.formatMessage({ id: 'mt.bizhong' }),
      dataIndex: 'test1',
      align: 'left',
      width: 150,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      },
      readonly: true,
      fixed: 'left'
    },
    {
      title: intl.formatMessage({ id: 'mt.danbizuixiaorujinjine' }),
      align: 'left',
      dataIndex: 'test2',
      width: 200,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.danbizuidarujinjine' }),
      align: 'left',
      dataIndex: 'te2st3',
      width: 200,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.dangrizuidakejiaoyibishu' }),
      align: 'left',
      dataIndex: 'tes1t4',
      width: 200,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.shouxufei' }),
      align: 'left',
      dataIndex: 'tei2st5',
      width: 150,
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      }
    }
  ]
}
