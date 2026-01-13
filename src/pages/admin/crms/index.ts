import { formatNum as _formatNum, IOpt } from '@/utils'

export const formatNum = (value: any, opts?: IOpt) => {
  return _formatNum(value, {
    ...opts,
    placeholder: '0'
  })
}
