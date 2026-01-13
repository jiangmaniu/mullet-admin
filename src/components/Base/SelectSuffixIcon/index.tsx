type IProps = {
  disabled?: boolean
  opacity?: number
  style?: React.CSSProperties
}
export default function SelectSuffixIcon({ disabled, opacity, style }: IProps) {
  return <img src="/img/dropdown@2x.png" width={24} height={24} style={{ opacity: disabled ? 0.5 : opacity || 1, ...style }} />
}
