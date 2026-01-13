import { IButtonMenu, IDomEditor } from '@wangeditor/editor'

import { SourceIcon } from './icon'

class SourceMenu implements IButtonMenu {
  title: string // 按钮标题，没有图标的情况则显示该标题，有图标则为tips
  tag: string // 自定义菜单类型
  active: boolean // 选中状态
  /**
   * 图标这里我的图标是在阿里妈妈适量图标库获取的https://www.iconfont.cn/
   * 搜索对应的图标赋值svg代码放到方法返回即可
   * icon/index.ts源码
   * export const source = () => `<svg>...</svg>`
   */
  iconSvg: string
  constructor() {
    this.title = '源码模式' // 自定义菜单标题
    this.iconSvg = SourceIcon // 图标
    this.tag = 'button'
    this.active = false
  }

  /**
   * 获取编辑器内容源码
   * @param editor
   */
  getValue(editor: IDomEditor): string | boolean {
    return editor.getHtml()
  }

  /**
   * 菜单是否需要激活，当切换为源码时菜单激活
   * @param editor
   * @param active 激活状态
   */
  isActive(editor: IDomEditor, active?: boolean): boolean {
    return this.active
  }

  /**
   * 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
   * @param editor
   */
  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  /**
   * 点击菜单时触发的函数
   * @param editor
   * @param value
   */
  exec(editor: IDomEditor, value: string | boolean) {
    this.active = !this.active
    if (this.isDisabled(editor)) return
    editor.emit('clickSource', this.active)
  }
}
export default SourceMenu
