import { notification } from 'antd'
import { createContext, useContext } from 'react'

interface IProps {
  children: JSX.Element
}

type ProviderType = {
  api: any
}

const Context = createContext<ProviderType>({} as ProviderType)

export const NotificationProvider = ({ children }: IProps) => {
  const [api, contextHolder] = notification.useNotification()

  const exposed = {
    api
  }

  // 配置全局通知
  notification.config({
    top: 50
  })

  return (
    <Context.Provider value={exposed}>
      <>
        {children}
        {contextHolder}
      </>
    </Context.Provider>
  )
}

export const useNotification = () => useContext(Context)
