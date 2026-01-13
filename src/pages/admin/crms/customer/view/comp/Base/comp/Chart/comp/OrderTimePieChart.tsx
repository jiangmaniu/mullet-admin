import { PageLoading, ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useModel, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import ReactECharts from 'echarts-for-react'
import { useEffect, useRef, useState } from 'react'

import Empty from '@/components/Base/Empty'
import { formatNum } from '@/pages/admin/crms'
import { findOrderCloseMinis } from '@/services/api/crmManage/client'

// 合约订单时长统计图表
export default function OrderTimePieChart() {
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)
  const intl = useIntl()
  const [width, setWidth] = useState(600)
  const { sidebarCollapsed } = useModel('global')
  const [selectValue, setSelectValue] = useState('')

  const { id } = useParams()

  const { loading, data, run } = useRequest(findOrderCloseMinis, { manual: true })
  const noData = !data?.data?.minis?.length
  const dataOptions = (data?.data?.minis || [])?.map((item: any, idx: number) => ({
    value: (data?.data?.minisCount || [])[idx],
    // @ts-ignore
    name: {
      min5: intl.formatMessage({ id: 'mt.xxmin' }, { num: 5 }),
      min15: intl.formatMessage({ id: 'mt.xxmin' }, { num: 15 }),
      min30: intl.formatMessage({ id: 'mt.xxmin' }, { num: 30 }),
      hour1: intl.formatMessage({ id: 'mt.xxhour' }, { num: 1 }),
      hour6: intl.formatMessage({ id: 'mt.xxhour' }, { num: 6 }),
      day1: intl.formatMessage({ id: 'mt.xxd' }, { num: 1 }),
      day3: intl.formatMessage({ id: 'mt.xxd' }, { num: 3 }),
      dayMore: intl.formatMessage({ id: 'mt.xxdmore' }, { num: 3 })
    }[item]
  }))

  useEffect(() => {
    run({ clientId: id })
  }, [id])

  useEffect(() => {
    const echarts = instance.current?.echarts

    setOptions({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 30,
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
          return `${name}: ${formatNum(dataOptions?.find((item) => item.name === name)?.value || 0, { precision: 0 })}`
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
          //   edgeDistance: '25%',
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
          //   const isLeft = params.labelRect.x < 1
          //   const points = params.labelLinePoints
          //   // Update the end point.
          //   points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
          //   return {
          //     labelLinePoints: points
          //   }
          // },
          data: dataOptions
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
            <FormattedMessage id="mt.heyuedingdanshichangtongjitubiao" />
          </span>
          {/* <ProFormSelect
            placeholder={intl.formatMessage({ id: 'mt.quanbu' })}
            options={[
              { value: 1, label: '全部' },
              { value: 2, label: '选项1' }
            ]}
            fieldProps={{ size: 'middle', onChange: (value: any) => setSelectValue(value) }}
          /> */}
        </div>
      }
    >
      {!loading && !noData && <ReactECharts option={options} ref={instance} style={{ height: 300, width: '100%' }} />}
      {loading && <PageLoading />}
      {noData && <Empty />}
    </ProCard>
  )
}
