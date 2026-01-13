import { QuestionCircleOutlined } from '@ant-design/icons'
import { ProForm } from '@ant-design/pro-components'
import { FormattedHTMLMessage, FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Dropdown, Form, Spin, Tooltip } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { isAllSymbolByLng } from '@/components/Admin/AutoCompleteTree'
import ModalForm from '@/components/Admin/ModalForm'
import Tabs from '@/components/Admin/Tabs'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import { settingsQueryInfo } from '@/services/api/agent/settings'
import { rebateStandardsQueryList, updateRebateConfig } from '@/services/api/agent/user'
import { cn } from '@/utils/cn'
import { message } from '@/utils/message'

import MulLevelModeEditTable from '../../systemSetting/LevelModeSetting/MulLevelModeEditTable'
import LevelRebateConfigTable from '../LevelRebateConfigTable'

type IProps = {
  trigger?: JSX.Element
  info?: AgentUser.AgentUserPageListItem
  reload?: () => void
  onClose?: () => void
}

type ISegmentProps = {
  activeKey?: AgentUser.UserType
  /**只展示激活的item */
  onlyShowActive?: boolean
  name: NamePath
  form: FormInstance
  /**是否展示升级机构客户文案 */
  showUpgradeText?: boolean
}

const SegmentComp = ({ activeKey, onlyShowActive, name, form, showUpgradeText }: ISegmentProps) => {
  const [tabActiveKey, setTabActiveKey] = useState('USER')
  const tabs = [
    {
      key: 'USER',
      title: <FormattedMessage id="mt.agent.putongyonghu" />
    },
    {
      key: 'AGENT',
      title: showUpgradeText ? <FormattedMessage id="mt.agent.shengjidailiyonghu" /> : <FormattedMessage id="mt.agent.dailiyonghu" />
    }
  ].filter((item) => (!onlyShowActive ? true : onlyShowActive && item.key === activeKey))

  useEffect(() => {
    if (activeKey) {
      setTabActiveKey(activeKey)
    }
  }, [activeKey])

  return (
    <Form.Item name={name} noStyle>
      <div className={cn('flex items-center rounded p-1', !onlyShowActive && 'bg-[#424242]')}>
        {tabs.map((item, idx) => (
          <div
            className={cn('text-sm px-3 rounded cursor-pointer', item.key === tabActiveKey ? 'text-white bg-black' : 'text-primary')}
            key={idx}
            onClick={() => {
              setTabActiveKey(item.key)
              form?.setFieldValue?.(name, item.key)
            }}
          >
            {item.title}
          </div>
        ))}
      </div>
    </Form.Item>
  )
}

