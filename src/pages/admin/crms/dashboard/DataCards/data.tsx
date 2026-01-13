import { FormattedMessage, getIntl } from '@umijs/max'
import dayjs from 'dayjs'
import { sum } from 'lodash'

import { sysPush } from '@/utils/navigator'

import { formatNum } from '../..'

const formatNumber = (value: number, { emphasis = true, suffix = '', precision = 2 }) => {
  return value === 0
    ? '0'
    : (emphasis && value > 0 ? '+' : '') +
        formatNum(value, {
          precision
        }) +
        suffix
}

export function getCardDatas({
  // monthDatas,
  // lastMonthDatas,
  todayStatisticsData,
  statistics30,
  statisticsMonth,
  statisticsLastMonth,
  today,
  _today,
  _realToday,
  _startDay,
  firstDayOfMonth
}: {
  // monthDatas: CrmTrading.CRMMoneyByMonthInfo
  // lastMonthDatas: CrmTrading.CRMMoneyByMonthInfo
  todayStatisticsData: any
  statistics30: CrmTrading.findCloseMoneyInfo[]
  statisticsMonth: CrmTrading.findCloseMoneyInfo[]
  statisticsLastMonth: CrmTrading.findCloseMoneyInfo[]
  today: dayjs.Dayjs
  _today: string
  _realToday: string
  _startDay: string
  firstDayOfMonth: string
}) {
  const monthDatas = statisticsMonth.reduce(
    (acc, item) => {
      acc.newUser += Number(item.newUser) ?? 0
      acc.newAUser += Number(item.newAUser) ?? 0
      acc.activeUser += Number(item.activeUser) ?? 0
      acc.operationUser += Number(item.operationUser) ?? 0
      acc.totalAmount += Number(item.totalAmount) ?? 0
      acc.totalWithdraw += Number(item.totalWithdraw) ?? 0
      return acc
    },
    {
      newUser: 0,
      newAUser: 0,
      activeUser: 0,
      operationUser: 0,
      totalAmount: 0,
      totalWithdraw: 0
    } as CrmTrading.findCloseMoneyInfo
  )

  const lastMonthDatas = statisticsLastMonth.reduce(
    (acc, item) => {
      acc.newUser += Number(item.newUser) ?? 0
      acc.newAUser += Number(item.newAUser) ?? 0
      acc.activeUser += Number(item.activeUser) ?? 0
      acc.operationUser += Number(item.operationUser) ?? 0
      acc.totalAmount += Number(item.totalAmount) ?? 0
      acc.totalWithdraw += Number(item.totalWithdraw) ?? 0
      return acc
    },
    {
      newUser: 0,
      newAUser: 0,
      activeUser: 0,
      operationUser: 0,
      totalAmount: 0,
      totalWithdraw: 0
    } as CrmTrading.findCloseMoneyInfo
  )

  return [
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/zhucerenshu.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.zhucerenshu" />,
      value:
        _startDay === _today
          ? formatNum(todayStatisticsData?.newUser ?? 0, { precision: 0 })
          : formatNum(sum(statistics30?.map((item) => Number(item.newUser))) ?? 0, { precision: 0 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNum(monthDatas.newUser, { precision: 0 }),
      mom:
        monthDatas.newUser && lastMonthDatas.newUser ? ((monthDatas.newUser - lastMonthDatas.newUser) / lastMonthDatas.newUser) * 100 : 0,
      onClick: () => {
        sysPush(`/crms/channels`, `startDate=${_startDay}&endDate=${_today}`)
      },
      subClick: () => {
        sysPush(`/crms/channels`, `startDate=${firstDayOfMonth}&endDate=${_today}`)
      }
    },
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/shouarujinrenshu.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.shouarujinrenshu" />,
      value:
        _startDay === _today
          ? formatNum(todayStatisticsData?.newAUser ?? 0, { precision: 0 })
          : formatNum(sum(statistics30?.map((item) => Number(item.newAUser))) ?? 0, { precision: 0 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNum(monthDatas.newAUser, { precision: 0 }),
      mom:
        monthDatas.newAUser && lastMonthDatas.newAUser
          ? ((monthDatas.newAUser - lastMonthDatas.newAUser) / lastMonthDatas.newAUser) * 100
          : 0,

      onClick: () => {
        sysPush(`/crms/deposit`, `startDate=${_startDay}&endDate=${_today}`)
      },
      subClick: () => {
        sysPush(`/crms/deposit`, `startDate=${firstDayOfMonth}&endDate=${_today}`)
      }
    },
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/dengluhuoyue.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.dengluhuoyue" />,
      value:
        _startDay === _today
          ? formatNum(todayStatisticsData?.activeUser ?? 0, { precision: 0 })
          : formatNum(sum(statistics30?.map((item) => Number(item.activeUser))) ?? 0, { precision: 0 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNum(monthDatas.activeUser, { precision: 0 }),
      mom:
        monthDatas.activeUser && lastMonthDatas.activeUser
          ? ((monthDatas.activeUser - lastMonthDatas.activeUser) / lastMonthDatas.activeUser) * 100
          : 0,
      onClick: () => {
        sysPush(`/crms/channels`, `lastLoginStartDate=${_startDay}&lastLoginEndDate=${_today}`)
      },
      subClick: () => {
        sysPush(`/crms/channels`, `lastLoginStartDate=${firstDayOfMonth}&lastLoginEndDate=${_today}`)
      }
    },
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/jiaoyihuoyue.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.jiaoyihuoyue" />,
      value:
        _startDay === _today
          ? formatNum(todayStatisticsData?.operationUser ?? 0, { precision: 0 })
          : formatNum(sum(statistics30?.map((item) => Number(item.operationUser))) ?? 0, { precision: 0 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNum(monthDatas.operationUser, { precision: 0 }),
      mom:
        monthDatas.operationUser && lastMonthDatas.operationUser
          ? ((monthDatas.operationUser - lastMonthDatas.operationUser) / lastMonthDatas.operationUser) * 100
          : 0,
      onClick: () => {
        sysPush(`/crms/user-rank`, `lastTradeStartTime=${_startDay}&lastTradeEndTime=${_today}`)
      },
      subClick: () => {
        sysPush(`/crms/user-rank`, `lastTradeStartTime=${firstDayOfMonth}&lastTradeEndTime=${_today}`)
      }
    },
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/rujinzonge.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.rujinzonge" />,
      value:
        _startDay === _today
          ? formatNumber(todayStatisticsData?.totalAmount ?? 0, { precision: 2 })
          : formatNumber(sum(statistics30?.map((item) => Number(item.totalAmount))) ?? 0, { precision: 2 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNumber(monthDatas.totalAmount, { precision: 2 }),
      mom:
        monthDatas.totalAmount && lastMonthDatas.totalAmount
          ? ((monthDatas.totalAmount - lastMonthDatas.totalAmount) / lastMonthDatas.totalAmount) * 100
          : 0,
      onClick: () => {
        sysPush(`/crms/deposit`, `startDate=${_startDay}&endDate=${_today}`)
      },
      subClick: () => {
        sysPush(`/crms/deposit`, `startDate=${firstDayOfMonth}&endDate=${_today}`)
      }
    },
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/chujinzonge.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.chujinzonge" />,
      value:
        _startDay === _today
          ? formatNumber(todayStatisticsData?.totalWithdraw ?? 0, { precision: 2 })
          : formatNumber(sum(statistics30?.map((item) => Number(item.totalWithdraw))) ?? 0, { precision: 2 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNumber(monthDatas.totalWithdraw, { precision: 2 }),
      mom:
        monthDatas.totalWithdraw && lastMonthDatas.totalWithdraw
          ? ((monthDatas.totalWithdraw - lastMonthDatas.totalWithdraw) / lastMonthDatas.totalWithdraw) * 100
          : 0,
      onClick: () => {
        sysPush(`/crms/withdraw`, `activeKey=Order&startDate=${_startDay}&endDate=${_today}&status=SUCCESS`)
      },
      subClick: () => {
        sysPush(`/crms/withdraw`, `activeKey=Order&startDate=${firstDayOfMonth}&endDate=${_today}&status=SUCCESS`)
      }
    }
  ]
}
