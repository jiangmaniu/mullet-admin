import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

// 启用库存费、考虑假期 开关
export default function SwitchFormItem() {
  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center pb-5">
          <ProFormSwitch name={['holdingCostConf', 'isEnable']} />
          <span className="text-primary text-sm pl-2 font-semibold">
            <FormattedMessage id="mt.qiyongkucunfei" />
          </span>
        </div>
        <div className="flex items-center pb-5 ml-8">
          <ProFormSwitch name={['holdingCostConf', 'isHoliday']} />
          <span className="text-primary text-sm pl-2 font-semibold">
            <FormattedMessage id="mt.kaolvjiaqi" />
          </span>
        </div>
      </div>
    </>
  )
}
