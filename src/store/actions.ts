import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import * as actionTypes from './actionTypes'
import * as mutationTypes from './mutationTypes'
import {
  loginRespSession,
  frameActiveMenuSession,
  macKeyCookie,
  broadcastLogoutLocal,
  loginTypeLocal,
} from '@/storage'
import {
  redirectToLogin
} from '@/router'
import {
  message
} from 'ant-design-vue'
import { AccountApi } from '@/api/common/v1.0/accountApi'

type LoginBO = any
const actions: ActionTree<State, any> = {
  // 登录后处理
  [actionTypes.AFTER_LOGIN]: (
    { commit }: ActionContext<State, any>,
    data: LoginBO) => {
    commit(mutationTypes.SET_LOGIN_RESP, data)
    loginRespSession.setJSON(data)
    macKeyCookie.set(data.macKey)
    loginTypeLocal.set(String(data.type))
  },
  // 登出后处理
  [actionTypes.AFTER_LOGOUT]: (
    { commit }: ActionContext<State, any>
  ) => {
    commit(mutationTypes.SET_LOGIN_RESP, {})
    loginRespSession.remove()
    frameActiveMenuSession.remove()
    macKeyCookie.remove()
  },
  // 登出
  [actionTypes.LOGOUT]: (
    { dispatch }: ActionContext<State, any>,
    silence = false) => {
    dispatch(actionTypes.LOGOUT_BROADCAST, silence).then(() => {
      // 触发其他TAB的登出
      broadcastLogoutLocal.random()
    })
  },
  // 登出广播
  [actionTypes.LOGOUT_BROADCAST]: (
    { dispatch }: ActionContext<State, any>,
    silence = true) => {
    // 登出不论成功失败强制执行
    return AccountApi.logout({ errorHandle: false }).finally(() => {
      if (!silence) {
        message.success('登出成功')
      }
      dispatch(actionTypes.AFTER_LOGOUT)
      redirectToLogin()
    })
  },
  // 重新获取登录用户信息
  [actionTypes.REGET_LOGIN_RESP]: (
    { dispatch }: ActionContext<State, any>) => {
    return AccountApi.getCurrent().then(data => {
      dispatch(actionTypes.AFTER_LOGIN, data)
      return data
    })
  }
}

export default actions
