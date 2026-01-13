import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'

import Modal from '@/components/Admin/ModalForm'
import StandardTable from '@/components/Admin/StandardTable'
import { getEnum } from '@/constants/enum'
import { getActivityOrderDetailList } from '@/services/api/activity'
import { getSymbolGroupTree } from '@/services/api/tradeCore/symbolGroup'

type IProps = {
  reload?: () => void
}

function ActivityDetailModal({ reload }: IProps, ref: any) {
  const [modalInfo, setModalInfo] = useState<Activity.ListItem>({})
  const intl = useIntl()
  const [open, setOpen] = useState(false)

  const show = () => setOpen(true)
  const close = () => {
    setOpen(false)
    setModalInfo({})
  }

  useImperativeHandle(ref, () => {
    return {
      show: (info?: any) => {
        setModalInfo(info)
        show()
      },
      close
    }
  })

  const getColumns = useMemo(() => {
    return [
      {
        title: <FormattedMessage id="mt.jiaoyipinzhong" />,
        dataIndex: 'symbol',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 100,
        fixed: 'left'
      },
      {
        title: <FormattedMessage id="mt.pinzhongleibie" />,
        dataIndex: 'symbolGroupId',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 100,
        valueType: 'treeSelect',
        className: '!pl-5',
        request: async () => {
          const res = await getSymbolGroupTree()
          const data = (res?.data || []).map((item) => {
            return {
              label: item.title,
              value: item.id,
              children: item.children?.map((child) => ({
                label: child.title,
                value: child.id
              }))
            }
          })
          return data
        },
        renderText(text, record, index, action) {
          return text
        }
      },
      {
        title: <FormattedMessage id="mt.jiaoyidanhao" />,
        dataIndex: 'tradeOrderNo',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: true,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 200
      },
      {
        title: <FormattedMessage id="mt.jiaoyishoushu" />,
        dataIndex: 'tradeVolume',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          precision: 2,
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 100
      },
      {
        title: <FormattedMessage id="mt.zhuangtai" />,
        dataIndex: 'status',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 100,
        valueEnum: getEnum().Enum.ActivityStatus
      },
      {
        title: <FormattedMessage id="mt.chuangjianshijian" />,
        dataIndex: 'createTime',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 200,
        fixed: 'right',
        align: 'right'
      },

      // 表单搜索项
      {
        dataIndex: 'tradeOrderNo',
        hideInTable: true,
        hideInSearch: false,
        formItemProps: {
          label: '' // 去掉form label
        },
        fieldProps: {
          className: '!w-[200px]',
          placeholder: useIntl().formatMessage({ id: 'mt.jiaoyidanhao' })
        },
        colSize: 0.9
      }
    ] as ProColumns<Activity.DetailListItem>[]
  }, [intl.locale])

  if (!modalInfo.id) return null

  return (
    <>
      <Modal hiddenSubmitter title={<FormattedMessage id="mt.huodongxiangqing" />} width={900} open={open} onCancel={() => setOpen(false)}>
        <StandardTable
          columns={getColumns}
          // ghost
          action={{
            query: (params) =>
              getActivityOrderDetailList({
                activityOrderNo: modalInfo.activityOrderNo,
                ...params
              })
          }}
          fixSearchFormStyleInModal
          scroll={{ x: 400 }}
          cardProps={{
            bodyStyle: {
              padding: 0
            }
          }}
          size="small"
        />
      </Modal>
    </>
  )
}

export default forwardRef(ActivityDetailModal)
