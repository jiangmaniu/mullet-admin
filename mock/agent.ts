import { Request, Response } from 'express'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  '/api/trade-agent/agentApi/users/agentCount': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: {
        totalDeposit: 0,
        totalWithdrawal: 0,
        netDeposit: 0,
        generateCommission: 0,
        accumulatedCommission: 0,
        handlingFee: 0,
        numberOfCustomers: 0,
        profitLoss: 0
      },
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/users/page': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: {
        records: [
          {
            id: '1',
            levelId: '1912173920981409794',
            userType: 'AGENT',
            agentId: '0',
            userUid: '500100',
            password: 'c1effc5786e39e3464969351ecda8dc927925bca',
            userName: '机构用户-等级模式',
            email: '315262634@qq.com',
            phoneAreaCode: '+86',
            phone: '17820393299',
            money: 15,
            remark: '33',
            createTime: '2025-04-14 11:45:51',
            isDeleted: 0,
            levelMode: 'single',
            invitationCode: null
          },
          {
            id: '2',
            levelId: '1912173921006575618',
            userType: 'AGENT',
            agentId: '0',
            userUid: '500100',
            password: 'c1effc5786e39e3464969351ecda8dc927925bca',
            userName: '机构用户-多层级模式',
            email: '315262634@qq.com',
            phoneAreaCode: '+86',
            phone: '17820393299',
            money: 15,
            remark: '33',
            createTime: '2025-04-14 11:45:51',
            isDeleted: 0,
            levelMode: 'multiple',
            invitationCode: null
          },
          {
            id: '3',
            levelId: '1912173921014964225',
            userType: 'AGENT',
            agentId: '1',
            userUid: '500101',
            password: 'c1effc5786e39e3464969351ecda8dc927925bca',
            userName: '机构用户-等级-多层级模式',
            email: '32432@qq.com',
            phoneAreaCode: '+86',
            phone: '2343243',
            money: 223,
            remark: null,
            createTime: '2025-04-16 10:04:18',
            isDeleted: 0,
            levelMode: 'single,multiple',
            invitationCode: 'JEKMGU'
          },
          {
            id: '44444',
            levelId: '1912173921031741442',
            userType: 'USER',
            agentId: '2',
            userUid: '500102',
            password: '32432',
            userName: '普通用户-等级模式',
            email: '432',
            phoneAreaCode: '3242',
            phone: '32423',
            money: null,
            remark: null,
            createTime: '2025-04-16 10:05:32',
            isDeleted: 0,
            levelMode: 'single',
            invitationCode: null,
            hasChildren: true
          },
          {
            id: '5',
            levelId: '1912173920981409794',
            userType: 'USER',
            agentId: '2',
            userUid: '500102',
            password: '32432',
            userName: '普通用户-多层级模式',
            email: '432',
            phoneAreaCode: '3242',
            phone: '32423',
            money: null,
            remark: null,
            createTime: '2025-04-16 10:05:32',
            isDeleted: 0,
            levelMode: 'multiple',
            invitationCode: null
          },
          {
            id: '6',
            levelId: '1912173920981409794',
            userType: 'USER',
            agentId: '1',
            userUid: '500101',
            password: 'c1effc5786e39e3464969351ecda8dc927925bca',
            userName: '普通用户-等级-多层级模式',
            email: '32432@qq.com',
            phoneAreaCode: '+86',
            phone: '2343243',
            money: 223,
            remark: null,
            createTime: '2025-04-16 10:04:18',
            isDeleted: 0,
            levelMode: 'single,multiple',
            invitationCode: 'JEKMGU',
            hasChildren: true
          }
        ],
        total: 3,
        size: 12,
        current: 1,
        orders: [],
        optimizeCountSql: true,
        searchCount: true,
        maxLimit: null,
        countId: null,
        pages: 1
      },
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/users/subUserListQuery': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: [
        {
          id: '11212132',
          levelId: '1912173920981409794',
          userType: 'USER',
          agentId: '1',
          userUid: '500101',
          password: 'c1effc5786e39e3464969351ecda8dc927925bca',
          userName: '子级-普通用户-等级-多层级模式',
          email: '32432@qq.com',
          phoneAreaCode: '+86',
          phone: '2343243',
          money: 223,
          remark: null,
          createTime: '2025-04-16 10:04:18',
          isDeleted: 0,
          levelMode: 'single,multiple',
          invitationCode: 'JEKMGU'
        }
      ],
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/users/rebateStandardsQuery': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: {
        id: '1912173920981409794',
        levelName: '青铜',
        tradeVolume: 11,
        userCount: 22,
        netDeposit: 33.0,
        netValue: 44.0,
        evaluationPeriod: 'MONTHLY',
        userType: null,
        achievedTradeVolume: null,
        achievedUserCount: 0,
        achievedNetDeposit: 0,
        achievedNetValue: 0,
        rebateConfigVOList: [
          {
            id: '1912173921090461697',
            levelId: '1912173920981409794',
            accountGroupId: '14',
            accountGroupName: '标准账户组',
            symbol: 'Forex',
            rebateType: 'FIXED_AMOUNT',
            sortIndex: null,
            statisticPeriod: 'DAY',
            rebateValue: 1.0,
            remark: null,
            createTime: '2025-04-16 15:37:27',
            updateTime: '2025-04-16 17:09:06',
            isDeleted: 0
          },
          {
            id: '1912173921115627521',
            levelId: '1912173920981409794',
            accountGroupId: '15',
            accountGroupName: '标准账户组',
            symbol: 'Indices',
            rebateType: 'NET_DEPOSIT_PERCENTAGE',
            sortIndex: null,
            statisticPeriod: 'WEEK',
            rebateValue: 2.0,
            remark: null,
            createTime: '2025-04-16 15:37:27',
            updateTime: '2025-04-16 17:09:07',
            isDeleted: 0
          }
        ],
        multiLevelConfigVOList: [
          {
            id: '1912310968467906561',
            agentId: '2',
            accountGroupId: '14',
            accountGroupName: '标准账户组',
            symbol: 'Forex',
            sortIndex: null,
            rebateType: 'FIXED_AMOUNT',
            statisticPeriod: 'DAY',
            rebateValue: 2.0,
            remark: null,
            createTime: '2025-04-16 10:27:10',
            updateTime: '2025-04-17 10:30:07',
            isDeleted: 0
          },
          {
            id: '1912310968547598338',
            agentId: '2',
            accountGroupId: '14',
            accountGroupName: '标准账户组',
            symbol: 'Indices',
            sortIndex: null,
            rebateType: 'NET_DEPOSIT_PERCENTAGE',
            statisticPeriod: 'WEEK',
            rebateValue: 2.0,
            remark: null,
            createTime: '2025-04-16 10:27:10',
            updateTime: '2025-04-17 10:14:35',
            isDeleted: 0
          },
          {
            id: '1912310968555986945',
            agentId: '2',
            accountGroupId: '14',
            accountGroupName: '标准账户组',
            symbol: 'Commodities',
            sortIndex: null,
            rebateType: 'FEE_PERCENTAGE',
            statisticPeriod: 'MONTH',
            rebateValue: 3.0,
            remark: null,
            createTime: '2025-04-16 10:27:10',
            updateTime: '2025-04-17 10:14:36',
            isDeleted: 0
          },
          {
            id: '1912310968564375554',
            agentId: '2',
            accountGroupId: '14',
            accountGroupName: '标准账户组',
            symbol: 'Crypto',
            sortIndex: null,
            rebateType: 'PROFIT_LOSS_PERCENTAGE',
            statisticPeriod: 'QUARTER',
            rebateValue: 4.0,
            remark: null,
            createTime: '2025-04-16 10:27:10',
            updateTime: '2025-04-17 10:14:37',
            isDeleted: 0
          }
        ]
      },
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/settings/settingsQuery': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: {
        id: '1912078202094776322',
        levelMode: 'single,multiple',
        settlementAccount: 'MT',
        withdrawFrequency: 'DAYONE',
        withdrawAuditMode: 'AUTOAUDIT',
        maxAutoAuditAmount: 1.0,
        minWithdrawAmount: 2.0,
        levelConfigVoList: [
          {
            id: '1912173920981409794',
            levelName: '青铜',
            tradeVolume: 11,
            userCount: 22,
            netDeposit: 33.0,
            netValue: 44.0,
            evaluationPeriod: 'MONTHLY',
            userType: null,
            rebateConfigVOList: [
              {
                id: '1912173921090461697',
                levelId: '1912173920981409794',
                accountGroupId: '14',
                accountGroupName: '标准账户组',
                symbol: 'Forex',
                rebateType: 'FIXED_AMOUNT',
                sortIndex: null,
                statisticPeriod: 'DAY',
                rebateValue: 1.0,
                remark: null,
                createTime: '2025-04-16 15:37:27',
                updateTime: '2025-04-16 17:09:06',
                isDeleted: 0
              },
              {
                id: '1912173921115627521',
                levelId: '1912173920981409794',
                accountGroupId: '15',
                accountGroupName: '标准账户组',
                symbol: 'Indices',
                rebateType: 'NET_DEPOSIT_PERCENTAGE',
                sortIndex: null,
                statisticPeriod: 'WEEK',
                rebateValue: 2.0,
                remark: null,
                createTime: '2025-04-16 15:37:27',
                updateTime: '2025-04-16 17:09:07',
                isDeleted: 0
              }
            ]
          },
          {
            id: '1912173921006575618',
            levelName: '白银',
            tradeVolume: 22,
            userCount: 33,
            netDeposit: 44.0,
            netValue: 55.0,
            evaluationPeriod: 'SEMIANNUALLY',
            userType: null,
            rebateConfigVOList: [
              {
                id: '1912173921186930690',
                levelId: '1912173921006575618',
                accountGroupId: '14',
                accountGroupName: '标准账户组',
                symbol: 'test/binance/BTC',
                rebateType: 'FIXED_AMOUNT',
                sortIndex: null,
                statisticPeriod: 'DAY',
                rebateValue: 1.0,
                remark: null,
                createTime: '2025-04-16 15:37:27',
                updateTime: '2025-04-16 17:09:08',
                isDeleted: 0
              },
              {
                id: '1912173921212096513',
                levelId: '1912173921006575618',
                accountGroupId: '14',
                accountGroupName: '标准账户组',
                symbol: 'test/binance/BTC',
                rebateType: 'NET_DEPOSIT_PERCENTAGE',
                sortIndex: null,
                statisticPeriod: 'WEEK',
                rebateValue: 2.0,
                remark: null,
                createTime: '2025-04-16 15:37:27',
                updateTime: '2025-04-16 17:09:09',
                isDeleted: 0
              },
              {
                id: '1912173921220485121',
                levelId: '1912173921006575618',
                accountGroupId: '14',
                accountGroupName: '标准账户组',
                symbol: 'Forex',
                rebateType: 'FEE_PERCENTAGE',
                sortIndex: null,
                statisticPeriod: 'MONTH',
                rebateValue: 3.0,
                remark: null,
                createTime: '2025-04-16 15:37:27',
                updateTime: '2025-04-16 17:09:10',
                isDeleted: 0
              },
              {
                id: '1912173921228873730',
                levelId: '1912173921006575618',
                accountGroupId: '14',
                accountGroupName: '标准账户组',
                symbol: 'test/huobi',
                rebateType: 'PROFIT_LOSS_PERCENTAGE',
                sortIndex: null,
                statisticPeriod: 'QUARTER',
                rebateValue: 4.0,
                remark: null,
                createTime: '2025-04-16 15:37:27',
                updateTime: '2025-04-16 17:09:10',
                isDeleted: 0
              }
            ]
          },
          {
            id: '1912173921014964225',
            levelName: '王者',
            tradeVolume: 33,
            userCount: 44,
            netDeposit: 55.0,
            netValue: 66.0,
            evaluationPeriod: 'QUARTERLY',
            userType: null,
            rebateConfigVOList: [
              {
                id: '1912173921291788289',
                levelId: '1912173921014964225',
                accountGroupId: '14',
                accountGroupName: '标准账户组',
                symbol: 'Crypto',
                rebateType: 'FIXED_AMOUNT',
                sortIndex: null,
                statisticPeriod: 'DAY',
                rebateValue: 1.0,
                remark: null,
                createTime: '2025-04-16 15:37:27',
                updateTime: '2025-04-16 17:09:11',
                isDeleted: 0
              }
            ]
          },
          {
            id: '1912173921031741442',
            levelName: '铂金',
            tradeVolume: 44,
            userCount: 55,
            netDeposit: 66.0,
            netValue: 77.0,
            evaluationPeriod: 'CUMULATIVE',
            userType: null,
            rebateConfigVOList: [
              {
                id: '1912173921363091458',
                levelId: '1912173921031741442',
                accountGroupId: '15',
                accountGroupName: '标准账户组',
                symbol: 'Crypto',
                rebateType: 'FEE_PERCENTAGE',
                sortIndex: null,
                statisticPeriod: 'MONTH',
                rebateValue: 22.0,
                remark: null,
                createTime: '2025-04-16 15:37:27',
                updateTime: '2025-04-16 17:09:12',
                isDeleted: 0
              }
            ]
          }
        ],
        commonMultiLevelConfigVOList: [
          {
            id: '1912409989719343106',
            accountGroupId: '14',
            symbol: 'Indices',
            sortIndex: null,
            rebateType: 'FIXED_AMOUNT',
            statisticPeriod: 'DAY',
            rebateValue: 1.0,
            remark: null
          },
          {
            id: '1912409989731926018',
            accountGroupId: '15',
            symbol: 'Commodities',
            sortIndex: null,
            rebateType: 'NET_DEPOSIT_PERCENTAGE',
            statisticPeriod: 'WEEK',
            rebateValue: 2.0,
            remark: null
          },
          {
            id: '1912409989731926019',
            accountGroupId: '15',
            symbol: 'BTC',
            sortIndex: null,
            rebateType: 'FEE_PERCENTAGE',
            statisticPeriod: 'MONTH',
            rebateValue: 3.0,
            remark: null
          },
          {
            id: '1912409989731926020',
            accountGroupId: '14',
            symbol: 'Crypto',
            sortIndex: null,
            rebateType: 'PROFIT_LOSS_PERCENTAGE',
            statisticPeriod: 'QUARTER',
            rebateValue: 4.0,
            remark: null
          }
        ]
      },
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/settings/accountGroupList': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: [
        {
          id: '14',
          groupCode: '1093103',
          groupName: '标准账户组',
          remark: null
        },
        {
          id: '15',
          groupCode: '1234320',
          groupName: '专业账户组',
          remark: null
        }
      ],
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/settings/tradeSymbolsTree': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: [
        {
          id: '1',
          parentId: '0',
          groupName: 'Forex',
          remark: null,
          symbolList: [
            {
              id: '1939432111',
              symbol: 'BTC',
              alias: '1',
              symbolGroupId: '1',
              symbolDecimal: 1,
              status: 1,
              classify: '1',
              imgUrl: 'http://file-dev.mullet.io/trade-dev/upload/20250416/da6b572934ea94a34db3f49f04e27a3e.png',
              remark: '1',
              isDeleted: 0
            }
          ],
          children: []
        },
        {
          id: '2',
          parentId: '0',
          groupName: 'Indices',
          remark: null,
          symbolList: [],
          children: []
        },
        {
          id: '3',
          parentId: '0',
          groupName: 'Commodities',
          remark: null,
          symbolList: [],
          children: []
        },
        {
          id: '4',
          parentId: '0',
          groupName: 'Crypto',
          remark: null,
          symbolList: [],
          children: []
        },
        {
          id: '5',
          parentId: '0',
          groupName: 'TESTPARENT',
          remark: null,
          symbolList: [],
          children: [
            {
              id: '6',
              parentId: '5',
              groupName: 'testsub',
              remark: null,
              symbolList: [],
              children: []
            }
          ]
        }
      ],
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/users/multiLevelConfigList': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: [
        {
          id: '1912409989719343106',
          accountGroupId: '14',
          symbol: 'Indices',
          sortIndex: null,
          rebateType: 'FIXED_AMOUNT',
          statisticPeriod: 'DAY',
          rebateValue: 1.0,
          remark: null
        },
        {
          id: '1912409989731926018',
          accountGroupId: '15',
          symbol: 'Commodities',
          sortIndex: null,
          rebateType: 'NET_DEPOSIT_PERCENTAGE',
          statisticPeriod: 'WEEK',
          rebateValue: 2.0,
          remark: null
        },
        {
          id: '1912409989731926019',
          accountGroupId: '15',
          symbol: 'BTC',
          sortIndex: null,
          rebateType: 'FEE_PERCENTAGE',
          statisticPeriod: 'MONTH',
          rebateValue: 3.0,
          remark: null
        },
        {
          id: '1912409989731926020',
          accountGroupId: '14',
          symbol: 'Crypto',
          sortIndex: null,
          rebateType: 'PROFIT_LOSS_PERCENTAGE',
          statisticPeriod: 'QUARTER',
          rebateValue: 4.0,
          remark: null
        }
      ],
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/users/levelConfigList': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: [
        {
          id: '1912173920981409794',
          levelName: '青铜',
          tradeVolume: 11,
          userCount: 22,
          netDeposit: 33.0,
          netValue: 44.0,
          evaluationPeriod: 'MONTHLY'
        },
        {
          id: '1912173921006575618',
          levelName: '白银',
          tradeVolume: 22,
          userCount: 33,
          netDeposit: 44.0,
          netValue: 55.0,
          evaluationPeriod: 'SEMIANNUALLY'
        },
        {
          id: '1912173921014964225',
          levelName: '王者',
          tradeVolume: 33,
          userCount: 44,
          netDeposit: 55.0,
          netValue: 66.0,
          evaluationPeriod: 'QUARTERLY'
        },
        {
          id: '1912173921031741442',
          levelName: '铂金',
          tradeVolume: 44,
          userCount: 55,
          netDeposit: 66.0,
          netValue: 77.0,
          evaluationPeriod: 'CUMULATIVE'
        }
      ],
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/users/levelRebateConfigList': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: [
        {
          id: '1912173921090461697',
          levelId: '1912173920981409794',
          accountGroupId: '14',
          accountGroupName: '标准账户组',
          symbol: 'Forex',
          rebateType: 'FIXED_AMOUNT',
          sortIndex: null,
          statisticPeriod: 'DAY',
          rebateValue: 1.0,
          remark: null,
          createTime: '2025-04-16 15:37:27',
          updateTime: '2025-04-16 17:09:06',
          isDeleted: 0
        },
        {
          id: '1912173921115627521',
          levelId: '1912173920981409794',
          accountGroupId: '15',
          accountGroupName: '标准账户组',
          symbol: 'Indices',
          rebateType: 'NET_DEPOSIT_PERCENTAGE',
          sortIndex: null,
          statisticPeriod: 'WEEK',
          rebateValue: 2.0,
          remark: null,
          createTime: '2025-04-16 15:37:27',
          updateTime: '2025-04-16 17:09:07',
          isDeleted: 0
        }
      ],
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/commissionRecords/commissionRecordsCount': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: {
        settledCommission: 0,
        unsettledCommission: 0,
        tradingVolume: 0,
        profitLossAmount: 0
      },
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/commissionRecords/page': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: {
        unWithdrawnCommission: 0,
        withdrawnCommission: 0
      },
      msg: '操作成功'
    })
  },
  '/api/trade-agent/agentApi/withdrawalRecord/page': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: {
        records: [
          {
            id: '1',
            userUid: '22',
            agentId: '12',
            userName: 'test',
            tradeAccountId: '23432432',
            amount: 111.0,
            withdrawalTime: '2025-04-11 11:20:50',
            remainingBalance: 11.0,
            reviewMethod: 'MANUAL',
            status: 'SUCCESS',
            isDeleted: 0,
            remark: '11'
          }
        ],
        total: 1,
        size: 12,
        current: 1,
        orders: [],
        optimizeCountSql: true,
        searchCount: true,
        maxLimit: null,
        countId: null,
        pages: 1
      },
      msg: '操作成功'
    })
  }
}
