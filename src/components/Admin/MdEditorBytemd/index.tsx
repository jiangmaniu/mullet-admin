import 'bytemd/dist/index.css'

import { useEmotionCss } from '@ant-design/use-emotion-css'
import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/react'
import { FormInstance } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { useEffect, useState } from 'react'

type IProps = {
  value?: string
  /**表单的name */
  name?: NamePath
  form?: FormInstance
}

const plugins = [
  gfm()
  // Add more plugins here
]

// https://github.com/HarryChen0506/react-markdown-editor-lite/blob/40fbe8e08a5a0444f306f7614669ad08d7b8f359/docs/api.zh-CN.md
export default function MdEditorBytemd({ value, name, form }: IProps) {
  const [mdValue, setMdValue] = useState('')

  useEffect(() => {
    const formData = form?.getFieldsValue()
    if (name && formData) {
      const val = formData[name as string]
      val && setMdValue(val)
    }
  }, [form?.getFieldValue])

  const className = useEmotionCss(() => ({
    '&': {
      ul: {
        listStyleType: 'disc' /* 显示小圆点 */,
        paddingLeft: '2em' /* 适当的缩进 */
      },
      ol: {
        display: 'block',
        listStyleType: 'decimal',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        paddingInlineStart: '40px',
        unicodeBidi: 'isolate' /* 适当的缩进 */
      }
    }
  }))

  return (
    <div className={className}>
      <Editor
        value={mdValue}
        plugins={plugins}
        onChange={(v: any) => {
          setMdValue(v)
        }}
      />
    </div>
  )
}
