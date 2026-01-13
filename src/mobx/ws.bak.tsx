import { notification } from 'antd'
import { groupBy } from 'lodash'
import { action, configure, makeObservable, observable, runInAction } from 'mobx'
import ReconnectingWebSocket from 'reconnecting-websocket'

import { stores } from '@/context/mobxProvider'
import { getEnv } from '@/env'
import { formaOrderList } from '@/services/api/tradeCore/order'
import { uniqueObjectArray } from '@/utils'
import { removeOrderMessageFieldNames } from '@/utils/business'
import { STORAGE_GET_TOKEN, STORAGE_GET_USER_INFO } from '@/utils/storage'
import { getCurrentQuote } from '@/utils/wsUtil'

import klineStore from './kline'
import trade from './trade'

export type IQuotePriceItem = {
  /**卖交易量 */
  sellSize: number
  /**买 */
  buy: number
  /**卖 */
  sell: number
  /**这个是时间戳13位 */
  id: number
  /*买交易量 */
  buySize: number
}
export type IQuoteItem = {
  /**品种名称（后台创建品种，自定义填写的品种名称，唯一）通过账户组订阅的品种行情才会有symbol */
  symbol: string
  /**账户组id */
  accountGroupId?: string
  /**价格数据 */
  priceData: IQuotePriceItem
  /**数据源code+数据源品种 例如huobi-btcusdt */
  dataSource: string
  /**数据源key */
  dataSourceKey: string
  /**前端计算的 卖价 上一口报价和下一口报价对比 */
  bidDiff?: number
  /**前端计算的 买价 上一口报价和下一口报价对比 */
  askDiff?: number
  /**原始数据 用于K线图播放走一遍全部报价，避免数据过滤丢失绘制的k线跟后台历史数据不一样 */
  klineList?: {
    /**价格 买盘卖价(低价) 没有点差 */
    price: number
    /**id 13位时间戳 */
    id: number
  }[]
}

export type IDepthPriceItem = {
  amount: number
  price: number
}
export type IDepth = {
  /**品种名称（后台创建品种，自定义填写的品种名称，唯一）通过账户组订阅的品种行情才会有symbol */
  symbol: string
  /**数据源code+数据源品种 例如huobi-btcusdt */
  dataSource: string
  asks: IDepthPriceItem[]
  bids: IDepthPriceItem[]
  /**13位时间戳 */
  ts?: number
  /**账户组id */
  accountGroupId?: string
  /** 数据源key */
  dataSourceKey: string
}

enum MessageType {
  /**行情 */
  symbol = 'symbol',
  /**深度报价 */
  depth = 'depth',
  /**行情 */
  trade = 'trade',
  /**消息 */
  notice = 'notice'
}
type IMessage = {
  header: {
    flowId: number
    /**消息类型 */
    msgId: MessageType
    tenantId: string
    /**用户ID */
    userId: string
  }
  body: any
}

// 消息推送模版
export type MessagePopupInfo = {
  messageLogId: number
  /**消息级别 eg. WARN */
  grade: string
  isAll: string
  /**标题 */
  title: string
  type: string
  /**用户id */
  userId: number
  /**内容 */
  content: string
}

type ITradeType =
  /** 限价单下单 */
  | 'LIMIT_ORDER'
  /**市价单 */
  | 'MARKET_ORDER'
  /**账户变更 */
  | 'ACCOUNT'
  /**成交记录 */
  | 'TRADING'

// WebSocket 的四个状态
export type IReadyState =
  /**0 WebSocket 连接正在进行中 */
  | 'CONNECTING'
  /**1 WebSocket 连接已经建立并且可以进行通信 */
  | 'OPEN'
  /**2 WebSocket 连接正在关闭过程中。此时，客户端或服务器已经开始关闭连接，但连接还没有完全关闭，双方还可以继续发送和接收消息 */
  | 'CLOSEING'
  /**3 WebSocket 连接已经关闭，连接断开，无法再发送或接收消息 */
  | 'CLOSED'

// 禁用 MobX 严格模式
configure({ enforceActions: 'never' })

const THROTTLE_QUOTE_INTERVAL = 300
const THROTTLE_DEPTH_INTERVAL = 250
const MAX_CACHE_SIZE = 150 // 设置最大缓存限制

