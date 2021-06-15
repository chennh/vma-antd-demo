import * as types from './mutationTypes'
import { State } from './state'
import AccountLoginResp from '@/api/common/v1.0/definitions/AccountLoginResp'

export default {
  [types.DEMO](state: State, version: string) {
    state.version = version
  },
  [types.SET_LOGIN_RESP](state: State, data: AccountLoginResp) {
    state.loginResp = data
  },
}
