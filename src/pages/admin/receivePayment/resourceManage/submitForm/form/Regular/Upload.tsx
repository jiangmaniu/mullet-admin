import { PlusOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { Form, Image } from 'antd'
import { NamePath } from 'antd-mobile/es/components/form'
import React, { useEffect, useState } from 'react'

import Upload from '@/components/Base/Upload'
import { getUid } from '@/utils'
import { getSymbolIcon } from '@/utils/business'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

type IProps = {
  disabled?: boolean
  label?: React.ReactNode
  required?: boolean
  name: NamePath
  initialValues?: PaymentReceiveManage.ReceiveResourceListItem
}

const App: React.FC<IProps> = ({ disabled, label, required, name, initialValues }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const intl = useIntl()

  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (initialValues?.paymentCode) {
      setFileList(
        initialValues.paymentCode.split(',').map((item) => ({
          uid: getUid(),
          name: item,
          status: 'done',
          url: getSymbolIcon(item)
        }))
      )
    }
  }, [initialValues])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // @TODO 如果上传失败 不要加到列表中
    return setFileList(
      newFileList.map((item) => {
        if (item.response && item.response?.code !== 200) {
          item.status = 'error'
        }
        return item
      })
    )
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <>
      <Form.Item
        label={label}
        required={required}
        name={name}
        rules={[
          {
            required,
            // message: intl.formatMessage({ id: 'mt.shangchuanzhuanzhangpinzhengtupian' }),
            validator(rule, value, callback) {
              if (required && !fileList.filter((item) => item.status === 'done').length) {
                return Promise.reject(intl.formatMessage({ id: 'mt.shangchuanshoukuanma' }))
              }
              return Promise.resolve()
            }
          }
        ]}
        getValueFromEvent={normFile}
      >
        <Upload
          maxCount={1}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          disabled={disabled}
        >
          {disabled || fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </Form.Item>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </>
  )
}

export default App
