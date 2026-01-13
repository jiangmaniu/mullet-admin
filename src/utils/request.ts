import type { RequestOptions } from '@umijs/max'
import { request as umiRequest } from '@umijs/max'

// 判断是否为大整数的函数
const isBigInt = (value: any): boolean => {
  return typeof value === 'number' && Math.abs(value) > Number.MAX_SAFE_INTEGER
}

// 递归遍历对象并将大整数转换为字符串，还是会出现精度丢失问题，最佳解决方案：后端传字符串到前端
const transformBigIntToString = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(transformBigIntToString)
  } else if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        isBigInt(value) ? BigInt(value as number).toString() : transformBigIntToString(value)
      ])
    )
  }
  return data
}

type IRequestOptions = RequestOptions & {
  /**启用导出功能 */
  isExport?: boolean
  getResponse?: boolean
}

// 单独封装处理错误抛出，否则每个请求都需要catch，不这样做导致在页面上报异常
export const request: typeof umiRequest = <T>(url: string, opts: IRequestOptions = { method: 'GET', isExport: false }) => {
  // 过滤 opts.params 中 value === ALL 的查询参数
  const _opt = {
    ...opts,
    params: Object.fromEntries(Object.entries(opts.params || {}).filter(([_, value]) => value !== 'ALLALL'))
  }

  if (opts?.isExport) {
    _opt.responseType = 'blob'
    _opt.getResponse = true // 获取完整响应信息
  }

  return (
    umiRequest<T>(url, _opt)
      // return umiRequest<T>(url, {
      //   ...opts,
      //   responseInterceptors: [
      //     // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
      //     [
      //       async (response) => {
      //         // transformBigInt = true , 处理大数
      //         if ((response.config as any)?.transformBigInt) {
      //           // 将大整数转换为字符串
      //           response.data = transformBigIntToString(response.data)
      //         }
      //         return response
      //       },
      //       (error) => {
      //         return Promise.reject(error)
      //       }
      //     ],
      //     ...(opts.responseInterceptors || [])
      //   ]
      // })
      .then((res) => {
        // 如果是导出，则返回响应头相关信息，解析文件名需要用到
        // @ts-ignore
        if (opts?.isExport) {
          return res
        }
        // @ts-ignore
        return { success: true, ...res }
      })
      .catch((error) => {
        // 统一处理错误不继续抛出
        const errorInfo = error?.response?.data
        const message = error.info?.message || errorInfo?.error_description || errorInfo?.error
        return {
          success: false, // 失败统一加上，方便表格消费
          errorInfo, // 业务代码返回的错误信息对象
          message,
          ...(error.info || {})
        }
      })
  )
}