class WSStore {
  constructor() {
    makeObservable(this) // 使用 makeObservable mobx6.0 才会更新视图
  }
  updateLastQuoteTimer: any = null // 延迟更新最后一口报价
  updateLastDepthTimer: any = null // 延迟更新最后一口深度
  batchTimer: any = null
  heartbeatInterval: any = null
  heartbeatTimeout = 20000 // 心跳间隔，单位毫秒
  @observable socket: any = null
  @observable readyState = 0 // ws连接状态
  @observable quotes = new Map<string, IQuoteItem>() // 当前行情
  @observable depth = new Map<string, IDepth>() // 当前深度
  quotesCache = [] as any[] // 行情缓存区
  depthCache = [] as any[] // 深度缓存区
  klinePriceCache = [] as { symbol: string; price: number; id: number }[] // 储存买盘卖价 绘制k线的价格（低价） 没有点差的
  @observable symbolTicker = {} as Record<string, DataSource.SymbolTicker> // 品种对应的高开低收
  @observable symbols = {} // 储存品种请求列表
  lastQuoteUpdateTime = 0
  lastDepthUpdateTime = 0

  @action
  async connect(resolve?: () => void) {
    const ENV = getEnv()
    const token = STORAGE_GET_TOKEN()
    const wsUrl = ENV.ws

    // token不要传bear前缀
    // 游客传WebSocket:visitor
    this.socket = new ReconnectingWebSocket(wsUrl, ['WebSocket', token ? token : 'visitor'], {
      minReconnectionDelay: 1,
      connectionTimeout: 3000, // 重连时间
      maxEnqueuedMessages: 0, // 不缓存发送失败的指令
      maxRetries: 10000000 // 最大重连次数
      // debug: process.env.NODE_ENV === 'development' // 测试环境打开调试
    })
    this.socket.addEventListener('open', () => {
      this.startHeartbeat()
      this.subscribeMessage()

      runInAction(() => {
        this.readyState = 1
      })

      resolve?.()
    })
    this.socket.addEventListener('message', (d: any) => {
      const res = JSON.parse(d.data)
      this.message(res)
    })
    this.socket.addEventListener('close', () => {})
    this.socket.addEventListener('error', () => {})
  }

  // 检查socket是否连接，如果未连接，则重新连接
  checkSocketReady = (fn?: () => void) => {
    if (this.readyState !== 1) {
      // this.reconnect(fn)
      this.connect(fn)
    } else {
      fn?.()
    }
  }

  // 订阅消息
  subscribeMessage = async (cancel?: boolean) => {
    const userInfo = (await STORAGE_GET_USER_INFO()) as User.UserInfo
    if (!userInfo?.user_id) return

    // 公共订阅：/{租户ID}/public/1
    // 角色订阅：/{租户ID}/role/{角色ID}
    // 机构订阅：/{租户ID}/dept/{机构ID}
    // 岗位订阅：/{租户ID}/post/{岗位ID}
    // 用户订阅：/{租户ID}/user/{用户ID}
    this.send({
      topic: `/000000/public/1`,
      cancel
    })
    this.send({
      topic: `/000000/role/${userInfo.role_id}`,
      cancel
    })
    this.send({
      topic: `/000000/dept/${userInfo.dept_id}`,
      cancel
    })
    this.send({
      topic: `/000000/post/${userInfo.post_id}`,
      cancel
    })
    this.send({
      topic: `/000000/user/${userInfo?.user_id}`,
      cancel
    })
  }

  // 订阅交易页面行情
  subscribeTradeQuote = () => {
    this.reconnect()

    setTimeout(() => {
      this.batchSubscribeSymbol()
      this.subscribeDepth()
      this.subscribeTrade()
    }, 300)
  }

  // 开始心跳
  startHeartbeat() {
    if (!STORAGE_GET_TOKEN()) return
    this.heartbeatInterval = setInterval(() => {
      this.send({}, { msgId: 'heartbeat' })
    }, this.heartbeatTimeout)
  }

  // 停止心跳
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  // 批量订阅行情
  batchSubscribeSymbol = (symbolList?: Array<{ symbol: any; dataSourceCode?: any }>, cancel?: boolean) => {
    const list = symbolList?.length ? symbolList : trade.symbolListAll

    if (!list.length) return
    setTimeout(() => {
      list.forEach((item: any) => {
        const topicNoAccount = `/000000/symbol/${item.dataSourceCode}/${item.symbol}`
        const topicAccount = `/000000/symbol/${item.symbol}/${item.accountGroupId}`
        // 如果有账户id，订阅该账户组下的行情，此时行情会加上点差
        const topic = item.accountGroupId ? topicAccount : topicNoAccount
        this.send({
          topic,
          cancel
        })
      })
    }, 300)
  }

