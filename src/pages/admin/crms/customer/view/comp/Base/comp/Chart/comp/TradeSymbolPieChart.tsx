import { PageLoading, ProCard, ProFormSelect } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl, useModel, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { default as EChartsReact, default as ReactECharts } from 'echarts-for-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { findOrderBySymbol, PreferenceSymbolType } from '@/services/api/crmManage/client'
import { numberFormatUnit } from '@/utils/number'

// 交易品种偏好
export default function TradeSymbolPieChart() {
  const [options, setOptions] = useState<any>({})
  const instance = useRef<EChartsReact | null>(null)
  const intl = useIntl()
  const [width, setWidth] = useState(600)
  const { sidebarCollapsed } = useModel('global')
  const [selectValue, setSelectValue] = useState<PreferenceSymbolType>('VOLUME')
  const { id } = useParams()

  const { loading, data, run } = useRequest(findOrderBySymbol, { manual: true })
  const noData = !data?.data?.length

  const chartData = useMemo(() => {
    if (!data?.data?.length) {
      return [{ name: getIntl().formatMessage({ id: 'common.noData' }), value: 0 }]
    }

    return selectValue === 'VOLUME'
      ? // @ts-ignore
        data?.data?.map((item) => ({ name: item.symbol, value: item.volume }))
      : // @ts-ignore
        data?.data?.map((item) => ({ name: item.symbol, value: item.gvm }))
  }, [data, selectValue])

  useEffect(() => {
    run({ clientId: id, preferenceSymbolType: selectValue })
  }, [id, selectValue])

  useEffect(() => {
    const echarts = instance.current?.getEchartsInstance()

    setOptions({
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.name}: ${numberFormatUnit(params.value, { precision: DEFAULT_PRECISION })}`
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 0,
        top: 0,
        symbolKeepAspect: true,
        icon: 'rect',
        itemStyle: {
          borderWidth: 0,
          alignSelf: 'self-end',
          verticalAlign: 'end',
          position: 'absolute',
          bottom: 0
        },
        itemWidth: 30,
        itemHeight: 12,
        itemGap: 24,
        pageIconSize: [10, 8],
        formatter: (name: string) => {
          return `${name}: ${numberFormatUnit(chartData?.find((item) => item.name === name)?.value || 0, { precision: DEFAULT_PRECISION })}`
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          top: 0,
          // @ts-ignore
          padAngle: 2,
          radius: ['34%', '60%'],
          center: ['65%', '45%'],
          avoidLabelOverlap: false,

          itemStyle: {
            borderRadius: 4
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          // label: {
          //   show: false,
          //   alignTo: 'edge',
          //   formatter: '{name|{b}}\n{time|{c}}',
          //   minMargin: 5,
          //   edgeDistance: '50%',
          //   lineHeight: 15,
          //   rich: {
          //     time: {
          //       fontSize: 10,
          //       color: '#999'
          //     }
          //   }
          // },
          // labelLine: {
          //   length: 15,
          //   length2: 0,
          //   maxSurfaceAngle: 80
          // },
          // labelLayout: function (params: any) {
          //   const isLeft = params.labelRect.x < (echarts?.getWidth() || 400) / 2
          //   const points = params.labelLinePoints
          //   // Update the end point.
          //   points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
          //   return {
          //     labelLinePoints: points
          //   }
          // },
          data: chartData
        }
      ]
    } as echarts.EChartOption)
  }, [data])

  // useEffect(() => {
  //   setTimeout(() => {
  //     // @ts-ignore
  //     const { width } = document.querySelector('.pie-chart-wrapper')?.getBoundingClientRect() || {}

  //     if (width) {
  //       setWidth(width - 40)
  //     }
  //   }, 200)
  // }, [sidebarCollapsed])

  return (
    <ProCard
      ghost
      title={
        <div className="flex items-center mb-3">
          <span className="text-gray font-semibold text-xl mr-3">
            <FormattedMessage id="mt.jiaoyipinzhongpianhaotubiao" />
          </span>
          <ProFormSelect
            placeholder={intl.formatMessage({ id: 'mt.leixing' })}
            // initialValue={'VOLUME'}

            options={[
              { value: 'VOLUME', label: intl.formatMessage({ id: 'mt.jiaoyiliang' }) },
              { value: 'AMOUNT', label: intl.formatMessage({ id: 'mt.jiaoyie' }) }
            ]}
            fieldProps={{
              size: 'middle',
              value: selectValue,
              onChange: (value: any) => {
                setSelectValue(value)
              }
            }}
          />
        </div>
      }
    >
      {!loading && <ReactECharts option={options} ref={instance} style={{ height: 300, width: '100%' }} />}
      {loading && <PageLoading />}
      {/* {noData && <Empty />} */}
    </ProCard>
  )
}
