import * as types from './types'
import systemRouter from '../system'
import agentRouter from '../agent'
import oemRouter from '../oem'
import superRouter from '../super'
import { RouterWrapper } from '@/utils'

export default new RouterWrapper([
  {
    path: 'super',
    name: types.SUPER,
    component: () => RouterWrapper.resolveRouterComponent(import('@/pages/super/main.vue')),
    children: superRouter.routes
  },
  {
    path: 'oem',
    name: types.OEM,
    component: () => RouterWrapper.resolveRouterComponent(import('@/pages/oem/main.vue')),
    children: oemRouter.routes
  },
  {
    path: 'agent',
    name: types.AGENT,
    component: () => RouterWrapper.resolveRouterComponent(import('@/pages/agent/main.vue')),
    children: agentRouter.routes
  },
  {
    path: 'system',
    name: types.SYSTEM,
    component: () => RouterWrapper.resolveRouterComponent(import('@/pages/system/main.vue')),
    children: systemRouter.routes
  },
])
