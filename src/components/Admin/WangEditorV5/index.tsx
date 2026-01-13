import '@wangeditor/editor/dist/css/style.css'

import { useIntl } from '@umijs/max'
import { Boot, DomEditor, i18nChangeLanguage, IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { FormInstance } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { Base64 } from 'js-base64'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { upload } from '@/components/Base/IconUpload/upload'
import { getEnv } from '@/env'
import { STORAGE_GET_TOKEN, STORAGE_GET_USER_INFO } from '@/utils/storage'

import { parseCodeEditor, parseEditorCode, sourceConf } from './menu/sourceMode/util'

type IProps = {
  /**编辑器高度 */
  height?: number
  /**编辑器样式 */
  editorStyle?: React.CSSProperties
  /**Toolbar样式 */
  toolbarStyle?: React.CSSProperties
  /**表单的name字段 */
  name?: NamePath
  /**表单实例 */
  form?: FormInstance
  /**编辑器模式：简洁、默认 */
  mode?: 'simple' | 'default'
}
export default forwardRef(({ mode, height = 300, editorStyle, toolbarStyle, name, form }: IProps, ref: any) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [forceUpdate, setForceUpdate] = useState(0) // 用于触发重新渲染的 key
  const intl = useIntl()

  const toolbar = DomEditor.getToolbar(editor as IDomEditor)

  useImperativeHandle(ref, () => {
    return editor
  })

  // 编辑器内容
  const [html, setHtml] = useState('')

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    // 排除的工具栏菜单
    excludeKeys: [
      'codeBlock',
      'insertVideo',
      'fullScreen'
      // 'justifyLeft',
      // 'justifyCenter',
      // 'justifyRight'
    ],
    // 添加自定义菜单
    insertKeys: {
      index: 24,
      keys: ['source']
    }
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: intl.formatMessage({ id: 'common.pleaseInput' }),
    MENU_CONF: {}
  }

  // https://www.wangeditor.com/v5/getting-started.html

  const userInfo = STORAGE_GET_USER_INFO() as User.UserInfo
  const token = STORAGE_GET_TOKEN() || ''
  const env = getEnv()

  // @ts-ignore
  editorConfig.MENU_CONF['uploadImage'] = {
    server: '/api/blade-resource/oss/endpoint/put-file',
    timeout: 10 * 1000, // 10s
    fieldName: 'file',
    // meta: {a:1},
    // metaWithUrl: true, // join params to url
    headers: {
      Authorization: `Basic ${Base64.encode(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`)}`,
      'Blade-Auth': `${userInfo.token_type} ${token}`
    },

    maxFileSize: 5 * 1024 * 1024, // 5M

    // base64 插入图片：小于该值就插入 base64 格式（而不上传），默认为 0
    base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb

    // 上传之前触发
    onBeforeUpload(file: File) {
      console.log('onBeforeUpload', file)

      return file // will upload this file
      // return false // prevent upload

      // 可以 return
      // 1. return file 或者 new 一个 file ，接下来将上传
      // 2. return false ，不上传这个 file
    },
    // 上传进度的回调函数
    onProgress(progress: number) {
      console.log('onProgress', progress)
    },
    // 单个文件上传成功之后
    onSuccess(file: File, res: any) {
      console.log('onSuccess', file, res)
    },
    onFailed(file: File, res: any) {
      // alert(res.message)
      console.log('onFailed', file, res)
    },
    onError(file: File, err: any, res: any) {
      // alert(err.message)
      console.error('onError', file, err, res)
    },
    // https://www.wangeditor.com/v5/menu-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%9F%E8%83%BD
    // 自定义插入图片
    // customInsert(res: any, insertFn: any) {
    //   // TS 语法
    //   // customInsert(res, insertFn) {                  // JS 语法
    //   // res 即服务端的返回结果

    //   // 从 res 中找到 url alt href ，然后插入图片
    //   insertFn(url, alt, href)
    // },
    // 定义上传图片
    async customUpload(file: File, insertFn: any) {
      const res = await upload({ file })
      // @ts-ignore
      const src = res?.data?.link

      return new Promise((resolve) => {
        // Simulate async insert image
        insertFn(src, 'mullet', src)
        resolve('ok')
      })
    }
    // customBrowseAndUpload(insertFn) {
    //   alert('Custom browse and upload')

    //   // Simulate async insert image
    //   setTimeout(() => {
    //     const src = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
    //     insertFn(src, 'baidu logo', src) // insert a image
    //   }, 500)
    // },
  }

  useEffect(() => {
    const formData = form?.getFieldsValue()
    if (name && formData) {
      const val = formData[name as string]
      val && setHtml(val)
      setForceUpdate((prevKey) => prevKey + 1)
    }
  }, [form?.getFieldValue])

  // 及时销毁 editor ，重要！
  useEffect(() => {
    i18nChangeLanguage('en')
    return () => {
      if (editor === null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  // console.log('toolbar.getConfig().toolbarKeys', toolbar?.getConfig().toolbarKeys)

  const onCreated = (editor: IDomEditor) => {
    /*
     * 在组件创建时初始化注册菜单，注意菜单不可以重复注册否则会报异常
     * Unhandled Rejection (Error): Duplicated key 'source' in menu items
     */
    if (!editor.getAllMenuKeys().includes('source')) {
      Boot.registerMenu(sourceConf)
    }
    setEditor(editor)
    // 源码菜单点击监听事件
    editor?.on('clickSource', (active) => clickSource(active, editor))
  }

  /**
   * 源码点击
   * @param active 菜单是否点击
   * @param editor 编辑器内容
   */
  const clickSource = (active: boolean, editor: IDomEditor) => {
    let value = editor.getHtml()
    // 先将编辑器内容清空
    editor.clear()
    console.log('value', value)
    if (active) {
      // 将html代码转换为html代码块 dangerouslyInsertHtml是插入html不是重置html，如果使用setHtml也会报节点异常
      editor.dangerouslyInsertHtml(parseEditorCode(value))
    } else {
      // 将html代码块转换为editor的html
      editor.dangerouslyInsertHtml(parseCodeEditor(value))
    }
  }

  return (
    <>
      <div className="!rounded-2xl z-50 border border-gray-150">
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode={mode || 'simple'}
          style={{ borderBottom: '1px solid #efefef', ...toolbarStyle }}
        />
        <Editor
          defaultConfig={{
            ...editorConfig
          }}
          value={html}
          onCreated={onCreated}
          onChange={(editor) => {
            const val = editor.getHtml()
            setHtml(val)
            // 设置表单值
            form?.setFieldValue?.(name, val)
          }}
          mode={mode || 'simple'}
          style={{ height, overflowY: 'hidden', ...editorStyle }}
        />
      </div>
    </>
  )
})
