import * as types from './types'
import { RouterWrapper } from '@/utils'

export default new RouterWrapper([{
  path: 'super',
  name: types.SUPER,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/super/index.vue')),
}, {
  path: 'operations_center',
  name: types.OPERATIONS_CENTER,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/operationsCenter/index.vue')),
}])
