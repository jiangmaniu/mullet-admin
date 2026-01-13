import { SwapRightOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage } from '@umijs/max'
import { Badge, Dropdown } from 'antd'
import { observer } from 'mobx-react'
import VirtualList from 'rc-virtual-list'
import { useState } from 'react'

import Empty from '@/components/Base/Empty'
import Iconfont from '@/components/Base/Iconfont'
import { useStores } from '@/context/mobxProvider'
import { getMyMessageInfo, readAllMessage } from '@/services/api/message'
import { gray } from '@/theme/theme.config'
import { cn } from '@/utils/cn'
import { push } from '@/utils/navigator'

function Message() {
  const { global } = useStores()
  const { unReadCount, messageList } = global

  const [open, setOpen] = useState(false)

  const className = useEmotionCss(({ token }) => {
    return {
      '&:hover': {
        svg: {
          // fill: `${isDark ? gray[50] : gray[900]} !important`
          fill: gray[900]
        },
        span: {
          // color: isDark ? gray[50] : gray[900]
          color: gray[900]
        }
      }
    }
  })

  const handleReadAll = async () => {
    await readAllMessage()
    global.getMessageList(true)
    global.getUnreadMessageCount()
  }

  const handleClickItem = async (id: any) => {
    const res = await getMyMessageInfo({ id })
    if (res.success) {
      global.getUnreadMessageCount()
      global.messageList = global.messageList.map((item) => {
        if (item.id === id) {
          item.isRead = 'READ'
        }
        return item
      })
    }
  }

  const ContainerHeight = messageList.length > 5 ? 300 : 200

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      global.getMessageList()
      console.log('onScroll')
    }
  }

  return (
    <Dropdown
      open={open}
      dropdownRender={(originNode) => {
        return (
          <div className="bg-white w-[320px] rounded-xl dark:!shadow-none border dark:border-[--dropdown-border-color] border-[#f3f3f3] dark:bg-[--dropdown-bg]">
            <div className="flex items-center justify-between p-5">
              <span className="text-lg text-primary font-semibold">
                <FormattedMessage id="mt.zhanneixin" />
              </span>
              <span
                className="text-sm text-gray-550 cursor-pointer hover:text-gray"
                onClick={() => {
                  setOpen(false)
                  push('/msg/station-msg')
                }}
              >
                <FormattedMessage id="common.more" />
              </span>
            </div>
            {messageList.length > 0 ? (
              <VirtualList
                data={messageList}
                height={ContainerHeight}
                styles={{
                  verticalScrollBarThumb: {
                    width: 6,
                    borderRadius: 4,
                    background: 'rgba(0, 0, 0, 0.05)'
                  },
                  verticalScrollBar: {
                    background: '#fff'
                    // background: `${isDark ? 'var(--dropdown-bg)' : '#fff'}`
                  }
                }}
                itemHeight={41}
                itemKey="id"
                onScroll={onScroll}
              >
                {(item) => {
                  const isUnRead = item.isRead === 'UNREAD'
                  return (
                    <div
                      className={cn('cursor-pointer py-2 hover:bg-[var(--list-hover-light-bg)] rounded-md mx-3 px-2 group', {
                        'pointer-events-none': !isUnRead
                      })}
                      onClick={() => {
                        if (item.isRead === 'READ') return
                        handleClickItem(item.id)
                      }}
                    >
                      <div className="flex items-center">
                        <img src={isUnRead ? '/img/email-active.png' : '/img/email.png'} width={18} height={18} />
                        <span className={cn('font-semibold text-sm pl-2 text-primary', isUnRead ? 'text-gray' : 'text-gray-500')}>
                          {item.title}
                        </span>
                      </div>

                      <div className="pt-2 text-sm text-secondary line-clamp-3">{item.content}</div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-450 pt-2">{item.createTime}</div>
                        <div className="border rounded-lg w-[46px] h-[22px] text-center border-gray-180 group-hover:border-gray-300 hover:bg-gray-150 cursor-pointer">
                          <SwapRightOutlined />
                        </div>
                      </div>
                    </div>
                  )
                }}
              </VirtualList>
            ) : (
              <div className="p-10">
                <Empty />
              </div>
            )}
            {unReadCount > 0 && (
              <div className={cn('flex items-center justify-center cursor-pointer py-3', className)} onClick={handleReadAll}>
                {/* <Iconfont name="qingli" width={28} height={28} color={isDark ? '#fff' : gray['450']} /> */}
                <Iconfont name="qingli" width={28} height={28} color={gray['450']} />
                <span className="text-sm text-gray-450">
                  <FormattedMessage id="mt.quanbuyidu" />
                </span>
              </div>
            )}
          </div>
        )
      }}
      onOpenChange={(open) => {
        setOpen(open)
        if (open) {
          global.getMessageList(true)
        }
      }}
    >
      <div className="mr-2 cursor-pointer relative">
        <Badge count={unReadCount} color="var(--color-red)">
          <Iconfont
            name="xiaoxi"
            width={26}
            // color={theme}
            color="black"
            className=" cursor-pointer rounded-lg"
            // hoverStyle={
            //   {
            //     // background: theme === 'black' ? '#fbfbfb' : '#222222'
            //     // background: '#222222'
            //   }
            // }
            height={26}
            style={{ position: 'relative', top: 3 }}
          />
        </Badge>
      </div>
    </Dropdown>
  )
}

export default observer(Message)
