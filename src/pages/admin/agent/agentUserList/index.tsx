import { useIntl } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { useRequest } from 'ahooks'
import { useEffect, useMemo, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import StatisticCard from '@/components/Admin/StatisticCard'
import { AddButton } from '@/components/Base/Button'
import Iconfont from '@/components/Base/Iconfont'
import { useEnv } from '@/context/envProvider'
import { agentUserPageList, queryAgentCount, subUserListQueryList } from '@/services/api/agent/user'
import { updateTreeNodeChildren } from '@/utils/tree'

import AddAgentModalForm from './AddAgentModalForm'
import CommissionRecordModal from './CommissionRecordModal'
import RebateStandardModal from './RebateStandardModal'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const intl = useIntl()
  const { breakPoint } = useEnv()
  const instanceRef = useRef<Instance>()
  const [modalInfo, setModalInfo] = useState({} as AgentUser.AgentUserPageListItem)
  const rebateStandardModalRef = useRef<any>(null)
  const commissionRecordModalRef = useRef<any>(null)
  const addAgentModalFormRef = useRef<any>(null)
  const [expandedRowKeys, setExpandedRowKeys] = useState([])
  const [dataSource, setDataSource] = useState<AgentUser.AgentUserPageListItem[]>([])
  const [currentExpandRow, setCurrentExpandRow] = useState<AgentUser.AgentUserPageListItem>({})
  const [params, setParams] = useState<any>({})
  const isSmallScreen = breakPoint === 'xl'

  const { data: agentCountRes, run: featchAgentCount, loading: agentCountLoading } = useRequest(queryAgentCount, { manual: true })
  const agentCountData = agentCountRes?.data || {}

  const renderStaticCardItems = useMemo(() => {
    const staticCardItems = [
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
      },
      {
        label: <FormattedMessage id="mt.agent.yishixianyingkui" />,
        value: agentCountData?.profitLoss || 0,
        valueColor: agentCountData?.profitLoss ? (agentCountData?.profitLoss > 0 ? 'var(--color-green)' : 'var(--color-red)') : '',
        showAddSymbol: true
      },
      {
        label: <FormattedMessage id="mt.agent.mingxiakehuleijichanshengyongjin" />,
        value: agentCountData?.accumulatedCommission || 0,
        valueColor: agentCountData?.accumulatedCommission
          ? agentCountData?.accumulatedCommission > 0
            ? 'var(--color-green)'
            : 'var(--color-red)'
          : '',
        showAddSymbol: true
      },
      {
        label: <FormattedMessage id="mt.agent.yijiesuanyongjin" />,
        value: agentCountData?.settledCommission || 0,
        valueColor: agentCountData?.settledCommission
          ? agentCountData?.settledCommission > 0
            ? 'var(--color-green)'
            : 'var(--color-red)'
          : '',
        showAddSymbol: true
      },
      {
        label: <FormattedMessage id="mt.agent.weijiesuanyongjin" />,
        value: agentCountData?.unsettledCommission || 0,
        valueColor: agentCountData?.unsettledCommission
          ? agentCountData?.unsettledCommission > 0
            ? 'var(--color-green)'
            : 'var(--color-red)'
          : '',
        showAddSymbol: true
      }
    ]
    return (
      <StatisticCard
        cardProps={{ bordered: false }}
        style={{ width: '100%' }}
        subCardProps={{ ghost: true }}
        items={staticCardItems}
        direction="row"
        needFormatValue
      />
    )
  }, [intl.locale, agentCountData, isSmallScreen])

  const { data, loading, run } = useRequest(agentUserPageList, { manual: true })
  const records = data?.data?.records || []
  // @ts-ignore
  const reload = () => {
    // @ts-ignore
    run({ current: 1, size: 10 })
    // setExpandedRowKeys([])
  }

  // 获取子级请求
  const { run: fetchChildren, loading: fetchChildrenLoading } = useRequest(subUserListQueryList, {
    manual: true,
    onSuccess: (res, [params]) => {
      console.log('params', params)
      const children = res?.data || []
      if (children.length > 0) {
        console.log('children', children)
        const newData = updateTreeNodeChildren(
          dataSource,
          { id: params.userId },
          children.map((item) => {
            if (item.hasChildren) {
              // 空文件夹-行渲染一个展开按钮
              item.children = []
            }
            return item
          })
        )
        console.log('newData', newData)
        setDataSource(newData)
      }
    }
  })

  useEffect(() => {
    setDataSource(
      records.map((item) => {
        if (item.hasChildren) {
          // 空文件夹-行渲染一个展开按钮
          item.children = []
        }
        return item
      })
    )
  }, [data])

  // useEffect(() => {
  //   // 搜索关键词如果存在children，则展开搜索到的节点
  //   if (params?.userName || params?.userUid) {
  //     setExpandedRowKeys(getAllIdsWithChildren(records))
  //   }
  // }, [params, data])

  // console.log('dataSource', dataSource)
  const onShowCommissionRecordModal = (record: AgentUser.AgentUserPageListItem, jumpType?: 'GC') => {
    setModalInfo({
      ...record,
      // @ts-ignore
      jumpType
    })
    commissionRecordModalRef.current?.show()
  }

  return (
    <PageContainer icon="/img/emoji/21.png" pageBgColorMode="gray">
      <StandardTable<AgentUser.AgentUserPageListItem, AgentUser.AgentUserPageListParams>
        columns={getColumns(onShowCommissionRecordModal)}
        search={{ span: 4 }}
        // onEditItem={(record) => {
        //   console.log('record', record)
        // }}
        tableExtraRender={() => (
          <div className="flex items-end justify-between">
            <div className="flex gap-3 items-center">
              <AddButton onClick={() => addAgentModalFormRef.current?.show()}>
                <FormattedMessage id="mt.agent.tianjiadaili" />
              </AddButton>
              {/* <Export /> */}
            </div>
            <div className="text-sm">
              <Iconfont name="biaoshi" className="!size-[14px] mr-1" />
              <FormattedMessage id="mt.agent.huobidanwei" /> USD
            </div>
          </div>
        )}
        renderTableHeader={() => <div className="mb-4">{renderStaticCardItems}</div>}
        opColumnWidth={100}
        renderOptionColumn={(record) => {
          // 撤单：点击后二次弹窗确认是否撤单（仅在未成交或部分成交状态的订单处可以点击）
          return (
            <div className="flex gap-3 justify-end">
              {/* <a
                className="!text-brand font-medium text-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  // push(`/agent/agent-commission-record?agentId=${record.id}&userName=${record.userName || ''}`)
                  onShowCommissionRecordModal(record)
                }}
              >
                <FormattedMessage id="mt.agent.fanyongmingxi" />
              </a> */}
              <a
                className="!text-brand font-medium text-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log('record', record)
                  setModalInfo(record)
                  rebateStandardModalRef.current?.show()
                }}
              >
                <FormattedMessage id="mt.agent.fanyongbiaozhun" />
              </a>
            </div>
          )
        }}
        showOptionColumn
        // 代理用户
        params={{ userType: 'AGENT' }}
        // action={{
        //   query: (params) => {
        //     // 查询代理商统计
        //     featchAgentCount(params)

        //     return agentUserPageList({
        //       ...params
        //     })
        //   }
        // }}
        dataSource={dataSource}
        getInstance={(instance) => (instanceRef.current = instance)}
        beforeSearchSubmit={(params: any) => {
          setParams(params)
          setExpandedRowKeys([])
          featchAgentCount(params)
          run({
            ...params
          })
        }}
        loading={fetchChildrenLoading || loading}
        expandable={{
          onExpand: (expanded: boolean, record) => {
            console.log(expanded, record)
            setCurrentExpandRow(record)
            // 请求接口获取级数据
            if (expanded && record.hasChildren && (!record.children || record.children.length === 0)) {
              // 只有展开且没有子节点或子节点为空时才请求
              const { startTime, endTime } = params
              fetchChildren({ userId: record.id, startTime, endTime })
            }
          },
          onExpandedRowsChange: (expandedRowKeys: any) => {
            setExpandedRowKeys(expandedRowKeys)
          },
          expandRowByClick: true, // 点击行展开
          expandedRowKeys
          // expandIcon: ({ expandable, expanded, onExpand, record }) => {
          //   if(fetchChildrenLoading && record.id === currentExpandRow?.id) {
          //     return <LoadingOutlined />
          //   }
          //   return (
          //     expanded ? (
          //       <button type="button" onClick={e => onExpand(record, e)} className="ant-table-row-expand-icon ant-table-row-expand-icon-expanded" aria-label="關閉行" aria-expanded="true"></button>
          //     ) : (
          //       <button type="button" onClick={e => onExpand(record, e)} className="ant-table-row-expand-icon ant-table-row-expand-icon-collapsed" aria-label="展開行" aria-expanded="false"></button>
          //     )
          //   )
          // }
        }}
      />
      {/* 返佣标准 */}
      <RebateStandardModal info={modalInfo} ref={rebateStandardModalRef} onClose={() => setModalInfo({})} reload={reload} />
      {/* 添加代理 */}
      <AddAgentModalForm ref={addAgentModalFormRef} reload={reload} />
      {/* 佣金记录 */}
      <CommissionRecordModal info={modalInfo} ref={commissionRecordModalRef} onClose={() => setModalInfo({})} reload={reload} />
    </PageContainer>
  )
}
