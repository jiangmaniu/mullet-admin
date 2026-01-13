import { getIntl, getLocale as getMaxLocale } from '@umijs/max'

import { gray, red, yellow } from '@/theme/theme.config'

export enum Language {
  'en-US' = 'en-US', // 英语
  'zh-TW' = 'zh-TW' // 台湾繁体
}
export const LanguageMap: Record<string, any> = {
  'en-US': {
    key: 'en-US',
    label: 'English',
    icon: '🇺🇸'
  },
  'zh-TW': {
    key: 'zh-TW',
    label: '繁體中文',
    icon: '🇨🇳'
  }
}

export const getLngOptions = () => {
  return Object.values(LanguageMap).map((item) => ({ ...item, value: item.key }))
}

export type ILanguage = 'en-US' | 'zh-TW'

export const SUPPORTED_LANGUAGES = ['zh-TW', 'en-US']

// 传给后台的值，转化一下
export const LanuageTransformMap: Record<ILanguage, string> = {
  'zh-TW': 'zh-TW',
  'en-US': 'en-US'
}

export const getLocaleForBackend = () => LanuageTransformMap[getMaxLocale() as ILanguage]

// 获取k线对应的语言
export const getTradingViewLng = () => {
  const langMap = {
    'zh-TW': 'zh_TW', // 中文繁体
    'en-US': 'en' // 英文
  }

  return langMap[getMaxLocale() as ILanguage] || 'en'
}

// 订单类型
export const ORDER_TYPE = {
  /**市价单 */
  MARKET_ORDER: 'MARKET_ORDER',
  /**限价买入单 */
  LIMIT_BUY_ORDER: 'LIMIT_BUY_ORDER',
  /**限价卖出单 */
  LIMIT_SELL_ORDER: 'LIMIT_SELL_ORDER',
  /**止损限价买入单 */
  STOP_LOSS_LIMIT_BUY_ORDER: 'STOP_LOSS_LIMIT_BUY_ORDER',
  /**止损限价卖出单 */
  STOP_LOSS_LIMIT_SELL_ORDER: 'STOP_LOSS_LIMIT_SELL_ORDER',
  /**止损市价买入单 */
  STOP_LOSS_MARKET_BUY_ORDER: 'STOP_LOSS_MARKET_BUY_ORDER',
  /**止损市价卖出单 */
  STOP_LOSS_MARKET_SELL_ORDER: 'STOP_LOSS_MARKET_SELL_ORDER',
  /**止损单 */
  STOP_LOSS_ORDER: 'STOP_LOSS_ORDER',
  /**止盈单 */
  TAKE_PROFIT_ORDER: 'TAKE_PROFIT_ORDER'
}

// 买卖交易方向
export const TRADE_BUY_SELL = {
  /**买方向 */
  BUY: 'BUY',
  /**买方向 */
  SELL: 'SELL'
}

