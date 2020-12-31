import Vue from 'vue'
import VueRouter from 'vue-router'
import commonRouterWrapper from './common'
import loginRouterWrapper from './login'
import frameRouterWrapper from './frame'
import routerWrapper from './router'
import * as types from './types'
import * as commonTypes from './common/types'
import { adminInfoSession, adminInfoSessionHasData } from '@/storage'
import { RouterWrapper } from '@/utils'
import store from '@/store'
import * as actionTypes from '@/store/actionTypes'
import { message } from 'ant-design-vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routerWrapper.routes
})

/**
 * 重定向到主页
 *
 * @export
 */
export function redirectToHome() {
  router.push({ name: types.FRAME })
}

/**
 * 重定向到登录页
 *
 * @export
 */
export function redirectToLogin() {
  router.push({ name: types.LOGIN })
}

/**
 * 重定向到维护中页面
 *
 * @export
 */
export function redirectToCommonMaintain() {
  router.push({
    name: commonTypes.MAINTAIN
  })
}

/**
 * 根据路由名称是否需要重定向到登录页
 * @param routerName
 */
export function shouldRedirectToLogin(routerName: string | null | undefined) {
  return types.LOGIN !== routerName &&
    !commonRouterWrapper.isRouter(routerName) &&
    !loginRouterWrapper.isRouter(routerName)
}

/**
 * 是否拥有菜单权限
 * @param {*} routerName
 * @param {*} params
 */
const excludedMenuList: any[] = []
export function hasMenuPermission(routerName: string | null | undefined, params: any[]): boolean {
  if (routerName &&
    !commonRouterWrapper.isRouter(routerName) &&
    !routerWrapper.isRouter(routerName) &&
    !frameRouterWrapper.isRouter(routerName) &&
    !excludedMenuList.includes(routerName) &&
    params && params.length) {
    return params.some(menu => {
      if (menu.url === routerName) {
        return true
      } else if (menu.node && menu.node.length) {
        return hasMenuPermission(routerName, menu.node)
      }
    })
  }
  return true
}

router.beforeEach(async (to, from, next) => {

  // /**
  //  * 重定向到登录页或进入下一个路由
  //  *
  //  * @returns
  //  */
  // function redirectToLoginOrNext() {
  //   // 用户未登录
  //   if (shouldRedirectToLogin(to.name)) {
  //     return redirectToLogin()
  //   } else {
  //     return next()
  //   }
  // }

  // // 已登录
  // if (adminInfoSessionHasData()) {
  //   const adminInfo = adminInfoSession.getJSON() as LoginBO

  //   // 企业账号登录，且
  //   // 1. 没有企业
  //   // 2. 企业信息未完善
  //   // 3. 企业待审核
  //   if (isSystem(adminInfo) &&
  //     (!hasEnterprise(adminInfo) || !isEnterpriseComplete(adminInfo) || isEnterprisePendingAudit(adminInfo))) {
  //     return redirectToLoginOrNext()
  //   }

  //   // 需要重定向到后台首页
  //   // 1、前往的是登录页
  //   if (loginRouterWrapper.isRouter(to.name)) {
  //     return redirectToHome()
  //   }

  //   // 2、没有菜单权限
  //   // 3、前往的后台地址和当前登录类型不匹配
  //   if (!hasMenuPermission(to.name, adminInfo.resourceMenuList) ||
  //     !RouterWrapper.isRouterExists(to.name)) {
  //     message.warn('没有当前菜单权限')
  //     return redirectToHome()
  //   }
  //   return next()
  // } else {
  //   try {
  //     // 用户未登录
  //     // 同步一次服务端用户数据，确认是否未登录，以服务端用户数据为准
  //     const data = await AccountApi.menuList({ loading: false, errorHandle: false })
  //     if (data && data.macKey) {
  //       store.dispatch(actionTypes.AFTER_LOGIN, data)

  //       // 企业账号登录，且
  //       // 1. 没有企业
  //       // 2. 企业信息未完善
  //       // 3. 企业待审核
  //       if (isSystem(data) &&
  //         (!hasEnterprise(data) || !isEnterpriseComplete(data) || isEnterprisePendingAudit(data))) {
  //         return redirectToLoginOrNext()
  //       }

  //       if (loginRouterWrapper.isRouter(to.name)) {
  //         return redirectToHome()
  //       }
  //       return next()
  //     } else {
  //       return redirectToLoginOrNext()
  //     }
  //   } catch (e) {
  //     return redirectToLoginOrNext()
  //   }
  // }
  next()
})

router.afterEach(route => {
  window.scrollTo(0, 0)
})

export default router
