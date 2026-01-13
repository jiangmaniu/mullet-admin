import { getAllLocales } from '@umijs/max'
import { Dropdown } from 'antd'

import { LanguageMap } from '@/constants/enum'
import { useLang } from '@/context/languageProvider'
import { getEnv } from '@/env'
import SwitchPcOrWapLayout from '@/layouts/SwitchPcOrWapLayout'
import { cn } from '@/utils/cn'

import Picker from '../Base/MobilePicker'

type IProps = {
  isAdmin?: boolean
}

const inlineStyle = {
  cursor: 'pointer',
  padding: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  verticalAlign: 'middle'
}

export default function SwitchLanguage({ isAdmin = false }: IProps) {
  const { lng, setLng } = useLang()
  const languages = getAllLocales()
  const pickerOptions = languages.map((v: any) => ({ value: v, label: LanguageMap[v]?.label || 'English' }))
  const env = getEnv()

  const langMenu = {
    selectedKeys: [lng],
    onClick: ({ key }: any) => setLng(key),
    items: languages.map((key: any) => {
      const localeObj = LanguageMap[key]
      return {
        key,
        style: { minWidth: '160px', color: 'var(--color-text-primary)' },
        label: (
          <>
            <span role="img" style={{ marginRight: '8px' }}>
              {localeObj?.icon || '🌐'}
            </span>
            {localeObj?.label || 'en-US'}
          </>
        )
      }
    })
  }

  if (env.HIDE_SWITCH_LANGUAGE) return null

  return (
    <SwitchPcOrWapLayout
      pcComponent={
        <div>
          <div
            className={cn('flex justify-center', {
              'rounded-lg h-[38px] pr-4': isAdmin,
              'pl-6 py-4': !isAdmin
            })}
          >
            <Dropdown menu={langMenu} align={{ offset: [0, -6] }} placement="bottomRight">
              <span style={inlineStyle}>
                {/* <i className="anticon">
                  {LanguageMap[lng]?.icon || <GlobalOutlined style={{ width: 14, height: 14 }} />}
                  &nbsp;{LanguageMap[lng]?.label || 'English'}&nbsp;
                  <SelectSuffixIcon opacity={0.6} style={{ width: 14 }} />
                </i> */}
                <img src="/img/lang_icon.png" width={30} height={30} />
              </span>
            </Dropdown>
          </div>
        </div>
      }
      wapComponent={
        <Picker
          allowClear={false}
          options={pickerOptions}
          style={{ paddingLeft: 10, paddingRight: 10, width: 140 }}
          value={[lng]}
          onConfirm={(value, option) => {
            setLng(value?.[0])
          }}
          renderLabel={(item) => {
            const localeObj = LanguageMap[item.value]
            return (
              <div className="flex items-center">
                <span className="w-[20px] h-[20px]">{localeObj.icon || '🌐'}</span>
                <span className="text-sub pl-1">{item.label}</span>
              </div>
            )
          }}
          renderSelectItem={({ items, selectedLabel, selectedValue }) => {
            const localeObj = LanguageMap[selectedValue as string]
            return (
              <div className="flex items-center">
                <span className="w-[20px] h-[20px]">{localeObj.icon || '🌐'}</span>
                <span className="text-sub pl-1">{selectedLabel}</span>
              </div>
            )
          }}
        />
      }
    />
  )
}