// 业务枚举
export const getEnum = () => {
  const intl = getIntl()

  //  ============= 业务枚举值 ================
  // 使用text形式命名，方便表格 valueEnum 消费
  const Enum = {
    YesNo: {
      true: { text: intl.formatMessage({ id: 'mt.yes' }) },
      false: { text: intl.formatMessage({ id: 'mt.no' }) }
    },
    // 启用、禁用状态
    Status: {
      DISABLED: { text: intl.formatMessage({ id: 'mt.jinyong' }) },
      ENABLE: { text: intl.formatMessage({ id: 'mt.qiyong' }) }
    },
    Number: {
      '1': { text: intl.formatMessage({ id: 'mt.yes' }) },
      '0': { text: intl.formatMessage({ id: 'mt.no' }) }
    },
    PaymentStatus: {
      FAIL: { text: intl.formatMessage({ id: 'common.shibai' }) },
      SUCCESS: { text: intl.formatMessage({ id: 'common.chenggong' }) },
      WAIT: { text: intl.formatMessage({ id: 'common.dengdai' }) }
    },
    ReceiptStatus: {
      WAIT: { text: intl.formatMessage({ id: 'mt.daishenhe' }) },
      SUCCESS: { text: intl.formatMessage({ id: 'mt.shenhetongguo' }) },
      REJECT: { text: intl.formatMessage({ id: 'mt.jujue' }) },
      RECEIPT: { text: intl.formatMessage({ id: 'mt.yidaozhang' }) },
      FAIL: { text: intl.formatMessage({ id: 'mt.shibai' }) }
    },
    // 交易品种类型
    CalculationType: {
      FOREIGN_CURRENCY: { text: intl.formatMessage({ id: 'mt.waihui' }) },
      CFD: { text: intl.formatMessage({ id: 'mt.chajiaheyue' }) }
    },
    // 点差模式
    SpreadMode: {
      fixed: { text: intl.formatMessage({ id: 'mt.gudingdiancha' }) },
      float: { text: intl.formatMessage({ id: 'mt.fudongdiancha' }) }
    },
    // 品种库存费-类型
    SymbolInventoryType: {
      pointMode: { text: intl.formatMessage({ id: 'mt.dianmoshi' }) },
      percentageMarketPrice: { text: intl.formatMessage({ id: 'mt.yibaifenbixignshishiyongxianjia' }) },
      percentageOpenPrice: { text: intl.formatMessage({ id: 'mt.yibaifenbixingshishiyongkaicangjia' }) }
    },
    // 交易许可
    TradeLicense: {
      DISABLED: { text: intl.formatMessage({ id: 'mt.yijinyong' }) },
      ONLY_BUY: { text: intl.formatMessage({ id: 'mt.jinmairu' }) },
      ONLY_SELL: { text: intl.formatMessage({ id: 'mt.jinmaichu' }) },
      ONLY_CLOSE: { text: intl.formatMessage({ id: 'mt.jinpingcang' }) },
      ENABLE: { text: intl.formatMessage({ id: 'mt.wanquanfangwen' }) }
    },
    GTC: {
      CLIENT_CANCEL: { text: intl.formatMessage({ id: 'mt.zhidaokehuquxiao' }) },
      DAY_VALID: { text: intl.formatMessage({ id: 'mt.dangriyouxiaobaokuosltp' }) },
      DAY_VALID_NOT: { text: intl.formatMessage({ id: 'mt.dangriyouxiaobubaokuosltp' }) }
    },
    // 认证状态
    ApproveStatus: {
      TODO: { text: intl.formatMessage({ id: 'mt.daishenhe' }), color: yellow['560'] },
      CANCEL: { text: intl.formatMessage({ id: 'mt.quxiao' }), color: gray['900'] },
      Disallow: { text: intl.formatMessage({ id: 'mt.shenheshibai' }), color: red['600'] },
      SUCCESS: { text: intl.formatMessage({ id: 'mt.yirenzheng' }), color: gray['900'] }
    },
    // 证件类型
    IdentificationType: {
      ID_CARD: { text: intl.formatMessage({ id: 'mt.shenfenzheng' }) },
      PASSPORT: { text: intl.formatMessage({ id: 'mt.huzhao' }) }
    },
    // 银行卡类型
    BankCardType: {
      DEBIT_CARD: { text: intl.formatMessage({ id: 'mt.chuxuka' }) },
      CREDIT_CARD: { text: intl.formatMessage({ id: 'mt.xingyongka' }) }
    },
    // 交易方向类型：只有两种 买、卖
    TradeBuySell: {
      BUY: { text: intl.formatMessage({ id: 'mt.mairu' }) },
      SELL: { text: intl.formatMessage({ id: 'mt.maichu' }) }
    },
    // 客户管理-交易账号-结余-操作类型
    CustomerBalanceType: {
      DEPOSIT: { text: intl.formatMessage({ id: 'mt.rujin' }) },
      WITHDRAWAL: { text: intl.formatMessage({ id: 'mt.chujin' }) }
      // MARGIN: { text: intl.formatMessage({ id: 'mt.baozhengjin' }) },
      // PROFIT: { text: intl.formatMessage({ id: 'mt.yingkui' }) },
      // GIFT: { text: intl.formatMessage({ id: 'mt.zengjin' }) },
      // BALANCE: { text: intl.formatMessage({ id: 'mt.jieyu' }) }
    },
    // 客户管理-交易账号-结余-表格-类型
    CustomerBalanceRecordType: {
      DEPOSIT: { text: intl.formatMessage({ id: 'common.chongzhi' }) },
      DEPOSIT_SIMULATE: { text: intl.formatMessage({ id: 'common.monichongzhi' }) },
      WITHDRAWAL: { text: intl.formatMessage({ id: 'mt.tixian' }) },
      MARGIN: { text: intl.formatMessage({ id: 'mt.baozhengjin' }) },
      PROFIT: { text: intl.formatMessage({ id: 'mt.yingkui' }) },
      GIFT: { text: intl.formatMessage({ id: 'mt.zengjin' }) },
      BALANCE: { text: intl.formatMessage({ id: 'mt.jieyu' }) },
      TRANSFER: { text: intl.formatMessage({ id: 'common.zhuanzhang' }) },
      ZERO: { text: intl.formatMessage({ id: 'mt.guiling' }) },
      FOLLOW_PROFIT: { text: intl.formatMessage({ id: 'common.gendanfenrun' }) },
      HANDLING_FEES: { text: intl.formatMessage({ id: 'mt.shouxufei' }) },
      INTEREST_FEES: { text: intl.formatMessage({ id: 'mt.kucunfei' }) },
      BACK: { text: intl.formatMessage({ id: 'mt.tixiantuihui' }) }
    },
    // 系统设置-看板时间选择
    // @TODO 跟后台确认
    DashbaordTimeType: {
      1: { text: intl.formatMessage({ id: 'mt.jinri' }) },
      7: { text: intl.formatMessage({ id: 'mt.zuijinqitian' }) },
      30: { text: intl.formatMessage({ id: 'mt.benyue' }) }
    },
    // 订单类型
    OrderType: {
      MARKET_ORDER: { text: intl.formatMessage({ id: 'mt.shijiadan' }), value: 10 },
      STOP_LOSS_ORDER: { text: intl.formatMessage({ id: 'mt.zhisundan' }), value: 20 },
      TAKE_PROFIT_ORDER: { text: intl.formatMessage({ id: 'mt.zhiyingdan' }), value: 30 },
      LIMIT_BUY_ORDER: { text: intl.formatMessage({ id: 'mt.xianjiamairudan' }), value: 40 },
      LIMIT_SELL_ORDER: { text: intl.formatMessage({ id: 'mt.xianjiamaichudan' }), value: 50 },
      STOP_LOSS_LIMIT_BUY_ORDER: { text: intl.formatMessage({ id: 'mt.zhiyunxianjiamairudan' }), value: 60 },
      STOP_LOSS_LIMIT_SELL_ORDER: { text: intl.formatMessage({ id: 'mt.zhiyunxianjiamaichudan' }), value: 70 },
      STOP_LOSS_MARKET_BUY_ORDER: { text: intl.formatMessage({ id: 'mt.zhiyunshijiamairudan' }), value: 80 },
      STOP_LOSS_MARKET_SELL_ORDER: { text: intl.formatMessage({ id: 'mt.zhiyunshijiamaichudan' }), value: 90 }
    },
    // 订单状态
    OrderStatus: {
      CANCEL: { text: intl.formatMessage({ id: 'mt.yicexiao' }) },
      ENTRUST: { text: intl.formatMessage({ id: 'mt.weituozhong' }) },
      FAIL: { text: intl.formatMessage({ id: 'mt.shibai' }) },
      FINISH: { text: intl.formatMessage({ id: 'mt.yichengjiao' }) }
    },
    // 资金变更记录-类型
    MoneyRecordsType: {
      DEPOSIT: { text: intl.formatMessage({ id: 'mt.chongzhi' }) },
      GIFT: { text: intl.formatMessage({ id: 'mt.zengjin' }) },
      MARGIN: { text: intl.formatMessage({ id: 'mt.baozhengjin' }) },
      PROFIT: { text: intl.formatMessage({ id: 'mt.yingkui' }) },
      WITHDRAWAL: { text: intl.formatMessage({ id: 'mt.tixian' }) }
    },
    // 可用预付款
    UsableAdvanceCharge: {
      NOT_PROFIT_LOSS: { text: intl.formatMessage({ id: 'mt.bujisuanweishixiandyinglikuyun' }) },
      PROFIT_LOSS: { text: intl.formatMessage({ id: 'mt.jisuanweishixiandyinglikuyun' }) }
      // @TODO 缺少这两个枚举字段
      // NOT_PROFIT: { text: intl.formatMessage({ id: 'mt.jisuanweishixiandeyingli' }) },
      // NOT_LOSS: { text: intl.formatMessage({ id: 'mt.jisuanweishixiandekuisun' }) },
    },
    // 资金划转 @TODO 缺少这些没定义？
    // { label: <FormattedMessage id="mt.jinzhi" />, value: '1' },
    // { label: <FormattedMessage id="mt.tongkehurenyihuazhuan" />, value: '2' },
    // { label: <FormattedMessage id="mt.tongkehuzhuanru" />, value: '3' },
    // { label: <FormattedMessage id="mt.tongkehuzhuanchu" />, value: '4' }
    FundTransfer: {
      ALLOWABLE: { text: intl.formatMessage({ id: 'mt.yunxu' }) },
      PROHIBIT: { text: intl.formatMessage({ id: 'mt.jinzhi' }) }
    },
    // 保证金类型
    MarginType: {
      CROSS_MARGIN: { text: intl.formatMessage({ id: 'mt.quancang' }) },
      ISOLATED_MARGIN: { text: intl.formatMessage({ id: 'mt.zhucang' }) }
    },
    // 订单模式
    OrderMode: {
      LOCKED_POSITION: { text: intl.formatMessage({ id: 'mt.suocang' }) },
      NETTING: { text: intl.formatMessage({ id: 'mt.jinge' }) }
    },
    // 订单成交方向
    OrderInOut: {
      IN: { text: 'IN' },
      OUT: { text: 'OUT' }
      // IN_OUT: { text: 'IN_OUT' }
    },
    // 订单创建原因
    OrderCreateReason: {
      CLIENT: { text: intl.formatMessage({ id: 'mt.kehu' }) },
      MANAGER: { text: intl.formatMessage({ id: 'mt.jingli' }) },
      DEALER: { text: intl.formatMessage({ id: 'mt.jingxiaoshang' }) },
      STOP_LOSS: { text: intl.formatMessage({ id: 'mt.zhisun' }) },
      TAKE_PROFIT: { text: intl.formatMessage({ id: 'mt.zhiying' }) },
      STOP_OUT: { text: intl.formatMessage({ id: 'mt.qiangzhipingcang' }) }
    },
    // 持仓单状态
    BGAStatus: {
      BAG: { text: intl.formatMessage({ id: 'mt.chicangzhong' }) },
      FINISH: { text: intl.formatMessage({ id: 'mt.yiwancheng' }) }
    },
    // 注册方式
    RegisterWay: {
      EMAIL: { text: intl.formatMessage({ id: 'mt.youxiang' }) },
      PHONE: { text: intl.formatMessage({ id: 'mt.shouji' }) }
    },
    // 产品数据源状态
    SymbolDataSourceStatus: {
      UNKNOWN: { text: intl.formatMessage({ id: 'mt.weizhi' }) },
      NOT_ONLINE: { text: intl.formatMessage({ id: 'mt.weishangxian' }) },
      PRE_ONLINE: { text: intl.formatMessage({ id: 'mt.yushangxian' }) },
      ONLINE: { text: intl.formatMessage({ id: 'mt.yishangxian' }) },
      SUSPEND: { text: intl.formatMessage({ id: 'mt.zanting' }) },
      OFFLINE: { text: intl.formatMessage({ id: 'mt.yixiaxian' }) },
      TRANSFER_BOARD: { text: intl.formatMessage({ id: 'mt.zhuanban' }) },
      FUSE: { text: intl.formatMessage({ id: 'mt.rongduanfengxianxitongkongzhi' }) }
    },
    // 品种-手续费范围
    FeeRange: {
      trade_hand: { text: intl.formatMessage({ id: 'mt.shoushu' }) },
      trade_vol: { text: intl.formatMessage({ id: 'mt.jiaoyiliang' }) }
    },
    // 预付款-杠杆模式
    PrePayLeverageMode: {
      fixed_margin: { text: intl.formatMessage({ id: 'mt.gudingyufukuan' }) },
      fixed_leverage: { text: intl.formatMessage({ id: 'mt.gudingganggan' }) },
      float_leverage: { text: intl.formatMessage({ id: 'mt.zidingyiganggan' }) }
    },
    // // 带单申请 - 审核状态
    // TradeFollow: {
    //   audit_status: [
    //     intl.formatMessage({ id: 'mt.daishenhe' }),
    //     intl.formatMessage({ id: 'mt.shenhetongguo' }),
    //     intl.formatMessage({ id: 'mt.shenhejujue' })
    //   ],
    // },
    // 带单项目状态
    OpenFlag: {
      '1': { text: intl.formatMessage({ id: 'mt.qiyong' }) },
      '0': { text: intl.formatMessage({ id: 'mt.jinyong' }) }
    },
    KYC: {
      '0': { text: intl.formatMessage({ id: 'mt.weishiming' }) },
      '1': { text: intl.formatMessage({ id: 'mt.yishiming' }) }
    },
    DepositStatus: {
      '0': { text: intl.formatMessage({ id: 'mt.weichenggongrujin' }) },
      '1': { text: intl.formatMessage({ id: 'mt.yichenggongrujin' }) }
    },
    // 首入用户
    FirstTimeUser: {
      '1': { text: intl.formatMessage({ id: 'mt.shi' }) },
      '0': { text: intl.formatMessage({ id: 'mt.fou' }) }
    },
    // 活跃用户报表统计项目
    ActiveUserStatItem: {
      retention: { text: intl.formatMessage({ id: 'mt.liucunlv' }) },
      deposit: { text: intl.formatMessage({ id: 'mt.pingjunzongrujin' }) },
      withdraw: { text: intl.formatMessage({ id: 'mt.pingjunzongchujin' }) },
      netdeposit: { text: intl.formatMessage({ id: 'mt.pingjunjingchujin' }) },
      lot: { text: intl.formatMessage({ id: 'mt.pingjunzongshoushu' }) }
    },
    // 消息类型
    MessageType: {
      SINGLE: { text: intl.formatMessage({ id: 'mt.danfa' }) },
      ONCEADAY: { text: intl.formatMessage({ id: 'mt.yitianyici' }) },
      ORDER_ONCEADAY: { text: intl.formatMessage({ id: 'mt.xiangtongdingdanyitianyici' }) }
      // GROUP: { text: intl.formatMessage({ id: 'mt.anzuquanfa' }) },
      // APPROVAL: { text: intl.formatMessage({ id: 'mt.shenpiliu' }) },
      // ROLE: { text: intl.formatMessage({ id: 'mt.anjuesequnfa' }) },
      // ORDER: { text: intl.formatMessage({ id: 'mt.dingdan' }) }
    },
    // 消息等级
    MessageGrade: {
      WARN: { text: intl.formatMessage({ id: 'mt.tixingxiaoxi' }) },
      ORDINARY: { text: intl.formatMessage({ id: 'mt.putongxiaoxi' }) },
      SIGNIFICANT: { text: intl.formatMessage({ id: 'mt.zhongyaoxiaoxi' }) },
      URGENT: { text: intl.formatMessage({ id: 'mt.jinjixiaoxi' }) }
    },
    // 消息状态
    MessageSendStatus: {
      SUCCESS: { text: intl.formatMessage({ id: 'mt.yifasong' }) },
      SENDING: { text: intl.formatMessage({ id: 'mt.daifasong' }) },
      FAIL: { text: intl.formatMessage({ id: 'mt.fasongshibai' }) }
    },
    // 消息接收对象
    MessageRecipientType: {
      ALL_USERS: { text: intl.formatMessage({ id: 'mt.quanbukehu' }) },
      BUSINESS_LINE: { text: intl.formatMessage({ id: 'mt.yewuxian' }) },
      CUSTOMER: { text: intl.formatMessage({ id: 'mt.kehu' }) },
      ACCOUNT_TYPE: { text: intl.formatMessage({ id: 'mt.zhanghuleixing' }) }
    },
    // 发送方式
    MessageSendType: {
      IMMEDIATE: { text: intl.formatMessage({ id: 'mt.jishifasong' }) },
      SCHEDULED: { text: intl.formatMessage({ id: 'mt.dingshifasong' }) }
    },
    // 统计周期
    PaymentStatisticalPeriod: {
      DAY: { text: intl.formatMessage({ id: 'mt.day' }) },
      MONTH: { text: intl.formatMessage({ id: 'mt.month' }) }
    },
    // 入金补单状态
    PaymentDepositSupplementOrderStatus: {
      WAIT_CALLBACK: { text: intl.formatMessage({ id: 'mt.daihuitiao' }) },
      RECEIPT: { text: intl.formatMessage({ id: 'mt.yidaozhang' }) }
    },
    // 出金审批状态
    PaymentWithdrawalApprovalStatus: {
      WAIT: { text: intl.formatMessage({ id: 'mt.daishenhe' }) },
      SUCCESS: { text: intl.formatMessage({ id: 'mt.tongguo' }) },
      RECEIPT: { text: intl.formatMessage({ id: 'mt.yidaozhang' }) },
      REJECT: { text: intl.formatMessage({ id: 'mt.jujue' }) },
      FAIL: { text: intl.formatMessage({ id: 'mt.shibai' }) },
      WITHDRAW: { text: intl.formatMessage({ id: 'mt.tixianzhong' }) }
    },
    // 出金订单状态
    PaymentWithdrawalOrderStatus: {
      SUCCESS: { text: intl.formatMessage({ id: 'mt.shenhetongguo' }) },
      RECEIPT: { text: intl.formatMessage({ id: 'mt.yidaozhang' }) },
      WAIT: { text: intl.formatMessage({ id: 'mt.zhuanzhangzhong' }) },
      REJECT: { text: intl.formatMessage({ id: 'mt.jujue' }) },
      FAIL: { text: intl.formatMessage({ id: 'mt.shibai' }) },
      WITHDRAW: { text: intl.formatMessage({ id: 'mt.tixianzhong' }) }
    },
    // 入金订单状态
    PaymentDepositOrderStatus: {
      SUCCESS: { text: intl.formatMessage({ id: 'mt.zhifuchenggong' }) },
      WAIT: { text: intl.formatMessage({ id: 'mt.daizhifu' }) },
      FAIL: { text: intl.formatMessage({ id: 'mt.shibai' }) }
    },
    // 渠道资金类型
    PaymentFundType: {
      DEPOSIT: { text: intl.formatMessage({ id: 'mt.rujin' }) },
      WITHDRAWAL: { text: intl.formatMessage({ id: 'mt.chujin' }) }
    },
    PaymentChannelCollectionType: {
      SAVE_MODE: { text: intl.formatMessage({ id: 'mt.chuzhimoshi' }) },
      ORDER_MODE: { text: intl.formatMessage({ id: 'mt.dingdanmoshi' }) }
    },
    // 支付凭证
    PaymentVoucherStatus: {
      SUBMIT: { text: intl.formatMessage({ id: 'mt.yitijiaopinzheng' }) },
      NOSUBMIT: { text: intl.formatMessage({ id: 'mt.weitijiaopinzheng' }) }
    },
    // 支付资源状态
    PaymentReceiveSourceStatus: {
      IDLE: { text: intl.formatMessage({ id: 'mt.kongxian' }) },
      OCCUPY: { text: intl.formatMessage({ id: 'mt.zhanyong' }) },
      DISABLE: { text: intl.formatMessage({ id: 'mt.jinyong' }) },
      AUTOSTOP: { text: intl.formatMessage({ id: 'mt.zitongtingyong' }) }
    },
    // 日志模块枚举
    LogModuleType: {
      'trade-pc-client': {
        text: 'PC'
      },
      'trade-h5-client': {
        text: 'H5'
      },
      'trade-app-client': {
        text: 'APP'
      }
    },

    // ==== 代理系统枚举 start =====
    // 等级评估周期
    AgentLevelCircle: {
      MONTHLY: { text: intl.formatMessage({ id: 'mt.agent.yue' }) },
      SEMIANNUALLY: { text: intl.formatMessage({ id: 'mt.agent.bannian' }) },
      QUARTERLY: { text: intl.formatMessage({ id: 'mt.agent.jidu' }) },
      CUMULATIVE: { text: intl.formatMessage({ id: 'mt.agent.leiji' }) }
    },
    // 提现频次
    AgentWithdrawFrequency: {
      DAYONE: { text: intl.formatMessage({ id: 'mt.agent.yitianyici' }) },
      WEEKONE: { text: intl.formatMessage({ id: 'mt.agent.yizhouyici' }) },
      MONTHONE: { text: intl.formatMessage({ id: 'mt.agent.meiyueyici' }) }
    },
    // 代理系统设置-提现审核模式
    AgentSettingWithdrawAuditMode: {
      AUTOAUDIT: { text: intl.formatMessage({ id: 'mt.agent.zidongshenhe' }) },
      MANUALAUDIT: { text: intl.formatMessage({ id: 'mt.agent.shoudongshenhe' }) }
    },
    // 代理提现记录-审核模式
    AgentWithdrawAuditMode: {
      AUTO: { text: intl.formatMessage({ id: 'mt.agent.zidongshenhe' }) },
      MANUAL: { text: intl.formatMessage({ id: 'mt.agent.shoudongshenhe' }) }
    },
    // 代理模式设置
    AgentModeSetting: {
      // single: { text: intl.formatMessage({ id: 'mt.agent.dengjimoshi' }) },
      multiple: { text: intl.formatMessage({ id: 'mt.agent.duocengjimoshi' }) }
    },
    // 用户类型
    AgentUserType: {
      USER: { text: intl.formatMessage({ id: 'mt.agent.putongyonghu' }) },
      AGENT: { text: intl.formatMessage({ id: 'mt.agent.dailiyonghu' }) }
    },
    // 结算到账账户
    AgentSettlementAccount: {
      // MT: { text: intl.formatMessage({ id: 'mt.agent.mtzhanghu' }) },
      PLATFORM: { text: intl.formatMessage({ id: 'mt.agent.pingtaiqianbao' }) }
    },
    // 返佣配置统计周期
    AgentRebateConfigStatisticsCycle: {
      DAY: { text: intl.formatMessage({ id: 'mt.agent.tian' }) },
      WEEK: { text: intl.formatMessage({ id: 'mt.agent.zhou' }) },
      MONTH: { text: intl.formatMessage({ id: 'mt.agent.yue' }) },
      QUARTER: { text: intl.formatMessage({ id: 'mt.agent.jidu' }) },
      REAL_TIME: { text: intl.formatMessage({ id: 'mt.agent.shishi' }) }
    },
    // 返佣配置类型
    AgentRebateConfigType: {
      FIXED_AMOUNT: {
        text: intl.formatMessage({ id: 'mt.agent.gudingjine' }),
        desc: intl.formatMessage({ id: 'mt.agent.gudingjinedesc' })
      },
      // NET_DEPOSIT_PERCENTAGE: {
      //   text: intl.formatMessage({ id: 'mt.agent.jingrujinbaifenbi' }),
      //   desc: intl.formatMessage({ id: 'mt.agent.jingrujinbaifenbidesc' })
      // },
      FEE_PERCENTAGE: {
        text: intl.formatMessage({ id: 'mt.agent.shouxufeibaifenbi' }),
        desc: intl.formatMessage({ id: 'mt.agent.shouxufeibaifenbidesc' })
      }
      // PROFIT_LOSS_PERCENTAGE: {
      //   text: intl.formatMessage({ id: 'mt.agent.yingkuibaifenbi' }),
      //   desc: intl.formatMessage({ id: 'mt.agent.yingkuibaifenbidesc' })
      // }
    },
    // 返佣结算状态
    AgentSettlementStatus: {
      SETTLED: { text: intl.formatMessage({ id: 'mt.agent.yijiesuan' }) },
      UNSETTLED: { text: intl.formatMessage({ id: 'mt.agent.weijiesuan' }) }
    },
    // 代理提现记录状态
    AgentWithdrawalStatus: {
      SUCCESS: { text: intl.formatMessage({ id: 'mt.agent.chenggong' }), color: 'var(--color-green)' },
      FAIL: { text: intl.formatMessage({ id: 'mt.agent.jujue' }), color: 'var(--color-red)' },
      WAIT: { text: intl.formatMessage({ id: 'mt.agent.daichuli' }), color: 'var(--color-yellow-570)' }
    },

    // ==== 代理系统枚举 end =====

    // k线类型
    KlineType: {
      '1min': { text: intl.formatMessage({ id: 'mt.1min' }) },
      '5min': { text: intl.formatMessage({ id: 'mt.5min' }) },
      '15min': { text: intl.formatMessage({ id: 'mt.15min' }) },
      '30min': { text: intl.formatMessage({ id: 'mt.30min' }) },
      '60min': { text: intl.formatMessage({ id: 'mt.60min' }) },
      '4hour': { text: intl.formatMessage({ id: 'mt.4hour' }) },
      '1day': { text: intl.formatMessage({ id: 'mt.1day' }) },
      '1week': { text: intl.formatMessage({ id: 'mt.1week' }) },
      '1mon': { text: intl.formatMessage({ id: 'mt.1mon' }) }
      // '1year': { text: intl.formatMessage({ id: 'mt.1year' }) }
    },
    // 数据源类型
    DataSourceType: {
      PRIMEXM: { text: 'PRIMEXM', icon: '/img/primex-icon.png' },
      MT5: { text: 'MT5', icon: '/img/mt5-icon.png' },
      BINANCE: { text: 'BINANCE', icon: '/img/bian-icon.png' },
      HUOBI: { text: 'HUOBI', icon: '/img/huobi-icon.png' }
    },
    // k线历史报价状态
    KlineHistoryPriceStatus: {
      NORMAL: { text: intl.formatMessage({ id: 'mt.zhengchang' }) },
      DISCARD: { text: intl.formatMessage({ id: 'mt.duiqiguolv' }) },
      SPREAD_MIN: { text: intl.formatMessage({ id: 'mt.diyudianchafanwei' }) },
      SPREAD_MAX: { text: intl.formatMessage({ id: 'mt.gaoyudianchafanwei' }) },
      ORDINARY: { text: intl.formatMessage({ id: 'mt.putongguolv' }) }
    },
    // 版本更新状态
    VersionStatus: {
      mandatory_update: { text: intl.formatMessage({ id: 'mt.qiangzhigengxin' }) },
      update_prompt: { text: intl.formatMessage({ id: 'mt.tishigengxin' }) },
      no_update_prompt: { text: intl.formatMessage({ id: 'mt.butishigengxin' }) }
    },
    // 版本设备
    VersionDevice: {
      ios: { text: intl.formatMessage({ id: 'mt.ios' }) },
      android: { text: intl.formatMessage({ id: 'mt.android' }) }
    },
    // 活动状态
    ActivityStatus: {
      true: { text: intl.formatMessage({ id: 'mt.jinxingzhong' }) },
      false: { text: intl.formatMessage({ id: 'mt.yiwancheng' }) }
    },
    // KYC认证方式
    KycAuthType: {
      NOT: { text: intl.formatMessage({ id: 'mt.weizhurenzheng' }) },
      UPLOAD_INFO_AUTH: { text: intl.formatMessage({ id: 'mt.shangchuanxinxi' }) },
      TENCENT_THREE_AUTH: { text: intl.formatMessage({ id: 'mt.tengxunsanyaoshenhe' }) },
      TENCENT_FACE_AUTH: { text: intl.formatMessage({ id: 'mt.tengxunlianrenshenhe' }) }
    }
  }

  //  ============= 枚举对象转options数组选项 ================
  const enumToOptions = (enumKey: keyof typeof Enum, valueKey?: string) => {
    const options: Array<{ value: any; label: string; desc?: string; icon?: string }> = []
    const enumObj = Enum[enumKey] as any

    Object.keys(enumObj).forEach((key) => {
      options.push({
        value: valueKey ? enumObj[key][valueKey] : key,
        label: enumObj[key].text,
        desc: enumObj[key].desc,
        icon: enumObj[key].icon
      })
    })

    return options
  }

  type RetType = {
    Enum: Record<keyof typeof Enum, { [key: string]: { text: string; color?: string; icon?: string; desc?: string } }>
    enumToOptions: (enumKey: keyof typeof Enum, valueKey?: string) => Array<{ value: any; label: string; icon?: string; desc?: string }>
  }

  const ret: RetType = {
    Enum,
    enumToOptions
  }

  return ret
}

