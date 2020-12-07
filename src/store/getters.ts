import { GetterTree, Getter } from 'vuex'
import { State } from './state'
// import RbacResourceMenuBO from '@/api/common/v1.0/definitions/RbacResourceMenuBO'
// import LoginBO from '@/api/common/v1.0/definitions/LoginBO'
import { LoginTypeEnum } from '../constants/index'

// 功能权限map
export const resourceActionMap: Getter<State, any> = (state: State) => {
  const actionMap = new Map<string, object>()
  // if (state.adminInfo && state.adminInfo.resourceActionList) {
  //   state.adminInfo.resourceActionList.forEach(action => {
  //     actionMap.set(action.code, action)
  //   })
  // }
  return actionMap
}
// 菜单权限map
export const resourceMenuMap: Getter<State, any> = (state: State) => {
  const menuMap = new Map<string, object>()
  // if (state.adminInfo && state.adminInfo.resourceMenuList) {
  //   function loopMenu(menuList: RbacResourceMenuBO[]) {
  //     menuList.forEach(menu => {
  //       menuMap.set(menu.url, menu)
  //       if (menu.node && menu.node.length) {
  //         loopMenu(menu.node)
  //       }
  //     })
  //   }
  //   loopMenu(state.adminInfo.resourceMenuList)
  // }
  return menuMap
}

// 菜单权限mid map
export const resourceMenuMIdMap: Getter<State, any> = (state: State) => {
  const menuMap = new Map<string, object>()
  // if (state.adminInfo && state.adminInfo.resourceMenuList) {
  //   function loopMenu(menuList: RbacResourceMenuBO[]) {
  //     menuList.forEach(menu => {
  //       menuMap.set(menu.mid, menu)
  //       if (menu.node && menu.node.length) {
  //         loopMenu(menu.node)
  //       }
  //     })
  //   }
  //   loopMenu(state.adminInfo.resourceMenuList)
  // }
  return menuMap
}

// 当前登录用户信息
export const loginStaff: Getter<State, any> = (state: State) => {
  // const adminInfo = state.adminInfo as LoginBO
  // if (!adminInfo) {
  //   return {}
  // }
  // if (adminInfo.type === LoginTypeEnum.SYSTEM) {
  //   return adminInfo.loginStaffBo || {}
  // }
  // return adminInfo.platformAccountBo || {}
}

// 当前登录菜单权限
export const resourceMenuList: Getter<State, any> = (state: State) => {
  // return state.adminInfo && state.adminInfo.resourceMenuList || []
}

// 当前登录菜单权限
export const resourceActionList: Getter<State, any> = (state: State) => {
  // return state.adminInfo && state.adminInfo.resourceActionList || []
}


const getterTree: GetterTree<State, any> = {
  resourceActionMap,
  resourceMenuMap,
  resourceMenuMIdMap,
  loginStaff,
  resourceActionList,
  resourceMenuList,
}

export default getterTree

