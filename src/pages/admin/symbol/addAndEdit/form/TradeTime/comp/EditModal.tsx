import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useParams, useSearchParams } from '@umijs/max'
import { forwardRef, useEffect, useState } from 'react'

import Modal from '@/components/Admin/ModalForm'
import MultiTimeSlider from '@/components/Admin/MultiTimeSlider'
import { groupBy } from '@/utils'
import { message } from '@/utils/message'

type IProps = {
  trigger: JSX.Element
  info?: any
  onFinish: (values: any) => void
}

function EditModal({ trigger, info, onFinish }: IProps, ref: any) {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({
    isAlone: false, // 启用单独交易时段
    price: [0, 360], //报价时间
    trade: [0, 360] // 交易时间
  })

  let [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const id = params.id
  const isEdit = !!id

  const symbolName = isEdit ? searchParams.get('title')?.split('_').at(-1) : ''

  useEffect(() => {
    // 编辑回显数据
    if (info?.price?.length) {
      setFormData({
        ...formData,
        isAlone: info.isAlone,
        price: info?.price,
        trade: info?.trade
      })
    }
  }, [info])

  return (
    <Modal
      trigger={trigger}
      width={690}
      title={<FormattedMessage id="mt.shezhijiaoyishijianduan" />}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values) => {
        // 启用单独交易时段
        if (formData.isAlone) {
          if (formData.price?.length !== formData.trade?.length) {
            message.info(intl.formatMessage({ id: 'mt.tradeTimeSettingTip1' }))
            return false
          }
          // 判断交易时间是否选择在报价时间段范围内
          // tradeTime、price格式[0,360,720...] 分钟格式
          const priceGroup = groupBy(formData.price, 2) // 两个一组，分段区间的开始和结尾值
          const tradeGroup = groupBy(formData.trade, 2) // 两个一组，分段区间的开始和结尾值
          let checkFlag = false
          for (let i = 0; i < priceGroup.length; i++) {
            const [priceStart, priceEnd] = priceGroup[i] as any
            const [tradeStart, tradeEnd] = tradeGroup[i] as any
            if (tradeStart < priceStart || tradeEnd > priceEnd) {
              checkFlag = true
            }
          }
          if (checkFlag) {
            message.info(intl.formatMessage({ id: 'mt.tradeTimeSettingTip2' }))
            return false
          }
        } else {
          // 报价时间和交易时间一致
          formData.trade = formData.price
        }

        // console.log('formData', formData)

        onFinish?.(formData)

        return true // true关闭弹窗
      }}
      afterClose={() => {
        // 重置表單
      }}
    >
      <div className="text-primary text-base font-semibold pb-3">
        {symbolName ? symbolName + '：' : ''}
        {info.weekDayName}
      </div>
      <div className="text-secondary text-sm leading-6 pb-7">
        <FormattedMessage id="mt.shezhijiaoyishijianduanTips" />
      </div>
      <div className="pb-5">
        <MultiTimeSlider
          label={
            <div className="text-base text-primary pb-2">
              <FormattedMessage id="mt.baojia" />
            </div>
          }
          onChange={(value) => {
            setFormData({ ...formData, price: value })
          }}
          value={formData?.price || []}
        />
      </div>
      <div>
        <MultiTimeSlider
          label={
            <div className="text-base text-primary pb-2">
              <FormattedMessage id="mt.jiaoyi" />
            </div>
          }
          // showDefaultMarks={false}
          // max={formData.price?.at(-1)}
          // min={formData.price?.[0]}
          disabled={!formData.isAlone}
          onChange={(value) => {
            setFormData({ ...formData, trade: value })
          }}
          value={formData?.trade || []}
        />
      </div>
      <div className="flex items-center pt-5">
        <ProFormSwitch
          fieldProps={{
            value: formData.isAlone,
            onChange: (value) => {
              setFormData({ ...formData, isAlone: value })
            }
          }}
        />
        <span className="text-primary text-sm pl-3">
          <FormattedMessage id="mt.qiyongdandujiaoyishiduan" />
        </span>
      </div>
    </Modal>
  )
}

export default forwardRef(EditModal)