// 添加“全部”选项到枚举对象
export const addAllOptionToEnum = (enumObj: Record<string, { text: string; color?: string }>) => {
  return {
    ALLALL: { text: getIntl().formatMessage({ id: 'mt.quanbu' }) },
    ...enumObj
  }
}

// options数组选项转枚举对象
export const optionsToEnum = (options: Array<{ value: any; label: string }>) => {
  const enumObj: Record<string, { text: string; color?: string }> = {}
  options.forEach((option) => {
    enumObj[option.value] = { text: option.label }
  })
  return enumObj
}

// 转换星期文本
export type IWeekDay = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
export const transferWeekDay = (weekDay: IWeekDay) => {
  const text = {
    MONDAY: getIntl().formatMessage({ id: 'mt.xingqiyi' }),
    TUESDAY: getIntl().formatMessage({ id: 'mt.xingqier' }),
    WEDNESDAY: getIntl().formatMessage({ id: 'mt.xingqisan' }),
    THURSDAY: getIntl().formatMessage({ id: 'mt.xingqisi' }),
    FRIDAY: getIntl().formatMessage({ id: 'mt.xingqiwu' }),
    SATURDAY: getIntl().formatMessage({ id: 'mt.xingqiliu' }),
    SUNDAY: getIntl().formatMessage({ id: 'mt.xingqiri' })
  }[weekDay]

  return text
}
