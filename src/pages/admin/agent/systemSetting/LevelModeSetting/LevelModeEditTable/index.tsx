import { EditableFormInstance, ProFormInstance } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib'
import React, { useRef, useState } from 'react'

import EditableTable from '@/components/Admin/StandardTable/EditableTable'
import Iconfont from '@/components/Base/Iconfont'
import { isTruthy } from '@/utils'
import { message } from '@/utils/message'

import RebateConfModalForm from './RebateConfModalForm'
import { getColumns } from './tableConfig'

type IProps = {
  title?: React.ReactNode
  form: FormInstance
  name: string
}

export default ({ title, form, name }: IProps) => {
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly any[]>([])
  const [modalInfo, setModalInfo] = useState<any>({})
  const modalRef = useRef<any>(null)

  const intl = useIntl()

  return (
    <>
      <Form.Item
        rules={[
          {
            required: true,
            validateTrigger: 'onSubmit',
            validator(rule, value, callback) {
              const tableData = form.getFieldValue(name)
              if (editableKeys?.length) {
                return Promise.reject(intl.formatMessage({ id: 'mt.agent.qingxianbaocunbiaogebianjideshuju' }))
              }
              if (!tableData || !tableData?.length) {
                return Promise.reject(intl.formatMessage({ id: 'mt.agent.dengjimoshishujubunengweikong' }))
              }
              return Promise.resolve()
            }
          }
        ]}
        required
        name="grade_table_item"
      >
        <EditableTable
          // 获取table数据 const rows = editorFormRef.current?.getRowsData?.();
          bordered={false}
          showCustomBordered
          optionColumnAlign="right"
          // table 所有的 form，带了一些表格特有的操作
          editableFormRef={editorFormRef}
          name={name}
          columns={getColumns()}
          // hiddenAddBtn
          form={form}
          scroll={{ y: 400 }}
          opColumnWidth={220}
          showDeleteIcon
          tableExtraRender={() => title}
          getOpColumnItems={(record, action) => {
            return (
              <>
                <a
                  className="!text-primary pl-2 flex items-center"
                  onClick={() => {
                    setModalInfo(record)
                    modalRef.current?.show()
                  }}
                >
                  <Iconfont name="peizhi" className="!size-5" />
                  {intl.formatMessage({ id: 'mt.agent.fanyongpeizhi' })}
                </a>
              </>
            )
          }}
          checkRowSaveBefore={(record) => {
            if (!record.levelName) {
              message.info(intl.formatMessage({ id: 'mt.agent.dengjimingchengbunengweikong' }))
              return true
            }
            if (!record?.tradeVolume) {
              message.info(intl.formatMessage({ id: 'mt.agent.jiaoyishoushubunengweikong' }))
              return true
            }
            if (!record?.userCount) {
              message.info(intl.formatMessage({ id: 'mt.agent.jiaoyirenshubunengweikong' }))
              return true
            }
            if (!record?.netDeposit) {
              message.info(intl.formatMessage({ id: 'mt.agent.jingrujinbunengweikong' }))
              return true
            }
            if (!record?.netValue) {
              message.info(intl.formatMessage({ id: 'mt.agent.jingzhibunengweikong' }))
              return true
            }
            if (!isTruthy(record?.evaluationPeriod)) {
              message.info(intl.formatMessage({ id: 'mt.agent.dengjipingguzhouqibunengweikong' }))
              return true
            }
            return false
          }}
          getEditableKeys={(keys) => {
            setEditableRowKeys(keys)
          }}
          // request={async () => {
          //   return {
          //     data: defaultData
          //   }
          // }}
        />
        <RebateConfModalForm
          onFinish={(values) => {
            console.log('onFinish 返佣配置', values)
            // 更新弹窗确认的值到当前行中
            const tableData = form?.getFieldValue(name) || []
            const newData = tableData.map((item: any) => {
              if (item?.id === modalInfo?.id) {
                return {
                  ...modalInfo,
                  // 更新返佣配置
                  rebateConfigVOList: values?.rebateConfigVOList
                }
              }
              return item
            })

            console.log('newData', newData)

            // 重新设置表格数据
            form?.setFieldValue(name, newData)
          }}
          name="rebateConfigVOList"
          info={modalInfo}
          onClose={() => {
            setModalInfo({})
          }}
          ref={modalRef}
        />
      </Form.Item>
    </>
  )
}
