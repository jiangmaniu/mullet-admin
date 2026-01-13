import { ProFormText } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Col, Divider, Form, Input, Row } from 'antd'
import { FormInstance } from 'antd/lib'
import { debounce } from 'lodash'
import { observer } from 'mobx-react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import Empty from '@/components/Base/Empty'
import Iconfont from '@/components/Base/Iconfont'
import { useStores } from '@/context/mobxProvider'
import { getDataSourceSymbolList } from '@/services/api/market/dataSource'
import { cn } from '@/utils/cn'
import { getCurrentQuote } from '@/utils/wsUtil'

type IProps = {
  data: DataSource.SymbolListItem[]
  name: string
  form: FormInstance
  onSelect: (item: any) => void
  getSymbolList: any
}

// 选择品种
function SelectSymbol({ onSelect, form, name, data = [], getSymbolList }: IProps, ref: any) {
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [currentRow, setCurrentRow] = useState<any>({})
  const { ws } = useStores()

  const dataSourceSymbol = Form.useWatch('dataSourceSymbol', form) // 回显值
  const dataSourceCode = Form.useWatch('dataSourceCode', form) || form.getFieldValue('dataSourceCode')

  // 编辑的时候返回dataSourceSymbol，从列表中获取完整信息回显到列表中展示，列表是分页的
  const getCurrentSelectSymbolInfo = async () => {
    // 如果首次查询的data中存在dataSourceSymbol，则直接回显
    const rowData = data.find((item) => item.symbol === dataSourceSymbol) || {}
    if (rowData.symbol) {
      return setCurrentRow(rowData)
    }
    // 否则请求接口查询回显的品种信息
    if (!dataSourceSymbol) return
    const res = await getDataSourceSymbolList({ dataSourceCode, symbol: dataSourceSymbol, size: 1, current: 1 })
    if (res?.success) {
      setCurrentRow(res?.data?.records[0] || {})
    }
  }

  useImperativeHandle(ref, () => {
    return {
      reset: () => {
        setCurrentRow({})
        form.resetFields(['dataSourceSymbol'])
      }
    }
  })

  useEffect(() => {
    getCurrentSelectSymbolInfo()
  }, [dataSourceSymbol])

  const inputRootClassName = useEmotionCss(({ token }) => {
    return {
      '&:focus-within': {
        boxShadow: 'none !important'
      }
    }
  })

  const renderRow = (item: DataSource.SymbolListItem) => {
    const isActive = item.symbol === dataSourceSymbol
    const quoteInfo = getCurrentQuote({
      dataSourceCode: item.dataSourceCode,
      symbol: item.symbol,
      digits: item.pricePrecision,
      from: 'DataSourceList'
    })
    return (
      <Row
        className={cn('flex items-center py-[10px] px-[6px] cursor-pointer hover:bg-gray-50 rounded-md', {
          'bg-gray-50': isActive
        })}
        onClick={() => {
          setCurrentRow(item)
          onSelect?.(item)
          form.setFieldValue(name, item.symbol)
        }}
      >
        <Col span={7} className="flex items-center">
          <Iconfont
            name={isActive ? 'gouxuan-xuanzhong' : 'a-gouxuanwei'}
            width={18}
            height={18}
            color={isActive ? 'var(--color-brand-primary)' : '#dadada'}
          />
          <span className="text-primary font-semibold text-sm pl-3 relative -top-[2px]">{item.name}</span>
        </Col>
        <Col span={7} className="!flex items-center">
          <div className="rounded-md px-[5px] py-[3px] bg-green-800 text-white text-center !font-dingpro-medium text-xs">
            {quoteInfo?.ask}
          </div>
        </Col>
        <Col span={3}>
          <div className="text-primary text-center text-xs font-semibold">{quoteInfo?.spread || 0}</div>
        </Col>
        <Col span={7} className="!flex justify-end">
          <div className="rounded-md text-center py-[3px] px-[5px] bg-red-700 text-white !font-dingpro-medium text-xs">
            {quoteInfo?.bid}
          </div>
        </Col>
      </Row>
    )
  }

  return (
    <div className="mt-5">
      <div className="border border-gray-150 rounded-lg">
        <div className="px-2 py-1">
          <Input
            bordered={false}
            onChange={debounce((e) => {
              const newValue = e.target.value
              setSearchValue(newValue)
              getSymbolList?.(newValue)
            }, 400)}
            rootClassName={inputRootClassName}
            allowClear
            placeholder={intl.formatMessage({ id: 'mt.sousuopinzhong' })}
            size="large"
          />
        </div>
        <div className="border-b border-gray-150 w-full"></div>
        <div className="px-3 pt-3 pb-1">
          <Row className="mb-4">
            <Col span={7} className="text-gray-400 text-xs pl-[6px]">
              <FormattedMessage id="mt.symbol" />
            </Col>
            <Col span={7} className="text-gray-400 text-xs">
              <FormattedMessage id="mt.ask" />
            </Col>
            <Col span={3} className="text-gray-400 text-xs text-center">
              <FormattedMessage id="mt.diancha" />
            </Col>
            <Col span={7} className="text-gray-400 text-xs text-right pr-[5px]">
              <FormattedMessage id="mt.bid" />
            </Col>
          </Row>
          {/* 展示选中的项目 */}
          {currentRow.symbol && (
            <>
              {renderRow(currentRow)}
              <Divider style={{ marginBlock: 6 }} />
            </>
          )}

          <div className="max-h-[220px] overflow-y-auto">
            {/* 排除已选的 */}
            {(data || [])
              .filter((item) => item.symbol !== dataSourceSymbol)
              .map((item: any, idx: number) => {
                return <div key={idx}>{renderRow(item)}</div>
              })}
            {data?.length === 0 && <Empty />}
          </div>
        </div>
      </div>
      {name && <ProFormText name={name} hidden />}
    </div>
  )
}

export default observer(forwardRef(SelectSymbol))
