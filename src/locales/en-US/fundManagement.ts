export default {
  depositDetail: {
    // Table column titles
    orderNo: 'Deposit Order ID',
    channelOrderId: 'Channel Order ID',
    channel: 'Payment Channel',
    route: 'Route',
    userId: 'User ID',
    tradeAccountId: 'Account ID',
    fromAddress: 'From Address',
    toAddress: 'To Address',
    fromChain: 'From Chain',
    fromChainLabel: 'Chain',
    fromToken: 'From Token',
    fromAmount: 'From Amount',
    arrivedAmountUsdc: 'Arrived Amount (USDC)',
    gasFee: 'Gas Fee',
    txHash: 'Transaction Hash',
    txList: 'Transaction List',
    status: 'Order Status',
    createdAt: 'Created At',
    completedAt: 'Completed At',

    // Route types
    routeWallet: 'Wallet',
    routeBridge: 'Bridge',
    routeSwap: 'Swap',

    // Channel names
    channelPrivy: 'Privy',
    channelDebridge: 'deBridge',
    channelJupiter: 'Jup',
    channelRango: 'Rango',
    channelLifi: 'LiFi',
    channelRocketx: 'RocketX',

    // Drawer
    drawerTitle: 'Deposit Order Detail',
    onChainInfo: 'On-chain Info',
    transactionInfo: 'Transaction Info',
    feeInfo: 'Fee Info',

    // Buttons
    supplementOrder: 'Supplement Order',

    // Placeholder text
    orderNoPlaceholder: 'Enter Order ID',
    channelOrderIdPlaceholder: 'Enter Channel Order ID',
    channelPlaceholder: 'Select Channel',
    userIdPlaceholder: 'Enter User ID',
    tradeAccountIdPlaceholder: 'Enter Account ID',
    fromAddressPlaceholder: 'Enter From Address',
    fromChainPlaceholder: 'Select Chain',
    fromTokenPlaceholder: 'Select Token',
    txHashPlaceholder: 'Enter Transaction Hash',
    statusPlaceholder: 'Select Status',

    // Status text
    statusCompleted: 'Completed',
    statusConfirmed: 'Confirmed',
    statusConfirming: 'Confirming',
    statusFailed: 'Failed',
    statusPending: 'Pending'
  },
  depositSupplement: {
    pageTitle: 'Deposit Supplement',
    tradeAccountId: 'Trade Account ID',
    tradeAccountIdPlaceholder: 'Enter Trade Account ID',
    tradeAccountIdRequired: 'Please enter Trade Account ID',
    tradeAccountAddress: 'Trade Account Address',
    tradeAccountAddressPlaceholder: 'Enter Trade Account Address',
    actualAmount: 'Actual Deposit Amount (USDC)',
    actualAmountPlaceholder: 'Enter Actual Deposit Amount',
    actualAmountRequired: 'Please enter Actual Deposit Amount',
    txHash: 'TxHash',
    txHashPlaceholder: 'Enter Transaction Hash',
    txHashRequired: 'Please enter Transaction Hash',
    txHashValidating: 'Validating...',
    txHashValid: 'TxHash validation passed',
    txHashInvalid: 'TxHash validation failed',
    txHashWrongAccount: 'This TxHash does not belong to the trade account address',
    txHashNotInDb: 'System has not detected this record, manual verification required',
    isCollected: 'Is Collected',
    isCollectedRequired: 'Please select if collected',
    remark: 'Supplement Remark',
    remarkPlaceholder: 'Enter supplement remark (max 500 characters)',
    remarkMaxLength: 'Remark cannot exceed 500 characters',
    submitSuccess: 'Supplement submitted successfully',
    submitFailed: 'Supplement submission failed',
    validationRequired: 'Please complete TxHash validation first'
  },
  withdrawalDetail: {
    // Table column titles
    orderNo: 'Withdrawal Order ID',
    channelOrderId: 'Channel Order ID',
    channel: 'Payment Channel',
    route: 'Route',
    userId: 'User ID',
    tradeAccountId: 'Account ID',
    fromAddress: 'From Address',
    toAddress: 'To Address',
    toChain: 'To Chain',
    toChainLabel: 'Chain',
    toToken: 'To Token',
    withdrawalAmount: 'Withdrawal Amount',
    arrivedAmount: 'Arrived Amount',
    gasFee: 'Gas Fee',
    txHash: 'Transaction Hash',
    txList: 'Transaction List',
    orderStatus: 'Order Status',
    time: 'Time',
    statusLabel: 'Status',
    createdAt: 'Created At',
    completedAt: 'Completed At',

    // Route types
    routeWallet: 'Wallet',
    routeBridge: 'Bridge',
    routeSwap: 'Swap',

    // Channel names
    channelPrivy: 'Privy',
    channelDebridge: 'deBridge',
    channelJupiter: 'Jup',
    channelRango: 'Rango',
    channelLifi: 'LiFi',
    channelRocketx: 'RocketX',

    // Drawer
    drawerTitle: 'Withdrawal Order Detail',
    onChainInfo: 'On-chain Info',
    transactionInfo: 'Transaction Info',
    feeInfo: 'Fee Info',

    // Placeholder text
    orderNoPlaceholder: 'Enter Order ID',
    channelOrderIdPlaceholder: 'Enter Channel Order ID',
    channelPlaceholder: 'Select Channel',
    userIdPlaceholder: 'Enter User ID',
    tradeAccountIdPlaceholder: 'Enter Account ID',
    toAddressPlaceholder: 'Enter To Address',
    toChainPlaceholder: 'Select Chain',
    toTokenPlaceholder: 'Select Token',
    txHashPlaceholder: 'Enter Transaction Hash',
    statusPlaceholder: 'Select Status',

    // Status text
    statusCompleted: 'Completed',
    statusConfirmed: 'Confirmed',
    statusConfirming: 'Confirming',
    statusFailed: 'Failed',
    statusPending: 'Pending'
  },
  statistics: {
    // Statistic card titles
    todayDeposit: 'Today Deposit',
    todayWithdrawal: 'Today Withdrawal',
    totalDeposit: 'Total Deposit',
    totalWithdrawal: 'Total Withdrawal',

    // Channel names
    channelWallet: 'Wallet',
    channelSwap: 'Swap',
    channelBridgeEth: 'Bridge(ETH)',
    channelBridgeSol: 'Bridge(SOL)',
    channelBridgeTron: 'Bridge(TRON)',
    channelBridgeBsc: 'Bridge(BSC)',

    // Page text
    deposit: 'Deposit',
    withdrawal: 'Withdrawal',
    coinDistribution: 'Coin Distribution',
    channelDistribution: 'Channel',
    channelDistributionChart: 'Channel Distribution',
    comparedToPreviousPeriod: 'Compared to Previous Period',

    // Error and info messages
    dataLoadFailed: 'Data Load Failed',
    pleaseRetryLater: 'Please retry later',
    noTrendData: 'No trend data available',
    noCoinData: 'No coin distribution data available',
    noChannelData: 'No channel distribution data available',
    noData: 'No data available'
  }
}
