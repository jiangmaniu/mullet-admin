import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage } from '@umijs/max'
import { FormInstance } from 'antd'
import classNames from 'classnames'

import InventoryBaseFormItem from '../BaseFormItem'
import MultiplierEditTable, { ISymbolFormLayout } from '../MultiplierEditTable'
import SwitchFormItem from '../SwitchFormItem'
import SwitchFormLayout from './SwitchFormLayout'

type IProps = {
  form: FormInstance
  initialValues?: any
  layout: ISymbolFormLayout
}

export default function FormLayout({ form, initialValues, layout }: IProps) {
  const tableWrapperClassName = useEmotionCss(({ token }) => {
    return {
      // 去掉表格边框线
      '.ant-table-container': {
        borderLeft: 'none !important',
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important'
      },
      '.ant-table-thead > tr > th': {
        borderTop: '1px solid #f0f0f0 !important',
        borderRadius: '0 !important'
      },
      // 把表格最后一行的底部线条删除
      '.ant-table-tbody > .ant-table-row:last-child > td': {
        borderBottom: '0 !important'
      },
      '.ant-table-tbody > .ant-table-row > td:last-child': {
        borderRight: '0 !important'
      },
      '.ant-table-thead > tr > th:last-child': {
        borderRight: '0 !important'
      }
    }
  })

  return (
    <SwitchFormLayout
      layout={layout}
      symbolLayout={
        <div className="flex items-start flex-col w-full">
          <div className="text-base font-semibold pb-7">
            <FormattedMessage id="mt.symbol.kucunfei.biaoti" />
          </div>
          {/* 启用按钮组 */}
          <SwitchFormItem />
          <div className="flex justify-between items-start w-full gap-[50px]">
            <div className="w-full pb-5 grid gap-y-5">
              <InventoryBaseFormItem form={form} />
            </div>
            <div
              className={classNames(
                'w-full grid border border-gray-150 rounded-[15px] pt-6 relative overflow-hidden',
                tableWrapperClassName
              )}
            >
              {/* 乘数可编辑表格 */}
              <MultiplierEditTable form={form} showCustomBordered={false} initialValues={initialValues} layout={layout} />
            </div>
          </div>
        </div>
      }
      accountGroupLayout={
        <div className="flex gap-7 w-full">
          <div className="w-full">
            {/* 启用按钮组 */}
            <SwitchFormItem />
            <div className="flex justify-between items-start w-full gap-5">
              <div className="pb-5 grid gap-y-5 w-[90%]">
                <InventoryBaseFormItem form={form} />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            {/* 乘数可编辑表格 */}
            <MultiplierEditTable form={form} layout="UPDATE_ACCOUNT_GROUP_SYMBOL" initialValues={initialValues} />
          </div>
        </div>
      }
    />
  )
}
