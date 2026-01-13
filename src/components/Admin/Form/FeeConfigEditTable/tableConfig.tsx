import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import ProFormDigit from '../ProFormDigit'
import FormDoubleInputComp from './FormDoubleInputComp'

export const getColumns = (): ProColumns<any>[] => {
  const intl = useIntl()
  return [
    {
      title: intl.formatMessage({ id: 'mt.from' }),
      dataIndex: 'from',
      align: 'left',
      width: 160,
      valueType: 'digit',
      fieldProps: {
        min: 0,
        maxLength: 40
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' })
          }
        ]
      },
      renderFormItem(schema, config, form, action) {
        return <ProFormDigit fieldProps={{ min: 0, maxLength: 40, style: { height: 30 }, size: 'middle' }} />
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.to' }),
      align: 'left',
      dataIndex: 'to',
      width: 160,
      valueType: 'digit',
      fieldProps: {
        min: 0,
        maxLength: 40
      },
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      },
      renderFormItem(schema, config, form, action) {
        return <ProFormDigit fieldProps={{ min: 0, maxLength: 40, style: { height: 30 }, size: 'middle' }} />
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.jisuanmoshi' }),
      align: 'left',
      dataIndex: 'compute_mode',
      width: 180,
      valueType: 'select',
      formItemProps: {
        rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      },
      valueEnum: {
        currency: { text: <FormattedMessage id="mt.huobi" /> },
        percentage: { text: <FormattedMessage id="mt.baifenbi" /> }
      }
    },
    {
      title: intl.formatMessage({ id: 'mt.shijiayouxufei' }),
      align: 'left',
      dataIndex: 'market_fee',
      width: 160,
      valueType: 'text',
      fieldProps: {
        // min: 0,
        maxLength: 40,
        precision: undefined
      },
      renderFormItem(schema, config, form, action) {
        return <ProFormDigit fieldProps={{ maxLength: 40, style: { height: 30 }, size: 'middle' }} />
      }
      // formItemProps: {
      //   rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      // },
    },
    {
      title: intl.formatMessage({ id: 'mt.xianjiayouxufei' }),
      align: 'left',
      dataIndex: 'limit_fee',
      width: 160,
      valueType: 'text', // 用digit精度需要控制，否则展示被格式化掉
      fieldProps: {
        // min: 0,
        maxLength: 40,
        precision: undefined
      },
      renderFormItem(schema, config, form, action) {
        return <ProFormDigit fieldProps={{ maxLength: 40, style: { height: 30 }, size: 'middle' }} />
      }
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' })
      //     }
      //   ]
      // },
    },
    {
      title: intl.formatMessage({ id: 'mt.zuixiaozuidazhi' }),
      dataIndex: 'maxMinMap',
      align: 'left',
      width: 260,
      // formItemProps: {
      //   rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      // },
      // 最大最小值不是必填项
      renderFormItem: () => <FormDoubleInputComp />,
      renderText(text, record, index, action) {
        return (
          <div>
            {/* @ts-ignore */}
            {record?.maxMinMap?.min_value} - {record?.maxMinMap?.max_value}
          </div>
        )
      }
    }
  ]
}
