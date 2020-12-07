<template>
  <div class="noent">
    <div class="noent-header">
      <div class="logo">
        <img :src="loginInfo.logo">
      </div>
      <FrameHeaderUser />
    </div>
    <div class="noent-body">
      <EntImproveEnt @submit="improveSubmit"
                     v-if="currentPage === Page.IMPROVE" />
      <EntImproveSuccess v-else-if="currentPage === Page.SUCCESS" />
    </div>
  </div>
</template>
<script lang="ts">
import { VueModule } from '@/utils'
import { Component, Vue, Watch } from 'vue-property-decorator'
import FrameHeaderUser from '@/pages/frame/components/headerUser/index.vue'
import EntImproveEnt from './components/ent.vue'
import EntImproveSuccess from './components/success.vue'
import { Action, Getter, State } from 'vuex-class'
import * as actionTypes from '@/store/actionTypes'
import {
  isEnterpriseComplete,
  isEnterprisePendingAudit,
} from '@/utils/adminInfo'
import LoginBO from '@/api/common/v1.0/definitions/LoginBO'
import { loginInfo } from '@/config'

enum Page {
  IMPROVE = 'IMPROVE',
  SUCCESS = 'SUCCESS',
}

@Component({
  components: {
    FrameHeaderUser,
    EntImproveEnt,
    EntImproveSuccess,
  },
})
export default class EntImprove extends Vue {
  @Action(actionTypes.REGET_ADMIN_INFO)
  private regetAdminInfo!: () => Promise<any>
  @State
  private adminInfo!: LoginBO

  private currentPage = Page.IMPROVE
  private Page = Page
  private loginInfo = loginInfo

  private async improveSubmit() {
    await this.regetAdminInfo()
    this.watchAdminInfo()
  }

  private created() {
    this.watchAdminInfo()
  }

  @Watch('adminInfo')
  private watchAdminInfo() {
    // 需要去完善企业信息
    if (!isEnterpriseComplete(this.adminInfo)) {
      return (this.currentPage = Page.IMPROVE)
    }
    // 企业信息已完善，等待管理员审核
    if (isEnterprisePendingAudit(this.adminInfo)) {
      return (this.currentPage = Page.SUCCESS)
    }
  }
}
</script>
