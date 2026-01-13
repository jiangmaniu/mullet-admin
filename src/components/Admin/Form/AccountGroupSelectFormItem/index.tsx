import { ProFormSelectProps } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form, FormInstance } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'
import { cn } from '@/utils/cn'

type IProps = ProFormSelectProps & {
  form?: FormInstance
  size?: SizeType
  required?: boolean
}

/**
 * 选择账户组 区分真实账户和模拟账户标识
 * @param param0
 * @returns
 */
export default function AccountGroupSelectFormItem({ form, size = 'large', required = true, fieldProps }: IProps) {
  const intl = useIntl()
  // const [accountTabActiveKey, setAccountTabActiveKey] = useState<'REAL' | 'DEMO'>('REAL') //  真实账户、模拟账户
  // const [currentAccountList, setCurrentAccountList] = useState<AccountGroup.AccountGroupPageListItem[]>([])
  // const { data, run, loading } = useRequest(getAccountGroupPageList, { manual: true })
  const [open, setOpen] = useState(false)
  const accountGroupId = Form.useWatch('accountGroupId', form)

  // const accountGroupList = (data?.data?.records || []).map((item) => ({
  //   ...item,
  //   value: item.id,
  //   label: item.groupName
  // }))

  // useEffect(() => {
  //   run?.({ current: 1, size: 999 })
  // }, [])

  // useEffect(() => {
  //   // 切换真实模拟账户列表
  //   const list = accountGroupList.filter((item) => (accountTabActiveKey === 'DEMO' ? item.isSimulate : !item.isSimulate))
  //   setCurrentAccountList(list)
  // }, [accountTabActiveKey, accountGroupList.length])

  const popupClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-select-item-option-active': {
        backgroundColor: '#fff !important'
      },
      '.ant-select-item-option-selected': {
        backgroundColor: '#fff !important'
      }
    }
  })

  return (
    <ProFormSelect
      name="accountGroupId"
      required={required}
      label={intl.formatMessage({ id: 'mt.zhanghuzu' })}
      request={async () => {
        const res = await getAccountGroupPageList({ current: 1, size: 999 })
        return (res.data?.records || []).map((item) => ({
          ...item,
          value: item.id,
          label: item.groupName
        }))
      }}
      fieldProps={{
        open,
        // 回填到选择框的 Option 的属性值，默认是 Option 的子元素
        optionLabelProp: 'label',
        onDropdownVisibleChange: (visible) => setOpen(visible),
        showSearch: true,
        allowClear: true,
        listHeight: 300,
        popupClassName: popupClassName,
        optionRender: (option) => {
          const item = option?.data || {}
          const isSimulate = item?.isSimulate

          return (
            <div
              onClick={() => {
                setOpen(false)
              }}
              className={cn('cursor-pointer rounded-lg border border-gray-250 pb-[6px] pl-[11px] pr-[11px] pt-[11px] hover:bg-[#fbfbfb]', {
                'bg-[#fbfbfb]': item.id === accountGroupId
              })}
            >
              <div className="flex justify-between w-full py-2">
                <div className="flex justify-between w-full">
                  <div className="flex-1 text-sm font-bold text-primary truncate">
                    {item.groupName} / {item?.id}
                  </div>
                  <div className="ml-[10px] flex px-1">
                    <div
                      className={cn(
                        'flex h-5 min-w-[42px] items-center justify-center rounded px-1 !text-xs font-normal text-white',
                        isSimulate ? 'bg-green' : 'bg-blue-500'
                      )}
                    >
                      {isSimulate ? <FormattedMessage id="mt.moni" /> : <FormattedMessage id="mt.zhenshi" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        size,
        ...fieldProps
        // dropdownRender: (menu) => {
        //   return (
        //     <div className="px-[18px] flex flex-col">
        //       <div className="my-3 flex">
        //         <Tabs
        //           items={[
        //             { label: <FormattedMessage id="mt.zhenshizhanghao" />, key: 'REAL' },
        //             { label: <FormattedMessage id="mt.monizhanghu" />, key: 'DEMO' }
        //           ]}
        //           onChange={(key: any) => {
        //             setAccountTabActiveKey(key)
        //           }}
        //           activeKey={accountTabActiveKey}
        //         />
        //       </div>
        //       <div className="mt-3">
        //         {currentAccountList.map((item, idx: number) => {
        //           const isSimulate = item.isSimulate
        //           return (
        //             <div
        //               onClick={() => {
        //                 // if (isMobileOrIpad) {
        //                 //   hoverAccountBoxPopupRef?.current?.close()
        //                 // }
        //                 form.setFieldValue('accountGroupName', item.groupName) // 设置展示值
        //                 form.setFieldValue('accountGroupId', item.id) // 设置表单提交值
        //                 setOpen(false)
        //               }}
        //               key={idx}
        //               className={classNames(
        //                 'mb-[14px] cursor-pointer rounded-lg border border-gray-250 pb-[6px] pl-[11px] pr-[11px] pt-[11px] hover:bg-[#fbfbfb]',
        //                 {
        //                   'bg-[#fbfbfb]': item.id === accountGroupId
        //                 }
        //               )}
        //             >
        //               <div className="flex justify-between w-full py-2">
        //                 <div className="flex justify-between">
        //                   <div className="flex-1 text-sm font-bold text-gray">
        //                     {item.groupName} / {hiddenCenterPartStr(item?.id, 8)}
        //                   </div>
        //                   <div className="ml-[10px] flex px-1">
        //                     <div
        //                       className={classNames(
        //                         'flex h-5 min-w-[42px] items-center justify-center rounded px-1 text-xs font-normal text-white',
        //                         isSimulate ? 'bg-green' : 'bg-blue-500'
        //                       )}
        //                     >
        //                       {isSimulate ? <FormattedMessage id="mt.moni" /> : <FormattedMessage id="mt.zhenshi" />}
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //               {item.remark && (
        //                 <div className="mt-1">
        //                   <span className="ml-1 text-sm font-normal text-secondary">{item.remark}</span>
        //                 </div>
        //               )}
        //             </div>
        //           )
        //         })}
        //         <div className="my-3">{currentAccountList.length === 0 && <Empty />}</div>
        //       </div>
        //       <ProFormText name="accountGroupId" hidden />
        //     </div>
        //   )
        // }
      }}
    />
  )
}
