import {
  loginRespSession
} from '@/storage'
import AccountLoginResp from '../api/common/v1.0/definitions/AccountLoginResp'

export interface State {
  // 版本号
  version: string
  // 当前登录用户
  loginResp: AccountLoginResp
}

export default {
  version: '1.0.0',
  loginResp: loginRespSession.getJSON() as AccountLoginResp,
}
