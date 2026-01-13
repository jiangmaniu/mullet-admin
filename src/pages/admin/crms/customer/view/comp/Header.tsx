import { FormattedMessage, getIntl } from '@umijs/max'

export default function Header({ clientInfo, clientRes }: { clientInfo: any; clientRes: any }) {
  return (
    <div className="ml-8 flex items-center bg-white rounded-[7px] p-2.5 mb-2.5">
      <img src="/img/default-avatar.png" width={50} height={50} />
      <div className="ml-5 flex-1">
        <div className="flex items-center gap-x-2 mb-2">
          <div className="text-gray font-semibold text-xl">
            {clientRes?.data?.userInfo?.realName || getIntl().formatMessage({ id: 'mt.weirenzheng' })}
          </div>
          <div className="bg-gray-180 rounded-[6px] py-[3px] px-2">
            <div className="text-gray font-medium text-[14px] leading-[18px]">UID：{clientInfo?.account}</div>
          </div>
          {/* <div className="border-gray-180 border rounded-[6px] py-[3px] px-2">
            <div className="text-gray font-semibold text-sm">
              <FormattedMessage id="mt.yonghuzubie" />
              ：testdd
            </div>
          </div> */}
        </div>
        <div className="flex items-center gap-x-5">
          {clientRes?.data?.userInfo?.phone && (
            <div>
              <span className="text-weak text-sm">
                <FormattedMessage id="mt.lianxidianhua" />：
              </span>
              <span className="text-primary text-sm">
                {clientRes?.data?.userInfo?.phoneAreaCode}
                {clientRes?.data?.userInfo?.phone}
              </span>
            </div>
          )}
          {clientRes?.data?.userInfo?.email && (
            <div>
              <span className="text-weak text-sm">
                <FormattedMessage id="mt.youxiang" />：
              </span>
              <span className="text-primary text-sm">{clientRes?.data?.userInfo?.email}</span>
            </div>
          )}
          <div>
            <span className="text-weak text-sm">
              <FormattedMessage id="mt.kaihushijian" />：
            </span>
            <span className="text-primary text-sm">{clientInfo?.createTime}</span>
          </div>
          <div>
            <span className="text-weak text-sm">
              <FormattedMessage id="mt.shangcishangxianshijian" />：
            </span>
            <span className="text-primary text-sm">{clientInfo?.lastLoginTime || '‑‑'}</span>
          </div>
          {/* <div>
            <span className="text-gray-secondary text-sm">
              <FormattedMessage id="mt.rujinshijian" />：
            </span>
            <span className="text-gray text-sm">2024-08-13 12:12:22</span>
          </div> */}
          <div>
            <span className="text-weak text-sm">
              <FormattedMessage id="mt.kaihuqudao" />：
            </span>
            <span className="text-primary text-sm">{clientInfo?.code || '‑‑'}</span>
          </div>
          <div>
            <span className="text-weak text-sm">
              <FormattedMessage id="mt.shangcishiyongshebeixitong" />：
            </span>
            <span className="text-primary text-sm">{clientInfo?.lastEquipment || '‑‑'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
