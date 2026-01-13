import { PlusOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { Form, Image, Upload } from 'antd'
import { NamePath } from 'antd-mobile/es/components/form'
import React, { useEffect, useState } from 'react'

import UploadComp from '@/components/Base/Upload'
import { getUid } from '@/utils'
import { getSymbolIcon } from '@/utils/business'
import { message } from '@/utils/message'

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
  initialValues?: DepositApprove.DepositApproveListItem
}

const App: React.FC<IProps> = ({ disabled, label, required, name, initialValues }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const intl = useIntl()

  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (initialValues?.certificateUrl) {
      setFileList(
        initialValues.certificateUrl.split(',').map((item) => ({
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
                return Promise.reject(intl.formatMessage({ id: 'mt.shangchuanpingzheng' }))
              }
              return Promise.resolve()
            }
          }
        ]}
        getValueFromEvent={normFile}
      >
        <UploadComp
          maxCount={3}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          disabled={disabled}
          // @ts-ignore
          // beforeUpload={async (file) => {
          //   // const isLt5M = file.size / 1024 / 1024 < 5
          //   // if (!isLt5M) {
          //   //   message.info(intl.formatMessage({ id: 'mt.bunengdayuxxm' }, { size: 5 }))
          //   // }
          //   // // 若返回 false 则停止上传
          //   // // beforeUpload 返回 false 时，阻止了发送请求，但还是会加到列表中去，如果要在列表中也忽略，返回 Upload.LIST_IGNORE
          //   // return isLt5M || Upload.LIST_IGNORE
          //   const res = await upload.compressor(file)
          //   // @ts-ignore
          //   const fileSize = res?.size || 0
          //   const isLt5M = fileSize / 1024 / 1024 < 5

          //   if (!isLt5M) {
          //     // 压缩后的图片不能大于5M
          //     return message.info(intl.formatMessage({ id: 'mt.bunengdayuxxm' }, { size: 5 }))
          //   }

          //   return res || Upload.LIST_IGNORE
          // }}
          // 后台暂时不用压缩图片
          beforeUpload={async (file) => {
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
              message.info(intl.formatMessage({ id: 'mt.bunengdayuxxm' }, { size: 5 }))
            }
            // // 若返回 false 则停止上传
            // // beforeUpload 返回 false 时，阻止了发送请求，但还是会加到列表中去，如果要在列表中也忽略，返回 Upload.LIST_IGNORE
            return isLt5M || Upload.LIST_IGNORE
          }}
        >
          {disabled || fileList.length >= 3 ? null : uploadButton}
        </UploadComp>
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
