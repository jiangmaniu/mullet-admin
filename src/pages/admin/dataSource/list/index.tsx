import { DeleteOutlined } from '@ant-design/icons'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Popconfirm } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import DragSortTable from '@/components/Admin/StandardTable/DragSortTable'
import Button from '@/components/Base/Button'
import Iconfont from '@/components/Base/Iconfont'
import { getDataSourceList, removeDataSource, sortDataSourceList } from '@/services/api/dataSource'
import { message } from '@/utils/message'
import { push } from '@/utils/navigator'

import DataSourceSwitchRuleModal from './DataSourceSwitchRuleModal'
import RenameModal from './RenameModal'
import SubscribeListModal from './SubscribeListModal'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const intl = useIntl()
  const [modalDataSourceInfo, setModalDataSourceInfo] = useState<DataSource.DataSourceListItem>({})
  const [dataSource, setDataSource] = useState<DataSource.DataSourceListItem[]>([])
  const dataSourceSwitchRuleModalRef = useRef<any>(null)
  const renameModalRef = useRef<any>(null)
  const subscribeListModalRef = useRef<any>(null)

  const { data, loading, run } = useRequest(getDataSourceList, {
    manual: true,
    onSuccess: (res) => {
      setDataSource(res.data || [])
    }
  })

  useEffect(() => {
    run()
  }, [])

  const handleDragSortEnd = useCallback((beforeIndex: number, afterIndex: number, newDataSource: any) => {
    console.log('排序后的数据', newDataSource)
    // 模拟将排序后数据发送到服务器的场景 @TODO 请求接口修改数据
    // remoteData = newDataSource;
    setDataSource(newDataSource)
    sortDataSourceList({
      ids: newDataSource.map((item: any) => item.id).join(',')
    })
    // 请求成功之后刷新列表
    // run()
    message.info(intl.formatMessage({ id: 'mt.xiugailiepaixuchenggong' }))
  }, [])

  return (
    <PageContainer icon="/img/emoji/8.png" pageBgColorMode="gray">
      <DragSortTable
        columns={getColumns(run)}
        // ghost
        showOptionColumn
        opColumnWidth={320}
        hideSearch
        tableExtraRender={() => (
          <div className="flex items-center gap-x-3">
            <Button
              onClick={() => dataSourceSwitchRuleModalRef.current?.show()}
              className="!px-2 !gap-x-0"
              icon={<img src="/img/switch-rule-icon.png" width={24} height={24} />}
            >
              <FormattedMessage id="mt.peizhiqiehuanguize" />
            </Button>
            <Button
              className="!px-2 !gap-x-0"
              onClick={() => push('/datasources/list/add')}
              icon={<img src="/img/add-datasource-icon.png" width={24} height={24} />}
            >
              <FormattedMessage id="mt.xinzenghangqingyuan" />
            </Button>
          </div>
        )}
        renderOptionColumn={(record) => {
          return (
            <div className="flex gap-x-4 justify-end">
              <a
                className="!text-primary font-medium text-sm flex items-center gap-x-[2px]"
                onClick={() => {
                  // 跳转到交易页面，带上交易品种等信息，填入交易输入框
                  push(`/datasources/list/edit/${record.id}`)
                }}
              >
                <Iconfont name="peizhi" />
                <FormattedMessage id="mt.peizhi" />
              </a>
              <a
                onClick={() => {
                  renameModalRef.current?.show()
                  setModalDataSourceInfo(record)
                }}
                className="!text-primary font-medium text-sm flex items-center gap-x-[2px]"
              >
                <Iconfont name="zhongmingmingpeizhi" />
                <FormattedMessage id="mt.chongmingming" />
              </a>
              <a
                onClick={() => {
                  subscribeListModalRef.current?.show()
                  setModalDataSourceInfo(record)
                }}
                className="!text-primary font-medium text-sm flex items-center gap-x-[2px]"
              >
                <Iconfont name="dingyueliebiao" />
                <FormattedMessage id="mt.dingyueliebiao" />
              </a>
              <Popconfirm
                title={intl.formatMessage({ id: 'common.confirmDelete' })}
                onConfirm={() => {
                  removeDataSource({ id: record.id }).then((res) => {
                    if (res.success) {
                      message.info(intl.formatMessage({ id: 'common.deleteSuccess' }))
                      run()
                    }
                  })
                }}
              >
                <a className="!text-primary">
                  <DeleteOutlined style={{ fontSize: 16 }} />
                </a>
              </Popconfirm>
            </div>
          )
        }}
        pageSize={100}
        dataSource={dataSource}
        onDragSortEnd={handleDragSortEnd}
        dragSortKey="sort"
      />
      {/* 配置切换规则弹窗 */}
      <DataSourceSwitchRuleModal ref={dataSourceSwitchRuleModalRef} />
      {/* 重命名配置弹窗 */}
      <RenameModal
        ref={renameModalRef}
        info={modalDataSourceInfo}
        onClose={() => {
          setModalDataSourceInfo({})
        }}
      />
      {/* 订阅列表弹窗 */}
      <SubscribeListModal
        ref={subscribeListModalRef}
        info={modalDataSourceInfo}
        onClose={() => {
          setModalDataSourceInfo({})
        }}
      />
    </PageContainer>
  )
}
