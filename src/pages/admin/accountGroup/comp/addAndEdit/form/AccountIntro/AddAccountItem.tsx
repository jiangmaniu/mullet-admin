import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { NamePath } from 'antd/es/form/interface'

import ProFormText from '@/components/Admin/Form/ProFormText'
import { cn } from '@/utils/cn'

type IProps = {
  name: NamePath
}

// 新增说明 Item 在客户端 key/value展示
export default function AddAccountItem({ name }: IProps) {
  const intl = useIntl()

  return (
    <div>
      <Form.List
        name={name}
        initialValue={[
          {
            title: '',
            content: ''
          }
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              const isDefault = name === 0
              return (
                <>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-full grid grid-cols-2 gap-x-[20px] my-2">
                      <ProFormText
                        required
                        maxLength={100}
                        name={[name, 'title']}
                        fieldProps={{ showCount: true }}
                        label={intl.formatMessage({ id: 'mt.biaoti' })}
                      />
                      <ProFormText
                        required
                        maxLength={100}
                        name={[name, 'content']}
                        fieldProps={{ showCount: true }}
                        label={intl.formatMessage({ id: 'mt.neirong' })}
                      />
                    </div>
                    <div className="flex items-center gap-x-6 ml-9">
                      <PlusCircleOutlined
                        style={{ fontSize: 20 }}
                        className={cn('cursor-pointer hover:text-brand', fields.length >= 3 && 'pointer-events-none opacity-40 text-weak')}
                        onClick={() => add()}
                      />
                      <MinusCircleOutlined
                        style={{ fontSize: 20 }}
                        className={cn('cursor-pointer hover:text-red', isDefault && 'pointer-events-none opacity-40 text-weak')}
                        onClick={() => {
                          remove(name)
                        }}
                      />
                    </div>
                  </div>
                </>
              )
            })}
          </>
        )}
      </Form.List>
    </div>
  )
}
