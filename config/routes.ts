/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 *
 * 路由配置完成后，访问页面即可看到效果，如果需要在菜单中显示，需要配置 name，icon，hideChildrenInMenu等来辅助生成菜单。

    具体值如下：

    name:string 配置菜单的 name，如果配置了国际化，name 为国际化的 key。
    icon:string 配置菜单的图标，默认使用 antd 的 icon 名，默认不适用二级菜单的 icon。
    access:string 权限配置，需要预先配置权限
    hideChildrenInMenu:true 不需要展示 children 时
    hideInMenu:true 可以在菜单中不展示这个路由，包括子路由。
    hideInBreadcrumb:true 可以在面包屑中不展示这个路由，包括子路由。
    headerRender:false 当前路由不展示顶栏
    footerRender:false 当前路由不展示页脚
    menuRender: false 当前路由不展示菜单
    menuHeaderRender: false 当前路由不展示菜单顶栏
    parentKeys: string[] 当此节点被选中的时候也会选中 parentKeys 的节点
    flatMenu 子项往上提，只是不展示父菜单
 */

/**
 * export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        // path 支持为一个 url，必须要以 http 开头
        path: 'https://pro.ant.design/docs/getting-started-cn',
        target: '_blank', // 点击新窗口打开
        name: '文档',
      },
      {
        // 访问路由，以 / 开头为绝对路径
        path: '/user/login',
        // ./Page ->src/pages/Login
        component: './NewPage',
      },
      {
        // 访问路由，如果不是以 / 开头会拼接父路由
        // reg -> /user/reg
        path: 'reg',
        // ./Page ->src/pages/Reg
        component: '../layouts/NewPage2',
      },
    ],
  },
];
*/

