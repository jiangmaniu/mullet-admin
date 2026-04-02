export default {
  depositDetail: {
    // Table column titles
    orderNo: 'Deposit Order ID',
    channelOrderId: 'Channel Order ID',
    channel: 'Payment Channel',
    userId: 'User ID',
    tradeAccountId: 'Account ID',
    fromAddress: 'From Address',
    toAddress: 'To Address',
    fromChain: 'From Chain',
    fromChainLabel: 'Chain',
    fromToken: 'From Token',
    fromAmount: 'From Amount',
    txHash: 'Transaction Hash',
    status: 'Order Status',
    createdAt: 'Created At',

    // Drawer
    drawerTitle: 'Deposit Order Detail',
    onChainInfo: 'On-chain Info',

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
    statusConfirming: 'Transaction Exception',
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
