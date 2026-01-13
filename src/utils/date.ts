import dayjs from 'dayjs'

// 禁止选择部分日期和时间 不能选择当前时间之后的日期、小时、分钟
const range = (start: any, end: any) => {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
// 禁用antd DatePicker的日期
export const diabledAntdDate = (current: any) => current && current > dayjs().endOf('day')
// 禁用antd DatePicker时间
export const disabledAntdTime = (date: any) => {
  const now = dayjs()
  const hours = now.hour()
  const minutes = now.minute()
  const currentHour = dayjs(date).hour()
  if (date && dayjs(date).date() === now.date()) {
    return {
      disabledHours: () => range(0, 24).splice(hours + 1, 24 - hours),
      disabledMinutes: () => {
        if (currentHour === hours) {
          const retValue = range(0, 60).splice(minutes + 1, 60 - minutes)
          return retValue
        } else {
          return []
        }
      }
    }
  } else {
  }
}
