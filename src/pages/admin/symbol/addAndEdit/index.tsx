import { FormattedMessage, useIntl, useParams, useSearchParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useRef, useState, useTransition } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import Hidden from '@/components/Base/Hidden'
import IconUpload from '@/components/Base/IconUpload'
import useCheckTabsForm from '@/hooks/useCheckTabsForm'
import { addSymbol, getSymbolDetail, updateSymbol } from '@/services/api/tradeCore/symbol'
import {
  formatMultipleValueSubmit,
  transformTradeFeeSubmit,
  transformTradeInventorySubmit,
  transformTradePrepaymentConfSubmit,
  transformTradeTimeSubmit
} from '@/utils/business'
import { deleteEmptyProperty } from '@/utils/helpers'
import { message } from '@/utils/message'

import Currency from './form/Currency'
import Fee from './form/Fee'
import Inventory from './form/Inventory'
import PrePay from './form/PrePay'
import QuotePrice from './form/QuotePrice'
import Regular from './form/Regular'
import Trade from './form/Trade'
import TradeTime from './form/TradeTime'

export default function Add() {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const intl = useIntl()
  const uploadIconRef = useRef<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('Regular')
  const tabList = [
    {
      label: intl.formatMessage({ id: 'mt.changgui' }),
      key: 'Regular',
      icon: 'qiehuan-changgui',
      component: Regular,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.huobi' }),
      key: 'Currency',
      icon: 'qiehuan-huobi',
      component: Currency,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.jiaoyi' }),
      key: 'Trade',
      icon: 'qiehuan-jiaoyi',
      component: Trade,
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
      label: intl.formatMessage({ id: 'mt.jiaoyishijian' }),
      key: 'TradeTime',
      icon: 'qiehuan-jiaoyishijian',
      component: TradeTime,
      ref: useRef()
    },
    {
      label: intl.formatMessage({ id: 'mt.baojia' }),
      key: 'QuotePrice',
      icon: 'baojia',
      component: QuotePrice,
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

  let [searchParams, setSearchParams] = useSearchParams()
  const breadcrumbItems = searchParams
    .get('title')
    ?.split('_')
    .map((item) => ({ title: <span className="text-lg">{item}</span> }))

  const params = useParams()
  const id = params.id
  const isAdd = !id
  const title = searchParams.get('title')

  // 批量提交表单
  const { checkForm } = useCheckTabsForm({
    tabList,
    setActiveKey
  })

  const { loading, data, run } = useRequest(getSymbolDetail, { manual: true })
  const info = data?.data || {}

  useEffect(() => {
    if (id) {
      run({ id })
    }
  }, [id])

  return (
    <PageContainer
      tabList={tabList}
      showBack
      icon="/img/emoji/9.png"
      // pageTitle={
      //   <Breadcrumb items={breadcrumbItems} separator={<span className="text-[rgba(0,0,0,0.45)] text-base relative top-[2px]">/</span>} />
      // }
      pageTitle={<>{isAdd ? <FormattedMessage id="mt.addSymbol" /> : title}</>}
      renderRight={() => (
        <SaveButton
          onClick={async () => {
            uploadIconRef?.current?.checkField?.()

            const imgUrl = uploadIconRef.current?.fileName
            if (!imgUrl) return message.info(intl.formatMessage({ id: 'mt.qingshangchuantupian' }))

            // 校验表单
            const formData: any = await checkForm()

            console.log('formData', formData)

            // 表单校验成功
            if (formData) {
              const { subSymbol, ...params } = formData
              const values = {
                ...params,
                subSymbol: subSymbol || null,
                id,
                imgUrl,
                // 订单类型多选处理
                orderType: formatMultipleValueSubmit(formData?.orderType),
                // 点差配置
                spreadConf: JSON.stringify(formData.spreadConf || {}),
                // 预付款配置
                prepaymentConf: transformTradePrepaymentConfSubmit(formData.prepaymentConf || {}),
                // 交易时间配置
                tradeTimeConf: transformTradeTimeSubmit(formData.tradeTimeConf),
                // 手续费配置
                transactionFeeConf: transformTradeFeeSubmit(formData.transactionFeeConf),
                // 报价配置
                quotationConf: JSON.stringify(deleteEmptyProperty(formData.quotationConf || {})),
                // 库存费配置
                holdingCostConf: transformTradeInventorySubmit(formData.holdingCostConf)
              }

              console.log('checkForm Success', values)

              setSaveLoading(true)
              const reqFn = isAdd ? addSymbol : updateSymbol
              const res = await reqFn(values)
              if (res.success) {
                message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
                history.back()
              }
              setSaveLoading(false)
            }
          }}
          loading={saveLoading}
        />
      )}
      pageBgColorMode="white"
      contentStyle={{ paddingTop: 57 }}
      onChangeTab={(activeKey) => {
        startTransition(() => {
          setActiveKey(activeKey)
        })
      }}
      tabActiveKey={activeKey}
    >
      <Spin spinning={loading}>
        <div className="flex items-start">
          <div className="mr-[60px]">
            <IconUpload value={info.imgUrl} ref={uploadIconRef} />
          </div>
          <div className="w-[80%]">
            {tabList.map((item: any, idx) => {
              const Component = item.component
              return (
                <Hidden show={activeKey === item.key} key={idx}>
                  <Component ref={item.ref} tabList={tabList} initialValues={info} />
                </Hidden>
              )
            })}
          </div>
        </div>
      </Spin>
    </PageContainer>
  )
}
