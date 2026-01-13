import { ProCardProps } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import classNames from 'classnames'

import Iconfont from '@/components/Base/Iconfont'

type IProps = {
  title: string | React.ReactNode
  desc?: string | React.ReactNode
  total?: string | React.ReactNode
  color?: string
  bottomLeftLabel?: string | React.ReactNode
  bottomLeftValue?: string | React.ReactNode
  backgroundImage?: string
  onDetail?: () => void
} & ProCardProps

export default ({
  title,
  desc,
  color = 'white',
  bottomLeftLabel,
  bottomLeftValue,
  total,
  backgroundImage,
  children,
  className,
  onDetail
}: IProps) => {
  const intl = useIntl()
  const _desc = desc ? (
    desc
  ) : (
    <div className=" flex items-center" onClick={onDetail}>
      {intl.formatMessage({ id: 'mt.xiangqing' })}
      <Iconfont name="xiangqing" color={color} width={20} height={20} />
    </div>
  )

  const _bottomLeftLabel = bottomLeftLabel ? bottomLeftLabel : intl.formatMessage({ id: 'mt.benyueleiji' })

  return (
    <div
      className={classNames(['flex flex-col pt-[1.5rem] px-5 pb-[1.125rem] bg-[100%_100%] bg-cover rounded-xl gap-1', className])}
      style={{
        color,
        backgroundImage
      }}
    >
      <div className="flex flex-row justify-between items-start">
        <span className=" text-base font-semibold">{title}</span>
        <span className=" text-sm font-normal cursor-pointer">{_desc}</span>
      </div>
      {children ? (
        children
      ) : (
        <>
          <div className=" flex items-center self-center pt-5 pb-2.5 ">
            <Iconfont name="yunyingguanli-total" color={color} width={44} height={44} />
            <span className=" text-[40px] leading-[44px] font-semibold flex-1 ">{total}</span>
          </div>
          <div className=" flex flex-row gap-2 text-sm font-semibold">
            <span>{_bottomLeftLabel}</span>
            <span>{bottomLeftValue}</span>
          </div>
        </>
      )}
    </div>
  )
}
