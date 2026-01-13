import { useTheme } from '@/context/themeProvider'

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme()
  const themes = ['default', 'red', 'green']
  // return (
  //   <div className="flex items-center gap-x-3">
  //     {themes.map((item: any, idx) => (
  //       <div
  //         className="text-red text-xs cursor-pointer"
  //         onClick={() => {
  //           setTheme(item)
  //         }}
  //         key={idx}
  //       >
  //         {item}
  //       </div>
  //     ))}
  //   </div>
  // )
  return null
}
