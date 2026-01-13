import { InfoCircleOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { Tooltip } from 'antd'
import dayjs from 'dayjs'

import { DEFAULT_PRECISION } from '@/constants'
import { DATE } from '@/constants/date'
import { sysPush } from '@/utils/navigator'
import { numberFormatUnit } from '@/utils/number'
export const getColumns = (): ProColumns<CrmTrading.StatisticsDayItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.riqi" />,
      dataIndex: 'showDateStr',
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
      fixed: 'left',
      renderText(text, record, index, action) {
        return dayjs(text).format('YYYY-MM-DD')
      }
    },
    {
      title: <FormattedMessage id="mt.xinzengyonghu" />,
      dataIndex: 'newUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      renderText(text, record, index, action) {
        const clickable = Number(text) !== 0
        return (
          <span
            className={`${clickable ? 'cursor-pointer underline' : ''}`}
            onClick={() => {
              clickable && sysPush(`/crms/channels`, `startDate=${record.showDateStr}&endDate=${record.showDateStr}`)
            }}
          >
            {text}
          </span>
        )
      },
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.xinzengshimingrenzhengtongguokehu" />,
      dataIndex: 'newKycUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      renderText(text, record, index, action) {
        const clickable = Number(text) !== 0
        return (
          <span
            className={`${clickable ? 'cursor-pointer underline' : ''}`}
            onClick={() => {
              clickable && sysPush(`/crms/channels`, `startDate=${record.showDateStr}&endDate=${record.showDateStr}&isKycAuth=1`)
            }}
          >
            {text}
          </span>
        )
      },
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.xinzengshoucirujinkehu" />,
      dataIndex: 'newAUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      fieldProps: {
        placeholder: ''
      },

      renderText(text, record, index, action) {
        const clickable = Number(text) !== 0
        return (
          <span
            className={`${clickable ? 'cursor-pointer underline' : ''}`}
            onClick={() => {
              clickable && sysPush(`/crms/deposit`, `startDate=${record.showDateStr}&endDate=${record.showDateStr}`)
            }}
          >
            {text}
          </span>
        )
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.xinzengercirujinkehu" />,
      dataIndex: 'secondAUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',

      renderText(text, record, index, action) {
        const clickable = Number(text) !== 0
        return (
          <span
            className={`${clickable ? 'cursor-pointer underline' : ''}`}
            onClick={() => {
              clickable && sysPush(`/crms/deposit`, `startDate=${record.showDateStr}&endDate=${record.showDateStr}`)
            }}
          >
            {text}
          </span>
        )
      },
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.dangrihuoyueyonghu" />,
      dataIndex: 'activeUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',
      renderText(text, record, index, action) {
        const clickable = Number(text) !== 0
        return (
          <>
            {record.showDateStr !== DATE.DATE_TODAY ? (
              text
            ) : (
              <span
                className={`${clickable ? 'cursor-pointer underline' : ''}`}
                onClick={() => {
                  clickable && sysPush(`/crms/channels`, `lastLoginStartDate=${record.showDateStr}&lastLoginEndDate=${record.showDateStr}`)
                }}
              >
                {text}
              </span>
            )}
          </>
        )
      },
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.dangrijiayiyonghu" />,
      dataIndex: 'operationUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      align: 'center',

      // renderText(text, record, index, action) {
      //   return (
      //     <span
      //       className="cursor-pointer underline"
      //       onClick={() => {
      //         sysPush(`/crms/user-rank`, `fastAStartTime=${record.showDateStr}&fastAEndTime=${record.showDateStr}`)
      //       }}
      //     >
      //       {text}
      //     </span>
      //   )
      // },
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      // title: <FormattedMessage id="mt.xinzenghuiliuyonghu" />,
      title: (
        <div className="flex flex-row items-center gap-1">
          <FormattedMessage id="mt.xinzenghuiliuyonghu" />
          <Tooltip placement="top" title={<FormattedMessage id="mt.xinzenghuiliuyonghutishi" />}>
            <InfoCircleOutlined width={24} height={24} />
          </Tooltip>
        </div>
      ),
      className: 'title-align-right',
      dataIndex: 'backflowUser',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      // renderText(text, record, index, action) {
      //   return (
      //     <span
      //       className="cursor-pointer underline"
      //       onClick={() => {
      //         sysPush(`/crms/channels`, `startDate=${record.showDateStr}&endDate=${record.showDateStr}`)
      //       }}
      //     >
      //       {text}
      //     </span>
      //   )
      // },
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      fixed: 'right',
      align: 'right'
    },
    {
      title: <FormattedMessage id="mt.dangrijiaoyie" />,
      dataIndex: 'operationAmount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      // fieldProps: {
      //   precision: DEFAULT_PRECISION,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      align: 'center',
      renderText(text, record, index, action) {
        return (
          <span className="z-[1] relative" title={text}>
            {numberFormatUnit(Number(text), { precision: DEFAULT_PRECISION, placeholder: '0' })}
          </span>
        )
      },
      width: 160
    }
    // {
    //   title: <FormattedMessage id="mt.dangrijiaoyiliang" />,
    //   dataIndex: 'operationVolume',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   // fieldProps: {
    //   //   precision: DEFAULT_PRECISION,
    //   //   placeholder: ''
    //   // },
    //   // formItemProps: {
    //   //   label: '' // 去掉form label
    //   // },
    //   align: 'center',
    //   renderText(text, record, index, action) {
    //     return (
    //       <span className="z-[1] relative" title={text}>
    //         {numberFormatUnit(Number(text), { precision: DEFAULT_PRECISION })}
    //       </span>
    //     )
    //   },
    //   width: 160
    // }

    // 表单搜索项
    // {
    //   dataIndex: 'dateRangeNoTime',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'dateRange', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   fieldProps: {
    //     placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
    //   }
    // }
  ]
}
