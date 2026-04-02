import common from './zh-TW/common'
import fundManagement from './zh-TW/fundManagement'
import menu from './zh-TW/menu'
import mt from './zh-TW/mt'
import pwa from './zh-TW/pwa'

export default {
  'navBar.lang': '語言',
  'layout.user.link.help': '幫助',
  'layout.user.link.privacy': '隱私',
  'layout.user.link.terms': '條款',
  'app.preview.down.block': '下載此頁面到本地項目',
  ...menu,
  ...pwa,
  ...common,
  ...mt,
  fundManagement
}
