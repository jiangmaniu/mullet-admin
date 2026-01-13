import { FormattedMessage, useIntl } from '@umijs/max'
import { Form, FormInstance } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useStores } from '@/context/mobxProvider'
import useClickOutside from '@/hooks/useOnClickOutside'
import { getDataSourceAll, getDataSourceSymbolList } from '@/services/api/market/dataSource'
import { formatNum } from '@/utils'
import { getCurrentQuote } from '@/utils/wsUtil'

import ProFormSelect from '../ProFormSelect'
import SelectDataSource from './SelectDataSource'
import SelectSymbol from './SelectSymbol'

type IProps = {
  form: FormInstance
  initialValues?: any
}

/**
 * 用于创建品种页面选择数据源、品种
 * @returns
 */
export default function DataSourceSelectFormItem({ form, initialValues }: IProps) {
  const intl = useIntl()
  const { ws } = useStores()
  const [open, setOpen] = useState(false)

  const boxRef = useRef<any>()
  const selectSymbolRef = useRef<any>()
  const [dataSource, setDataSource] = useState<DataSource.QuoteDataSourceItem[]>([]) // 数据源
  const [currentSymbolList, setCurrentSymbolList] = useState<any>([]) // 根据数据源选择展示当前品种列表
  const [recommandItem, setRecommandItem] = useState<DataSource.SymbolListItem>({}) // 根据输入的symbol匹配推荐的数据源

  const customSymbolName = Form.useWatch('symbol', form) // 监听常规里面的自定义输入的品种名称
  const dataSourceCode = Form.useWatch('dataSourceCode', form) || form.getFieldValue('dataSourceCode') // 监听选择的数据源

  useClickOutside([boxRef], () => {
    setOpen(false)
  })

  // 查询数据源列表
  const getDataSource = async () => {
    const res = await getDataSourceAll()
    const data = (res.data || []) as DataSource.QuoteDataSourceItem[]
    setDataSource(data)
  }

  const getSymbolList = async (symbol?: string) => {
    const res = await getDataSourceSymbolList({ dataSourceCode, symbol, size: 100, current: 1 })
    setCurrentSymbolList(res?.data?.records || [])
  }

  useEffect(() => {
    getDataSource()

    // 重新连接行情
    ws.reconnect()

    return () => {
      // 关闭行情
      ws.close()
    }
  }, [])

  useEffect(() => {
    // 根据数据源获取品种列表
    if (dataSourceCode) {
      getSymbolList()
      // 编辑回显设置展示值
      setDataSourceName()
    }
  }, [dataSourceCode])

  useEffect(() => {
    const code = initialValues?.dataSourceCode
    // 回显展示数据源名称
    if (code) {
      setDataSourceName(code)
      // 设置dataSourceCode
      form.setFieldValue('dataSourceCode', code)
    }
  }, [initialValues])

  // 监控用户输入的自定义名称，来模糊匹配数据源-获取推荐的数据源
  useEffect(() => {
    if (customSymbolName && dataSourceCode) {
      getDataSourceSymbolList({ dataSourceCode, symbol: customSymbolName, size: 1, current: 1 }).then((res) => {
        if (res?.data?.records.length) {
          setRecommandItem(res?.data?.records[0] as DataSource.SymbolListItem)
        }
      })
    }
  }, [customSymbolName, dataSourceCode])

  const validateDataSourceCode = () => {
    // 校验品种、数据源选择
    setTimeout(() => {
      form.validateFields(['dataSourceName'])
    }, 300)
  }

  // 设置展示在选择框中
  const setDataSourceName = (code?: string) => {
    const sourceCode = code || dataSourceCode
    const dataSourceName = dataSource.find((item) => item.code === sourceCode)?.name
    if (!dataSourceName) return
    form.setFieldValue('dataSourceName', dataSourceName)
  }

  // 自定义渲染数据源下拉
  const renderDropdownRender = () => {
    const quoteInfo = getCurrentQuote({
      dataSourceCode: recommandItem.dataSourceCode,
      symbol: recommandItem.symbol,
      digits: recommandItem.pricePrecision,
      from: 'DataSourceList'
    })
    const recommandItemImgUrl = dataSource.find((v) => v.code === recommandItem.dataSourceCode)?.imgUrl
    return (
      <div className="p-4">
        {recommandItem.id && (
          <div
            className="mb-5 border border-gray-150 p-3 cursor-pointer hover:bg-gray-50 rounded-[7px] flex items-center justify-between"
            onClick={() => {
              setTimeout(() => {
                setOpen(false)

                // 设置选择的品种
                form.setFieldsValue({
                  dataSourceSymbol: recommandItem.symbol
                })

                // 校验品种选择
                validateDataSourceCode()
              })
            }}
          >
            <div className="flex items-center">
              <span className="rounded bg-brand text-white px-[6px] py-[3px] text-xs">
                <FormattedMessage id="mt.tuijian" />
              </span>
              {/* {recommandItemImgUrl && (
                <div className="pl-2">
                  <img src={recommandItemImgUrl} className="w-[85px]" />
                </div>
              )} */}
              <span className="text-primary text-sm font-semibold pl-2">{recommandItem.name}</span>
            </div>
            <div className="flex items-center flex-1 justify-end">
              <div className="rounded-md py-[3px] px-[5px] bg-green-800 text-white !font-dingpro-medium">{formatNum(quoteInfo.ask)}</div>
              <div className="mx-1 text-primary text-xs font-semibold">{quoteInfo.spread}</div>
              <div className="rounded-md py-[3px] px-[5px] bg-red-700 text-white !font-dingpro-medium">{formatNum(quoteInfo.bid)}</div>
            </div>
          </div>
        )}
        <div className="text-primary font-semibold text-sm pb-2">
          <FormattedMessage id="mt.datasource" />
        </div>
        {/* 选择数据源 */}
        <SelectDataSource
          form={form}
          name="dataSourceCode"
          data={dataSource}
          onSelect={(value: any) => {
            // 切换数据源，重置品种选择
            selectSymbolRef?.current?.reset?.()
          }}
        />
        {/* 选择品种 */}
        <SelectSymbol
          ref={selectSymbolRef}
          data={currentSymbolList}
          getSymbolList={getSymbolList}
          onSelect={(item) => {
            setTimeout(() => {
              setOpen(false)
            })

            // 品种确认后，设置dataSourceCode展示
            setDataSourceName()

            // 校验品种选择
            validateDataSourceCode()
          }}
          name="dataSourceSymbol"
          form={form}
        />
      </div>
    )
  }

  return (
    <div className="relative">
      {open && (
        <div
          className="fixed top-0 left-0 right-0 h-full w-full"
          onClick={() => {
            setOpen(false)
          }}
        ></div>
      )}
      <ProFormSelect
        name="dataSourceName"
        required
        label={intl.formatMessage({ id: 'mt.shujulaiyuan' })}
        disabled={!customSymbolName}
        fieldProps={{
          open,
          allowClear: false,
          showSearch: false,
          popupClassName: 'dataSourceSelectPopup',
          onClick: () => {
            setOpen(true)
          },
          onDropdownVisibleChange: (visible) => {
            // 校验品种选择
            validateDataSourceCode()
          },
          // optionRender: (option) => {
          //   const item = option.data
          //   // @ts-ignore
          //   return renderOption(item)
          // },
          dropdownRender: (originNode) => {
            return renderDropdownRender()
          },
          // 回填到选择框的 Option 的属性值，默认是 Option 的子元素
          optionLabelProp: 'value'
        }}
        rules={[
          {
            required: true,
            validator(rule, value, callback) {
              if (!form.getFieldValue('dataSourceCode')) {
                return Promise.reject(intl.formatMessage({ id: 'mt.xuanzeshujuyuan' }))
              } else if (!form.getFieldValue('dataSourceSymbol')) {
                return Promise.reject(intl.formatMessage({ id: 'mt.xuanzepinzhong' }))
              }
              return Promise.resolve()
            }
          }
        ]}
      />
    </div>
  )
}
