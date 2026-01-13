import { LeftOutlined, PlusOutlined } from '@ant-design/icons'
import { PageContainerProps } from '@ant-design/pro-components'
import { FormattedMessage, history, useModel, useSearchParams, useSelectedRoutes } from '@umijs/max'
import { ButtonProps } from 'antd'
import { TabBarExtraContent } from 'rc-tabs/lib/interface'
import { useEffect, useState } from 'react'

import Button from '@/components/Base/Button'
import Iconfont, { IconProps } from '@/components/Base/Iconfont'
import { useEnv } from '@/context/envProvider'
import { cn } from '@/utils/cn'

import Tabs, { ITabItem } from '../Tabs'

interface IProps {
  tabList?: ITabItem[]
  children: React.ReactNode
  pageTitle?: string | React.ReactNode
  contentStyle?: React.CSSProperties
  tabBarStyle?: React.CSSProperties
  onChangeTab?: (activeKey: string, activeLabel: string) => void
  showTabLabel?: boolean
  tabActiveKey?: string
  /** 持久化 tab 當前值 */
  tabPersistence?: boolean
  tabBarExtraContent?: TabBarExtraContent
  showBack?: boolean
  onBack?: () => void
  bordered?: boolean
  style?: React.CSSProperties
  subTitle?: React.ReactNode
  /**@name 隐藏tabbar下划线  */
  hiddenTabbarLine?: boolean
  /**头部iconfont name */
  icon?: string
  iconProps?: Omit<IconProps, 'name'>
  /**渲染右侧区域 */
  renderRight?: () => React.ReactNode
  /**右侧区域按钮属性 */
  rightBtnProps?: ButtonProps
  /**右侧区域按钮文字 */
  rightBtnText?: React.ReactNode
  /**右侧区域按钮点击事件 */
  onRightBtnClick?: () => void
  /**渲染左侧区域 */
  renderLeft?: () => React.ReactNode
  /**页面背景颜色 */
  pageBgColorMode?: 'white' | 'gray'
  /**是否固定头部区域 */
  fixedHeader?: boolean
  /**自定义渲染底部 */
  renderFooter?: () => React.ReactNode
  /**自定义渲染头部 */
  renderHeader?: () => React.ReactNode
  /**tabbar标题字体权重 */
  tabBarTitleFontWeight?: string
}
export default function PageContainer({
  tabList = [],
  children,
  pageTitle,
  onChangeTab,
  contentStyle,
  tabBarStyle,
  showTabLabel = false,
  tabActiveKey,
  /** 持久化 tab 當前值 */
  tabPersistence,
  tabBarExtraContent,
  tabBarTitleFontWeight = '600',
  showBack = false,
  onBack,
  bordered = true,
  subTitle,
  hiddenTabbarLine = false,
  icon,
  renderRight,
  rightBtnText,
  onRightBtnClick,
  rightBtnProps,
  renderLeft,
  iconProps,
  pageBgColorMode,
  fixedHeader = true,
  renderFooter,
  renderHeader,
  style = {}
}: IProps & PageContainerProps) {
  const { setPageBgColor } = useModel('global')
  const { isMobileOrIpad, isMobile, breakPoint, screenSize } = useEnv()
  const [showLastTabLabel, setShowLastTabLabel] = useState(false)

  const [tabKey, setTabKey] = useState(tabList[0]?.key || '')
  const [tabLabel, setTabLabel] = useState(tabList[0]?.label || '')

  const routes = useSelectedRoutes()

  const lastRoute = routes
    .at(-1)
    ?.pathname?.split('/')
    .filter((v) => v)
    .filter((item) => !['zh-TW', 'en-US'].includes(item))
  const parentName = lastRoute?.[0]
  const subMenuName = lastRoute?.join('.')
  let [searchParams, setSearchParams] = useSearchParams()
  const currentTabKey = searchParams.get('activeKey')
  // 获取searchParams全部参数
  const allParams = Object.fromEntries(searchParams.entries())

  // 回显地址栏参数激活Tab卡片
  useEffect(() => {
    if (currentTabKey) {
      setTabKey(currentTabKey)
      const activeLabel = tabList.find((item) => item.key === currentTabKey)?.label as string
      onChangeTab?.(currentTabKey, activeLabel)
    }
  }, [currentTabKey])

  useEffect(() => {
    if (tabActiveKey) {
      setTabKey(tabActiveKey)
    }
  }, [tabActiveKey])

  useEffect(() => {
    setShowLastTabLabel(showTabLabel && !!tabList.length && tabList.length !== 1)
  }, [showTabLabel, tabList])

  useEffect(() => {
    setPageBgColor(pageBgColorMode === 'white' ? 'var(--color-white)' : 'var(--bg-base-gray)')
  }, [pageBgColorMode])

  const onSetTabKey = (tabKey: string) => {
    setTabKey(tabKey)

    if (tabPersistence) {
      // 设置参数到地址栏
      setSearchParams({ ...allParams, activeKey: tabKey })
    }
  }

  const getTitle = (title: React.ReactNode | string) => {
    return (
      <div className="flex items-center pl-8">
        <div className="flex items-center flex-1">
          {showBack && (
            <LeftOutlined
              style={{ fontSize: 16, cursor: 'pointer', marginRight: 20 }}
              onClick={() => {
                if (onBack) {
                  onBack()
                } else {
                  history.back()
                }
              }}
            />
          )}
          {renderLeft?.()}
          <>
            {!renderLeft && (
              <>
                {icon && (
                  <div className="border-gray-350 border rounded-xl w-[54px] h-[52px] bg-white flex justify-center items-center">
                    {icon.startsWith('/img/') || icon.startsWith('http') ? (
                      <img src={icon} width={34} height={34} />
                    ) : (
                      <Iconfont name={icon} width={34} height={34} {...iconProps} />
                    )}
                  </div>
                )}
                <div className="flex items-center font-pf-bold ml-4 text-xl text-gray">
                  {title}
                  {subTitle && <span className="text-sm text-secondary ml-4">{subTitle}</span>}
                </div>
              </>
            )}
          </>
        </div>
        {/* 右侧区域渲染 */}
        {renderRight && !onRightBtnClick && <div className="flex items-center">{renderRight()}</div>}
        {!renderRight && onRightBtnClick && (
          <div className="flex items-center">
            {
              <Button icon={<PlusOutlined />} type="primary" onClick={onRightBtnClick} {...rightBtnProps}>
                {rightBtnText || <FormattedMessage id="common.add" />}
              </Button>
            }
          </div>
        )}
      </div>
    )
  }

  // console.log('parentName', parentName)

  const getMargin = () => {
    // 1920px - 1540px 100% 边距28
    // 1540px - 1470px 90%  边距22
    // 1470px - 1260px 80% 边距16
    const width = screenSize.width
    let margin = '28px'
    if (width >= 1540) {
      margin = 'px-[28px]' // 100%
    } else if (width < 1540 && width >= 1470) {
      margin = 'px-[22px]' // 90%
    } else if (width < 1470 && width >= 1200) {
      margin = 'px-[16px]' // 80%
    }
    return margin
  }

  return (
    <div style={{ ...style }}>
      {/* 头部区域 */}
      <div
        style={{
          overflow: 'hidden',
          background: 'var(--modal-header-bg)',
          paddingTop: 20,
          paddingRight: 40,
          paddingBottom: 0,
          borderBottom: '1px solid #E6E6E6'
        }}
        className={cn({
          'sticky top-[100px] z-[99]': fixedHeader
        })}
      >
        <div className="mb-4">
          {pageTitle && getTitle(pageTitle)}
          {!pageTitle &&
            parentName &&
            getTitle(
              <>
                <FormattedMessage id={`menu.${subMenuName}`} />
              </>
            )}
        </div>
        {renderHeader?.()}
        <Tabs
          tabList={tabList}
          activeKey={tabKey}
          tabBarGutter={63}
          tabBarStyle={{ paddingLeft: showBack ? 83 : 40 }}
          onChangeTab={(activeKey, activeLabel) => {
            onSetTabKey(activeKey)
            setTabLabel(activeLabel)
            onChangeTab?.(activeKey, activeLabel)
          }}
          tabBarExtraContent={tabBarExtraContent}
          fontWeight={tabBarTitleFontWeight}
        />
        {renderFooter?.()}
      </div>
      {/* 内容区域 */}
      <div style={contentStyle} className={cn('py-5', tabList.length > 0 && showBack ? 'px-[83px]' : getMargin())}>
        {children}
      </div>
    </div>
  )
}
