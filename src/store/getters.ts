import { GetterTree, Getter } from 'vuex'
import { State } from './state'
import RbacResourceMenuBO from '@/api/common/v1.0/definitions/RbacResourceMenuBO'

// 功能权限map
export const resourceActionMap: Getter<State, any> = (state: State) => {
  const actionMap = new Map<string, object>()
  if (state.loginResp && state.loginResp.accountBo.resourceActionList) {
    state.loginResp.accountBo.resourceActionList.forEach(action => {
      actionMap.set(action.code, action)
    })
  }
  return actionMap
}
// 菜单权限map
export const resourceMenuMap: Getter<State, any> = (state: State) => {
  const menuMap = new Map<string, object>()
  if (state.loginResp && state.loginResp.accountBo.resourceMenuList) {
    function loopMenu(menuList: RbacResourceMenuBO[]) {
      menuList.forEach(menu => {
        menuMap.set(menu.url, menu)
        if (menu.node && menu.node.length) {
          loopMenu(menu.node)
        }
      })
    }
    loopMenu(state.loginResp.accountBo.resourceMenuList)
  }
  return menuMap
}

// 菜单权限mid map
export const resourceMenuMIdMap: Getter<State, any> = (state: State) => {
  const menuMap = new Map<string, object>()
  if (state.loginResp && state.loginResp.accountBo.resourceMenuList) {
    function loopMenu(menuList: RbacResourceMenuBO[]) {
      menuList.forEach(menu => {
        menuMap.set(menu.mid, menu)
        if (menu.node && menu.node.length) {
          loopMenu(menu.node)
        }
      })
    }
    loopMenu(state.loginResp.accountBo.resourceMenuList)
  }
  return menuMap
}

// 当前登录菜单权限
export const resourceMenuList: Getter<State, any> = (state: State) => {
  return state.loginResp && state.loginResp.accountBo.resourceMenuList || []
}

// 当前登录功能权限
export const resourceActionList: Getter<State, any> = (state: State) => {
  return state.loginResp && state.loginResp.accountBo.resourceActionList || []
}


const getterTree: GetterTree<State, any> = {
  resourceActionMap,
  resourceMenuMap,
  resourceMenuMIdMap,
  resourceActionList,
  resourceMenuList,
}

export default getterTree

