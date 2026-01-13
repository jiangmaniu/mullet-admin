import { Upload as AntdUpload, UploadProps } from 'antd'
import { Base64 } from 'js-base64'
import React from 'react'

import { getEnv } from '@/env'
import { STORAGE_GET_TOKEN, STORAGE_GET_USER_INFO } from '@/utils/storage'

type IProps = UploadProps & {
  children?: React.ReactNode
}

export default function Upload({ children, ...res }: IProps) {
  const userInfo = STORAGE_GET_USER_INFO() as User.UserInfo
  const token = STORAGE_GET_TOKEN() || ''
  const ENV = getEnv()

  return (
    <AntdUpload
      action="/api/blade-resource/oss/endpoint/put-file"
      headers={{
        Authorization: `Basic ${Base64.encode(`${ENV.CLIENT_ID}:${ENV.CLIENT_SECRET}`)}`,
        'Blade-Auth': `${userInfo.token_type} ${token}`
      }}
      accept="image/png, image/jpeg, image/jpg, image/gif,image/webp"
      {...res}
    >
      {children}
    </AntdUpload>
  )
}
