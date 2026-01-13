import { FormattedMessage } from '@umijs/max'
import { Image } from 'antd'

import Modal from '@/components/Admin/Modal'
import { getSymbolIcon } from '@/utils/business'

type IProps = {
  trigger: JSX.Element
  imgs: string[]
}

export default function PreviewImgModal({ trigger, imgs }: IProps) {
  console.log('imgs', imgs)
  return (
    <Modal title={<FormattedMessage id="mt.chakanpingzheng" />} width={500} trigger={trigger} hiddenSubmitter>
      <Image.PreviewGroup
      // preview={{
      //   onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
      // }}
      >
        {(imgs || []).map((item) => (
          <Image width={120} height={120} src={getSymbolIcon(item)} key={item} />
        ))}
      </Image.PreviewGroup>
    </Modal>
  )
}
