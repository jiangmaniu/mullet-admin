export default {
  depositDetail: {
    // 表格列标题
    orderNo: '入金訂單ID',
    channelOrderId: '通道訂單ID',
    channel: '支付通道',
    userId: '用戶ID',
    tradeAccountId: '賬戶ID',
    fromAddress: '發起地址',
    fromChain: '發起網絡',
    fromToken: '發起幣種',
    fromAmount: '發起數額',
    txHash: '交易哈希',
    status: '訂單狀態',
    createdAt: '創建時間',

    // 按钮
    supplementOrder: '補單',

    // 占位符文本
    orderNoPlaceholder: '請輸入訂單ID',
    channelOrderIdPlaceholder: '請輸入通道訂單ID',
    channelPlaceholder: '請選擇通道',
    userIdPlaceholder: '請輸入用戶ID',
    tradeAccountIdPlaceholder: '請輸入賬戶ID',
    fromAddressPlaceholder: '請輸入發起地址',
    fromChainPlaceholder: '請選擇鏈網絡',
    fromTokenPlaceholder: '請選擇幣種',
    txHashPlaceholder: '請輸入交易哈希',
    statusPlaceholder: '請選擇狀態',

    // 状态文本
    statusCompleted: '完成',
    statusConfirming: '交易異常',
    statusFailed: '失敗',
    statusPending: '待處理'
  },
  statistics: {
    // 统计卡片标题
    todayDeposit: '今日入金',
    todayWithdrawal: '今日出金',
    totalDeposit: '累計入金',
    totalWithdrawal: '累計出金',

    // 通道名称
    channelWallet: 'Wallet',
    channelSwap: 'Swap',
    channelBridgeEth: 'Bridge(ETH)',
    channelBridgeSol: 'Bridge(SOL)',
    channelBridgeTron: 'Bridge(TRON)',
    channelBridgeBsc: 'Bridge(BSC)',

    // 页面文本
    deposit: '入金',
    withdrawal: '出金',
    coinDistribution: '出入金幣種',
    channelDistribution: '通道',
    channelDistributionChart: '通道分佈',
    comparedToPreviousPeriod: '較上一個週期',

    // 错误和提示信息
    dataLoadFailed: '數據加載失敗',
    pleaseRetryLater: '請稍後重試',
    noTrendData: '暫無趨勢數據',
    noCoinData: '暫無幣種分佈數據',
    noChannelData: '暫無通道分佈數據',
    noData: '暫無數據'
  }
}
