import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import classNames from 'classnames'
import { useMemo, useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import StatisticCard from '@/components/Admin/StatisticCard'
import Iconfont from '@/components/Base/Iconfont'
import { useEnv } from '@/context/envProvider'
import { queryUserCount, queryUsersPageList } from '@/services/api/agent/user'

import BindAgentModalForm from './BindAgentModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const instanceRef = useRef<Instance>()
  const { breakPoint } = useEnv()
  const intl = useIntl()
  const isSmallScreen = breakPoint === 'xl'

  const reload = () => instanceRef.current?.action?.reload()

  const { data: agentCountRes, run: fetchUserCount } = useRequest(queryUserCount, { manual: true })
  const agentCountData = agentCountRes?.data || {}

  const renderStaticCardItems = useMemo(() => {
    const staticCardItems = [
      {
        label: <FormattedMessage id="mt.agent.dailikehushu" />,
        value: agentCountData?.numberOfCustomers || 0,
        noFormatValue: true
      },
      {
        label: <FormattedMessage id="mt.agent.zongrujin" />,
        value: agentCountData?.totalDeposit || 0
      },
      {
        label: <FormattedMessage id="mt.agent.zongchujin" />,
        value: agentCountData?.totalWithdrawal || 0
      },
      {
        label: <FormattedMessage id="mt.agent.jingrujin" />,
        value: agentCountData?.netDeposit || 0
      },
      {
        label: <FormattedMessage id="mt.agent.jiaoyishoushu" />,
        value: agentCountData?.tradingVolume || 0
      },
      {
        label: <FormattedMessage id="mt.agent.jiaoyishouxufei" />,
        value: agentCountData?.handlingFee || 0,
        valueColor: agentCountData?.handlingFee ? (agentCountData?.handlingFee > 0 ? 'var(--color-green)' : 'var(--color-red)') : '',
        showAddSymbol: true
      }
    ]
    return (
      <StatisticCard
        cardProps={{ bordered: false }}
        style={{ width: isSmallScreen ? '80%' : '60%' }}
        subCardProps={{ ghost: true }}
        items={staticCardItems}
        direction="row"
        needFormatValue
      />
    )
  }, [intl.locale, agentCountData, isSmallScreen])

  return (
    <PageContainer icon="/img/emoji/21.png" pageBgColorMode="gray">
      <div className="relative">
        <StandardTable<AgentUser.AgentUserPageListItem, AgentUser.AgentUserPageListParams>
          columns={getColumns()}
          search={{ span: 4 }}
          // onEditItem={(record) => {
          //   console.log('record', record)
          // }}
          // @TODO 暂时不支持
          // tableExtraRender={() => (
          //   <div className="flex gap-3 items-center">
          //     <Export />
          //   </div>
          // )}
          opColumnWidth={100}
          renderTableHeader={() => (
            <div className="mb-4 flex justify-between items-end">
              {renderStaticCardItems}
              <div className="text-sm">
                <Iconfont name="biaoshi" className="!size-[14px] mr-1" />
                <FormattedMessage id="mt.agent.huobidanwei" /> USD
              </div>
            </div>
          )}
          renderOptionColumn={(record) => {
            // 撤单：点击后二次弹窗确认是否撤单（仅在未成交或部分成交状态的订单处可以点击）
            return (
              <div className="flex gap-3 justify-end">
                <BindAgentModalForm
                  trigger={
                    <a
                      className={classNames(
                        'font-medium text-sm cursor-pointer',
                        !!record.agentId ? 'pointer-events-none !text-gray-900 opacity-40' : '!text-brand text-sm'
                      )}
                    >
                      <FormattedMessage id="mt.agent.bangdingdaili" />
                    </a>
                  }
                  reload={reload}
                  info={record}
                />
              </div>
            )
          }}
          showOptionColumn
          action={{
            query: (params) => {
              fetchUserCount(params)
              return queryUsersPageList({
                ...params
              })
            }
          }}
          getInstance={(instance) => (instanceRef.current = instance)}
        />
      </div>
    </PageContainer>
  )
}
