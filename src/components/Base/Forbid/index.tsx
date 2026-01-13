import { Result } from 'antd'

import Nav from '@/components/Admin/Header/Nav'
import { push } from '@/utils/navigator'

import Button from '../Button'

/**
 * 自定义403无权限访问页面
 * @returns
 */
export default function Forbid() {
  return (
    <div>
      <Nav position="Forbid" />
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => push('/')}>
            Back Home
          </Button>
        }
        style={{ marginTop: 200 }}
      />
    </div>
  )
}