  // 动态订阅汇率品种行情
  subscribeExchangeRateQuote = (symbolConf?: Symbol.SymbolConf) => {
    const quote = getCurrentQuote()
    // 如果不传，使用当前激活的品种配置

    const conf = symbolConf || quote?.symbolConf
    if (!conf) return

    const allSimpleSymbolsMap = trade.allSimpleSymbolsMap
    const unit = conf?.profitCurrency // 货币单位
    // 乘法
    const divName = ('USD' + unit).toUpperCase() // 如 USDNZD
    // 除法
    const mulName = (unit + 'USD').toUpperCase() // 如 NZDUSD

    const symbolInfo = allSimpleSymbolsMap[divName] || allSimpleSymbolsMap[mulName]

    if (!symbolInfo) return

    this.batchSubscribeSymbol([
      {
        dataSourceCode: symbolInfo.dataSourceCode,
        symbol: symbolInfo.symbol
      }
    ])
  }

  // 订阅当前打开的品种深度报价
  subscribeDepth = (cancel?: boolean) => {
    const symbolInfo = trade.getActiveSymbolInfo()
    // 深度为0 不需要订阅深度
    if (!symbolInfo?.symbol || symbolInfo.symbolConf?.depthOfMarket === 0) return

    const topicNoAccount = `/000000/depth/${symbolInfo.dataSourceCode}/${symbolInfo.symbol}`
    const topicAccount = `/000000/depth/${symbolInfo.symbol}/${symbolInfo?.accountGroupId}`
    // 区分带账户组id和不带账户组情况
    const topic = symbolInfo?.accountGroupId ? topicAccount : topicNoAccount

    setTimeout(() => {
      this.send({
        topic,
        cancel
      })
    }, 300)
  }

  // 设置品种高开低收
  setSymbolTicker = (ticker: any) => {
    this.symbolTicker = ticker
  }

  // 订阅持仓记录、挂单记录、账户余额信息
  subscribeTrade = (cancel?: boolean) => {
    const currentAccountInfo = trade.currentAccountInfo
    const accountId = currentAccountInfo?.id
    if (!accountId) return
    this.send({
      topic: `/000000/trade/${accountId}`,
      cancel
    })
  }

  // 退出页面，取消交易页面的行情和深度订阅
  closeSymbolQuoteAndDepth = () => {
    // 取消行情订阅
    this.batchSubscribeSymbol(trade.symbolListAll, true)
    // 取消深度订阅
    this.subscribeDepth(true)
  }

  // 发送socket指令
  @action
  send(cmd = {}, header = {}) {
    // const clientId = trade.currentAccountInfo?.clientId
    const userInfo = STORAGE_GET_USER_INFO() as User.UserInfo
    // 游客身份userId传123456789
    const userId = userInfo?.user_id || '123456789'
    if (this.socket && this.socket.readyState === 1) {
      this.socket.send(
        JSON.stringify({
          header: { tenantId: '000000', userId, msgId: 'subscribe', flowId: Date.now(), ...header },
          body: {
            cancel: false,
            ...cmd
          }
        })
      )
    } else {
      console.log('socket未连接')
    }
  }

  @action
  close() {
    this.readyState = 0
    // 关闭socket指令
    this.socket?.close?.()
    this.stopHeartbeat()
  }
  @action
  reconnect() {
    // 中断连接再重连
    // console.log(store.account+store.pwd)
    this.close()
    // 重新连接
    this.connect()
  }

