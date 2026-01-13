/**
 * 移除HTML内容中的@media查询
 * @param content HTML内容
 * @returns 处理后的HTML内容
 */
export const removeMediaQueries = (content: string): string => {
  if (!content) return ''

  // 使用正则表达式匹配并移除@media查询
  return content.replace(/@media[^{]*{[^}]*}/g, '')
}

/**
 * 移除HTML内容中特定容器的width属性
 * @param content HTML内容
 * @param className 要处理的类名
 * @returns 处理后的HTML内容
 */
export const removeContainerWidth = (content: string, className = 'container'): string => {
  if (!content) return ''

  // 匹配指定类名的CSS规则中的width属性
  const regex = new RegExp(`\\.${className}\\s*{[^}]*width\\s*:\\s*[^;]+;`, 'g')

  // 移除width属性
  return content.replace(regex, (match) => {
    return match.replace(/width\s*:\s*[^;]+;/, '')
  })
}

/**
 * 判断内容是否包含HTML标签
 * @param content 内容
 * @returns 是否包含HTML标签
 */
export const containsHTMLStrict = (content: string): boolean => {
  // 匹配任何HTML标签（包括自闭合标签）
  const strictHtmlRegex = /<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/i
  return strictHtmlRegex.test(content)
}
