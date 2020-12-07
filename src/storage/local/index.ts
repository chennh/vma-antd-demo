import {
  LocalItem
} from 'vma-assist/dist/static/js/tools/storage'
import * as names from './names'
import { LoginTypeEnum } from '@/constants'

/*
    property
      name        [String] 名称
      encrypt     [Boolean] 存储时是否加密
      namespace   [String|Function] 命名空间，存储时会添加命名空间
    method
      set(data)             [any] 存储数据
      get()                 [void]  取数据
      setByNamespace(data)  [any] 添加命名空间存储数据
      getByNamespace()      [void]  读取命名空间下的数据
      setJSON(data)         [JSONObject]  存储json
      getJSON()             [void] 取json
      remove()              [void]  删除存储的数据
 */

// 登录页-记住我
export const loginRememberMeLocal = new LocalItem({
  name: names.LOGIN_REMEMBER
})
export const setLoginRememberMe = (loginType: LoginTypeEnum, data: boolean) => {
  const json = loginRememberMeLocal.getJSON()
  json[loginType] = data
  loginRememberMeLocal.setJSON(json)
}
export const getLoginRememberMe = (loginType: LoginTypeEnum) => !!loginRememberMeLocal.getJSON()[loginType]
// 登录页-最后一次登录成功的账号
export const loginAccountLocal = new LocalItem({
  name: names.LOGIN_ACCOUNT
})
export const setLoginAccount = (loginType: LoginTypeEnum, data: string) => {
  const json = loginAccountLocal.getJSON()
  json[loginType] = data
  loginAccountLocal.setJSON(json)
}
export const getLoginAccount = (loginType: LoginTypeEnum) => loginAccountLocal.getJSON()[loginType] || ''
// 登录页-登录类型
export const loginTypeLocal = new LocalItem({
  name: names.LOGIN_TYPE
})
// 登出事件广播
export const broadcastLogoutLocal = new LocalItem({
  name: names.BROADCAST_LOGOUT
})
// 登录事件广播
export const broadcastLoginLocal = new LocalItem({
  name: names.BROADCAST_LOGIN
})
