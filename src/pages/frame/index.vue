<template>
  <div style="height: 100%;">
    <a-layout class="frame">
      <a-layout-sider v-model="collapsed"
                      :trigger="null"
                      :width="180"
                      collapsible>
        <!-- logo -->
        <div class="logo">
          <img :src="loginInfo.loginLogo"
               class="logo-img">
          <img :src="loginInfo.loginLogoIcon"
               class="logo-icon">
        </div>

        <!-- 菜单 -->
        <a-menu mode="inline"
                :open-keys.sync="activeMenu.openKeys"
                :selected-keys="activeMenu.selectedKeys"
                @click="clickMenu">
          <a-sub-menu v-for="(menu) in resourceMenuList"
                      :key="menu.mid">
            <span slot="title">
              <i class="iconfont"
                 :class="menu.menuIcon" />
              <span>{{menu.title}}</span>
            </span>
            <a-menu-item v-for="child in menu.node"
                         :key="child.mid">
              {{child.title}}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <template>
            <a-icon class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)" />
            <span class="trigger-split-line"></span>
          </template>
          <FrameHeaderUser />
        </a-layout-header>
        <a-layout-content>
          <!-- 内容区域 -->
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import LocalLogo from '@/assets/images/logo.png'
import RbacResourceMenuBO from '@/api/common/v1.0/definitions/RbacResourceMenuBO'
import { frameActiveMenuSession, loginTypeLocal } from '@/storage'
import { AccountApi } from '@/api/common/v1.0/accountApi'
import { ActiveMenu } from './definitions/definition'
import { Getter } from 'vuex-class'
import { VueModule } from '@/utils'
import EventBus from '@/constants/eventBus'
import FrameHeaderUser from './components/headerUser/index.vue'
import { loginInfo } from '@/config'
import { Location } from 'vue-router'
import { LoginTypeEnum } from '@/constants'

@Component({
  components: {
    FrameHeaderUser,
  },
})
export default class Frame extends Vue {
  private collapsed: boolean = false

  @Getter
  private resourceMenuList!: RbacResourceMenuBO[]
  @Getter
  private resourceMenuMap!: Map<string, RbacResourceMenuBO>
  @Getter
  private resourceMenuMIdMap!: Map<string, RbacResourceMenuBO>
  @Getter
  private isLogined!: boolean
  @Getter
  private isSystem!: boolean

  private invalidModule = VueModule.create()
  private loginInfo = loginInfo

  // 默认打开的菜单
  private activeMenu: ActiveMenu = {
    selectedKeys: [],
    openKeys: [],
  }

  // 根据菜单name跳转到路由
  public goRouterByName(resourceUrl: string, params?: Location) {
    if (!this.resourceMenuMap.has(resourceUrl)) {
      return this.warning('菜单不存在')
    }
    this.goRouterByItem(
      this.resourceMenuMap.get(resourceUrl) as RbacResourceMenuBO,
      params
    )
  }

  // 根据菜单ID跳转到路由
  public goRouterById(resourceId: string, params?: Location) {
    if (!this.resourceMenuMIdMap.has(resourceId)) {
      return this.warning('菜单不存在')
    }
    this.goRouterByItem(
      this.resourceMenuMIdMap.get(resourceId) as RbacResourceMenuBO,
      params
    )
  }

  protected created() {
    // 监听菜单name跳转到路由
    this.$onBus(
      EventBus.Frame.goRouterByName,
      (name: string, params?: Location) => {
        this.goRouterByName(name, params)
      }
    )

    // 监听菜单ID跳转到路由
    this.$onBus(
      EventBus.Frame.goRouterById,
      (resourceId: string, params?: Location) => {
        this.goRouterById(resourceId, params)
      }
    )
  }

  // 根据菜单跳转路由
  private goRouterByItem(item: RbacResourceMenuBO, params?: Location) {
    if (!item || this.activeMenu.selectedKeys.includes(item.mid)) {
      return
    }
    const parent = this.resourceMenuMIdMap.get(
      item.parentId
    ) as RbacResourceMenuBO
    this.activeMenu.openKeys = [parent && parent.mid, item.mid]
    this.activeMenu.selectedKeys = [parent && parent.mid, item.mid]
    if (this.$route.name !== item.url) {
      params = params || {}
      params.name = item.url
      this.$router.push(params)
    }
  }

  // 当菜单发生改变时重新设置激活菜单项
  // 修改菜单时需把frameActiveMenuSession数据清除
  @Watch('resourceMenuList', {
    immediate: true,
  })
  private watchResourceMenuList(list: RbacResourceMenuBO[]) {
    const activeMenu = frameActiveMenuSession.getJSON() as ActiveMenu
    if (!activeMenu.selectedKeys || activeMenu.selectedKeys.length === 0) {
      if (list && list.length) {
        for (const menu of list) {
          if (menu.node && menu.node.length) {
            this.goRouterById(menu.node[0].mid)
            break
          }
        }
      }
    } else {
      this.goRouterById(activeMenu.selectedKeys[1])
    }
  }

  @Watch('activeMenu', {
    deep: true,
  })
  private watchActiveMenuIds(activeMenu: ActiveMenu) {
    frameActiveMenuSession.setJSON(activeMenu)
  }

  // 点击菜单
  private clickMenu(data: any) {
    this.goRouterById(data.key)
  }
}
</script>
