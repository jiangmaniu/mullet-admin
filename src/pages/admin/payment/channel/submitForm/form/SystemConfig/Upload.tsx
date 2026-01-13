import { UploadOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'
import type { UploadProps } from 'antd'
import { Button, Form, message, Upload } from 'antd'
import React from 'react'

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text'
  },
  multiple: true, // 上传多个文件
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
}

const App: React.FC = () => {
  const intl = useIntl()
  return (
    <Form.Item label={intl.formatMessage({ id: 'mt.miyaowenjian' })} required>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>{intl.formatMessage({ id: 'mt.shangchuanmiyaowenjian' })}</Button>
      </Upload>
    </Form.Item>
  )
}

export default App
