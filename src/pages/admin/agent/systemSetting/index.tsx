import { ProCard } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { isAllSymbolByLng } from '@/components/Admin/AutoCompleteTree'
import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import { getEnum } from '@/constants/enum'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { agentSaveOrUpdate, settingsQueryInfo } from '@/services/api/agent/settings'
import { message } from '@/utils/message'

import LevelModeSetting from './LevelModeSetting'

export default function SystemSetting() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  const [activeKey, setActiveKey] = useState('LevelModeSetting')

  const tabList = [
    // @TODO 暂时不做
    // {
    //   label: intl.formatMessage({ id: 'mt.agent.mtpeizhi' }),
    //   key: 'SyncMtDataSetting',
    //   icon: 'pinzhongliebiao',
    //   component: SyncMtDataSetting,
    //   ref: useRef()
    // },
    {
      label: intl.formatMessage({ id: 'mt.agent.dailimoshishezhi' }),
      key: 'LevelModeSetting',
      icon: 'dailimoshishezhi',
      component: LevelModeSetting,
      ref: useRef()
    }
  ]

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const { loading, data: settingsQueryInfoRes, run: querySettings } = useRequest(settingsQueryInfo, { manual: true })
  const agentSettingsInfo = settingsQueryInfoRes?.data || {}

  const activeIcon = tabList.find((item) => item.key === activeKey)?.icon as string
  const IconDom = (
    <div className="border-gray-150 border-[2px] rounded-full w-[125px] h-[125px] flex items-center justify-center">
      <Iconfont name={activeIcon} width={40} height={40} />
    </div>
  )

  useEffect(() => {
    querySettings()
  }, [])

  return (
    <PageContainer
      tabList={tabList}
      icon="/img/emoji/21.png"
      renderRight={() => (
        <SaveButton
          onClick={async () => {
            const modeOptions = getEnum().enumToOptions('AgentModeSetting')
            // 校验表单
            const formData: any = await checkForm()

            console.log('formData', formData)

            // 表单校验成功
            if (formData) {
              const { levelMode, levelConfigVoList, commonMultiLevelConfigVOList, mul_table_item, ...params } = formData
              const values = {
                ...params,
                id: agentSettingsInfo.id,
                levelMode: (levelMode || []).join(',') || modeOptions?.[0]?.value,
                levelConfigDTOList: (levelConfigVoList || []).map((item: any) => {
                  if (item.id.indexOf('row_') !== -1) {
                    // 新增不要传表格id给后台，会自动生成
                    item.id = ''
                  }
                  if (item?.rebateConfigVOList?.length) {
                    item.rebateConfigDTOList = item.rebateConfigVOList.map((item: any) => {
                      if (item.id.indexOf('row_') !== -1) {
                        // 新增不要传表格id给后台，会自动生成
                        item.id = ''
                      }
                      return item
                    })
                    delete item.rebateConfigVOList
                  }
                  return item
                }),
                commonMultiLevelConfigDTOList: (commonMultiLevelConfigVOList || [])
                  .map((item: any) => {
                    if (item.id.indexOf('row_') !== -1) {
                      // 新增不要传表格id给后台，会自动生成
                      item.id = ''
                    }
                    return {
                      ...item,
                      symbol: isAllSymbolByLng(item.symbol) ? '*' : item.symbol
                    }
                  })
                  .map((item: any, idx: number) => ({ ...item, sortIndex: idx + 1 }))
              } as AgentSettings.SaveOrUpdateAgentSettings

              console.log('checkForm Success', values)

              setSaveLoading(true)
              const res = await agentSaveOrUpdate(values)
              if (res?.success) {
                message.info(intl.formatMessage({ id: 'common.saveSuccess' }))

                // 刷新数据
                querySettings()
              }
              setSaveLoading(false)
            }
          }}
          loading={saveLoading}
        />
      )}
      pageBgColorMode="gray"
      onChangeTab={(activeKey) => {
        startTransition(() => {
          setActiveKey(activeKey)
        })
      }}
      tabActiveKey={activeKey}
    >
      <ProCard bodyStyle={{ minHeight: 500, paddingTop: 30, paddingInline: 40 }}>
        <Spin spinning={loading}>
          <div className="flex items-start">
            <div className="mr-[60px]">{IconDom}</div>
            <div className="w-[80%]">
              {tabList.map((item: any, idx) => {
                const Component = item.component
                return (
                  <Hidden show={activeKey === item.key} key={idx}>
                    {useMemo(() => {
                      return <Component ref={item.ref} tabList={tabList} initialValues={agentSettingsInfo} />
                    }, [agentSettingsInfo])}
                  </Hidden>
                )
              })}
            </div>
          </div>
        </Spin>
      </ProCard>
    </PageContainer>
  )
}