// 返佣标准
function RebateStandardModal({ trigger, info, reload, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const modalRef = useRef<any>(null)
  const [activeKey, setActiveKey] = useState<'single' | 'multiple'>('single')

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

  const { data: settingsRes } = useRequest(settingsQueryInfo)
  const settingsData = settingsRes?.data || {}
  const gradeOptions = (settingsData.levelConfigVoList || []).map((item) => ({
    ...item,
    key: item.id,
    label: item.levelName
  }))

  // 查询返佣标准
  const {
    data: RebateStandardsQueryListRes,
    run: queryRebateStandardsQueryList,
    loading
  } = useRequest(rebateStandardsQueryList, { manual: true })
  const rebateStandardInfo = RebateStandardsQueryListRes?.data || {}

  useEffect(() => {
    if (info?.id) {
      queryRebateStandardsQueryList({ userId: info?.id })
    }
  }, [info])

  useEffect(() => {
    form.setFieldsValue({
      ...rebateStandardInfo,
      multiLevelConfigDTOList: (rebateStandardInfo?.multiLevelConfigVOList || [])?.sort((a: any, b: any) => a.sortIndex - b.sortIndex)
    })
  }, [rebateStandardInfo])

  const RequirementItems = [
    {
      value: `>=${rebateStandardInfo?.tradeVolume || 0}`,
      label: (
        <>
          <FormattedMessage id="mt.agent.jiaoyishoushu" />
        </>
      )
    },
    {
      value: `>=${rebateStandardInfo?.netDeposit || 0}`,
      label: (
        <>
          <FormattedMessage id="mt.agent.jingrujin" />
          (USD)
        </>
      )
    },
    {
      value: `>=${rebateStandardInfo?.userCount || 0}`,
      label: (
        <>
          <FormattedMessage id="mt.agent.jiaoyirenshu" />(<FormattedMessage id="mt.agent.ge" />)
        </>
      )
    },
    {
      value: `>=${rebateStandardInfo?.netValue || 0}`,
      label: (
        <>
          <FormattedMessage id="mt.agent.jingzhi" />
          (USD)
        </>
      )
    }
  ]

  const levelMode = info?.levelMode?.split(',') || []
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

  useEffect(() => {
    setActiveKey(info?.levelMode === 'multiple' ? 'multiple' : 'single')
  }, [info?.levelMode])

  useEffect(() => {
    setTimeout(() => {
      form.setFieldValue('userType', info?.userType)
    }, 300)
  }, [info])

  const userType = Form.useWatch('userType', form)
  const levelId = Form.useWatch('levelId', form) || info?.levelId
  const levelName = useMemo(() => {
    return gradeOptions.find((item) => item.id === levelId)?.label || '--'
  }, [levelId, gradeOptions])

  console.log('userType', userType)

  // 等级模式头部
  const renderGradeModeHeader = () => {
    return (
      <div className="min-h-[100px] relative z-[1] flex items-end justify-between gap-x-8 p-5">
        <div className="flex flex-col items-center justify-center">
          <div>
            <img src="/img/grade-icon.png" className="size-[120px]" />
          </div>
          <Form.Item name="levelId" initialValue={levelId} noStyle>
            <Dropdown
              menu={{
                // @ts-ignore
                items: gradeOptions,
                onClick: ({ key }) => {
                  console.log('key', key)
                  form.setFieldValue('levelId', key)
                },
                activeKey: levelId
              }}
              overlayStyle={{ width: 120 }}
            >
              <div className="text-base pt-3 cursor-pointer">
                <span className="pr-1">{levelName}</span>
                <Iconfont name="bianji" className="!size-4" color="var(--color-text-primary)" />
              </div>
            </Dropdown>
          </Form.Item>
        </div>
        <div className="flex-1">
          <div className="text-xl pb-2">
            <FormattedMessage id="mt.agent.dailixingming" />：{info?.userName}
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-sm text-primary">
              <FormattedMessage id="mt.agent.kehuleixing" />
            </span>
            <SegmentComp
              // onlyShowActive={info?.levelMode === 'single' || info?.levelMode === 'multiple'}
              // 机构用户默认选择机构用户，不展示tabs切换
              onlyShowActive
              activeKey={info?.userType}
              name="userType"
              form={form}
            />
          </div>
          <div className="mt-8 flex items-start gap-x-[60px]">
            <div className="flex items-start flex-col">
              <div className="flex flex-col mb-3">
                <div className="text-xs pb-[2px]">
                  <FormattedMessage id="mt.agent.jiaoyirenshu" />
                </div>
                <div className="text-xs flex items-center">
                  {rebateStandardInfo.achievedUserCount || 0} /{' '}
                  <span className="text-gray-500 mx-1">
                    {rebateStandardInfo.userCount || 0} <FormattedMessage id="mt.agent.ge" />
                  </span>
                  {Number(rebateStandardInfo.achievedUserCount) >= Number(rebateStandardInfo.userCount) && (
                    <Iconfont name="xuanzhong" color="var(--color-text-primary)" className="!size-4" />
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs pb-[2px]">
                  <FormattedMessage id="mt.agent.jingzhi" />
                </div>
                <div className="text-xs flex items-center">
                  {rebateStandardInfo.achievedNetValue || 0} / <span className="text-gray-500 mr-1">{rebateStandardInfo.netValue} USD</span>
                  {Number(rebateStandardInfo.achievedNetValue) >= Number(rebateStandardInfo.netValue) && (
                    <Iconfont name="xuanzhong" color="var(--color-text-primary)" className="!size-4" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-start flex-col">
              <div className="flex flex-col mb-3">
                <div className="text-xs pb-[2px]">
                  <FormattedMessage id="mt.agent.jiaoyishoushu" />
                </div>
                <div className="text-xs flex items-center">
                  {rebateStandardInfo.achievedTradeVolume || 0} /{' '}
                  <span className="text-gray-500 mx-1">
                    {rebateStandardInfo.tradeVolume} <FormattedMessage id="mt.agent.lot" />
                  </span>
                  {Number(rebateStandardInfo.achievedTradeVolume) >= Number(rebateStandardInfo.tradeVolume) && (
                    <Iconfont name="xuanzhong" color="var(--color-text-primary)" className="!size-4" />
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs pb-[2px]">
                  <FormattedMessage id="mt.agent.jingrujin" />
                </div>
                <div className="text-xs">
                  {rebateStandardInfo.achievedNetDeposit || 0} /{' '}
                  <span className="text-gray-500 mr-1">{rebateStandardInfo?.netDeposit} USD</span>
                  {Number(rebateStandardInfo.achievedNetDeposit) >= Number(rebateStandardInfo.netDeposit) && (
                    <Iconfont name="xuanzhong" color="var(--color-text-primary)" className="!size-4" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 非等级模式
  const renderUnGradeModeHeader = () => {
    return (
      <div className="relative z-[1] py-4 min-h-[100px]">
        <div className="text-xl pb-2">
          <FormattedMessage id="mt.agent.dailixingming" />：{info?.userName || '--'}
        </div>
        {levelMode.includes('single') && rebateStandardInfo?.levelName && (
          <div className="text-base pb-2">
            <span className="text-gray-500">
              <FormattedMessage id="mt.agent.shangjidailidengji" />：
            </span>
            <span className="text-primary">{rebateStandardInfo?.levelName}</span>
          </div>
        )}
        <div className="flex items-center gap-x-3">
          <span className="text-sm text-primary">
            <FormattedMessage id="mt.agent.kehuleixing" />
          </span>
          <SegmentComp
            // levelMode只存在一种情况下：普通用户等级模式或者机构用户多层级模式
            // onlyShowActive={
            //   (info?.levelMode === 'single' && info?.userType === 'USER') || (info?.levelMode === 'multiple' && info?.userType === 'AGENT')
            // }
            onlyShowActive={info?.userType === 'USER' || (info?.levelMode === 'multiple' && info?.userType === 'AGENT')}
            activeKey={info?.userType}
            name="userType"
            form={form}
            // 如果是普通用户，多层级模式，则展示升级机构按钮文案
            // showUpgradeText={info?.userType === 'USER' && levelMode.includes('multiple')}
          />
        </div>
      </div>
    )
  }

  return (
    <ModalForm
      trigger={trigger}
      open={open}
      showHeaderBg
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 可以提交的情况
        // 普通用户-多层级模式
        // 普通用户-等级-多层级模式
        // 机构用户-多层级模式
        // 机构用户-等级-多层级模式

        const { multiLevelConfigDTOList, ...values } = (await form.validateFields()) || {}
        const userType = values.userType as AgentUser.UserType
        const params = {
          agentId: info?.agentId,
          userId: info?.id,
          userType,
          multiLevelConfigDTOList: (multiLevelConfigDTOList || []).map((item: any, idx: number) => {
            if (item.id.indexOf('row_') !== -1) {
              // 新增不要传表格id给后台，会自动生成
              item.id = ''
            }
            return {
              ...item,
              sortIndex: idx + 1
            }
          })
        } as AgentUser.UpdateRebateConfigParams

        // 选择了普通用户 不能提交 只能升级机构用户
        if (userType === 'USER') {
          close()
          return true
        }

        const onSave = async () => {
          // 机构用户
          if (userType === 'AGENT') {
            // 等级模式
            if (levelMode.includes('single')) {
              params.levelId = values.levelId
            }
            // 多层级模式
            if (levelMode.includes('multiple')) {
              params.multiLevelConfigDTOList = (multiLevelConfigDTOList || []).map((item: any, idx: number) => {
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
            }
          }

          console.log('params', params)

          const res = await updateRebateConfig(params)
          const success = res.success

          if (success) {
            if (!params.multiLevelConfigDTOList?.length) {
              message.info(intl.formatMessage({ id: 'mt.agent.shanchufanyongpeizhitips' }))
            } else {
              message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
            }

            close()
            // 不需要重载，否则会导致表格层级展开数据丢失
            // reload?.()
          } else {
            // 重置表格原始数据
            form?.setFieldValue?.(
              'multiLevelConfigDTOList',
              (rebateStandardInfo?.multiLevelConfigVOList || [])?.sort((a: any, b: any) => a.sortIndex - b.sortIndex)
            )
          }
        }

        onSave()

        // Modal.confirm({
        //   title: intl.formatMessage({ id: 'mt.agent.weixintishi' }),
        //   content: `${intl.formatMessage({ id: 'mt.agent.querenshengjiweijigoukehuma' })}?`,
        //   centered: true,
        //   onOk: async () => {
        //     console.log('确定')

        //     onSave()
        //   }
        // })

        return false
      }}
      // initialValues={initialValues}
      onCancel={close}
      afterClose={() => {
        onClose?.()
        setActiveKey('single')
      }}
      width={1080}
      // headerBgColor="linear-gradient(180deg, #161617 0%, #313131 100%)"
      renderTitle={() => {
        return (
          <div className="w-full">
            {/* <div className="absolute -top-[43px] -left-[17px]">
              <img src="/img/grade-header-bg.png" className="w-[283px] h-[236px]" />
            </div> */}
            <div className="flex justify-between w-full relative z-[1]">
              <div className="font-semibold text-lg">
                <FormattedMessage id="mt.agent.fanyongbiaozhun" />
              </div>
              {/* <div className="cursor-pointer" onClick={() => close()}>
                <img src="/img/close-icon.png" className="!size-[29px]" />
              </div> */}
            </div>
            <ProForm form={form} submitter={false}>
              {/* 机构用户，包含等级模式 */}
              {info?.userType === 'AGENT' && levelMode.includes('single') ? renderGradeModeHeader() : renderUnGradeModeHeader()}
            </ProForm>
          </div>
        )
      }}
      contentStyle={{ paddingInline: 0, paddingTop: 0 }}
      form={form}
      hiddenSubmitter={loading}
    >
      <Spin spinning={loading}>
        {/* 机构用户等级模式展示 */}
        {info?.userType === 'AGENT' && levelMode.includes('single') && (
          <div className="w-full mb-4 px-5">
            <div className="text-base font-semibold mb-4 pt-2">
              <FormattedMessage id="mt.agent.zigeyaoqiu" />
            </div>
            <div className="flex items-center gap-x-4">
              {RequirementItems.map((item, idx) => (
                <div className="rounded-[16px] bg-gray-125 py-4 px-8 flex items-center justify-center flex-col" key={idx}>
                  <div className="text-lg font-semibold mb-[2px]">{item.value}</div>
                  <div className="text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full">
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
          <div className="px-6">
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
                  <LevelRebateConfigTable dataSourceData={rebateStandardInfo?.rebateConfigVOList || []} />
                </Hidden>
                {/* 多层级模式 */}
                <Hidden show={activeKey === 'multiple'}>
                  <div className="relative -top-4">
                    <MulLevelModeEditTable
                      hideOptionColumn={userType === 'USER'}
                      // 普通用户 或者 非一级代理
                      hideAddBtn={userType === 'USER' || info?.agentId !== '0'}
                      form={form}
                      name="multiLevelConfigDTOList"
                      key={userType}
                      hiddenDragBtn
                      hiddenDeleteBtn={info?.agentId !== '0'}
                      canEditForm={false}
                    />
                  </div>
                </Hidden>
              </>
            )}
          </div>
        </div>
      </Spin>
    </ModalForm>
  )
}

export default forwardRef(RebateStandardModal)