  // ================ 更新行情数据 开始 ================
  @action
  updateQuoteData = () => {
    if (this.quotesCache.length) {
      // 批量解析字符串数据
      const quotesCacheItems = this.quotesCache.map((str) => this.parseQuoteBodyData(str))
      // 按symbol分组
      const symbolMap = groupBy(quotesCacheItems, 'symbol')
      quotesCacheItems.forEach((item: IQuoteItem) => {
        const dataSourceKey = item.dataSourceKey
        if (!dataSourceKey) return
        const quoteData = this.quotes.get(dataSourceKey)
        // 价格数据去重
        let klineList = uniqueObjectArray(
          (symbolMap[item.symbol] || []).map((item) => {
            return {
              price: item.priceData?.buy,
              id: item.priceData?.id
            }
          }),
          'price'
        )
        // 如果之前的行情存在，则对比增量更新
        if (quoteData) {
          const prevSell = quoteData?.priceData?.sell || 0
          const prevBuy = quoteData?.priceData?.buy || 0
          const buy = item.priceData?.buy
          const sell = item.priceData?.sell
          const flag = buy && sell // 买卖都存在，才跳动
          item.bidDiff = flag ? buy - prevBuy : 0 // bid使用买盘的
          item.askDiff = flag ? sell - prevSell : 0 // ask使用卖盘的

          if (item.priceData) {
            // 如果没有最新报价，获取上一口报价
            item.priceData.buy = item.priceData.buy || prevBuy
            item.priceData.sell = item.priceData.sell || prevSell
          }

          // 增量更新有变化的数据
          if (flag && (buy !== prevBuy || sell !== prevSell)) {
            this.quotes.set(dataSourceKey, {
              ...item,
              // 储存原始数据 ，用于K线图播放走一遍全部报价，避免数据过滤丢失绘制的k线跟后台历史数据不一样
              klineList
            })
          }
        } else {
          // 新增行情
          this.quotes.set(dataSourceKey, {
            ...item,
            klineList
          })
        }
      })

      // 实时更新k线数据
      if (location.pathname.indexOf('customer/account/edit') !== -1 && klineStore.tvWidget) {
        klineStore.updateKlineData(this.quotes)
      }

      this.quotesCache = []
      this.lastQuoteUpdateTime = performance.now()
    }
  }

  // 批量更新行情数据，通过指定数量
  @action
  batchUpdateQuoteData = (data: string) => {
    if (data && typeof data === 'string') {
      this.quotesCache.push(data)

      // 如果缓存太大，强制发送
      if (this.quotesCache.length >= MAX_CACHE_SIZE) {
        this.updateQuoteData()
        return
      }

      const now = performance.now()
      if (now - this.lastQuoteUpdateTime >= THROTTLE_QUOTE_INTERVAL) {
        if (this.quotesCache.length > 0) {
          this.updateQuoteData()
        }
      }
    }
  }

  // ================ 更新行情数据 结束 ================

  // ================ 更新深度 开始 ================
  @action
  updateDepthData = () => {
    if (this.depthCache.length) {
      this.depthCache.forEach((str) => {
        const item = this.parseDepthBodyData(str)
        const dataSourceKey = item.dataSourceKey
        if (dataSourceKey) {
          if (typeof item.asks === 'string') {
            item.asks = item.asks ? JSON.parse(item.asks) : []
          }
          if (typeof item.bids === 'string') {
            item.bids = item.bids ? JSON.parse(item.bids) : []
          }
          this.depth.set(dataSourceKey, item)
        }
      })

      this.depthCache = []
      this.lastDepthUpdateTime = performance.now()
    }
  }

  // 批量更新深度数据，通过指定数量
  @action
  batchUpdateDepthData = (data: string) => {
    if (data && typeof data === 'string') {
      this.depthCache.push(data)

      // 如果缓存太大，强制发送
      if (this.depthCache.length >= MAX_CACHE_SIZE) {
        this.updateDepthData()
        return
      }

      const now = performance.now()
      if (now - this.lastDepthUpdateTime >= THROTTLE_DEPTH_INTERVAL) {
        if (this.depthCache.length > 0) {
          this.updateDepthData()
        }
      }
    }
  }

  // ================ 更新深度 结束 ================

  // 解析行情body数据
  parseQuoteBodyData = (body: string) => {
    // 原格式
    // {"header":{"msgId":"symbol"},"body":{"dataSource":"binance-SOLUSDT","priceData":{"sellSize":"63.38200000","sell":206.61200000,"buy":"206.61000000","id":1735807731722,"buySize":"61.67900000"},"symbol":"SOL","accountGroupId":"3"}}
    // 新格式
    // 报价数据格式：id,buy,buySize,sell,sellSize,dataSource,symbol,accountGroupId
    // 使用账户组订阅数据格式
    // { "header": { "msgId": "symbol" }, "body": "1735636763941,94044.6,0,94047.325,0,mt5-BTCUSD,BTC,1826081893542576129" }
    // 没有使用账户组订阅数据格式，最后两个为0占位。比如管理端数据源列表不能使用账户组订阅
    // { "header": { "msgId": "symbol" }, "body": "1735636763941,94044.6,0,94047.325,0,mt5-BTCUSD,0,0" }
    const quoteItem = {} as IQuoteItem
    if (body && typeof body === 'string') {
      const [id, buy, buySize, sell, sellSize, dataSource, symbol, accountGroupId] = body.split(',')
      const [dataSourceCode, dataSourceSymbol] = (dataSource || '').split('-').filter((v: any) => v)
      const sbl = symbol === '0' ? dataSourceSymbol : symbol // 兼容没有使用账户组订阅情况
      // 1.数据源 + 品种名称作为唯一标识 通过该方式订阅的没有账户组 const topicNoAccount = `/000000/symbol/${item.dataSourceCode}/${item.symbol}`
      // 2.账户组 + 品种名称作为唯一标识 通过该方式订阅的有账户组 const topicAccount = `/000000/symbol/${item.symbol}/${item.accountGroupId}`
      const dataSourceKey = Number(accountGroupId) ? `${accountGroupId}/${sbl}` : `${dataSourceCode}/${sbl}`

      quoteItem.symbol = sbl
      quoteItem.dataSource = dataSource
      quoteItem.dataSourceKey = dataSourceKey
      quoteItem.accountGroupId = accountGroupId
      quoteItem.priceData = {
        sellSize: Number(sellSize || 0),
        buy: Number(buy || 0),
        sell: Number(sell || 0),
        id: Number(id || 0),
        buySize: Number(buySize || 0)
      }
    }
    return quoteItem
  }

