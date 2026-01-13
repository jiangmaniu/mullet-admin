import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

import FormDoubleInputComp from './comp/FormDoubleInputComp'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  return [
    {
      title: intl.formatMessage({ id: 'mt.gangganbeishu' }),
      align: 'left',
      dataIndex: 'maxMinMap',
      width: 180,
      // formItemProps: {
      //   rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      // },
      renderFormItem: () => <FormDoubleInputComp />,
      renderText(text, record, index, action) {
        return (
          <div>
            {/* @ts-ignore */}
            {record?.maxMinMap?.lever_start_value}X - {record?.maxMinMap?.lever_end_value}X
          </div>
        )
      }
    },
    {
      title: (
        <>
          {intl.formatMessage({ id: 'mt.chicangmingyijiazhi' })}/{intl.formatMessage({ id: 'mt.shoushu' })}
        </>
      ),
      dataIndex: 'bag_nominal_value',
      align: 'left',
      width: 180,
      fieldProps: {
        // suffix: 'USD'
      }
      // formItemProps: {
      //   rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      // },
    }
  ]
}
