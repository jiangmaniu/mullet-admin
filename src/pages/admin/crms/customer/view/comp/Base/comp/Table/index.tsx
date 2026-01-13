import { ProForm } from '@ant-design/pro-components'
import { getIntl, useIntl, useModel, useParams } from '@umijs/max'
import { Form } from 'antd'
import { useMemo, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import StandardTable from '@/components/Admin/StandardTable'
import { findAccount } from '@/services/api/crmManage/client'

import { getColumns } from './tableConfig'

export default function Table() {
  const [params, setParams] = useState({}) as any
  const intl = useIntl()
  const [form] = Form.useForm()
  const { realAccountGroupOptions } = useModel('accountGroup')
  const { id } = useParams()

  const groupOptions = () => {}

  const adapter = useMemo(() => {
    return (data: any[]) => data.filter((item: any) => !params.accountGroupId || item.accountGroupId === params.accountGroupId)
  }, [params.accountGroupId])

  return (
    <div>
      <ProForm
        onValuesChange={(values) => {
          // console.log('values', values)
          setParams(form.getFieldsValue() || {})
        }}
        submitter={false}
        layout="horizontal"
        colon={false}
        form={form}
        autoFocusFirstInput={false}
      >
        <ProFormSelect
          name="accountGroupId"
          label={intl.formatMessage({ id: 'mt.zhanghuleixing' })}
          initialValue="ALLALL"
          options={[{ label: getIntl().formatMessage({ id: 'mt.quanbu' }), value: 'ALLALL' }, ...realAccountGroupOptions]}
          width={180}
          fieldProps={{ size: 'middle', bordered: false, style: { background: '#fff' } }}
          className="!mb-4"
        />
      </ProForm>
      <StandardTable
        columnEmptyText="0"
        columns={getColumns()}
        cardProps={{ bodyStyle: { padding: 10 } }}
        hideSearch
        // ghost
        action={{
          query: (params) => findAccount(params)
        }}
        // adapter={adapter}
        params={{
          clientId: id,
          accountGroupId: params.accountGroupId
          // 把账号组查询改成过滤
          // ...params
        }}
        pageSize={5}
        size="small"
      />
    </div>
  )
}
