import { getIntl } from '@umijs/max'

export const showTypes: { [key: keyof CrmTrading.StatisticsDayItem]: { label: string; value: string; raw?: boolean } } = {
  /**
   * 登录用户活跃
   */
  // activeUser?: number
  // auserCount?: number
  /**
   * 新增用户数
   */
  newUser: {
    label: getIntl().formatMessage({ id: 'mt.zhucerenshu' }),
    value: 'newUser'
  },
  /**
   * 新增首次入金用户数
   */
  newAUser: {
    label: getIntl().formatMessage({ id: 'mt.shouarujinrenshu' }),
    value: 'newAUser'
  },
  /**
   * 交易活跃用户数
   */
  activeUser: {
    label: getIntl().formatMessage({ id: 'mt.dengluhuoyue' }),
    value: 'activeUser'
  },
  /**
   * 交易活跃
   */
  operationUser: {
    label: getIntl().formatMessage({ id: 'mt.jiaoyihuoyue' }),
    value: 'operationUser'
  },
  /**
   * 总入金
   */
  totalAmount: {
    label: getIntl().formatMessage({ id: 'mt.rujinzonge' }),
    value: 'totalAmount',
    raw: true
  },
  /**
   * 总出金
   */
  totalWithdraw: {
    label: getIntl().formatMessage({ id: 'mt.chujinzonge' }),
    value: 'totalWithdraw',
    raw: true
  },
  /**
   * 净值
   */
  netValue: {
    label: getIntl().formatMessage({ id: 'mt.pingtaijingzhi' }),
    value: 'netValue'
  },
  /**
   * 浮动盈亏
   */
  platformProfit: {
    label: getIntl().formatMessage({ id: 'mt.pingtaifudongyingkui' }),
    value: 'platformProfit'
  },
  /**
   * 保证金
   */
  occupyOrderMargin: {
    label: getIntl().formatMessage({ id: 'mt.pingtaizhanyongbaozhengjin' }),
    value: 'occupyOrderMargin'
  },
  /**
   * 盈亏
   */
  profit: {
    label: getIntl().formatMessage({ id: 'mt.yishixinapingcangyingkui' }),
    value: 'profit'
  },
  /**
   * 隔夜利息
   */
  interestFees: {
    label: getIntl().formatMessage({ id: 'mt.geyelixi' }),
    value: 'interestFees'
  },
  /**
   * 手续费
   */
  handlingFees: {
    label: getIntl().formatMessage({ id: 'mt.shouxufei' }),
    value: 'handlingFees'
  }
  // /**
  //  * 新增实名认证客户数
  //  */
  // newKycUser: {
  //   label: getIntl().formatMessage({ id: 'mt.xinzengshimingrenzhengtongguokehu' }),
  //   value: 'newKycUser'
  // },
  // /**
  //  * 新增二次入金用户数
  //  */
  // secondAUser: {
  //   label: getIntl().formatMessage({ id: 'mt.xinzengercirujinkehu' }),
  //   value: 'secondAUser'
  // },
  // /**
  //  * 回流用户
  //  */
  // backflowUser: {
  //   label: getIntl().formatMessage({ id: 'mt.huiliuyonghu' }),
  //   value: 'backflowUser'
  // },

  // /**
  //  * 每天用户总余额汇总
  //  */
  // money: {
  //   label: getIntl().formatMessage({ id: 'mt.yonghuyue' }),
  //   value: 'money'
  // },
  // /**
  //  * 占用保证金
  //  */
  // occupyOrderMargin: {
  //   label: getIntl().formatMessage({ id: 'mt.pingtaizhanyongbaozhengjin' }),
  //   value: 'occupyOrderMargin'
  // }

  /**
   * 类型
   */
  // type: {
  //   label: getIntl().formatMessage({ id: 'mt.leixing' }),
  //   value: 'type'
  // }
}
