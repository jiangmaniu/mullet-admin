import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form, FormInstance } from 'antd'
import classNames from 'classnames'

import FormInputPresets from '@/components/Admin/Form/FormInputPresets'
import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getEnum } from '@/constants/enum'
import { useEnv } from '@/context/envProvider'

import EditTable from './EditTable'

type IProps = {
  form: FormInstance
  formData: any
}

export default function FormItem({ formData, form }: IProps) {
  const intl = useIntl()
  const { screenSize } = useEnv()

  const prepaymentConf = Form.useWatch('prepaymentConf', form)
  const mode = prepaymentConf?.mode
  const is_unilateral = prepaymentConf?.[mode]?.is_unilateral

  let width = 400
  if (screenSize.width <= 1200) {
    width = 200
  }

  return (
    <>
      <div className="w-full grid gap-y-5">
        <div
          className={classNames({
            'grid grid-cols-2': mode === 'fixed_leverage'
          })}
        >
          <ProFormSelect
            name={['prepaymentConf', 'mode']}
            label={intl.formatMessage({ id: 'mt.moshi' })}
            options={getEnum().enumToOptions('PrePayLeverageMode')}
            initialValue="fixed_margin"
            required
            filedConfig={{ style: { width } }}
            fieldProps={{ allowClear: false }}
          />
          {/* 固定杠杆模式 */}
          {mode === 'fixed_leverage' && (
            <FormInputPresets
              name={['prepaymentConf', 'fixed_leverage', 'leverage_multiple']}
              label={intl.formatMessage({ id: 'mt.gangganbeishu' })}
              placeholder={intl.formatMessage({ id: 'mt.shurugangganbeishu' })}
              options={[
                { label: '10', value: '10' },
                { label: '50', value: '50' },
                { label: '100', value: '100' },
                { label: '500', value: '500' },
                { label: '1000', value: '1000' }
              ]}
              form={form}
              unit="X"
              required
              type="number"
              maxLength={20}
              inputProps={{ style: { width } }}
            />
          )}
        </div>
        {/* 固定保证金模式 */}
        {(mode === 'fixed_margin' || !mode) && (
          <div className="grid grid-cols-2">
            <ProFormDigit
              autoFocus
              required
              name={['prepaymentConf', 'fixed_margin', 'initial_margin']}
              filedConfig={{ style: { width } }}
              label={intl.formatMessage({ id: 'mt.chushiyufukuan' })}
              hiddenPrecision
              maxLength={40}
            />
            <ProFormDigit
              required={!is_unilateral}
              name={['prepaymentConf', 'fixed_margin', 'locked_position_margin']}
              filedConfig={{ style: { width } }}
              label={intl.formatMessage({ id: 'mt.suocangyufukuan' })}
              disabled={is_unilateral}
              hiddenPrecision
              maxLength={40}
            />
          </div>
        )}
        {/* 自定义杠杆 最大最小 */}
        {mode === 'float_leverage' && (
          <div className="grid grid-cols-2">
            <ProFormDigit
              required={true}
              name={['prepaymentConf', 'float_leverage', 'min_lever']}
              filedConfig={{ style: { width } }}
              label={intl.formatMessage({ id: 'mt.zuixiaoganggan' })}
              hiddenPrecision
              maxLength={40}
              fieldProps={{ prefix: <span className="text-gray-400 text-sn">X</span> }}
            />
            <ProFormDigit
              autoFocus
              required
              name={['prepaymentConf', 'float_leverage', 'max_lever']}
              filedConfig={{ style: { width } }}
              label={intl.formatMessage({ id: 'mt.zuidaganggan' })}
              hiddenPrecision
              maxLength={40}
              fieldProps={{ prefix: <span className="text-gray-400 text-sn">X</span> }}
            />
          </div>
        )}

        {mode !== 'float_leverage' && (
          <div className="flex items-center">
            {/* 默认打开,与锁仓预付款二选一，当开关打开时，锁仓预付款输入框不可编辑 */}
            <ProFormSwitch name={['prepaymentConf', mode, 'is_unilateral']} initialValue={true} />
            <span className="text-primary text-sm pl-3 font-semibold">
              <FormattedMessage id="mt.shifouzhishouqudanbianjiaoyishoushudade" />
            </span>
          </div>
        )}
      </div>

      {/* 浮动杠杆模式 */}
      {mode === 'float_leverage' && (
        <div className="mt-10 w-[80%]">
          <div className="flex items-center">
            <span className="text-primary text-sm mr-4 font-extrabold">
              <span className="text-[--ant-form-label-required-mark-color] text-sm pr-1 font-light">*</span>
              <FormattedMessage id="mt.fudonggangganfengxiankongzhi" />
            </span>
            <ProFormSelect
              name={['prepaymentConf', 'float_leverage', 'type']}
              options={[
                { value: 'volume', label: <FormattedMessage id="mt.anchicangshoushu" /> },
                { value: 'nominal', label: <FormattedMessage id="mt.anchicangmingyi" /> }
              ]}
              initialValue="volume"
              required
              filedConfig={{ style: { width: 120 } }}
              fieldProps={{ allowClear: false, size: 'middle' }}
            />
          </div>
          <EditTable form={form} name={['prepaymentConf', 'float_leverage', 'lever_grade']} />
          <div className="flex items-center">
            <ProFormSwitch name={['prepaymentConf', 'float_leverage', 'is_unilateral']} initialValue={true} />
            <span className="text-primary text-sm pl-3 font-semibold">
              <FormattedMessage id="mt.shifoushouqudanbianjiaoyishoushudadetongganggan" />
            </span>
          </div>
        </div>
      )}
    </>
  )
}