  // 解析深度body数据
  parseDepthBodyData = (body: string) => {
    // 原格式
    // {"header":{"msgId":"depth"},"body":{"symbol":"BTC","accountGroupId":"3","asks":"[{\"amount\":0.01403000,\"price\":96012.69000000},{\"amount\":0.00012000,\"price\":96012.70000000},{\"amount\":0.00012000,\"price\":96012.71000000},{\"amount\":0.00018000,\"price\":96012.73000000},{\"amount\":0.00118000,\"price\":96012.75000000},{\"amount\":0.00200000,\"price\":96012.76000000},{\"amount\":0.00178000,\"price\":96012.77000000},{\"amount\":0.00012000,\"price\":96012.78000000},{\"amount\":0.00111000,\"price\":96012.79000000},{\"amount\":0.00037000,\"price\":96012.80000000},{\"amount\":0.00012000,\"price\":96012.96000000},{\"amount\":0.00012000,\"price\":96013.05000000},{\"amount\":0.00037000,\"price\":96013.17000000},{\"amount\":0.00018000,\"price\":96013.27000000},{\"amount\":0.00198000,\"price\":96013.44000000},{\"amount\":0.00572000,\"price\":96013.45000000},{\"amount\":0.00011000,\"price\":96013.56000000},{\"amount\":0.00300000,\"price\":96013.91000000},{\"amount\":0.00006000,\"price\":96013.92000000},{\"amount\":0.00012000,\"price\":96013.93000000}]","bids":"[{\"amount\":7.99949000,\"price\":96000.00000000},{\"amount\":3.79417000,\"price\":95999.99000000},{\"amount\":0.00065000,\"price\":95999.96000000},{\"amount\":0.11040000,\"price\":95999.95000000},{\"amount\":0.00012000,\"price\":95999.90000000},{\"amount\":0.00111000,\"price\":95999.89000000},{\"amount\":0.00012000,\"price\":95999.63000000},{\"amount\":0.00012000,\"price\":95999.57000000},{\"amount\":0.00187000,\"price\":95999.56000000},{\"amount\":0.00012000,\"price\":95999.51000000},{\"amount\":0.00023000,\"price\":95999.42000000},{\"amount\":0.00012000,\"price\":95999.39000000},{\"amount\":0.00012000,\"price\":95999.34000000},{\"amount\":0.05220000,\"price\":95999.27000000},{\"amount\":0.00012000,\"price\":95999.24000000},{\"amount\":0.04170000,\"price\":95999.20000000},{\"amount\":0.22837000,\"price\":95999.04000000},{\"amount\":0.20861000,\"price\":95999.03000000},{\"amount\":0.00208000,\"price\":95999.00000000},{\"amount\":0.04167000,\"price\":95998.83000000}]","dataSource":"binance-BTCUSDT","ts":1735807767042}}
    // 新格式
    // 深度数据格式：asks(price_amount;price_amount;...),bids(price_amount;price_amount;...),dataSource,symbol,accountGroupId,ts
    // { "header": { "msgId": "depth" }, "body": "94399.495*3.40948;94400.275*0.00052;94400.895*2.06585;94400.905*0.00499;94401.005*0.19438;94401.215*0.0424;94401.915*0.0424;94402.115*0.078;94402.125*0.84533;94402.135*0.15867;94402.405*0.07399;94402.415*0.11009;94402.715*0.00774;94402.865*0.00006;94404.395*0.04126;94404.455*0.02648;94404.715*0.0424;94406.055*0.05296;94406.635*0.05296;94407.435*0.00011,94396.77*0.21542;94396.63*0.0018;94396.3*0.00006;94396.29*0.08861;94396.26*0.00011;94396*0.0072;94395*0.00008;94394.16*0.00012;94393.93*0.00008;94393.58*0.00029;94393.27*0.003;94393.12*0.00008;94392.8*0.0424;94392.28*0.00012;94392*0.00729;94390.78*0.00017;94390.24*0.00012;94389.76*0.00006;94389.24*0.00012;94389.09*0.00015,binance-BTCUSDT,BTC,1,1735634057242" }
    const depthData = {} as IDepth
    if (body && typeof body === 'string') {
      const [asks, bids, dataSource, symbol, accountGroupId, ts] = body.split(',')
      const [dataSourceCode, dataSourceSymbol] = (dataSource || '').split('-').filter((v: any) => v)
      const sbl = symbol === '0' ? dataSourceSymbol : symbol // 兼容没有使用账户组订阅情况
      // 账户组 + 品种名称作为唯一标识
      const dataSourceKey = Number(accountGroupId) ? `${accountGroupId}/${sbl}` : `${dataSourceCode}/${sbl}`
      depthData.symbol = sbl
      depthData.dataSource = dataSource
      depthData.dataSourceKey = dataSourceKey
      depthData.accountGroupId = accountGroupId
      depthData.ts = Number(ts || 0)
      depthData.asks = asks
        ? asks.split(';').map((item) => {
            const [price, amount] = (item || '').split('_')
            return {
              price: Number(price || 0),
              amount: Number(amount || 0)
            }
          })
        : []
      depthData.bids = bids
        ? bids.split(';').map((item) => {
            const [price, amount] = (item || '').split('_')
            return {
              price: Number(price || 0),
              amount: Number(amount || 0)
            }
          })
        : []
    }
    return depthData
  }

