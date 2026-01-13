import { FormatConfig } from 'antd/lib/statistic/utils'
import CountUp from 'react-countup'

type IProps = {
  end: number
  duration?: number
  decimals?: number
} & FormatConfig

export default (props: IProps) => {
  const decimals = props.precision || props.decimals || 2
  const duration = props.duration || 0.3

  return <CountUp {...props} decimals={decimals} separator="," duration={duration} />
}
