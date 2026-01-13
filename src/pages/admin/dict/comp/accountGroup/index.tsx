import { EllipsisOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { MenuInfo } from 'rc-menu/lib/interface'

import { AddButton } from '@/components/Base/Button'
import DeleteConfirmModal from '@/components/Base/DeleteConfirmModal'
import Dropdown from '@/components/Base/Dropdown'

import ModalForm from './comp/ModalForm'

export default function AccountGroup() {
  const accountList = [
    { title: <FormattedMessage id="mt.zhenshi" />, subTitle: 'real' },
    { title: <FormattedMessage id="mt.moni" />, subTitle: 'demo' }
  ]

  return (
    <ProCard
      bodyStyle={{ height: '60vh', width: '50%' }}
      gutter={[32, 32]}
      title={
        <div className="pl-4">
          <ModalForm
            trigger={
              <span>
                <AddButton />
              </span>
            }
          />
        </div>
      }
    >
      {accountList.map((item, idx) => (
        <ProCard key={idx} bordered>
          <div className="flex items-start justify-between pb-3">
            <img src="/img/account-group.png" width={42} height={42} />
            <Dropdown
              menu={{
                onClick: (event: MenuInfo) => {
                  const { key } = event
                  console.log('key', key)
                },
                items: [
                  {
                    key: 'edit',
                    label: (
                      <ModalForm
                        trigger={
                          <span>
                            <FormattedMessage id="common.bianji" />
                          </span>
                        }
                        info={{ test: 1 }}
                      />
                    )
                  },
                  {
                    key: 'delete',
                    label: (
                      <DeleteConfirmModal
                        trigger={
                          <span>
                            <FormattedMessage id="common.delete" />
                          </span>
                        }
                        onConfirm={() => {
                          console.log(1)
                          return true
                        }}
                      />
                    )
                  }
                ]
              }}
            >
              <span className="hover:bg-gray-160 rounded-full p-1 cursor-pointer flex items-center justify-center">
                <EllipsisOutlined style={{ fontSize: 20 }} />
              </span>
            </Dropdown>
          </div>
          <div className="text-primary font-bold text-base">{item.title}</div>
          <div className="text-secondary font-bold text-xs pt-1">{item.subTitle}</div>
        </ProCard>
      ))}
    </ProCard>
  )
}
