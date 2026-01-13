import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage } from '@umijs/max'
import { Statistic } from 'antd'
import CountUp from 'react-countup'

type IProps = {
  /**标题 */
  title?: React.ReactNode
  /**百分比 */
  percent: number
}

const formatter = (value: any, props: any) => (
  <span className="text-primary font-semibold text-lg">
    +<CountUp {...props} end={value as number} decimals={2} separator="," duration={0.3} />
  </span>
)

//

export default function RatioPencent({ title, percent }: IProps) {
  const className = useEmotionCss(({ token }) => {
    return {
      '.left': {
        animation: 'ltr 300ms forwards'
      },
      '.right': {
        animation: 'rtl 450ms forwards'
      },
      '@keyframes ltr': {
        '0%': {
          transform: 'translateX(-100%)'
        },
        '100%': {
          transform: 'translateX(0) skewX(-15deg)'
        }
      },
      '@keyframes rtl': {
        '0%': {
          transform: 'translateX(100%)'
        },
        '100%': {
          transform: 'translateX(0) skewX(-15deg)'
        }
      }
    }
  })

  return (
    <div className={className}>
      <div className="flex flex-row items-end gap-1 mb-2">
        {title || <FormattedMessage id="mt.shenglv" />}
        <span className=" text-xl font-medium text-primary pl-1">
          <Statistic
            title={<></>}
            value={percent}
            formatter={(val) => formatter(val, { suffix: '%' })}
            valueStyle={{
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              fontWeight: 500,
              color: 'rgb(17 14 35 / var(--tw-text-opacity))'
            }}
          />
        </span>
      </div>

      <div className="w-full overflow-hidden rounded">
        <div
          className="flex flex-row items-center gap-1"
          style={{
            transform: 'translateX(-2rem)'
          }}
        >
          {/* ltr 300ms forwards */}
          <div
            className="bg-green-700 flex-shrink-0 h-3 left rounded"
            style={{
              width: `calc(${Math.round((percent / 100) * 100)}% + 2rem) `
            }}
          ></div>
          <div
            className="h-3 bg-red-600 flex-shrink-0 right rounded"
            style={{
              width: `calc(${100 - Math.round((percent / 100) * 100)}% + 2rem)`
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
