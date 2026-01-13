import { ProFormText } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Col, Form, Row } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { transferWeekDay } from '@/constants/enum'
import { formatTimeStr } from '@/utils/business'

import EditModal from './comp/EditModal'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState<any[]>([])

  useImperativeHandle(ref, () => {
    return form
  })

  useEffect(() => {
    // 转换交易时间配置
    if (initialValues?.tradeTimeConf) {
      const tradeTimeConf = initialValues.tradeTimeConf
      setDataSource(tradeTimeConf)
    }
  }, [initialValues])

  useEffect(() => {
    // 默认值
    setDataSource([
      { weekDay: 'MONDAY', trade: [0, 1440], price: [0, 1440], isAlone: false },
      { weekDay: 'TUESDAY', trade: [0, 1440], price: [0, 1440], isAlone: false },
      { weekDay: 'WEDNESDAY', trade: [0, 1440], price: [0, 1440], isAlone: false },
      { weekDay: 'THURSDAY', trade: [0, 1440], price: [0, 1440], isAlone: false },
      { weekDay: 'FRIDAY', trade: [0, 1440], price: [0, 1440], isAlone: false },
      { weekDay: 'SATURDAY', trade: [0, 1440], price: [0, 1440], isAlone: false },
      { weekDay: 'SUNDAY', trade: [0, 1440], price: [0, 1440], isAlone: false }
    ])
  }, [])

  useEffect(() => {
    // 实时设置表单值
    form.setFieldValue('tradeTimeConf', dataSource)
  }, [dataSource])

  return (
    <Form
      onFinish={async (values) => {
        // console.log('onFinish values', values)
      }}
      onFinishFailed={(errorInfo) => {
        // console.log('onFinishFailed', errorInfo)
      }}
      onValuesChange={async (values) => {
        const newValues = { ...formData, ...values }
        setFormData(newValues)
        onValuesChange?.(newValues)
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="flex items-start flex-col w-full">
        <div className="text-base font-semibold pb-7">
          <FormattedMessage id="mt.symbol.shezhidanrijiaoyishijianduan.biaoti" />
        </div>
        <div className="w-full grid border border-gray-220 rounded-[15px]">
          <Row className="border-b border-gray-150">
            <Col span={4} className="text-primary py-4 text-sm font-semibold text-center border-r border-gray-150">
              <FormattedMessage id="mt.xingqi" />
            </Col>
            <Col span={9} className="text-primary py-4 text-sm font-semibold text-center border-r border-gray-150">
              <FormattedMessage id="mt.baojia" />
            </Col>
            <Col span={9} className="text-primary py-4 text-sm font-semibold text-center border-r border-gray-150">
              <FormattedMessage id="mt.jiaoyi" />
            </Col>
            <Col span={2} className="text-primary py-4 text-sm font-semibold text-center">
              <FormattedMessage id="common.op" />
            </Col>
          </Row>
          {dataSource.map((item, idx) => {
            const weekDayName = transferWeekDay(item?.weekDay)
            return (
              <Row key={idx} className="border-b last:border-none border-gray-150">
                <Col className="text-sm text-center py-[10px] text-primary border-r border-gray-150" span={4}>
                  {weekDayName}
                </Col>
                <Col className="text-sm text-center py-[10px] text-secondary border-r border-gray-150" span={9}>
                  {formatTimeStr(item.price)}
                </Col>
                <Col className="text-sm text-center py-[10px] text-secondary border-r border-gray-150" span={9}>
                  {formatTimeStr(item.trade)}
                </Col>
                <EditModal
                  trigger={
                    <Col className="text-sm text-center py-[10px] text-primary hover:text-blue cursor-pointer" span={2}>
                      <FormattedMessage id="common.bianji" />
                    </Col>
                  }
                  info={{
                    ...item,
                    weekDayName
                  }}
                  onFinish={(values: any) => {
                    // console.log('values', values)
                    setDataSource((data) =>
                      data.map((v) => {
                        if (v.weekDay === item.weekDay && values?.price?.length) {
                          v.trade = values.trade
                          v.price = values.price
                          v.isAlone = values.isAlone
                        }
                        return v
                      })
                    )
                  }}
                />
              </Row>
            )
          })}
        </div>
      </div>
      {/* 隐藏表单提交 */}
      <ProFormText hidden name="tradeTimeConf" />
    </Form>
  )
})
