import 'react-markdown-editor-lite/lib/index.css'

import { useEmotionCss } from '@ant-design/use-emotion-css'
import MarkdownIt from 'markdown-it'
import { FormInstance } from 'rc-field-form'
import { useEffect, useRef, useState } from 'react'
import MdEditor, { Plugins } from 'react-markdown-editor-lite'

import { upload } from '@/components/Base/IconUpload/upload'

// 卸载内置插件
MdEditor.unuse(Plugins.Clear)

const mdParser = new MarkdownIt({
  html: true,
  linkify: true, // 将类似 URL 的文本自动转换为链接
  langPrefix: 'language-', // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用
  typographer: true
})

// 转化 ++1212++ => <ins>1212</ins> 下划线
mdParser.use(require('markdown-it-ins'))

type IProps = {
  value?: string
  /**表单的name */
  name?: string
  form?: FormInstance
  height?: number
  /**简洁模式 */
  simple?: boolean
}
// https://github.com/HarryChen0506/react-markdown-editor-lite/blob/40fbe8e08a5a0444f306f7614669ad08d7b8f359/docs/api.zh-CN.md
export default function MdEditorLite({ value, name, form, height = 300, simple }: IProps) {
  const [mdValue, setMdValue] = useState('')
  const mdRef = useRef(null)

  useEffect(() => {
    const formData = form?.getFieldsValue()
    if (name && formData) {
      const val = formData[name as string]
      val && setMdValue(val)
    }
  }, [form?.getFieldValue])

  useEffect(() => {
    if (value) {
      setMdValue(value)
    }
  }, [value])

  const handleImageUpload = (file: File) => {
    return new Promise(async (resolve) => {
      const res = await upload({ file })
      // @ts-ignore
      const src = res?.data?.link
      const reader = new FileReader()
      reader.onload = (data: any) => {
        // resolve(data.target.result)
        resolve(src)
      }
      reader.readAsDataURL(file)
    })
  }

  const className = useEmotionCss(() => ({
    '.custom-html-style ul': {
      listStyleType: 'disc' /* 显示小圆点 */,
      paddingLeft: '2em' /* 适当的缩进 */
    },
    '.custom-html-style ol': {
      display: 'block',
      listStyleType: 'decimal',
      marginBlockStart: '1em',
      marginBlockEnd: '1em',
      paddingInlineStart: '40px',
      unicodeBidi: 'isolate' /* 适当的缩进 */
    }
  }))

  return (
    <div className={className}>
      <MdEditor
        value={mdValue}
        style={{ height: `${height}px`, width: '100%' }}
        ref={mdRef}
        renderHTML={(text) => {
          return mdParser.render(text)
        }}
        // plugins={PLUGINS}
        config={{
          view: {
            menu: true,
            md: true,
            html: true,
            fullScreen: true,
            hideMenu: true
          },
          table: {
            maxRow: 5,
            maxCol: 6
          },
          syncScrollMode: ['leftFollowRight', 'rightFollowLeft']
        }}
        onChange={(data, e) => {
          const val = data.text
          setMdValue(val)
          name && form?.setFieldValue?.(name, val)
        }}
        onImageUpload={handleImageUpload}
        onFocus={(e) => console.log('focus', e)}
        onBlur={(e) => console.log('blur', e)}
        // https://github.com/HarryChen0506/react-markdown-editor-lite/blob/master/docs/plugin.zh-CN.md#%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8
        plugins={
          simple
            ? [
                'header',
                'font-bold',
                'font-italic',
                'font-underline',
                'font-strikethrough',
                'list-unordered',
                'list-ordered',
                'link',
                'mode-toggle',
                'full-screen'
              ]
            : [
                'header',
                'font-bold',
                'font-italic',
                'font-underline',
                'font-strikethrough',
                'list-unordered',
                'list-ordered',
                'block-quote',
                'block-wrap',
                'block-code-inline',
                'block-code-block',
                'table',
                'image',
                'link',
                'logger',
                'mode-toggle',
                'full-screen',
                'tab-insert'
              ]
        }
      />
    </div>
  )
}
