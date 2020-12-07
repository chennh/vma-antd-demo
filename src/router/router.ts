import * as types from './types'
import commonRouter from './common'
import loginRouter from './login'
import frameRouter from './frame'
import { RouterWrapper } from '@/utils'

export default new RouterWrapper([
  ...commonRouter.routes,
  {
    path: '/login',
    name: types.LOGIN,
    component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/main.vue')),
    children: loginRouter.routes
  },
  {
    path: '/',
    name: types.FRAME,
    component: () => RouterWrapper.resolveRouterComponent(import('@/pages/frame/index.vue')),
    children: frameRouter.routes,
  },
  {
    path: '*',
    redirect: '/login'
  }
])
