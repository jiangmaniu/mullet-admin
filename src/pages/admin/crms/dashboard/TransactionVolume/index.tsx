import { useIntl } from '@umijs/max'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { numberFormatUnit } from '@/utils/number'

type IProps = {
  kaicangliang?: number
  pingcangliang?: number
  benyueleiji?: number
}

/**
 * 平臺交易額
 */
export default ({ defaultData }: { defaultData?: CrmTrading.GMVInfo[] }) => {
  const intl = useIntl()

  const [data, setData] = useState<any[]>(
    []
    // [
    //   {
    //     name: 'ETHUSDT',
    //     value: 944234
    //   },
    //   {
    //     name: 'BTCUSDT',
    //     value: 623456
    //   },
    //   {
    //     name: 'AAAUSDT',
    //     value: 123456
    //   },
    //   {
    //     name: 'BBBUSDT',
    //     value: 123456
    //   },
    //   {
    //     name: 'CCCUSDT',
    //     value: 323456
    //   },
    //   {
    //     name: 'DDDDUSDT',
    //     value: 345024
    //   }
    // ].sort((a, b) => b.value - a.value)
  )

  useEffect(() => {
    // 取前五个
    // defaultData && setData(defaultData.slice(0, 5).map((d) => ({ name: d.symbol, value: Number(d.gvm).toFixed(2) })))

    // 取全部

    let data = defaultData?.map((d) => ({ name: d.symbol, value: Number(d.gvm) })) ?? []

    // 根据 gvm 排序排序
    data.sort((a, b) => b.value - a.value)
    // 将第六个开始的所有值类加起来
    const sum = data.slice(5).reduce((acc, curr) => acc + Number(curr.value), 0)
    // 取前五个
    data = data.slice(0, 5)
    // 将第六个开始的所有值类加起来
    data.push({ name: 'Others', value: sum })

    setData(data)
  }, [defaultData])

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%'
    },
    legend: {
      align: 'left',
      orient: 'vertical',
      left: '5%',
      top: '6%',
      bottom: 0,
      symbolKeepAspect: true,
      // data: data.slice(0, 5),
      formatter: function (name) {
        let target
        let index
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === name) {
            target = data[i]
            index = i
            break
          }
        }

        if (target && index !== undefined) {
          const arr = [
            index < 3 ? `{fire|}{span1|}` : ``,
            index > 2 ? `{span2|}{number|${index + 1}}` : ``,
            // '{colorBlock|}',
            '{name|' + name + '}',
            '{value|' + numberFormatUnit(target.value, { precision: DEFAULT_PRECISION }) + '}'
          ]

          return arr.join('')
        }
        return name
      },
      // icon: 'circle',
      // itemStyle: {
      //   borderWidth: 0
      // },
      itemWidth: 34,
      itemHeight: 15,
      itemGap: 15,
      textStyle: {
        rich: {
          colorBlock: {
            width: 10,
            height: 10,
            backgroundColor: function (params: any) {
              // 這裡的 params 包含了當前項的一些信息
              return params.color
            }
          },
          fire: {
            width: 20,
            height: 20,
            // transform: 'transactionX(-20px)',
            backgroundColor: {
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAyCAYAAAAayliMAAAAAXNSR0IArs4c6QAABKZJREFUaEPtmV1oHFUUx///zUarJNIgIlVbK0oFLQaJoLFSNZm5mxACgtSHFsUnQRGJSmOLD0aRqlUsxYqPBYuVWL8wYrJzZ3HbiilCoVg/KorYolioNNomtWSTOWbKJI3b7N47MxtKIPMW7jn/c373nL1fIRb4xwWePxYBLnYFFyuwWIGUM1CzFpKWlnoePFhKmU9s99oBuO52AK0APkddXT+Hhn6KnU0Ch9oBKLUNIj2zctgLcgc87yMCkiA3K5faAbjuuwAeniPqIZC99DxtlVFMo1oCHABwZ5X4O5HN9nBw8FTMHKua1wRAlFoOkaOAcWc/gkymm/n8L7WCqBXAZohssUzqBILgPhYKP1jaz28FpLPzUkxMfAfgJuuEyOMYH7+dxeJxa58KhqkrII6zFeTGBIl40Loj7QqVCkCUWguRLwFkEgAA5DP0vG2JfCOnxADS3r4KmcxXAK5KkcAYMpkVzOdPJtVIBCCuew2ArwFcnzTwjB/5Ij2vb/pvyeWWMZ//01Y3NoB0dTVhfHwfgNW2QQx2J7F06TLu2TMe2onr7sLo6GMcHv7XRj8WgHR3X46zZ8Md9W4bcWubIOhkoTAk69ZdgpGRvwA8T99/y8Y/HoDr9gN4yEY4lg35Dj3vCWlv70AmMwjgGEqlG1ksTph0rAHEdR+d6vmdJsGE499T69Wi1IcQeTDS6KLWX5j0rACko2MlJicPA2gwCSYcDyByB8hvAGQjjfep9XqTnh3AhUdlk26S8T8AXDvL8QxKpatZLI5WEzMCSGvrZWhoCMWbkmSV0sfYRmaA+e396nwir9P3e9NVQKn3IGLsxZQzPbe7yH76/tp0AK4bnjRvnZcEzaJHqfXKtADhxnKlOVaZhcinIG8BsCq273mHUWrdmBYg3OLrYych8jLGxragsfEliDwNoC6Bxmn6/hXpABznFMiqs1AhwFZq/Vw4Jkp1Igj6E+j8Ta2rrn42q9CvAG6IPXvAI9R617Sf5HLNCIJwZw1PsnYf+S09rzldBVzXB9BuF3GWVTa7nIODv8/2iyDCO4Tdjk7upudtSAegVB9EXogJ8DG1nj7T/M9VlOqGyGeWej1TLRS++FX8zC3kOPeA3G8ZMDQrQaSZvv9jJR9x3Q8ArDNoCrLZFeVVLPcxApz7ETrOEZA3W0JsotavVbONDoc/zzq4zWW+j1rfa4ppC/AkSJsLxl6sWdPGvr7AFFhctwCgrYpdjlp7Jh07gJaWejQ1HTZU4R+I3EbfP2YKeq6qSj0FkUr9XaTW99voWAFEAdsgEl4n535CEdlM33/VJmjUljmQQxfYi5wG2UKtwxYzftYAEUSlJ8QRLFlyHQcGzhgjRgbRknpoDoAN9P3dtjrxAMLHW6XehsjjZQEqLpsVVyLHuQvkcNn4s9T6TdvkQ7tYANPCotQrENk0E0hkI33/jTiBRakHppbbTyKfyfCfI/T9HXE0EgNEPdwFMrzkhy9zsWdOzm+QvyEI1rNQKK+GFUuiCsxUInzkKpV6IXIibunFcQYAHMDExHbTvbcaSSoAqymqYBQ+ksX50VeKddEA0sDP9l0EqNVMJtVZ8BX4D+yxoUJR6LqfAAAAAElFTkSuQmCC'
            }
          },
          // fire 右側間距
          span1: {
            width: 4
          },
          // number 左側間距
          span2: {
            width: 6
          },
          // number 右側間距由 width 決定
          number: {
            width: 18,
            height: 20,
            align: 'left',
            fontSize: 12,
            // backgroundColor: 'red',
            fontWeight: 'bold',
            color: '#666'
          },
          name: {
            width: 100,
            color: '#110e23',
            // backgroundColor: 'yellow',
            align: 'left',
            fontWeight: 500,
            fontSize: 14,
            height: 20,
            lineHeight: 20
          },
          value: {
            width: 100,
            color: '#110e23',
            fontWeight: 500,
            align: 'left',
            fontSize: 14,
            height: 20,
            lineHeight: 20
          }
        }
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '68%'],
        center: ['72%', '48%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderWidth: 5,
          borderColor: 'white',
          borderRadius: 10
        },
        label: {
          // show: false,
          position: 'outside'
        },
        emphasis: {
          label: {
            show: true,
            // position: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            formatter: (params: any) => {
              return [`{name|${params.name}}`, `{value|${numberFormatUnit(params.value, { precision: DEFAULT_PRECISION })}}`].join('\n')
            },
            rich: {
              name: {
                fontSize: 12,
                fontWeight: '400',
                color: '#110E23'
              },
              value: {
                fontSize: 18,
                fontWeight: '600',
                color: '#110E23',
                padding: [8, 0, 0, 0]
              }
            }
          }
        },
        // 引导线
        // labelLine: {
        //   show: false
        // },
        data
      }
      // animationType: 'scale',
      // animationEasing: 'elasticOut',
      // animationDelay: function (idx) {
      //   return Math.random() * 200;
      // }
    ]
  } as echarts.EChartOption

  return (
    <div className=" flex flex-col gap-4 " style={{ minHeight: 230 }}>
      {data.length === 0 ? (
        <div className="flex-1  flex items-center justify-center">{intl.formatMessage({ id: 'mt.zanwujilu' })}</div>
      ) : (
        <ReactECharts option={option} style={{ height: 230, width: '100%' }} />
      )}
    </div>
  )
}
