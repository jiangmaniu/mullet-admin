import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

import { formatNum } from '../..'
import DashboardCardBody from '../DashboardCardBody'

export default () => {
  return (
    <div className=" lg:grid-cols-3 grid-cols-1 grid gap-4 ">
      <ProCard bordered hoverable ghost={true} style={{ borderRadius: 12, minWidth: 260 }}>
        <DashboardCardBody
          backgroundImage="url(/img/xinzengyonghu.png)"
          title={<FormattedMessage id="mt.xinzengyonghu" />}
          bottomLeftValue={12341}
          total={'112'}
        />
      </ProCard>
      <ProCard bordered hoverable ghost={true} style={{ borderRadius: 12, minWidth: 260 }}>
        <DashboardCardBody
          backgroundImage="url(/img/shoucirujin.png)"
          title={<FormattedMessage id="mt.xinzengshoucirujinkehu" />}
          bottomLeftValue={12341}
          total={6644}
        />
      </ProCard>
      <ProCard bordered hoverable ghost={true} style={{ borderRadius: 12, minWidth: 260 }}>
        <DashboardCardBody
          backgroundImage="url(/img/dangrirujin.png)"
          title={<FormattedMessage id="mt.dangrirujinzonge" />}
          color="black"
          bottomLeftValue={formatNum(12341, {
            precision: 2
          })}
          total={`$${formatNum(12341, {
            precision: 2
          })}`}
        />
      </ProCard>
    </div>
  )
}
