// @ts-ignore 格式化html
import parserHtml from 'prettier/parser-html'
// @ts-ignore 代码格式化工具
import prettier from 'prettier/standalone'

import SourceMenu from './sourceMenu'

/**
 * 在编辑器中得到的html源码是没有格式的html字符串
 * 所以需要格式化展示代码
 * 格式化html代码
 * @param code
 */
export const parserHtmlCode = (code: string): string => {
  try {
    return prettier.format(code, {
      parser: 'html',
      plugins: [parserHtml],
      // 格式化的标签不换行 例如span标签等>格式化后会换行
      htmlWhitespaceSensitivity: 'ignore'
    })
  } catch (e) {
    console.error('格式化代码错误', e)
    return code
  }
}

/**
 * 将编辑器html转换为代码块内容
 * @param html
 */
export const parseEditorCode = (html: string) => {
  let code = html.replace(/&nbsp;/g, '').replace(new RegExp('<p><br></p>', 'g'), '')
  let data = parserHtmlCode(code).trim()
  let textCode = data.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;')
  return `<pre><code class="language-html">${textCode}</code></pre>`
}

/**
 * 将代码块转换为编辑器html
 * @param preCode 代码块
 */
export const parseCodeEditor = (preCode: string) => {
  // 转码
  let data = encodeURI(preCode)
  // 将&nbsp;转换为空格
  data = data.replace(/%C2%A0/g, '%20')
  // 解码
  data = decodeURI(data)
  let htmlStr = data
    .replace('<pre><code class="language-html">', '')
    .replace('</code></pre>', '')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
  return htmlStr.replace(new RegExp('\\n', 'g'), '').replace(new RegExp('<p><br></p>', 'g'), '').trim()
}

export const sourceConf = {
  // 工具栏中的唯一key
  key: 'source',
  // 组件
  factory: () => new SourceMenu()
}
