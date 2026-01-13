import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { message } from 'antd'
import classNames from 'classnames'

import Iconfont from '@/components/Base/Iconfont'
import { getEnum } from '@/constants/enum'
import { switchAccountGroupSymbolDefault } from '@/services/api/tradeCore/accountGroup'

export const getColumns = ({ setOpen, setCurrentRow }: any): ProColumns<AccountGroup.AccountGroupSymbolPageListItem>[] => {
  const intl = useIntl()

  const options = [
    { label: <FormattedMessage id="mt.moren" />, value: true },
    { label: <FormattedMessage id="mt.zidingyi" />, value: false }
  ]

  return [
    {
      title: <FormattedMessage id="mt.symbol" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'symbols',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 120
    },
    {
      title: <FormattedMessage id="mt.morenpeizhi" />,
      dataIndex: 'config',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        return (
          <div className="flex items-center gap-6">
            {options.map((item, idx) => {
              const isActive = record.isDefault === item.value
              return (
                <div
                  className="flex items-center cursor-pointer"
                  onClick={async () => {
                    // 如果是默认配置，则点击“自定义”后，自动弹窗编辑，保存后再切换到自定义配置
                    if (record.isDefault && !isActive) {
                      setOpen(true)
                      setCurrentRow(record)
                      return
                    }
                    // 防止重复点击
                    if (isActive) return
                    message.loading(intl.formatMessage({ id: 'mt.qiehuanzhong' }))
                    const res = await switchAccountGroupSymbolDefault({
                      isDefault: !record.isDefault,
                      id: record.id as number
                    })
                    message.destroy()

                    if (res.success) {
                      action?.reload()
                    }
                  }}
                  key={idx}
                >
                  <Iconfont
                    name={isActive ? 'gouxuan-xuanzhong' : 'a-gouxuanwei'}
                    width={18}
                    height={18}
                    color={isActive ? 'var(--color-brand-primary)' : ''}
                  />
                  <span className="text-sm text-primary pl-[6px]">{item.label}</span>
                </div>
              )
            })}
          </div>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.dianchamoshi" />,
      dataIndex: 'spreadMode',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        const isDefault = record.isDefault // 默认，编辑按钮禁用
        // @ts-ignore
        const spreadMode: any = record?.symbolConf?.spreadConf?.type
        // @ts-ignore
        const spreadModeText = {
          fixed: <FormattedMessage id="mt.gudingdiancha" />,
          float: <FormattedMessage id="mt.fudongdiancha" />
        }[spreadMode]

        return (
          <span className={classNames('text-sm font-medium', isDefault ? '!text-gray-400' : '!text-gray')}>{spreadModeText || '‑‑'}</span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyixuke" />,
      dataIndex: 'tradeLicense',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      // valueEnum: getEnum().Enum.TradeLicense,
      renderText(text, record, index, action) {
        const isDefault = record.isDefault // 默认，编辑按钮禁用
        // @ts-ignore
        const tradeLicense: any = record?.symbolConf?.tradeLicense
        return (
          <span className={classNames('text-sm font-medium', isDefault ? '!text-gray-400' : '!text-gray')}>
            {getEnum().Enum.TradeLicense[tradeLicense]?.text || '‑‑'}
          </span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.diancha" />,
      dataIndex: 'spread',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        const isDefault = record.isDefault // 默认，编辑按钮禁用
        // @ts-ignore
        const spreadConf: any = record?.symbolConf?.spreadConf
        // @ts-ignore
        const spreadMode: any = record?.symbolConf?.spreadConf?.type
        // @ts-ignore
        const spreadBuy = record?.symbolConf?.spreadConf?.[spreadMode]?.buy
        // @ts-ignore
        const spreadSell = record?.symbolConf?.spreadConf?.[spreadMode]?.sell
        const fixedText = spreadMode === 'fixed' ? spreadBuy : '' // 固定点差
        const floatText = spreadMode === 'float' ? `${spreadBuy} / ${spreadSell}` : '' // 浮动点差
        const showText = spreadMode === 'fixed' ? fixedText : floatText
        return <span className={classNames('text-sm font-medium', isDefault ? '!text-gray-400' : '!text-gray')}>{spreadBuy || '‑‑'}</span>
      }
    }
  ]
}
