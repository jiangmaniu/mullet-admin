import { useModel } from '@umijs/max'

import { cn } from '@/utils/cn'
import { push } from '@/utils/navigator'

export default function Logo() {
  const { sidebarCollapsed } = useModel('global')
  return (
    <img
      src={sidebarCollapsed ? '/platform/img/logo-small.png' : '/platform/img/logo-long.svg'}
      alt="logo"
      onClick={() => push('/')}
      className={cn(sidebarCollapsed ? '!h-[30px] !w-[30px]' : '!h-[40px] w-auto')}
    />
  )
}
