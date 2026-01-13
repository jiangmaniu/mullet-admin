import { FormattedMessage, useIntl } from '@umijs/max'
import { Statistic } from 'antd'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'

import { countUpFormatter } from '@/utils/countUp'

import { formatNum } from '../..'

type IProps = {
  dates?: string[]
  jiaoyie?: number
  yingkui?: number
  toucun?: number
}

/**
 * 累計盈虧
 */
export default ({ dates, jiaoyie, yingkui, toucun }: IProps) => {
  const intl = useIntl()
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2-11', '2-12', '2-13', '2-14', '2-15', '2-16', intl.formatMessage({ id: 'mt.jinri' })],
        axisLine: {
          // 坐标轴
          show: false
        },
        axisTick: {
          // 刻度线
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        show: false
      }
    ],
    series: [
      {
        // 浮动盈亏
        name: intl.formatMessage({ id: 'mt.fudongyingkui' }),
        type: 'bar',
        barWidth: 42,
        width: 65,
        itemStyle: {
          decal: {
            rotation: -Math.PI / 7,
            symbol: 'rect',
            symbolSize: 4,
            color: 'rgba(255, 255, 255, 0.1)',
            dashArrayX: [1, 0],
            dashArrayY: [4, 16]
          },
          barBorderRadius: 4,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3FF697' },
            { offset: 1, color: '#39F3C3' }
          ])
        },
        label: {
          show: true,
          position: 'top',
          color: '#110e23', // 字体颜色
          fontFamily: 'dingpro-regular', // 字体系列
          fontSize: 12, // 字体大小
          formatter: (val: { value: any }) => formatNum(val.value)
        },
        data: [150, 232, 201, 154, 190, 330, 410],
        z: 3
      },
      {
        // 保证金头寸
        name: intl.formatMessage({ id: 'mt.baozhengjintoucun' }),
        type: 'bar',
        barWidth: 42,
        width: 65,
        barGap: '-100%',
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        label: {
          show: true,
          position: 'top',
          color: '#110e23', // 字体颜色
          fontFamily: 'dingpro-regular', // 字体系列
          fontSize: 12, // 字体大小
          formatter: (val: { value: any }) => formatNum(val.value)
        },
        itemStyle: {
          decal: {
            rotation: -Math.PI / 7,
            symbol: 'rect',
            symbolSize: 4,
            color: 'rgba(255, 255, 255, 0.1)',
            dashArrayX: [1, 0],
            dashArrayY: [4, 16]
          },
          barBorderRadius: 4,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5462F1' },
            { offset: 1, color: '#395EF3' }
          ])
        },
        z: 2
      },
      {
        name: intl.formatMessage({ id: 'mt.jingzhi' }),
        type: 'bar',
        barWidth: 42,
        width: 65,
        barGap: '-100%',
        data: [2000, 2000, 2000, 2000, 2000, 2000, 2000],
        itemStyle: {
          color: '#cdcdcd',
          decal: {
            rotation: -Math.PI / 7,
            symbol: 'rect',
            symbolSize: 4,
            color: 'rgba(255, 255, 255, 0.1)',
            dashArrayX: [1, 0],
            dashArrayY: [4, 16]
          },
          barBorderRadius: 4
        },
        z: 1
      }
    ]
  } as echarts.EChartOption

  return (
    <div className=" flex gap-4 md:flex-row flex-col flex-shrink ">
      <div className="flex flex-col justify-between flex-shrink-0 flex-1 flex-grow gap-16 h-[210px]">
        <div className="flex flex-col">
          <Statistic
            title={<></>}
            value={10221}
            formatter={(val) => countUpFormatter(Number(val))}
            valueRender={(val) => <span className="text-3xl !font-dingpro-medium font-semibold">{val}</span>}
          />
          <span className=" text-xs font-normal">
            <FormattedMessage id="mt.jingzhi" />
          </span>
        </div>
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col">
            <Statistic
              title={<></>}
              value={233}
              formatter={(val) => countUpFormatter(Number(val))}
              valueRender={(val) => <span className="text-lg !font-dingpro-medium font-semibold">{val}</span>}
            />
            <span className=" text-xs font-normal">
              <FormattedMessage id="mt.fudongyingkui" />
            </span>
          </div>
          <div className="flex flex-col">
            <Statistic
              title={<></>}
              value={1123}
              formatter={(val) => countUpFormatter(Number(val))}
              valueRender={(val) => <span className="text-lg !font-dingpro-medium font-semibold">{val}</span>}
            />
            <div className="text-xs font-normal whitespace-nowrap">
              <FormattedMessage id="mt.baozhengjintoucun" />
            </div>
          </div>
        </div>
      </div>
      <ReactECharts option={option} style={{ height: 230, width: '100%' }} />
    </div>
  )
}