  // 处理ws消息
  @action
  message(res: IMessage) {
    const header = res?.header || {}
    const messageId = header.msgId
    const data = res?.body || {}
    const symbol = data?.symbol

    switch (messageId) {
      // 行情
      case MessageType.symbol:
        // const quoteBody = this.parseQuoteBodyData(data)
        // 先收集起来再解析
        this.batchUpdateQuoteData(data)

        // 推入缓冲区
        // this.quotesCacheArr.push(data)

        // console.log('行情信息', toJS(this.quotes))
        break
      // 深度报价
      case MessageType.depth:
        // if (symbol) {
        //   const asks = data.asks ? JSON.parse(data.asks) : []
        //   const bids = data.bids ? JSON.parse(data.bids) : []
        //   this.depth[symbol] = {
        //     ...data,
        //     asks,
        //     bids
        //   }
        // }
        // 推入缓冲区
        // this.depthCacheArr.push(data)
        // const depthBody = this.parseDepthBodyData(data)
        // 先收集起来再解析
        this.batchUpdateDepthData(data)

        // console.log('深度报价', toJS(this.depth))
        break
      // 交易信息：账户余额变动、持仓列表、挂单列表
      case MessageType.trade:
        const type = data.type as ITradeType
        // 账户余额变动
        if (type === 'ACCOUNT') {
          const accountInfo = data.account || {}
          trade.currentAccountInfo = {
            ...trade.currentAccountInfo,
            ...accountInfo
          }
        }
        // 持仓列表
        else if (type === 'MARKET_ORDER') {
          const positionList = data.bagOrderList || []
          trade.positionList = formaOrderList(positionList)
        }
        // 挂单列表
        else if (type === 'LIMIT_ORDER') {
          const pendingList = data.limiteOrderList || []
          trade.pendingList = formaOrderList(pendingList)
        }
        // 历史成交记录,用不到
        else if (type === 'TRADING') {
        }
        break
      case MessageType.notice:
        // 更新消息通知
        const info = data as MessagePopupInfo
        notification.info({
          message: <span className="text-primary font-medium">{info?.title}</span>,
          description: <span className="text-secondary">{removeOrderMessageFieldNames(info?.content || '')}</span>,
          placement: 'topRight'
          // style: {
          //   background: 'var(--dropdown-bg)'
          // }
        })
        // 刷新消息列表
        stores.global.getUnreadMessageCount()
        console.log('消息通知', data)
        break
    }
  }
}

const ws = new WSStore()

export default ws
