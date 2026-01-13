import './index.less'

import { javascript } from '@codemirror/lang-javascript'
import { atomone } from '@uiw/codemirror-theme-atomone'
import CodeMirror from '@uiw/react-codemirror'
import { useIntl } from '@umijs/max'
import { FormInstance, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { Base64 } from 'js-base64'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { upload } from '@/components/Base/IconUpload/upload'
import { getEnv } from '@/env'
// @ts-ignore
import E from '@/libs/wangeditorV3/release/wangEditor'
import { STORAGE_GET_TOKEN, STORAGE_GET_USER_INFO } from '@/utils/storage'

import Modal from '../Modal'
import { parserHtmlCode } from '../WangEditorV5/menu/sourceMode/util'

const { TextArea } = Input

type IProps = {
  /**编辑器高度 */
  height?: number
  /**表单的name字段 */
  name?: NamePath
  /**表单实例 */
  form?: FormInstance
  /**编辑器domId 用于初始化多个实例共存 */
  domId?: string
  /**是否禁用 */
  disabled?: boolean
  /**初始化值 */
  value?: any
  onChange?: (value: any) => void
}

// v3文档版本 https://www.kancloud.cn/wangfupeng/wangeditor3/335772
export default forwardRef(({ height = 300, name, form, domId, disabled, value, onChange }: IProps, ref: any) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [codeMirrorValue, setCodeMirrorValue] = useState('')
  const [editorValue, setEditorValue] = useState('')
  const editorInstance = useRef<any>(null)
  const intl = useIntl()

  const userInfo = STORAGE_GET_USER_INFO() as User.UserInfo
  const token = STORAGE_GET_TOKEN() || ''
  const env = getEnv()

  const handleClose = () => {
    setDialogVisible(false)
    setCodeMirrorValue('')
  }

  const getAnchor = () => (domId ? `#${domId}` : '#editor')
  const getDomId = () => document.querySelector(getAnchor())

  const initEdit = () => {
    const editor = new E(getDomId())
    editor.customConfig.zIndex = 0
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon',  // 表情
      'image', // 插入图片
      'table', // 表格
      // 'video',  // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    // 将图片大小限制为 5M
    editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
    editor.customConfig.uploadFileName = 'file'
    // 将 timeout 时间改为 10s
    editor.customConfig.uploadImgTimeout = 10 * 1000
    // 上传图片时刻自定义设置 header
    editor.customConfig.uploadImgHeaders = {
      Authorization: `Basic ${Base64.encode(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`)}`,
      'Blade-Auth': `${userInfo.token_type} ${token}`
    }
    editor.customConfig.uploadImgServer = `/api/blade-resource/oss/endpoint/put-file`
    if (disabled) {
      editor.customConfig.menus = []
    }
    editor.customConfig.onchange = (html: any) => {
      setEditorValue(html)
      form?.setFieldValue?.(name, html)
      onChange?.(html)
      console.log('===html==', html)
    }
    // 自定义上传图片事件
    editor.customConfig.customUploadImg = (files: any, insert: any) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      upload({ file: files[0] }).then((res: any) => {
        if (res.success) {
          // @ts-ignore
          const imgUrl = res?.data?.link
          // 上传代码返回结果之后，将图片插入到编辑器中
          insert(imgUrl)
        }
      })
    }
    // editor.customConfig.uploadImgHooks = {
    //   before: function (xhr, editor, files) {
    //       // 图片上传之前触发
    //       // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

    //       // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
    //       // return {
    //       //     prevent: true,
    //       //     msg: '放弃上传'
    //       // }
    //   },
    //   success: function (xhr, editor, result) {
    //       // 图片上传并返回结果，图片插入成功之后触发
    //       // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //   },
    //   fail: function (xhr, editor, result) {
    //       // 图片上传并返回结果，但图片插入错误时触发
    //       // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //   },
    //   error: function (xhr, editor) {
    //       // 图片上传出错时触发
    //       // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    //   },
    //   timeout: function (xhr, editor) {
    //       // 图片上传超时时触发
    //       // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    //   },

    //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    //   customInsert: function (insertImg, result, editor) {
    //       // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    //       // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

    //       // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
    //       const imgUrl = result?.data?.link
    //       console.log('imgUrl', imgUrl)
    //       insertImg(imgUrl)

    //       // result 必须是一个 JSON 格式字符串！！！否则报错
    //   }
    // }
    editor.create()
    // if (disabled) {
    //   editor.$textElem.attr('contenteditable', false);
    // }

    initPlugins(editorInstance.current)

    editorInstance.current = editor
  }

  const initPlugins = (editor: any) => {
    E.fullscreen = {
      // editor create之后调用
      // init: function (selector: any) {
      //   const editorSelector = getAnchor()
      //   const toolbar = document.querySelector(`${editorSelector} .w-e-toolbar`);
      //   if(toolbar) {
      //     const div = document.createElement('div');
      //     div.className = 'w-e-menu';
      //     div.innerHTML = `<span class="_wangEditor_btn_fullscreen" href="###" onclick="window.wangEditor.fullscreen.toggleFullscreen(\'' + ${editorSelector} + '\')">全屏</span>`
      //     toolbar.appendChild(div);
      //   }
      // },
      // toggleFullscreen: function (selector: any) {
      //   const editorSelector = getAnchor()
      //   document.querySelector(editorSelector).toggleClass('fullscreen-editor');
      //   if (document.querySelector(editorSelector + ' ._wangEditor_btn_fullscreen').innerText == '全屏') {
      //     document.querySelector(editorSelector + ' ._wangEditor_btn_fullscreen').innerText = '退出全屏';
      //   } else {
      //     document.querySelector(editorSelector + ' ._wangEditor_btn_fullscreen').innerText = '全屏';
      //   }
      // }
    }
    // E.fullscreen.init(editorInstance.current);
    E.views = {
      init: function (editorSelector: any) {
        // console.log('editorSelector', editorSelector)
        const toolbar = document.querySelector(`${getAnchor()} .w-e-toolbar`)
        if (toolbar) {
          const div = document.createElement('div')
          div.className = 'w-e-menu'
          div.innerHTML = `<span class="_wangEditor_btn_fullscreen" href="###">
            <svg t="1748506327551" class="icon" viewBox="0 0 1152 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6169" width="14" height="14"><path d="M469.691369 1023.383271L392.092796 1000.783687c-8.399846-2.399956-13.399754-11.39979-10.999798-19.799636L662.687822 11.601867c2.399956-8.399846 11.39979-13.399754 19.799636-10.999798L760.086032 23.201654c8.399846 2.399956 13.399754 11.39979 10.999798 19.799636L489.491006 1012.383473c-2.399956 8.599842-11.199794 13.399754-19.799637 10.999798z m-166.396941-242.195548l54.399-57.998934c6.199886-6.599879 5.599897-16.999688-0.999982-22.999578L144.497346 511.99267l212.1961-188.196541c6.799875-5.99989 7.199868-16.399699 0.999982-22.999577l-54.399-57.998934c-5.99989-6.399882-16.199702-6.799875-22.599585-0.799986L5.099908 500.392883c-6.799875 6.399882-6.799875 16.999688 0 23.39957L280.694843 781.987708c6.399882 5.99989 16.399699 5.599897 22.599585-0.799985z m568.189557 0.799985l275.394938-258.195255c6.799875-6.399882 6.799875-16.999688 0-23.39957L871.483985 241.997632c-6.399882-5.99989-16.599695-5.799893-22.599585 0.799986l-54.399 57.998934c-6.199886 6.599879-5.599897 16.999688 0.999982 22.999577L1007.681482 511.99267l-212.1961 188.196541c-6.799875 5.99989-7.199868 16.399699-0.999982 22.999578l54.399 57.998934c6.199886 6.399882 16.199702 6.799875 22.599585 0.799985z" p-id="6170" fill="#515151"></path></svg>
          </span>`
          div.onclick = () => {
            // 回显内容弹出到编辑区
            setCodeMirrorValue(parserHtmlCode(editorInstance.current.txt.html()))
            setDialogVisible(true)
          }
          toolbar.appendChild(div)
        }
      }
    }
    E.views.init(getDomId())
  }

  useEffect(() => {
    initEdit()

    return () => {
      editorInstance.current?.destroy?.()
      editorInstance.current = null
    }
  }, [])

  useEffect(() => {
    // 禁用编辑器
    if (disabled && editorInstance.current) {
      setTimeout(() => {
        editorInstance.current.$textElem.attr('contenteditable', false)
      }, 100)
    }
  }, [disabled, editorInstance.current])

  useEffect(() => {
    if (value && editorInstance.current) {
      editorInstance.current.txt.html(value)
      setEditorValue(value)
    }
  }, [value, editorInstance.current])

  useEffect(() => {
    const formData = form?.getFieldsValue()
    if (name && formData) {
      const val = formData[name as string]
      if (val) {
        editorInstance.current.txt.html(val)
        setEditorValue(val)
      }
    }
  }, [form?.getFieldValue])

  return (
    <div>
      <div id={domId || 'editor'}></div>
      {dialogVisible && (
        <Modal
          title={intl.formatMessage({ id: 'mt.yuandaimabianji' })}
          open={dialogVisible}
          onCancel={handleClose}
          width={900}
          onFinish={() => {
            handleClose()
            editorInstance.current.txt.html(codeMirrorValue)
            form?.setFieldValue?.(name, codeMirrorValue)
            onChange?.(codeMirrorValue)
          }}
          styles={{ body: { padding: 0 } }}
        >
          {/* <TextArea
            value={textall}
            onChange={(e) => setCodeMirrorValue(e.target.value)}
            autoSize={{ minRows: 10, maxRows: 20 }}
            style={{
                width: '100%',
                height: 'calc(100vh - 108px)',
                resize: 'none'
            }}
          /> */}
          {/* https://github.com/uiwjs/react-codemirror */}
          <CodeMirror
            value={codeMirrorValue}
            height="500px"
            extensions={[javascript({ jsx: true })]}
            onChange={(value, viewUpdate) => setCodeMirrorValue(value)}
            theme={atomone}
          />
        </Modal>
      )}
    </div>
  )
})
