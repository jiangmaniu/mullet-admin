export default {
  depositDetail: {
    // Table column titles
    orderNo: 'Order ID',
    channelOrderId: 'Channel Order ID',
    channel: 'Payment Channel',
    userId: 'User ID',
    tradeAccountId: 'Account ID',
    fromAddress: 'From Address',
    fromChain: 'From Chain',
    fromToken: 'From Token',
    fromAmount: 'From Amount',
    txHash: 'txHash',
    status: 'Order Status',
    createdAt: 'Created At',

    // Placeholder text
    orderNoPlaceholder: 'Enter Order ID',
    channelOrderIdPlaceholder: 'Enter Channel Order ID',
    channelPlaceholder: 'Select Channel',
    userIdPlaceholder: 'Enter User ID',
    tradeAccountIdPlaceholder: 'Enter Account ID',
    fromAddressPlaceholder: 'Enter From Address',
    fromChainPlaceholder: 'Select Chain',
    fromTokenPlaceholder: 'Enter Token',
    txHashPlaceholder: 'Enter txHash',
    statusPlaceholder: 'Select Status',

    // Status text
    statusPending: 'Pending',
    statusSubmitted: 'Submitted',
    statusProcessing: 'Processing',
    statusCompleted: 'Completed',
    statusFailed: 'Failed'
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
