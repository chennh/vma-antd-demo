import * as types from './types'
import { RouterWrapper } from '@/utils'

export default new RouterWrapper([{
  path: 'system',
  name: types.SYSTEM,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/system/index.vue')),
}, {
  path: 'super',
  name: types.SUPER,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/super/index.vue')),
}, {
  path: 'oem',
  name: types.OEM,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/oem/index.vue')),
}, {
  path: 'agent',
  name: types.AGENT,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/agent/index.vue')),
}])
