export default {
  depositDetail: {
    // 表格列标题
    orderNo: '入金訂單ID',
    channelOrderId: '通道訂單ID',
    channel: '支付通道',
    route: '路由',
    userId: '用戶ID',
    tradeAccountId: '賬戶ID',
    fromAddress: '發起地址',
    toAddress: '接收地址',
    fromChain: '發起網絡',
    fromChainLabel: '鏈網絡',
    fromToken: '發起幣種',
    fromAmount: '發起數額',
    arrivedAmountUsdc: '到賬金額(USDC)',
    gasFee: 'Gas費',
    txHash: '交易哈希',
    txList: '交易列表',
    status: '訂單狀態',
    createdAt: '創建時間',
    completedAt: '完成時間',

    // 路由类型
    routeWallet: 'Wallet',
    routeBridge: 'Bridge',
    routeSwap: 'Swap',

    // 通道名称
    channelPrivy: 'Privy',
    channelDebridge: 'deBridge',
    channelJupiter: 'Jup',
    channelRango: 'Rango',
    channelLifi: 'LiFi',
    channelRocketx: 'RocketX',

    // 抽屉
    drawerTitle: '入金單明細',
    onChainInfo: '鏈上信息',
    transactionInfo: '交易信息',
    feeInfo: '費用信息',

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
    statusCompleted: '已完成',
    statusConfirmed: '已確認',
    statusConfirming: '確認中',
    statusFailed: '失敗',
    statusPending: '待處理'
  },
  depositSupplement: {
    pageTitle: '入金補單',
    tradeAccountId: '交易賬戶ID',
    tradeAccountIdPlaceholder: '請輸入交易賬戶ID',
    tradeAccountIdRequired: '請輸入交易賬戶ID',
    tradeAccountAddress: '交易賬戶地址',
    tradeAccountAddressPlaceholder: '請輸入交易賬戶地址',
    actualAmount: '實際入金金額(USDC)',
    actualAmountPlaceholder: '請輸入實際入金金額',
    actualAmountRequired: '請輸入實際入金金額',
    txHash: 'TxHash',
    txHashPlaceholder: '請輸入交易哈希',
    txHashRequired: '請輸入交易哈希',
    txHashValidating: '正在校驗...',
    txHashValid: 'TxHash 校驗通過',
    txHashInvalid: 'TxHash 校驗失敗',
    txHashWrongAccount: '該TxHash非交易賬戶地址所產生',
    txHashNotInDb: '系統未檢測到該記錄，需人工核實',
    isCollected: '是否已歸集',
    isCollectedRequired: '請選擇是否已歸集',
    remark: '補單備註',
    remarkPlaceholder: '請輸入補單備註（最長500字符）',
    remarkMaxLength: '備註不能超過500字符',
    submitSuccess: '補單提交成功',
    submitFailed: '補單提交失敗',
    validationRequired: '請先完成TxHash校驗'
  },
  withdrawalDetail: {
    // 表格列标题
    orderNo: '出金訂單ID',
    channelOrderId: '通道訂單ID',
    channel: '支付通道',
    route: '路由',
    userId: '用戶ID',
    tradeAccountId: '賬戶ID',
    fromAddress: '發起地址',
    toAddress: '接收地址',
    toChain: '接收網絡',
    toChainLabel: '鏈網絡',
    toToken: '接收幣種',
    withdrawalAmount: '出金金額',
    arrivedAmount: '到賬金額',
    gasFee: 'Gas費',
    txHash: '交易哈希',
    txList: '交易列表',
    orderStatus: '訂單狀態',
    time: '時間',
    statusLabel: '狀態',
    createdAt: '創建時間',
    completedAt: '完成時間',

    // 路由类型
    routeWallet: 'Wallet',
    routeBridge: 'Bridge',
    routeSwap: 'Swap',

    // 通道名称
    channelPrivy: 'Privy',
    channelDebridge: 'deBridge',
    channelJupiter: 'Jup',
    channelRango: 'Rango',
    channelLifi: 'LiFi',
    channelRocketx: 'RocketX',

    // 抽屉
    drawerTitle: '出金單明細',
    onChainInfo: '鏈上信息',
    transactionInfo: '交易信息',
    feeInfo: '費用信息',

    // 占位符文本
    orderNoPlaceholder: '請輸入訂單ID',
    channelOrderIdPlaceholder: '請輸入通道訂單ID',
    channelPlaceholder: '請選擇通道',
    userIdPlaceholder: '請輸入用戶ID',
    tradeAccountIdPlaceholder: '請輸入賬戶ID',
    toAddressPlaceholder: '請輸入接收地址',
    toChainPlaceholder: '請選擇鏈網絡',
    toTokenPlaceholder: '請選擇幣種',
    txHashPlaceholder: '請輸入交易哈希',
    statusPlaceholder: '請選擇狀態',

    // 状态文本
    statusCompleted: '已完成',
    statusConfirmed: '已確認',
    statusConfirming: '確認中',
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
  },
  withdrawalApprove: {
    // Tab 标题
    pendingApproval: '出金待審批',
    approvalRecords: '審批記錄',

    // 表格列标题
    approvalId: '審批記錄ID',
    orderNo: '出金訂單ID',
    userId: '申請用戶ID',
    tradeAccountId: '出金賬戶ID',
    amount: '發起數量(USDC)',
    tokenId: '接收幣種',
    chainId: '接收鏈網絡',
    toAddress: '接收地址',
    status: '審批狀態',
    approver: '第一簽審批人',
    approverTime: '第一簽時間',
    approver2: '第二簽審批人',
    approver2Time: '第二簽時間',
    reason: '拒絕原因',
    createTime: '發起時間',
    actions: '操作',

    // 占位符文本
    userIdPlaceholder: '請輸入用戶ID',
    tradeAccountIdPlaceholder: '請輸入賬戶ID',
    toAddressPlaceholder: '請輸入接收地址',
    chainIdPlaceholder: '請選擇鏈網絡',
    tokenIdPlaceholder: '請選擇幣種',

    // 状态文本
    statusWait: '待審批',
    statusSuccess: '已通過',
    statusReject: '已拒絕',

    // 按钮文本
    approve: '通過',
    reject: '不通過',

    // 审批操作提示
    approveConfirm: '確認通過此審批？',
    rejectConfirm: '確認拒絕此審批？',
    rejectReasonPlaceholder: '請輸入拒絕原因',
    rejectReasonRequired: '請輸入拒絕原因',
    approveSuccess: '審批通過成功',
    rejectSuccess: '審批拒絕成功',
    approvalFailed: '審批操作失敗',

    // 拒绝弹窗
    rejectTitle: '出金拒絕',
    applicantUser: '申請用戶',
    transactionInfo: '交易信息',
    tradeAccount: '交易賬戶',
    rejectReason: '拒絕原因',
    save: '保存',
    cancel: '取消',

    // 审批通过弹窗
    approveTitle: '出金審批',
    approveConfirmMessage: '確認通過此筆出金審批？',
    confirm: '確認'
  }
}
