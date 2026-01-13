import { PageLoading, ProCard, ProFormSelect } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useModel, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import Empty from '@/components/Base/Empty'
import { DEFAULT_PRECISION } from '@/constants'
import { formatNum } from '@/pages/admin/crms'
import { getAccountDayMoney } from '@/services/api/crmManage/client'

import { IParams } from '..'

type IProps = {
  params: IParams
}

// 交易活跃时间图表
function AssetLineChart({ params }: IProps) {
  const [tabKey, setTabKey] = useState('1')
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)
  const { sidebarCollapsed } = useModel('global')
  const [width, setWidth] = useState(800)
  const intl = useIntl()
  const { id } = useParams()
  const { data, run, loading } = useRequest(getAccountDayMoney, {
    manual: true,
    onSuccess(data, params) {
      // @ts-ignore
      // if (data?.data?.total && data.data.total < params[0].size) {
      //   message.info(`${intl.formatMessage({ id: 'mt.zhanghuzichanbianhuatubiao' })} ${intl.formatMessage({ id: 'mt.yiduquanbushuju' })}`)
      // }
    }
  })
  // const noData = !data?.data?.dayArr?.length
  const noData = !data?.data?.records?.length

  const xyData = useMemo(() => {
    return data?.data?.records?.reverse() || []
  }, [data])

  const xData = useMemo(() => {
    return xyData.map((item) => item.dateStr) || []
  }, [data])

  const yData = useMemo(() => {
    return xyData.map((item) => Number(item.money)) || []
  }, [data])

  const [selectValue, setSelectValue] = useState('week')

  const size = useMemo(() => {
    return selectValue === 'week' ? 7 : selectValue === 'month' ? 30 : selectValue === 'quarter' ? 90 : 180
  }, [selectValue])

  useEffect(() => {
    // params.tradeAccountId &&
    run({
      size,
      clientId: id
      // ...params
    })
  }, [size])

  useEffect(() => {
    const echarts = instance.current?.echarts

    setOptions({
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          return `${params[0].name}<br/>${params[0].marker} ${params[0].seriesName}: ${formatNum(params[0].value, {
            precision: DEFAULT_PRECISION
          })}`
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: '1%',
        right: '2%',
        bottom: '2%',
        top: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#ccc',
            width: '1'
          }
        },
        axisLabel: {
          // rotate: sidebarCollapsed ? 0 : 45, // 将x轴的文字旋转45度
          textStyle: {
            color: '#6A7073'
          }
        },
        data: xData
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#f0f0f0' // 设置 y 轴轴线颜色
          }
        }
        // axisTick: {
        //   show: true,  // 显示刻度线
        //   alignWithLabel: true,  // 刻度线和标签对齐
        //   lineStyle: {
        //     color: '#ccc'  // 刻度线颜色
        //   }
        // },
        // axisLine: {
        //   show: true,  // 显示坐标轴线
        //   lineStyle: {
        //     color: '#ccc'  // 坐标轴线颜色
        //   }
        // },
        // axisLabel: {
        //   textStyle: {
        //     color: '#6A7073'
        //   }
        // },
      },
      series: [
        {
          name: intl.formatMessage({ id: 'mt.zichan' }),
          type: 'line',
          stack: 'Total',
          smooth: true,
          showSymbol: false,
          data: yData
        }
      ]
    })
  }, [sidebarCollapsed, data])

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      const { width } = document.querySelector('.line-chart-wrapper')?.getBoundingClientRect() || {}

      if (width) {
        setWidth(width - 40)
      }
    }, 200)
  }, [sidebarCollapsed])

  return (
    <ProCard
      ghost
      title={
        <div className="flex items-center mb-3">
          <span className="text-gray text-xl font-semibold mr-2">
            <FormattedMessage id="mt.zhanghuzichanbianhuatubiao" />
          </span>
          <ProFormSelect
            placeholder={intl.formatMessage({ id: 'mt.leixing' })}
            // initialValue={'VOLUME'}
            options={[
              { value: 'week', label: intl.formatMessage({ id: 'mt.yizhou' }) },
              { value: 'month', label: intl.formatMessage({ id: 'mt.yiyue' }) },
              { value: 'quarter', label: intl.formatMessage({ id: 'mt.yiji' }) },
              { value: 'half', label: intl.formatMessage({ id: 'mt.banian' }) }
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
      {!loading && !noData && <ReactECharts option={options} ref={instance} style={{ height: 340, width: '100%' }} />}
      {loading && <PageLoading />}
      {noData && <Empty />}
    </ProCard>
  )
}

export default observer(AssetLineChart)
