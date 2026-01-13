import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import Modal from '@/components/Admin/Modal'
import Hidden from '@/components/Base/Hidden'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import {
  getAccountGroupConfigDetail,
  switchAccountGroupSymbolDefault,
  updateAccountGroupConfig
} from '@/services/api/tradeCore/accountGroup'
import { transformTradeFeeSubmit, transformTradeInventorySubmit, transformTradePrepaymentConfSubmit } from '@/utils/business'
import { message } from '@/utils/message'

import Fee from './form/Fee'
import Inventory from './form/Inventory'
import Permission from './form/Permission'
import PrePay from './form/PrePay'
import Regular from './form/Regular'

type IProps = {
  info?: AccountGroup.AccountGroupSymbolPageListItem
  onFinish?: (values: any) => void
  onClose?: () => void
  open?: boolean
  reload?: () => void
}

export default function ModalForm({ info, open, onFinish, onClose, reload }: IProps) {
  const intl = useIntl()
  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.changgui' }),
      key: 'Regular',
      icon: 'qiehuan-zuquanxian',
      component: Regular,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.quanxian' }),
      key: 'Permission',
      icon: 'qiehuan-jingliquanxian',
      component: Permission,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.yufukuan' }),
      key: 'PrePay',
      icon: 'qiehuan-yufukuan',
      component: PrePay,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.kucunfei' }),
      key: 'Inventory',
      icon: 'qiehuan-kucunfei',
      component: Inventory,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.shouxufei' }),
      key: 'Fee',
      icon: 'shouxufei',
      component: Fee,
      ref: useRef()
    }
  ]
  const [activeKey, setActiveKey] = useState(tabList[0]?.key)

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const symbolConfId = info?.symbolConfId
  const { run, data, loading } = useRequest(getAccountGroupConfigDetail, { manual: true })
  const detailInfo = data?.data
  useEffect(() => {
    if (symbolConfId) {
      run({ id: symbolConfId })
    }
  }, [symbolConfId])

  return (
    <Modal
      open={open}
      title={
        <div>
          <span className="text-primary text-base font-semibold">
            {/* <span className="text-sm text-primary pl-3">{info?.symbols}</span> */}
            <FormattedMessage id="mt.bianjipeizhi" />
          </span>
        </div>
      }
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 校验表单
        const formData: any = await checkForm()
        // 表单校验成功
        if (formData) {
          const values = {
            ...formData,
            id: info?.symbolConfId,
            accountGroupSymbolsId: info?.id,
            // 点差配置
            spreadConf: JSON.stringify(formData.spreadConf || {}),
            // 预付款配置
            prepaymentConf: transformTradePrepaymentConfSubmit(formData.prepaymentConf || {}),
            // 交易时间配置
            // tradeTimeConf: transformTradeTimeSubmit(formData.tradeTimeConf),
            // 手续费配置
            transactionFeeConf: transformTradeFeeSubmit(formData.transactionFeeConf),
            // 报价配置
            // quotationConf: JSON.stringify(formData.quotationConf || {}),
            // 库存费配置
            holdingCostConf: transformTradeInventorySubmit(formData.holdingCostConf)
          } as AccountGroup.UpdateAccountGroupConfig
          console.log('checkForm Success', values)

          const res = await updateAccountGroupConfig({ ...values })
          const success = res.success
          if (success) {
            // 保存后，切换到自定义配置
            await switchAccountGroupSymbolDefault({
              isDefault: false,
              id: info?.id as number
            })

            message.info(intl.formatMessage({ id: 'common.saveSuccess' }))

            // 刷新列表
            reload?.()
          }
          return success // 关闭弹窗
        }
        return false
      }}
      tabList={tabList}
      tabActiveKey={activeKey}
      onChangeTab={(activeKey) => {
        setActiveKey(activeKey)
      }}
      onCancel={() => {
        onClose?.()
      }}
      afterClose={() => {
        // 关闭弹窗，重置tabKey到第一项选中
        setActiveKey(tabList[0]?.key)
        onClose?.()
      }}
    >
      <Spin spinning={loading}>
        {tabList.map((item: any, idx) => {
          const Component = item.component
          return (
            <Hidden show={activeKey === item.key} key={idx}>
              <Component ref={item.ref} initialValues={detailInfo} />
            </Hidden>
          )
        })}
      </Spin>
    </Modal>
  )
}
