import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'

export const getColumns = (): ProColumns<AgentUser.LevelListItem>[] => {
  const intl = useIntl()

  return [
    {
      title: intl.formatMessage({ id: 'mt.agent.dengjimingcheng' }),
      align: 'left',
      dataIndex: 'levelName',
      width: 150
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.jiaoyishoushu' }),
      dataIndex: 'tradeVolume',
      align: 'left',
      width: 150,
      renderText(text, record, index, action) {
        return text ? `>=${text}` : 0
      }
      // formItemProps: {
      //   rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      // },
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.jiaoyirenshu' }),
      dataIndex: 'userCount',
      align: 'left',
      width: 150,
      renderText(text, record, index, action) {
        return text ? `>=${text}` : 0
      }
      // formItemProps: {
      //   rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      // },
    },
    {
      title: <>{intl.formatMessage({ id: 'mt.agent.jingrujin' })}(USD)</>,
      dataIndex: 'netDeposit',
      align: 'left',
      width: 150,
      renderText(text, record, index, action) {
        return text ? `>=${text}` : 0
      }
      // formItemProps: {
      //   rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      // },
    },
    {
      title: <>{intl.formatMessage({ id: 'mt.agent.jingzhi' })}(USD)</>,
      dataIndex: 'netValue',
      align: 'left',
      width: 150,
      renderText(text, record, index, action) {
        return text ? `>=${text}` : 0
      }
      // formItemProps: {
      //   rules: [{ required: true, message: intl.formatMessage({ id: 'mt.cixiangweibitianxiang' }) }]
      // },
    },
    {
      title: intl.formatMessage({ id: 'mt.agent.dengjipingguzhouqi' }),
      dataIndex: 'evaluationPeriod',
      align: 'left',
      width: 150,
      valueEnum: getEnum().Enum.AgentLevelCircle
    }
  ]
}
