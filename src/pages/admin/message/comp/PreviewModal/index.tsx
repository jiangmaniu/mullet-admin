import { FormattedMessage } from '@umijs/max'

import Modal from '@/components/Admin/Modal'

type IProps = {
  trigger: JSX.Element
  info?: any
  title: React.ReactNode
}

export default function PreviewModal({ trigger, info, title }: IProps) {
  return (
    <Modal
      trigger={trigger}
      title={title}
      width={600}
      onFinish={() => {
        return true
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-primary text-base font-semibold">
          <FormattedMessage id="mt.biaoti" />：{info?.title}
        </span>
      </div>
      <div className="text-sm text-primary pt-4">
        <FormattedMessage id="mt.shijian" />：{info?.createTime}
      </div>
      <div className="text-primary text-base font-semibold pb-4 pt-8">
        <FormattedMessage id="mt.neirong" />
      </div>
      <div className="border border-gray-150 bg-gray-150/40 rounded-xl px-5 py-7 text-base text-primary font-semibold">{info?.content}</div>
    </Modal>
  )
}
