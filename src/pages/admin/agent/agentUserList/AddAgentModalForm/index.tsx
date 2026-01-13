import { QuestionCircleOutlined } from '@ant-design/icons'
import { ProForm } from '@ant-design/pro-components'
import { FormattedHTMLMessage, FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, Spin, Tooltip } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import { isAllSymbolByLng } from '@/components/Admin/AutoCompleteTree'
import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import Modal from '@/components/Admin/ModalForm'
import Tabs from '@/components/Admin/Tabs'
import Hidden from '@/components/Base/Hidden'
import { getEnum } from '@/constants/enum'
import { settingsQueryInfo } from '@/services/api/agent/settings'
import { addAgent, levelConfigList, multiLevelConfigList } from '@/services/api/agent/user'
import { message } from '@/utils/message'

import MulLevelModeEditTable from '../../systemSetting/LevelModeSetting/MulLevelModeEditTable'
import LevelRebateConfigTable from '../LevelRebateConfigTable'

type IProps = {
  trigger?: JSX.Element
  info?: CustomerGroup.ListItem
  reload?: () => void
  onClose?: () => void
}

function ModalForm({ trigger, info, reload, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const [activeKey, setActiveKey] = useState<'single' | 'multiple'>('single')
  const [levelModeOpen, setLevelModeOpen] = useState(false)

  const { data: settingsInfoRes, loading: settingsQueryInfoLoading } = useRequest(settingsQueryInfo)
  const { data: levelConfigRes, loading: levelConfigLoading } = useRequest(levelConfigList)
  const { data: multiLevelConfigRes, loading: multiLevelConfigLoading } = useRequest(multiLevelConfigList)
  const loading = settingsQueryInfoLoading || levelConfigLoading || multiLevelConfigLoading
  const multiLevelConfigData = useMemo(() => multiLevelConfigRes?.data || [], [multiLevelConfigRes])
  const levelConfigOptions = useMemo(
    () =>
      (levelConfigRes?.data || []).map((item) => ({
        label: item.levelName,
        value: item.id
      })),
    [levelConfigRes]
  )
  const settingsInfo = useMemo(() => settingsInfoRes?.data || {}, [settingsInfoRes])

  const show = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  useImperativeHandle(ref, () => {
    return {
      show,
      close
    }
  })

  useEffect(() => {
    form.setFieldsValue(info)
  }, [info])

  useEffect(() => {
    form.setFieldValue(
      'multiLevelConfigDTOList',
      (multiLevelConfigData || []).sort((a: any, b: any) => a.sortIndex - b.sortIndex)
    )
  }, [multiLevelConfigData, open])

  useEffect(() => {
    form.setFieldValue('userUid', undefined)
  }, [open])

  useEffect(() => {
    form.setFieldValue('levelId', levelConfigOptions[0]?.value)
  }, [levelConfigOptions])

  useEffect(() => {
    form.setFieldValue('levelMode', settingsInfo.levelMode)
    setActiveKey(settingsInfo?.levelMode?.[0] === 'multiple' ? 'multiple' : 'single')
  }, [settingsInfo])

  const modeOptions = getEnum().enumToOptions('AgentModeSetting')
  const levelMode = Form.useWatch('levelMode', form) || [modeOptions?.[0]?.value]
  const levelId = Form.useWatch('levelId', form) || ''

  const tabsList = [
    {
      label: <FormattedMessage id="mt.agent.dengjimoshifanyong" />,
      key: 'single',
      show: levelMode.includes('single')
    },
    {
      label: <FormattedMessage id="mt.agent.duocengjimoshifanyong" />,
      key: 'multiple',
      show: levelMode.includes('multiple')
    }
  ].filter((item) => item.show)

  return (
    <>
      {open && (
        <Modal
          trigger={trigger}
          open={open}
          showHeaderBg
          // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
          onFinish={async () => {
            const { mul_table_item, multiLevelConfigDTOList, levelMode, ...values } = (await form.validateFields()) || {}
            const params = {
              ...values,
              levelMode: (levelMode || []).join(',') || modeOptions?.[0]?.value,
              multiLevelConfigDTOList: (multiLevelConfigDTOList || []).map((item: any, idx: number) => {
                if (item.id.indexOf('row_') !== -1) {
                  // 新增不要传表格id给后台，会自动生成
                  item.id = ''
                }
                return {
                  ...item,
                  sortIndex: idx + 1,
                  symbol: isAllSymbolByLng(item.symbol) ? '*' : item.symbol
                }
              })
            } as AgentUser.AddAgentParams
            const res = await addAgent(params)
            const success = res.success

            console.log('values', values)

            if (success) {
              message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
              reload?.()
              close()
            }

            return success
          }}
          // initialValues={initialValues}
          onCancel={close}
          afterClose={() => {
            onClose?.()
          }}
          form={form}
          width={1100}
          layout="vertical"
          renderTitle={() => {
            return (
              <div className="w-full">
                <div className="text-primary font-semibold text-lg mb-5">
                  <FormattedMessage id="mt.agent.tianjiadaili" />
                </div>
                {!loading && (
                  <ProForm form={form} layout="vertical" submitter={false}>
                    <div className="w-full grid grid-cols-3 gap-x-[20px] gap-y-5">
                      <ProFormDigit
                        required
                        name="userUid"
                        label={intl.formatMessage({ id: 'mt.agent.putongyonghuuid' })}
                        fieldProps={{
                          maxLength: 8,
                          precision: undefined,
                          controls: false
                        }}
                      />
                      <ProFormSelect
                        name="levelMode"
                        // required
                        // mode="multiple"
                        disabled={true}
                        label={intl.formatMessage({ id: 'mt.agent.dailimoshi' })}
                        // @ts-ignore
                        options={(settingsInfo.levelMode || []).map((item) => {
                          return {
                            value: item,
                            label:
                              item === 'single' ? (
                                <FormattedMessage id="mt.agent.dengjimoshi" />
                              ) : (
                                <FormattedMessage id="mt.agent.duocengjimoshi" />
                              )
                          }
                        })}
                        initialValue={'single'}
                        allowClear={false}
                        fieldProps={{
                          open: levelModeOpen,
                          onDropdownVisibleChange: (open) => setLevelModeOpen(open),
                          onChange: (value: any) => {
                            setLevelModeOpen(false)
                            setActiveKey((value || []).includes('single') ? 'single' : 'multiple')
                          }
                        }}
                      />
                      {levelMode.includes('single') && (
                        <ProFormSelect
                          name="levelId"
                          required
                          label={intl.formatMessage({ id: 'mt.agent.dailidengji' })}
                          options={levelConfigOptions}
                          allowClear={false}
                        />
                      )}
                    </div>
                  </ProForm>
                )}
              </div>
            )
          }}
          contentStyle={{ paddingInline: 0, paddingTop: 0 }}
          hiddenSubmitter={loading}
        >
          {loading && (
            <div className="min-h-[260px] flex items-center justify-center">
              <Spin spinning />
            </div>
          )}
          {!loading && (
            <>
              {tabsList.length >= 2 && (
                <Tabs
                  tabList={tabsList}
                  hiddenBottomLine={false}
                  style={{ marginBottom: 20 }}
                  tabBarGutter={30}
                  tabBarStyle={{ paddingLeft: 30 }}
                  activeKey={activeKey}
                  onChangeTab={(key: any) => setActiveKey(key)}
                />
              )}
              <div className="px-6 min-h-[260px]">
                {tabsList.length === 1 && (
                  <div className="text-base font-semibold mb-3">
                    {activeKey === 'single' && <FormattedMessage id="mt.agent.dengjimoshifanyong" />}
                    {activeKey === 'multiple' && (
                      <div>
                        <FormattedMessage id="mt.agent.duocengjimoshifanyong" />
                        <Tooltip title={<FormattedHTMLMessage id="mt.agent.fanyongshuoming" />} styles={{ body: { width: 650 } }}>
                          <QuestionCircleOutlined style={{ marginLeft: 5, fontSize: 14 }} />
                        </Tooltip>
                      </div>
                    )}
                  </div>
                )}
                {!!tabsList.length && (
                  <>
                    {/* 等级模式 */}
                    <Hidden show={activeKey === 'single'}>
                      <LevelRebateConfigTable levelId={levelId} />
                    </Hidden>
                    {/* 多层级模式 */}
                    <Hidden show={activeKey === 'multiple'}>
                      <div className="relative -top-4">
                        <MulLevelModeEditTable form={form} name="multiLevelConfigDTOList" />
                      </div>
                    </Hidden>
                  </>
                )}
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default forwardRef(ModalForm)
