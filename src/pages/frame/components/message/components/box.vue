<template>
  <div class="frame-message-box">
    <div class="box-cty">
      <div class="box-cty-item"
           :class="{active: activeTab === Tab.TREND}"
           @click="toTrandTab">
        <a-badge :count="messageUnRead.view"
                 :offset="[0, 3]"
                 class="white">
          <a-icon type="user"
                  class="box-cty-item-icon" />
        </a-badge>
        <div class="box-cty-main">
          <div class="box-cty-item-hd">
            客户动态
            <em>{{unread.viewTimes ? formatDates(unread.viewTimes) : ''}}</em>
          </div>
          <div class="box-cty-item-bd">
            {{unread.viewTitle}}
          </div>
        </div>
      </div>
      <div class="box-cty-item"
           :class="{active: activeTab === Tab.ADVISE}"
           @click="toAdviseTab">
        <a-badge :count="messageUnRead.notice"
                 :offset="[0, 3]"
                 class="white">
          <a-icon type="bell"
                  class="box-cty-item-icon" />
        </a-badge>
        <div class="box-cty-main">
          <div class="box-cty-item-hd">
            通知
            <em>{{unread.noticeTimes ? formatDates(unread.noticeTimes) : ''}}</em>
          </div>
          <div class="box-cty-item-bd">
            {{unread.noticeTitle}}
          </div>
        </div>
      </div>
    </div>
    <div class="box-main">
      <div class="box-main-hd">
        {{activeTab === Tab.TREND ? '客户动态' : '通知'}}
        <a-icon type="fullscreen-exit"
                class="box-main-exit"
                @click="emitClose" />
      </div>
      <div class="box-main-bd">
        <vma-lazy :initial="activeTab === Tab.ADVISE"
                  v-show="activeTab === Tab.ADVISE">
          <FrameMessageBoxAdvise />
        </vma-lazy>
        <vma-lazy :initial="activeTab === Tab.TREND"
                  v-show="activeTab === Tab.TREND">
          <FrameMessageBoxTrend />
        </vma-lazy>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import UnReadCountBO from '@/api/common/v1.0/definitions/UnReadCountBO'
import { NoticeApi } from '@/api/common/v1.0/noticeApi'
import EventBus from '@/constants/eventBus'
import { MessageUnRead } from '@/store/state'
import * as mutationTypes from '@/store/mutationTypes'
import { formatDate, Timer } from '@/utils'
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import FrameMessageBoxAdvise from './components/advise.vue'
import FrameMessageBoxTrend from './components/trend.vue'

// 1客户动态 2通知
enum Tab {
  TREND = '1',
  ADVISE = '2',
}

@Component({
  components: {
    FrameMessageBoxAdvise,
    FrameMessageBoxTrend,
  },
})
export default class FrameMessageBox extends Vue {
  private activeTab: Tab = Tab.TREND
  private Tab = Tab

  private unread: UnReadCountBO = {
    notice: 0,
    noticeTimes: 0,
    noticeTitle: '',
    view: 0,
    viewTimes: 0,
    viewTitle: '',
  }

  @State
  private messageUnRead!: MessageUnRead
  @Mutation(mutationTypes.SET_MESSAGE_UNREAD)
  private setMessageUnRead!: (data: MessageUnRead) => void
  @Mutation(mutationTypes.ADD_MESSAGE_UNREAD_NOTICE)
  private addMessageNoticeCount!: (addCount?: number) => void
  @Mutation(mutationTypes.ADD_MESSAGE_UNREAD_VIEW)
  private addMessageViewCount!: (addCount?: number) => void

  private formatDates = formatDate
  private timer = new Timer()

  private created() {
    this.getUnread()

    this.timer.setInterval(() => {
      this.getUnread()
    }, 30000)
  }

  private beforeDestroy() {
    this.timer.clear()
  }

  private getUnread() {
    return NoticeApi.readGET({ loading: false }).then((data) => {
      this.unread = data
      this.setMessageUnRead(data)
    })
  }

  private toTrandTab() {
    this.unread.view = 0
    this.addMessageViewCount(-this.messageUnRead.view)
    this.activeTab = Tab.TREND
    NoticeApi.read(
      {
        type: 1,
      },
      {
        loading: false,
      }
    )
  }

  private toAdviseTab() {
    this.unread.notice = 0
    this.addMessageNoticeCount(-this.messageUnRead.notice)
    this.activeTab = Tab.ADVISE
    NoticeApi.read(
      {
        type: 2,
      },
      {
        loading: false,
      }
    )
  }

  @Emit('close')
  private emitClose() {}
}
</script>
