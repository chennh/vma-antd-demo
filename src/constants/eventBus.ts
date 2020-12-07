let index = 1

const getIndex = (name: string = 'index') => `EventBus-${name}-${index++}`

const EventBus = {
  // 框架层
  Frame: {
    // 退出登录
    logout: getIndex('logout'),
    // 根据菜单name跳转到路由
    goRouterByName: getIndex('goRouterByName'),
    // 根据菜单ID跳转到路由
    goRouterById: getIndex('goRouterById'),
  },
}

export default EventBus
