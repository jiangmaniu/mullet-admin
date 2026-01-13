import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import dayjs from 'dayjs'
import lodash from 'lodash'
import { useLayoutEffect, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { addAllOptionToEnum } from '@/constants/enum'
import { getFindAllClientGroup, getTradingRetention } from '@/services/api/crmManage/trading'
type Params = API.PageParams

export default function List() {
  const intl = useIntl()
  const [type, setType] = useState('DAY')
  const [dealType, setDealType] = useState('REGIST')

  const [channels, setChannels] = useState<any>([])

  useLayoutEffect(() => {
    getFindAllClientGroup().then((res) => {
      const channels = res?.data?.reduce((pre: any, cur: any) => {
        return { ...pre, [cur.id]: { text: `${cur.groupName} (${cur.code})` } }
      }, {})
      setChannels(channels)
    })
  }, [])
  const getDayColumns = () => {
    return Array.from({ length: 15 }, (_, i) => {
      const columnItem = {
        title: <FormattedMessage id={`mt.${i + 1}d`} />,
        dataIndex: `active_${i + 1}_day`,
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        // fieldProps: {
        //   placeholder: ''
        // },
        // formItemProps: {
        //   label: '' // 去掉form label
        // },
        renderText: (text, record) => {
          return !text || text === 0 ? ' ' : `${text}/${((text / record.reg_user) * 100).toFixed(0)}%`
        },
        width: 100
      } as ProColumns<CrmTrading.RetentionListItem>
      // if (i === 14) {
      //   columnItem.fixed = 'right'
      //   columnItem.align = 'right'
      // }
      return columnItem
    })
  }

  const getDaySummary = (pageData: any) => {
    return (
      <tr>
        <td className="text-left !px-5"> {intl.formatMessage({ id: 'mt.huizong' })} </td>
        <td className="text-center !px-5">{lodash.sum(pageData.map((item: any) => item.reg_user))}</td>
        {Array.from({ length: 15 }, (_, i) => {
          const sum = lodash.sum(pageData.map((item: any) => item[`active_${i + 1}_day`]))
          return (
            <td className="text-left !px-5" key={i}>
              {sum && sum !== 0 ? `${sum}/${((sum / lodash.sum(pageData.map((item: any) => item.reg_user))) * 100).toFixed(0)}%` : ''}
            </td>
          )
        })}
      </tr>
    )
  }

  const getMonthColumns = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const columnItem = {
        title: <FormattedMessage id="mt.xxmonth" values={{ num: i + 1 }} />,

        dataIndex: `active_${i + 1}_month`,
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        // fieldProps: {
        //   placeholder: ''
        // },
        // formItemProps: {
        //   label: '' // 去掉form label
        // },
        renderText: (text, record) => {
          return !text || text === 0 ? ' ' : `${text}/${((text / record.reg_user) * 100).toFixed(0)}%`
        },
        width: 100
      } as ProColumns<CrmTrading.RetentionListItem>
      // if (i === 11) {
      //   columnItem.fixed = 'right'
      //   columnItem.align = 'right'
      // }
      return columnItem
    })
  }

  const getMonthSummary = (pageData: any) => {
    return (
      <tr>
        <td className="text-left !px-5"> {intl.formatMessage({ id: 'mt.huizong' })} </td>
        <td className="text-center !px-5">{lodash.sum(pageData.map((item: any) => item.reg_user))}</td>
        {Array.from({ length: 12 }, (_, i) => {
          const sum = lodash.sum(pageData.map((item: any) => item[`active_${i + 1}_month`]))
          return (
            <td className="text-left !px-5" key={i}>
              {sum && sum !== 0 ? `${sum}/${((sum / lodash.sum(pageData.map((item: any) => item.reg_user))) * 100).toFixed(0)}%` : ''}
            </td>
          )
        })}
      </tr>
    )
  }

  return (
    <PageContainer icon="/img/emoji/23.png" pageBgColorMode="gray">
      <div className="relative">
        {/* <div className=" absolute right-0 top-0 z-10">
          <Export />
        </div> */}
        <StandardTable
          columnEmptyText="0"
          summary={type === 'DAY' ? getDaySummary : getMonthSummary}
          pageSize={10}
          columns={[
            {
              title: <FormattedMessage id="mt.riqi" />,
              dataIndex: 'show_date_str',
              hideInSearch: true, // 在 table的查询表单 中隐藏
              ellipsis: false,
              copyable: false,
              fieldProps: {
                placeholder: ''
              },
              formItemProps: {
                label: '' // 去掉form label
              },
              width: 140,
              fixed: 'left'
            },
            {
              title: <FormattedMessage id="mt.xinzengyonghu" />,
              dataIndex: 'reg_user',
              hideInSearch: true, // 在 table的查询表单 中隐藏
              ellipsis: false,
              copyable: false,
              align: 'center',
              fieldProps: {
                placeholder: ''
              },
              formItemProps: {
                label: '' // 去掉form label
              },
              width: 140
            },
            ...(type === 'DAY' ? getDayColumns() : getMonthColumns()),
            // 表单搜索项
            {
              dataIndex: 'dateRangeNoTime',
              filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
              onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
              valueType: type === 'DAY' ? 'dateRange' : 'dateMonthRange', // 值的类型,会生成不同的渲染器
              hideInSearch: false,
              hideInTable: true,
              search: {
                transform: (value) => {
                  if (type === 'MONTH') {
                    // startDate 取月初第一天
                    const startDate = dayjs(value[0]).startOf('month').format('YYYY-MM-DD')
                    // endDate 取月末最后一天
                    const endDate = dayjs(value[1]).endOf('month').format('YYYY-MM-DD')
                    return { startTime: startDate, endTime: endDate }
                  }
                  return { startTime: value[0], endTime: value[1] }
                }
              },
              fieldProps: {
                placeholder: [intl.formatMessage({ id: 'common.startDate' }), intl.formatMessage({ id: 'common.endDate' })]
              }
            },
            {
              dataIndex: 'retentionType',
              filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
              onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
              valueType: 'select', // 值的类型,会生成不同的渲染器
              hideInSearch: false,
              hideInTable: true,
              valueEnum: {
                DAY: { text: <FormattedMessage id="mt.an15tian" /> },
                MONTH: { text: <FormattedMessage id="mt.anyue" /> }
              },
              fieldProps: {
                onChange: (value: any) => {
                  console.log('value', value)
                  setType(value)
                },
                className: '!w-[180px]',
                placeholder: <FormattedMessage id="mt.xuanzeshijianduan" />
              },
              colSize: 0.9
            },
            {
              dataIndex: 'dealType',
              filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
              onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
              valueType: 'select', // 值的类型,会生成不同的渲染器
              hideInSearch: false,
              hideInTable: true,
              valueEnum: {
                REGIST: { text: <FormattedMessage id="mt.zhucekehu" /> },
                AMOUNT: { text: <FormattedMessage id="mt.rujinkehu" /> }
              },
              initialValue: dealType,
              fieldProps: {
                onChange: (value: any) => {
                  setDealType(value)
                },
                style: {
                  width: 180
                },
                placeholder: <FormattedMessage id="mt.kehuleixing" />
              },
              colSize: 0.9
            },
            {
              dataIndex: 'channelId',
              filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
              onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
              hideInSearch: false,
              hideInTable: true,
              valueType: 'select',
              valueEnum: addAllOptionToEnum(channels),
              fieldProps: {
                placeholder: getIntl().formatMessage({ id: 'mt.kaihuqudao' }),
                style: {
                  width: 180
                }
              },
              colSize: 0.9
            }
          ]}
          search={{
            span: 4,
            submitterColSpanProps: { span: 13, offset: 0 },
            className: 'custom-search-form-item',
            optionRender: (searchConfig, props, dom) => {
              return [
                <div key="action" className="flex items-center">
                  <QueryBtnGroup
                    onSubmit={() => {
                      searchConfig.form?.submit()
                    }}
                    onReset={() => {
                      searchConfig?.form?.resetFields()
                      searchConfig?.form?.submit()
                    }}
                  />
                  {/* <Export /> */}
                </div>
              ]
            }
          }}
          postData={(datas: any) => {
            // console.log('datas', datas)
            return datas
          }}
          // ghost
          action={{
            query: (params) => getTradingRetention(params)
          }}
        />
      </div>
    </PageContainer>
  )
}
