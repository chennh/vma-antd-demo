import {
  adminInfoSession
} from '@/storage'

// 未读消息
export interface MessageUnRead {
  // 动态
  view: number
  // 通知
  notice: number
}

export interface State {
  // 版本号
  version: string
  // 当前登录用户
  // adminInfo: LoginBO
}

export default {
  version: '1.0.0',
  // adminInfo: adminInfoSession.getJSON() as LoginBO,
}
