import { FormatConfig } from 'antd/lib/statistic/utils'
import CountUp from 'react-countup'
export const countUpFormatter = (
  end: number,
  props: FormatConfig & {
    duration?: number
    decimals?: number
  } = {}
) => {
  const decimals = props.precision || props.decimals || 2
  const duration = props.duration || 0.3

  return <CountUp {...props} end={end} decimals={decimals} separator="," duration={duration} />
}
