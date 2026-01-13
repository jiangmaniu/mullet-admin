import './index.less'

import { useIntl } from '@umijs/max'
import { useEffect, useMemo, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { DEFAULT_PRECISION } from '@/constants'
import { getEnv } from '@/env'

import { formatNum } from '../..'
import { colorConfig } from './colorConfig'

type IProps = {
  kaicangliang?: number
  pingcangliang?: number
  benyueleiji?: number
}

export type IData = CrmTrading.GMVInfo & { icon?: string }

/**
 * 平臺交易額
 */
export default ({ defaultData: _defaultData }: { defaultData?: IData[] }) => {
  const intl = useIntl()
  const ENV = getEnv()
  const [data, setData] = useState<any[]>(
    []
    // [
    //   {
    //     name: 'ETHUSDT',
    //     value: 944234
    //   },
    //  ...
    // ].sort((a, b) => b.value - a.value)
  )

  const defaultData = useMemo(() => _defaultData?.filter((d) => Number(d.gvm) > 0) ?? [], [_defaultData])
  const sum = useMemo(() => {
    return defaultData?.reduce((acc, curr) => acc + Number(curr.gvm), 0) ?? 0
  }, [defaultData])

  useEffect(() => {
    if (sum === 0) return

    // 取全部

    let data: any[] =
      defaultData?.map((d) => ({ name: d.symbol, value: Number(d.gvm), ratio: (Number(d.gvm) / sum) * 100, icon: d.icon })) ?? []

    // 添加一个 Others 的项
    data.unshift({ name: 'Others', value: 0, icon: '', details: [] })

    // 根据 gvm 反向排序
    data.sort((a, b) => a.value - b.value)

    // 如果前一个加后一个占比不足 10%，则将后一个合并到前一个
    let slideIndex = 0
    let mergeValue = 0
    let mergeObj = []
    for (let i = 0; i < data.length - 1; i++) {
      if (mergeValue + data[i + 1].value < sum * 0.1) {
        mergeValue += data[i].value
        slideIndex = i
        mergeObj.unshift(data[i])
      } else {
        if (data[i].value < sum * 0.1) {
          mergeValue += data[i].value
          slideIndex = i
          mergeObj.unshift(data[i])
          break
        }
        break
      }
    }
    data[0].value = mergeValue
    data[0].ratio = (mergeValue / sum) * 100
    data[0].details = mergeObj
    data.splice(1, slideIndex)

    // reverse
    data.reverse()

    // // 根据 gvm 排序排序
    // data.sort((a, b) => b.value - a.value)
    // // 将第六个开始的所有值类加起来
    // const sum = data.slice(5).reduce((acc, curr) => acc + Number(curr.value), 0)
    // // 取前五个
    // data = data.slice(0, 5)
    // // 将第六个开始的所有值类加起来
    // data.push({ name: 'Others', value: sum })

    setData(data)
  }, [sum])

  const getRandomColor = (): any => {
    // const letters = '0123456789ABCDEF'
    const letters = '3456789ABC'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    // Avoid white color
    if (color === '#FFFFFF') {
      return getRandomColor()
    }
    return color
  }

  return (
    <div className=" flex flex-row gap-[6px]" style={{ height: 42, width: '100%' }}>
      {sum === 0 && (
        <div className="flex items-center justify-center rounded-lg bg-[#d9d9d9]" style={{ width: '100%', height: 42 }}>
          {intl.formatMessage({ id: 'mt.zanwutongjishuju' })}
        </div>
      )}
      {sum !== 0 &&
        data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-lg cursor-pointer hover-effect hover:brightness-110"
            style={{
              // 计算占比并等比缩放
              width: `${((item.value / sum) * 100 - 1).toFixed(2)}%`,
              minWidth: 100,
              backgroundColor: colorConfig?.[item.name as keyof typeof colorConfig] ?? '#dadada',
              height: 42,
              textAlign: 'center',
              lineHeight: '40px'
            }}
          >
            {/* {item.name}: {item.value}  */}
            <a
              key={index}
              data-tooltip-id={item.name}
              data-tooltip-offset={20}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '4px',
                padding: '0 12px'
              }}
            >
              <div className="flex flex-row items-start gap-2">
                {item.icon && (
                  <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[2px] border-white">
                    <img src={ENV?.imgDomain + item.icon} width={20} height={20} className=" rounded-full" />
                  </div>
                )}
                <span className="text-sm font-medium text-white text-nowrap" style={{ textShadow: '0.3px 0 #ccc, 0 0.3px #ccc' }}>
                  {item.name}
                </span>
              </div>
              <span className="text-sm font-medium text-white text-nowrap" style={{ textShadow: '0.3px 0 #ccc, 0 0.3px #ccc' }}>
                {`${((item.value / sum) * 100).toFixed(2)}%`}
              </span>
            </a>
          </div>
        ))}

      {sum !== 0 &&
        data.map((item, index) => (
          <Tooltip
            key={index}
            id={item.name}
            variant="light"
            className="bg-white shadow-sm no-arrow-tooltip"
            style={{ padding: 0, zIndex: 9999, boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)', borderRadius: '8px', minWidth: 180 }}
          >
            <div>
              <div className="flex flex-col items-start justify-start border-b text-gray-150 px-[14px] pt-2 pb-1 ">
                <span className="text-xs text-secondary">{intl.formatMessage({ id: 'mt.pinzhong' })} </span>
                <div className="flex flex-row items-center justify-start gap-1 max-w-[300px] flex-wrap">
                  {item.details?.map((detail: any, index: number) => (
                    <span className="text-xs text-primary" key={index}>
                      {detail.name}
                    </span>
                  )) ?? <span className="text-xs text-primary">{item.name}</span>}
                </div>
              </div>
              <div className="flex flex-col px-[14px] py-8">
                <div className="flex flex-row items-center justify-between gap-2">
                  <span className="text-xs text-primary">{intl.formatMessage({ id: 'mt.jiaoyie' })} </span>
                  <span className="text-xs text-primary">{formatNum(item.value, { precision: DEFAULT_PRECISION })}</span>
                </div>
                <div className="flex flex-row items-center justify-between gap-2">
                  <span className="text-xs text-primary">{intl.formatMessage({ id: 'mt.jiaoyizhanbi' })} </span>
                  <span className="text-xs text-primary">{item.ratio.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </Tooltip>
        ))}
    </div>
  )
}
