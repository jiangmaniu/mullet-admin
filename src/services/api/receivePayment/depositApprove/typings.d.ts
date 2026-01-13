declare namespace DepositApprove {
  /**
   * 支付凭证状态
   */
  type PayCertificateStatus = 'SUBMIT' | 'NOSUBMIT'
  type ApproveStatus = 'PASS' | 'FAIL'
  type DepositApproveListParams = {
    /**
     * 客户账号
     */
    account?: string
    /**
     * 支付凭证状态
     */
    certificateStatus?: PayCertificateStatus
    /**
     * 渠道类型
     */
    channelNo?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 资源账号
     */
    resouceAccount?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: string
  }
  /**
   * 后端入金审核列表
   */
  type DepositApproveListItem = {
    /**
     * 客户账号
     */
    account?: string
    /**资源账号 */
    resouceAccount?: string
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 订单金额
     */
    baseOrderAmount?: number
    /**预计到账金额 */
    baseReceiptAmount?: number
    /**
     * 支付凭证状态
     */
    certificateStatus?: PayCertificateStatus
    /**
     * 凭证图片
     */
    certificateUrl?: string
    /**
     * 渠道类型
     */
    channelNo?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 汇率
     */
    exchangeRate?: number
    /**
     * 主键ID
     */
    id?: number
    /**
     * 订单编号
     */
    orderNo?: string
    /**
     * 支付金额
     */
    receiptAmount?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 法币
     */
    symbol?: string
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 客户单笔固定手续费
     */
    userSingleFixedFee?: number
    /**
     * 客户单笔最低手续费
     */
    userSingleLeastFee?: number
    /**
     * 客户交易百分比手续费
     */
    userTradePercentageFee?: number
  }
  // 入金审批参数
  type DepositApproveParams = {
    /**
     * 实际转入金额
     */
    actualAmount?: number
    /**
     * 审核状态
     */
    certificateStatus?: ApproveStatus
    /**
     * 主键ID
     */
    id?: number
    /**
     * 备注信息
     */
    remark?: string
    /**
     * 凭证图片
     */
    certificateUrl?: string
  }
}
