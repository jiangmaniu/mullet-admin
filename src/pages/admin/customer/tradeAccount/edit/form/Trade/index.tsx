import { forwardRef } from 'react'

import Trade from '@/components/Trade'

import StatisticCard from '../../../../../../../components/Trade/comp/StatisticCard'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
  active?: boolean
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, active }: IProps, ref) => {
  if (!active) return null
  return (
    <div>
      <div className="mb-3">
        <StatisticCard initialValues={initialValues} />
      </div>
      <Trade />
    </div>
  )
})
