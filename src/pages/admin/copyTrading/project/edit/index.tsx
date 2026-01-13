import { ProFormSelect } from '@ant-design/pro-components'
import { getIntl, history, useIntl, useParams } from '@umijs/max'
import { BaseOptionType } from 'antd/es/cascader'
import { useEffect, useMemo, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import Iconfont from '@/components/Base/Iconfont'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { tradeFollowLeadInfo, tradeFollowListLeads } from '@/services/api/tradeFollow/lead'
import { tradeFollowSettings } from '@/services/api/tradeFollow/project'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import CopyTrading from './comp/CopyTrading'
import Overview from './comp/Overview'
import Profit from './comp/Profit'
import Setting from './comp/Setting'
import TakeOrder from './comp/TakeOrder'

const Selector = ({ options }: { options: BaseOptionType[] }) => {
  return (
    <ProFormSelect
      options={options}
      width={180}
      placeholder={getIntl().formatMessage({ id: 'mt.qingxuanze' })}
      fieldProps={{ style: { height: 36 } }}
      onChange={(value) => {
        console.log(value)
        value && push(`/copy-trading/project/edit/${value}`)
      }}
      className="!mb-3"
    />
  )
}

export default function AddAndEdit() {
  const intl = useIntl()
  const [saveLoading, setSaveLoading] = useState(false)

  const hash = history.location.hash?.replace(/^#/, '')

  const [activeKey, setActiveKey] = useState(hash || 'Overview')
  const { id } = useParams()
  // const id = params.id
  const isAdd = !id

  const [options, setOptions] = useState<BaseOptionType[]>([])

  const selector = useMemo(() => <Selector options={options} />, [options])

  const [leadInfo, setLeadInfo] = useState<TradeFollowLead.TradeFollowLeadInfoItem>()

  useEffect(() => {
    // 请求关联的带单账号列表
    id &&
      tradeFollowListLeads({ leadId: String(id) })
        .then((res) => {
          if (res.success) {
            const options = res.data
              ?.filter((d: any) => d.leadId !== id)
              ?.map((i: any) => ({ value: i.leadId, label: `${i.projectName} [${i.leadId}]` }))
            setOptions(options || [])
          }
        })
        .catch((err) => {
          message.info(getIntl().formatMessage({ id: 'mt.qingqiushibai' }))
        })
  }, [id])

  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.gailan' }),
      key: 'Overview',
      icon: 'qiehuan-gailan',
      component: Overview,
      ref: useRef(),
      props: {
        children: selector
      }
    },
    {
      label: intl.formatMessage({ id: 'mt.shezhi' }),
      key: 'Setting',
      icon: 'caidan-shezhi',
      component: Setting,
      ref: useRef(),
      props: {
        leadInfo,
        children: selector
      }
    },
    {
      label: intl.formatMessage({ id: 'mt.gendan' }),
      key: 'CopyTrading',
      icon: 'dingbucaidan-gendan',
      component: CopyTrading,
      ref: useRef(),
      props: {
        active: activeKey === 'CopyTrading'
      }
    },
    {
      label: intl.formatMessage({ id: 'mt.daidan' }),
      key: 'TakeOrder',
      icon: 'daidan',
      component: TakeOrder,
      ref: useRef(),
      props: {
        active: activeKey === 'TakeOrder'
      }
    },
    // TODO: 暂时隐藏
    // {
    //   label: intl.formatMessage({ id: 'mt.zijinliushui' }),
    //   key: 'Funds',
    //   icon: 'zijinliushui',
    //   component: Funds,
    //   ref: useRef(),
    //   props: {}
    // },
    {
      label: intl.formatMessage({ id: 'mt.fenrun' }),
      key: 'Profit',
      icon: 'fenrun',
      component: Profit,
      ref: useRef(),
      props: {
        active: activeKey === 'Profit'
      }
    }
  ]

  useEffect(() => {
    console.log('tabList', tabList)
  }, [tabList])

  const info = {}

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const isNoFullScreen = ['Setting'].includes(activeKey)

  const activeIcon = tabList.find((item) => item.key === activeKey)?.icon as string
  const IconDom = (
    <div className="border-gray-150 border-[2px] rounded-full w-[125px] h-[125px] flex items-center justify-center">
      <Iconfont name={activeIcon} width={40} height={40} />
    </div>
  )

  useEffect(() => {
    tradeFollowLeadInfo({
      leadId: String(id)
    })
      .then((res) => {
        if (res.success) {
          setLeadInfo(res.data)
        }
      })
      .catch(() => {
        message.info(intl.formatMessage({ id: 'mt.qingqiushibai' }))
      })
  }, [id])

  return (
    <PageContainer
      tabList={tabList}
      showBack
      onBack={() => {
        push(`/copy-trading/project`)
      }}
      tabPersistence
      icon="/img/emoji/22.png"
      pageTitle={leadInfo?.projectName}
      subTitle={
        <div className="max-w-[800px]">
          {leadInfo?.projectDesc} #{leadInfo?.id}
        </div>
      }
      pageBgColorMode="gray"
      contentStyle={{ paddingTop: 15, paddingInline: 36 }}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
      tabActiveKey={activeKey}
      renderRight={() => (
        <>
          {['Setting'].includes(activeKey) && (
            <SaveButton
              onClick={async () => {
                // 校验表单
                const formData = await checkForm()

                // 表单校验成功
                if (formData) {
                  const values = {
                    ...formData
                    // id: info?.id,
                  }

                  console.log('checkForm Success', values)

                  tradeFollowSettings({ ...values, leadId: id })
                    .then((res) => {
                      if (res.success) {
                        message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                        return
                      }
                      console.log(res)
                      message.info(getIntl().formatMessage({ id: 'common.opFailed' }))
                    })
                    .catch((err) => {
                      console.log(err)
                      // message.info(intl.formatMessage({ id: 'common.saveFail' }))
                      message.info(getIntl().formatMessage({ id: 'common.opFailed' }))
                    })

                  // setSaveLoading(true)
                  // const reqFn = isAdd ? addAccountGroup : updateAccountGroup
                  // const res = await reqFn(values)
                  // if (res.success) {
                  // message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                  // push('/account-group/real')
                  // }
                  // setSaveLoading(false)
                }
              }}
              loading={saveLoading}
            />
          )}
        </>
      )}
    >
      {tabList.map((item: any, idx) => {
        const Component = item.component
        return (
          <Hidden show={activeKey === item.key} key={idx}>
            <Component ref={item.ref} initialValues={info} icon={IconDom} {...item.props} />
          </Hidden>
        )
      })}
    </PageContainer>
  )
}
