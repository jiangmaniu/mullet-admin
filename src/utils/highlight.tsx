// 高亮文本函数
export const highlightText = (text: string, searchValue: string) => {
  if (!searchValue || !text) return text
  const index = text.indexOf(searchValue)
  if (index === -1) return text
  const beforeStr = text.substring(0, index)
  const matchStr = text.substring(index, index + searchValue.length)
  const afterStr = text.substring(index + searchValue.length)
  return (
    <>
      {beforeStr}
      <span style={{ color: '#f50', backgroundColor: '#ffd591' }}>{matchStr}</span>
      {afterStr}
    </>
  )
}
