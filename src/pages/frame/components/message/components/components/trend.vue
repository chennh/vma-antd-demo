<template>
  <div class="trend"
       v-scroll="scrollPage"
       ref="trend">
    <vma-empty class="pt-30"
               v-show="!table.list.length" />
    <div class="trend-item"
         v-for="v in table.list"
         :key="v.id"
         v-show="table.list.length"
         @click="showDetail(v.customerId)">
      <div class="trend-avatar">
        <a-avatar :size="30"
                  :src="v.customerAvator">{{v.wxNick | lastChar}}</a-avatar>
      </div>
      <div class="trend-main">
        <div class="trend-hd">
          <div class="trend-hd-name">{{v.wxNick}}</div>
          <a-tag>{{CUSTOMER_TYPE_CONST.get(v.customerType)}}</a-tag>
          <div class="trend-hd-time">{{formatDates(v.createTime)}}</div>
        </div>
        <div class="trend-bd">
          {{v.contentText}}
        </div>
      </div>
    </div>

    <VmaDrawer v-model="detail.show"
               :mask="false">
      <CustomerDetail v-if="detail.show"
                      :dataProp="detail.entity"
                      disabled />
    </VmaDrawer>
  </div>
</template>
<script lang="ts">
import EventBus from '@/constants/eventBus'
import { IndexMixin } from '@/mixins'
import { mixins } from 'vue-class-component'
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import { NoticeApi } from '@/api/common/v1.0/noticeApi'
import { formatDates, debounce } from '@/utils'
import { CUSTOMER_TYPE_CONST } from '@/constants/src/customer'
import ViewLogBO from '@/api/common/v1.0/definitions/ViewLogBO'
import CustomerDetail from '@/components/packages/system/customer/detail/index.vue'
import { CustomerApi } from '@/api/api/v1.0/customerApi'
import * as mutationTypes from '@/store/mutationTypes'
import { Mutation } from 'vuex-class'

@Component({
  components: {
    CustomerDetail,
  },
})
export default class FrameMessageBoxTrend extends mixins(IndexMixin) {
  private formatDates = formatDates
  private CUSTOMER_TYPE_CONST = CUSTOMER_TYPE_CONST
  @Mutation(mutationTypes.ADD_MESSAGE_UNREAD_VIEW)
  private addMessageCount!: (addCount?: number) => void

  public data() {
    return {
      scrollPage: debounce((data: any) => this.scrollNextPage, 150),
    }
  }

  protected created() {
    this.$onBus(EventBus.FrameMessageBoxTrend.add, (data: ViewLogBO) =>
      this.add(data)
    )
  }

  protected apiPage(params: any): Promise<any> {
    return NoticeApi.viewPage(params)
  }

  protected apiGet(id: any) {
    return CustomerApi.customerDetails({ id })
  }

  protected setPage(page: any): void {
    this.pageData.total = page.total
    const trendRef = this.$refs.trend as Vue
    if (trendRef) {
      const trendEl = trendRef.$el as HTMLElement
      if (trendEl) {
        trendEl.scrollTop = trendEl.scrollHeight
      }
    }
  }

  private add(item: ViewLogBO) {
    this.table.list.unshift(item)
    this.addMessageCount()
  }
}
</script>
