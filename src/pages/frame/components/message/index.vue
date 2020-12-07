<template>
  <div>
    <div class="frame-message animated"
         v-show="!large"
         :class="{slideOutDown: large, slideInTop: !large}"
         @click="toggleLarge(true)">
      <a-badge :count="messageUnRead.view + messageUnRead.notice"
               :offset="[0, -10]"
               class="white">
        <a-icon type="message" />
        <span>消息</span>
      </a-badge>
    </div>
    <FrameMessageBox class="animated"
                     :class="{slideInRight: large, slideOutRight: !large}"
                     style="animation-duration: .5s;"
                     v-show="large"
                     @close="toggleLarge(false)" />
  </div>
</template>
<script lang="ts">
import EventBus from '@/constants/eventBus'
import { connect, disconnect } from '@/socket'
import { MessageUnRead } from '@/store/state'
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import { State } from 'vuex-class'
import FrameMessageBox from './components/box.vue'

@Component({
  components: {
    FrameMessageBox,
  },
})
export default class FrameMessage extends Vue {
  private large = false
  @State
  private messageUnRead!: MessageUnRead

  private mounted() {
    connect()
  }

  private beforeDestroy() {
    disconnect()
  }

  private toggleLarge(large = !this.large) {
    this.large = large
  }
}
</script>
