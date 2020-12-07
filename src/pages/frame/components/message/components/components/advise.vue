<template>
  <div class="advise"
       ref="advise">
    <vma-empty class="pt-30"
               v-show="!table.list.length" />
    <div class="advise-item"
         v-for="v in table.list"
         :key="v.id"
         v-show="table.list.length"
         @click="handle(v)">
      <div class="advise-item-main">
        {{v.message}}
        <a-button type="link"
                  size="small">点此处理</a-button>
      </div>
      <div class="advise-item-time">{{formatDate(v.createTime)}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import EventBus from '@/constants/eventBus'
import { IndexMixin } from '@/mixins'
import { mixins } from 'vue-class-component'
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import { NoticeApi } from '@/api/common/v1.0/noticeApi'
import { formatDate } from '@/utils'
import NoticeLogBO from '@/api/common/v1.0/definitions/NoticeLogBO'
import { hasMenuPermission } from '@/router'
import * as systemTypes from '@/router/system/types'
import RbacResourceMenuBO from '@/api/common/v1.0/definitions/RbacResourceMenuBO'
import { Getter, Mutation } from 'vuex-class'
import * as mutationTypes from '@/store/mutationTypes'

@Component
export default class FrameMessageBoxAdvise extends mixins(IndexMixin) {
  private formatDate = formatDate

  @Getter
  private resourceMenuList!: RbacResourceMenuBO[]
  @Mutation(mutationTypes.ADD_MESSAGE_UNREAD_NOTICE)
  private addMessageCount!: (addCount?: number) => void

  protected apiPage(params: any): Promise<any> {
    return NoticeApi.noticePage(params)
  }

  protected setPage(page: any): void {
    this.pageData.total = page.total
    const adviseRef = this.$refs.advise as Vue
    if (adviseRef) {
      const adviseEl = adviseRef.$el as HTMLElement
      if (adviseEl) {
        adviseEl.scrollTop = adviseEl.scrollHeight
      }
    }
  }

  protected created() {
    this.$onBus(EventBus.FrameMessageBoxAdvise.add, (data: NoticeLogBO) =>
      this.add(data)
    )
  }

  private add(item: NoticeLogBO) {
    this.table.list.unshift(item)
    this.addMessageCount()
  }

  private goResourceMenu(
    routerName: string,
    routerTitle: string,
    params?: any
  ) {
    if (!hasMenuPermission(routerName, this.resourceMenuList)) {
      return this.warning(`没有${routerTitle}菜单权限，无法操作`)
    }
    this.$emitBus(EventBus.Frame.goRouterByName, routerName, params)
  }

  private handle(item: NoticeLogBO) {
    // 1申请加入企业      => 员工管理/加入申请
    // 2新增了多少客户    => 我跟进的客户
    // 3客户即将被回收    => 我跟进的客户
    // 4需要协助跟进 ...  => 我协助的客户
    switch (item.type) {
      case 1:
        return this.goResourceMenu(systemTypes.STAFF_SETTING, '员工管理')
      case 2:
      case 3:
        return this.goResourceMenu(systemTypes.MY_CUSTOMER, '我跟进的客户')
      case 4:
        return this.goResourceMenu(
          systemTypes.ASSIGNED_CUSTOMER,
          '我协助的客户'
        )
      default:
    }
  }
}
</script>