export default [
  // 用户
  {
    path: '/:lng/user',
    layout: false,
    component: '@/layouts/UserLayout',
    routes: [
      {
        path: '/:lng/user/login',
        component: './user/login'
      }
      // {
      //   name: 'register',
      //   path: '/:lng/user/register',
      //   component: './user/register'
      // }
    ]
  },
  // 管理端
  // {
  //   path: '/',
  //   redirect: '/:lng/symbol'
  // },
  // {
  //   path: '/:lng',
  //   redirect: '/:lng/symbol'
  // },
  {
    path: '/:lng/symbol',
    name: 'symbol',
    icon: 'icon-caidan-jiaoyipinzhong',
    access: 'canAdmin', // 权限配置
    component: './admin/symbol/list',
    code: 'sym' // 需要与后台配置的菜单编号code一致
  },
  {
    path: '/:lng/symbol/add',
    icon: 'icon-caidan-jiaoyipinzhong',
    access: 'canAdmin', // 权限配置
    component: './admin/symbol/addAndEdit',
    hideInMenu: true,
    code: 'sym:add' // 需要与后台配置的菜单编号code一致
  },
  {
    path: '/:lng/symbol/edit/:id',
    icon: 'icon-caidan-jiaoyipinzhong',
    access: 'canAdmin', // 权限配置
    component: './admin/symbol/addAndEdit',
    hideInMenu: true,
    code: 'sym:edit' // 需要与后台配置的菜单编号code一致
  },
  {
    path: '/:lng/order',
    name: 'order',
    icon: 'icon-caidan-dingdan',
    code: 'order', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/order/list',
        component: './admin/order/list',
        access: 'canAdmin', // 权限配置
        name: 'list',
        code: 'order:list' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/order/list/view/:id',
        component: './admin/order/list/view',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'order:list:view' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/order/close',
        component: './admin/order/close',
        access: 'canAdmin', // 权限配置
        name: 'close',
        code: 'order:close' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/order/close/view/:id',
        component: './admin/order/close/view',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'order:close:view' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/order/position',
        component: './admin/order/position',
        access: 'canAdmin', // 权限配置
        name: 'position',
        code: 'order:position' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/order/position/view/:id',
        component: './admin/order/position/view',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'order:position:view' // 需要与后台配置的菜单编号code一致
      }
    ]
  },
  {
    path: '/:lng/datasources',
    name: 'datasources',
    icon: 'icon-caidan-shujuyuan',
    code: 'datasources', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/datasources/list',
        component: './admin/dataSource/list',
        name: 'list',
        access: 'canAdmin', // 权限配置
        code: 'datasources:list' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/datasources/list/add',
        component: './admin/dataSource/submitForm',
        name: 'add',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'datasources:list:add' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/datasources/list/edit/:id',
        component: './admin/dataSource/submitForm',
        name: 'edit',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'datasources:list:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/datasources/history-price',
        component: './admin/dataSource/historyPrice',
        name: 'history-price',
        access: 'canAdmin', // 权限配置
        code: 'datasources:history-price' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/datasources/history-kline',
        component: './admin/dataSource/historyKLine',
        name: 'history-kline',
        access: 'canAdmin', // 权限配置
        code: 'datasources:history-kline' // 需要与后台配置的菜单编号code一致
      },
    ]
  },
  {
    path: '/:lng/customer',
    name: 'customer',
    icon: 'icon-caidan-kehuguanli',
    code: 'customer', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/customer/list',
        component: './admin/customer/list',
        name: 'list',
        access: 'canAdmin', // 权限配置
        code: 'customer:list' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/customer/account',
        component: './admin/customer/tradeAccount/list',
        name: 'account',
        access: 'canAdmin', // 权限配置
        code: 'customer:account' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/customer/account/edit/:id',
        component: './admin/customer/tradeAccount/edit',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'customer:account:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/customer/position',
        component: './admin/customer/position',
        name: 'position',
        access: 'canAdmin', // 权限配置
        code: 'customer:position' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/customer/position/edit/:id',
        component: './admin/customer/tradeAccount/edit',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'customer:position:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/customer/pending',
        component: './admin/customer/pending',
        name: 'pending',
        access: 'canAdmin', // 权限配置
        code: 'customer:pending' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/customer/pending/edit/:id',
        component: './admin/customer/tradeAccount/edit',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'customer:pending:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/customer/delay-user',
        component: './admin/customer/delayUser',
        name: 'delay-user',
        access: 'canAdmin', // 权限配置
        code: 'customer:delay-user' // 需要与后台配置的菜单编号code一致
      }
    ]
  },
  {
    path: '/:lng/account-group',
    name: 'account-group',
    icon: 'icon-caidan-zhanghuzu',
    code: 'account-group', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/account-group/demo',
        component: './admin/accountGroup/demo',
        name: 'demo',
        access: 'canAdmin', // 权限配置
        code: 'account-group:demo' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/account-group/demo/add',
        component: './admin/accountGroup/comp/addAndEdit',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'account-group:demo:add' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/account-group/demo/clone',
        component: './admin/accountGroup/comp/clone',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'account-group:demo:clone' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/account-group/demo/edit/:id',
        component: './admin/accountGroup/comp/addAndEdit',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'account-group:demo:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/account-group/real',
        component: './admin/accountGroup/real',
        name: 'real',
        access: 'canAdmin', // 权限配置
        code: 'account-group:real' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/account-group/real/add',
        component: './admin/accountGroup/comp/addAndEdit',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'account-group:real:add' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/account-group/real/clone',
        component: './admin/accountGroup/comp/clone',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'account-group:real:clone' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/account-group/real/edit/:id',
        component: './admin/accountGroup/comp/addAndEdit',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'account-group:real:edit' // 需要与后台配置的菜单编号code一致
      }
    ]
  },
  {
    path: '/:lng/system-user',
    name: 'system-user',
    icon: 'icon-caidan-jingliguanli',
    access: 'canAdmin', // 权限配置
    component: './admin/systemUser',
    code: 'system-user' // 需要与后台配置的菜单编号code一致
  },
  // 暂时隐藏不做
  // {
  //   path: '/:lng/dict',
  //   name: 'dict',
  //   icon: 'icon-caidan-cidianguanli',
  //   access: 'canAdmin', // 权限配置
  //   component: './admin/dict',
  //   code: 'dict' // 需要与后台配置的菜单编号code一致
  // },
  {
    path: '/:lng/sys',
    name: 'sys',
    icon: 'icon-caidan-shezhi',
    code: 'sys', // 需要与后台配置的菜单编号code一致
    routes: [
      // {
      //   path: '/:lng/sys/dashboard',
      //   component: './admin/system/dashboard',
      //   name: 'dashboard',
      //   access: 'canAdmin', // 权限配置
      //   code: 'sys:dashboard' // 需要与后台配置的菜单编号code一致
      // },
      // 暂时没有交互
      // {
      //   path: '/:lng/sys/firewall',
      //   component: './admin/system/firewall',
      //   name: 'firewall',
      //   access: 'canAdmin', // 权限配置
      //   code: 'sys:firewall', // 需要与后台配置的菜单编号code一致
      // },
      {
        path: '/:lng/sys/time',
        component: './admin/system/timeSetting',
        name: 'time',
        access: 'canAdmin', // 权限配置
        code: 'sys:time' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/sys/holiday',
        component: './admin/system/holiday',
        name: 'holiday',
        access: 'canAdmin', // 权限配置
        code: 'sys:holiday' // 需要与后台配置的菜单编号code一致
      }
    ]
  },
  {
    path: '/:lng/customer-group',
    name: 'customer-group',
    icon: 'icon-kehuzu1',
    access: 'canAdmin', // 权限配置
    component: './admin/customerGroup',
    code: 'customer-group', // 需要与后台配置的菜单编号code一致
  },
  {
    path: '/:lng/customer-group/add',
    access: 'canAdmin', // 权限配置
    component: './admin/customerGroup/submitForm',
    code: 'customer-group:add', // 需要与后台配置的菜单编号code一致
  },
  {
    path: '/:lng/customer-group/edit/:id',
    access: 'canAdmin', // 权限配置
    component: './admin/customerGroup/submitForm',
    code: 'customer-group:edit', // 需要与后台配置的菜单编号code一致
  },
  {
    path: '/:lng/msg',
    name: 'msg',
    icon: 'icon-xiaoxiguanli',
    code: 'msg', // 需要与后台配置的菜单编号code一致
    routes: [
      // {
      //   path: '/:lng/msg/sms',
      //   component: './admin/message/sms',
      //   name: 'sms',
      //   access: 'canAdmin', // 权限配置
      //   code: 'msg:sms' // 需要与后台配置的菜单编号code一致
      // },
      {
        path: '/:lng/msg/email',
        component: './admin/message/email',
        name: 'email',
        access: 'canAdmin', // 权限配置
        code: 'msg:email' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/msg/email/add-template',
        component: './admin/message/email/Template/submitForm',
        name: 'email',
        access: 'canAdmin', // 权限配置
        code: 'msg:email:add-template' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/msg/email/edit-template/:id',
        component: './admin/message/email/Template/submitForm',
        name: 'email',
        access: 'canAdmin', // 权限配置
        code: 'msg:email:edit-template' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/msg/email/add-channel',
        component: './admin/message/email/Channel/submitForm',
        name: 'email',
        access: 'canAdmin', // 权限配置
        code: 'msg:email:add-channel' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/msg/email/edit-channel/:id',
        component: './admin/message/email/Channel/submitForm',
        name: 'email',
        access: 'canAdmin', // 权限配置
        code: 'msg:email:edit-channel' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/msg/station-msg',
        component: './admin/message/stationMessage',
        name: 'station-msg',
        access: 'canAdmin', // 权限配置
        code: 'msg:station-msg' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/msg/station-msg/add-template',
        component: './admin/message/stationMessage/Template/submitForm',
        name: 'station-msg',
        access: 'canAdmin', // 权限配置
        code: 'msg:station-msg:add-template' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/msg/station-msg/edit-template/:id',
        component: './admin/message/stationMessage/Template/submitForm',
        name: 'station-msg',
        access: 'canAdmin', // 权限配置
        code: 'msg:station-msg:edit-template' // 需要与后台配置的菜单编号code一致
      },
    ]
  },
  // 暂时隐藏不做
  // {
  //   path: '/:lng/asset',
  //   name: 'asset',
  //   icon: 'icon-zichanguanli',
  //   code: 'asset', // 需要与后台配置的菜单编号code一致
  //   routes: [
  //     {
  //       path: '/:lng/asset/pay-supplier',
  //       component: './admin/asset/paySupplier',
  //       name: 'pay-supplier',
  //       access: 'canAdmin', // 权限配置
  //       code: 'asset:pay-supplier' // 需要与后台配置的菜单编号code一致
  //     },
  //     {
  //       path: '/:lng/asset/deposit-distributor',
  //       component: './admin/asset/distributor/deposit',
  //       name: 'deposit-distributor',
  //       access: 'canAdmin', // 权限配置
  //       code: 'asset:deposit-distributor' // 需要与后台配置的菜单编号code一致
  //     },
  //     {
  //       path: '/:lng/asset/withdrawal-distributor',
  //       component: './admin/asset/distributor/withdrawal',
  //       name: 'withdrawal-distributor',
  //       access: 'canAdmin', // 权限配置
  //       code: 'asset:withdrawal-distributor' // 需要与后台配置的菜单编号code一致
  //     },
  //     {
  //       path: '/:lng/asset/withdrawal-record',
  //       component: './admin/asset/tradeRecord/withdrawal',
  //       name: 'withdrawal-record',
  //       access: 'canAdmin', // 权限配置
  //       code: 'asset:withdrawal-record' // 需要与后台配置的菜单编号code一致
  //     },
  //     {
  //       path: '/:lng/asset/deposit-record',
  //       component: './admin/asset/tradeRecord/deposit',
  //       name: 'deposit-record',
  //       access: 'canAdmin', // 权限配置
  //       code: 'asset:deposit-record' // 需要与后台配置的菜单编号code一致
  //     },
  //     {
  //       path: '/:lng/asset/supplier-report',
  //       component: './admin/asset/supplierReport',
  //       name: 'supplier-report',
  //       access: 'canAdmin', // 权限配置
  //       code: 'asset:supplier-report' // 需要与后台配置的菜单编号code一致
  //     }
  //   ]
  // },
  {
    path: '/:lng/crms',
    name: 'crms',
    icon: 'icon-yunyingguanli',
    code: 'crms', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/crms/dashboard',
        component: './admin/crms/dashboard',
        name: 'dashboard',
        access: 'canAdmin', // 权限配置
        code: 'crms:dashboard' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/product-rank',
        component: './admin/crms/productRank',
        name: 'product-rank',
        access: 'canAdmin', // 权限配置
        code: 'crms:product-rank' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/user-rank',
        component: './admin/crms/userRank/list',
        name: 'list',
        access: 'canAdmin', // 权限配置
        code: 'crms:user-rank' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/statistics',
        component: './admin/crms/userRank/statistics',
        name: 'statistics',
        access: 'canAdmin', // 权限配置
        code: 'crms:statistics' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/retention',
        component: './admin/crms/userRank/retention',
        name: 'retention',
        access: 'canAdmin', // 权限配置
        code: 'crms:retention' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/active-user',
        component: './admin/crms/activeUser',
        name: 'retention',
        access: 'canAdmin', // 权限配置
        code: 'crms:active-user' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/channel',
        component: './admin/crms/channel',
        name: 'channel',
        access: 'canAdmin', // 权限配置
        code: 'crms:channel' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/position-order',
        component: './admin/crms/position/list',
        name: 'position-order',
        access: 'canAdmin', // 权限配置
        code: 'crms:position-order' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/close-position',
        component: './admin/crms/position/order',
        name: 'close-position',
        access: 'canAdmin', // 权限配置
        code: 'crms:close-position' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/customer',
        component: './admin/crms/customer/list',
        name: 'customer',
        access: 'canAdmin', // 权限配置
        code: 'crms:customer' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/customer/view/:id',
        component: './admin/crms/customer/view',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'crms:customer:view' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/deposit',
        component: './admin/crms/deposit',
        name: 'deposit',
        access: 'canAdmin', // 权限配置
        code: 'crms:deposit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/withdraw',
        component: './admin/crms/withdraw',
        name: 'withdraw',
        access: 'canAdmin', // 权限配置
        code: 'crms:withdraw' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/crms/channels',
        component: './admin/crms/channels',
        name: 'channels',
        access: 'canAdmin', // 权限配置
        code: 'crms:channels' // 需要与后台配置的菜单编号code一致
      }
      // 2024-11-11，删除
      // {
      //   path: '/:lng/crms/first-user',
      //   component: './admin/crms/firstAUser',
      //   name: 'first-user',
      //   access: 'canAdmin', // 权限配置
      //   code: 'crms:first-user' // 需要与后台配置的菜单编号code一致
      // }
    ]
  },
  {
    path: '/:lng/copy-trading',
    name: 'copy-trading',
    icon: 'icon-caidan-gendan',
    code: 'copy-trading', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/copy-trading/project',
        component: './admin/copyTrading/project',
        name: 'project',
        access: 'canAdmin', // 权限配置
        code: 'copy-trading:project' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/copy-trading/project/edit/:id',
        component: './admin/copyTrading/project/edit',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'copy-trading:project:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/copy-trading/take',
        component: './admin/copyTrading/takeOrder/list',
        name: 'take',
        access: 'canAdmin', // 权限配置
        code: 'copy-trading:take' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/copy-trading/take/view/:id',
        component: './admin/copyTrading/takeOrder/view',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'copy-trading:take:view' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/copy-trading/list',
        component: './admin/copyTrading/copyTrading/list',
        name: 'list',
        access: 'canAdmin', // 权限配置
        code: 'copy-trading:list' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/copy-trading/list/view/:id',
        component: './admin/copyTrading/copyTrading/view',
        hideInMenu: true,
        access: 'canAdmin', // 权限配置
        code: 'copy-trading:list:view' // 需要与后台配置的菜单编号code一致
      }
    ]
  },
  // 支付管理
  {
    path: '/:lng/payment',
    name: 'payment',
    icon: 'icon-zichanguanli',
    code: 'payment', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/payment/exchange-rate',
        component: './admin/payment/exchangeRate',
        name: 'exchange-rate',
        access: 'canAdmin', // 权限配置
        code: 'payment:exchange-rate' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/deposit-channel',
        component: './admin/payment/channel/depositChannel',
        name: 'deposit-channel',
        access: 'canAdmin', // 权限配置
        code: 'payment:deposit-channel' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/deposit-channel/add',
        component: './admin/payment/channel/submitForm',
        name: 'deposit-channel',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'payment:deposit-channel:add' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/deposit-channel/edit/:id',
        component: './admin/payment/channel/submitForm',
        name: 'deposit-channel',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'payment:deposit-channel:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/withdrawal-channel',
        component: './admin/payment/channel/withdrawalChannel',
        name: 'withdrawal-channel',
        access: 'canAdmin', // 权限配置
        code: 'payment:withdrawal-channel' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/withdrawal-channel/add',
        component: './admin/payment/channel/submitForm',
        name: 'withdrawal-channel',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'payment:withdrawal-channel:add' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/withdrawal-channel/edit/:id',
        component: './admin/payment/channel/submitForm',
        name: 'withdrawal-channel',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'payment:withdrawal-channel:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/deposit-supplement',
        component: './admin/payment/order/depositSupplementOrder',
        name: 'deposit-supplement',
        access: 'canAdmin', // 权限配置
        code: 'payment:deposit-supplement' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/deposit-supplement/add',
        component: './admin/payment/order/depositSupplementOrder/edit',
        name: 'deposit-supplement',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'payment:deposit-supplement:add' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/deposit-supplement/view/:id',
        component: './admin/payment/order/depositSupplementOrder/edit',
        name: 'deposit-supplement',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'payment:deposit-supplement:view' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/withdrawal-approve',
        component: './admin/payment/withdrawalApprove',
        name: 'withdrawal-approve',
        access: 'canAdmin', // 权限配置
        code: 'payment:withdrawal-approve' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/deposit-order',
        component: './admin/payment/order/depositOrder',
        name: 'deposit-order',
        access: 'canAdmin', // 权限配置
        code: 'payment:deposit-order' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/withdrawal-order',
        component: './admin/payment/order/withdrawalOrder',
        name: 'withdrawal-order',
        access: 'canAdmin', // 权限配置
        code: 'payment:withdrawal-order' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/customer-report',
        component: './admin/payment/report/customerDepositWithdrawlReport',
        name: 'customer-report',
        access: 'canAdmin', // 权限配置
        code: 'payment:customer-report' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/channel-deposit-report',
        component: './admin/payment/report/channelDepositReport',
        name: 'channel-deposit-report',
        access: 'canAdmin', // 权限配置
        code: 'payment:channel-deposit-report' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/channel-withdrawal-report',
        component: './admin/payment/report/channelWithdrawalReport',
        name: 'channel-withdrawal-report',
        access: 'canAdmin', // 权限配置
        code: 'payment:channel-withdrawal-report' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/payment/platform-report',
        component: './admin/payment/report/platformDepositWithdrawlReport',
        name: 'platform-report',
        access: 'canAdmin', // 权限配置
        code: 'payment:platform-report' // 需要与后台配置的菜单编号code一致
      }
    ]
  },
  // 微盘收款资源管理
  {
    path: '/:lng/receive-payment',
    name: 'receive-payment',
    icon: 'icon-shoukuanguanli',
    code: 'receive-payment', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/receive-payment/resource-manage',
        component: './admin/receivePayment/resourceManage/list',
        name: 'resource-manage',
        access: 'canAdmin', // 权限配置
        code: 'receive-payment:resource-manage' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/receive-payment/resource-manage/add',
        component: './admin/receivePayment/resourceManage/submitForm',
        name: 'resource-manage',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'receive-payment:resource-manage:add' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/receive-payment/resource-manage/edit/:id',
        component: './admin/receivePayment/resourceManage/submitForm',
        name: 'resource-manage',
        access: 'canAdmin', // 权限配置
        hideInMenu: true,
        code: 'receive-payment:resource-manage:edit' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/receive-payment/resource-report',
        component: './admin/receivePayment/resourceReport',
        name: 'resource-report',
        access: 'canAdmin', // 权限配置
        code: 'receive-payment:resource-report' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/receive-payment/deposit-approve',
        component: './admin/receivePayment/depositApprove',
        name: 'deposit-approve',
        access: 'canAdmin', // 权限配置
        code: 'receive-payment:deposit-approve' // 需要与后台配置的菜单编号code一致
      }
    ]
  },
  // 日志管理
  {
    path: '/:lng/logs',
    name: 'logs',
    icon: 'icon-rizhiguanli',
    code: 'logs', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/logs/admin',
        component: './admin/logs/admin',
        name: 'admin',
        access: 'canAdmin', // 权限配置
        code: 'logs:admin' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/logs/client',
        component: './admin/logs/client',
        name: 'client',
        access: 'canAdmin', // 权限配置
        code: 'logs:client' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/logs/system-error',
        component: './admin/logs/systemError',
        name: 'system-error',
        access: 'canAdmin', // 权限配置
        code: 'logs:system-error' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/logs/sms',
        component: './admin/logs/sms',
        name: 'sms',
        access: 'canAdmin', // 权限配置
        code: 'logs:sms' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/logs/email',
        component: './admin/logs/email',
        name: 'email',
        access: 'canAdmin', // 权限配置
        code: 'logs:email' // 需要与后台配置的菜单编号code一致
      },
      // 这是一个按钮，非菜单，后台配置为一个按钮，入口在右上角下拉
      {
        path: '/:lng/logs/personal',
        component: './admin/logs/personal',
        name: 'personal',
        access: 'canAdmin', // 权限配置
        code: 'logs:personal' // 需要与后台配置的菜单编号code一致
      },
    ]
  },
  // ================= 代理系统菜单 start =================
  {
    path: '/:lng/agent',
    name: 'agent',
    icon: 'icon-dailixitong',
    access: 'canAdmin', // 权限配置
    code: 'agent', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/agent/agent-user-list',
        name: 'agent-user-list',
        access: 'canAdmin', // 权限配置
        component: './admin/agent/agentUserList',
        code: 'agent:agent-user-list' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/agent/agent-users',
        name: 'agent-users',
        access: 'canAdmin', // 权限配置
        component: './admin/agent/allUsersList',
        code: 'agent:agent-users' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/agent/agent-commission-record',
        name: 'agent-commission-record',
        access: 'canAdmin', // 权限配置
        component: './admin/agent/commissionRecord',
        code: 'agent:agent-commission-record' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/agent/agent-withdrawal-record',
        name: 'agent-withdrawal-record',
        access: 'canAdmin', // 权限配置
        component: './admin/agent/withdrawalRecord',
        code: 'agent:agent-withdrawal-record' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/agent/agent-system-setting',
        name: 'agent-system-setting',
        access: 'canAdmin', // 权限配置
        component: './admin/agent/systemSetting',
        code: 'agent:agent-system-setting' // 需要与后台配置的菜单编号code一致
      },
    ]
  },
  // ================= 代理系统菜单 end =================

  // 结算对账管理
  {
    path: '/:lng/settlement',
    name: 'settlement',
    icon: 'icon-peizhi',
    code: 'settlement', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/settlement/financial-summary',
        component: './admin/settlement/financial-summary',
        name: 'financial-summary',
        code: 'settlement:financial-summary' // 需要与后台配置的菜单编号code一致
      },
      {
        path: '/:lng/settlement/audit-logs',
        component: './admin/settlement/audit-logs',
        name: 'audit-logs',
        code: 'settlement:audit-logs' // 需要与后台配置的菜单编号code一致
      }
    ]
  },

  // 版本管理
  {
    path: '/:lng/version',
    name: 'version',
    icon: 'icon-rizhiguanli',
    access: 'canAdmin', // 权限配置
    component: './admin/version',
    code: 'version' // 需要与后台配置的菜单编号code一致
  },
  {
    path: '/:lng/version/add',
    access: 'canAdmin', // 权限配置
    component: './admin/version/submitForm',
    hideInMenu: true,
    code: 'version:add' // 需要与后台配置的菜单编号code一致
  },
  {
    path: '/:lng/version/edit/:id',
    access: 'canAdmin', // 权限配置
    component: './admin/version/submitForm',
    hideInMenu: true,
    code: 'version:edit' // 需要与后台配置的菜单编号code一致
  },
  // 活动管理
  {
    path: '/:lng/activity',
    name: 'activity',
    icon: 'icon-caidan-jiaoyipinzhong',
    access: 'canAdmin', // 权限配置
    code: 'activity', // 需要与后台配置的菜单编号code一致
    routes: [
      {
        path: '/:lng/activity/first-charge-activity',
        name: 'first-charge-activity',
        access: 'canAdmin', // 权限配置
        component: './admin/activity/firstChargeActivity',
        code: 'activity:first-charge-activity' // 需要与后台配置的菜单编号code一致
      },
    ]
  },
  {
    path: '*',
    layout: false,
    component: './404'
  }
]
