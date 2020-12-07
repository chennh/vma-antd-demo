<template>
  <div>
    <SystemLogin :loginType="5"
                 :name="hostname"
                 :loginBtnTitle="isTrial ? '下一步' : '登录'"
                 @success="watchAdminInfo"
                 v-if="currentPage === Page.LOGIN"
                 ref="login">
      <div slot="loginType"
           class="login-tabs">
        <span class="login-tab-item active">{{isTrial ? '申请试用' : '欢迎登录'}}</span>
      </div>

      <div slot="btns">
        <p class="fs-14 align-c mt-20">
          <template v-if="!isTrial">
            没有账号？
            <a href="javascript: void(0);"
               class="fs-14 c-primary"
               @click="toggleIsTrial(true)">申请试用</a>
          </template>
          <template v-else>
            已有账号？
            <a href="javascript: void(0);"
               class="fs-14 c-primary"
               @click="toggleIsTrial(false)">立即登录</a>
          </template>
        </p>
      </div>
    </SystemLogin>
    <NoEnt v-else-if="currentPage === Page.NO_ENT"
           @created="toImprove" />
    <EntImprove v-else-if="currentPage === Page.ENT_IMPROVE" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SystemLogin from './components/systemLogin.vue'
import NoEnt from './components/noEnt/index.vue'
import { redirectToHome } from '@/router'
import LoginBO from '@/api/common/v1.0/definitions/LoginBO'
import { Getter, State } from 'vuex-class'
import LoginEnterpriseBO from '@/api/common/v1.0/definitions/LoginEnterpriseBO'
import LoginStaffBO from '@/api/common/v1.0/definitions/LoginStaffBO'
import EntImprove from './components/improve/index.vue'
import {
  hasLogin,
  hasEnterprise,
  isEnterpriseComplete,
  isEnterprisePendingAudit,
} from '@/utils/adminInfo'
import { loginTypeLocal } from '@/storage'
import { LoginTypeEnum } from '@/constants'

enum Page {
  LOGIN = 'LOGIN',
  NO_ENT = 'NO_ENT',
  ENT_IMPROVE = 'ENT_IMPROVE',
}

@Component({
  components: {
    SystemLogin,
    NoEnt,
    EntImprove,
  },
})
export default class LoginWrapper extends Vue {
  @State
  private adminInfo!: LoginBO

  private hostname = location.hostname
  private currentPage = Page.LOGIN
  private Page = Page
  private isTrial = false

  private created() {
    loginTypeLocal.set(String(LoginTypeEnum.SYSTEM))
    this.watchAdminInfo()
  }

  @Watch('adminInfo')
  private watchAdminInfo() {
    // 未登录
    if (!hasLogin(this.adminInfo)) {
      return (this.currentPage = Page.LOGIN)
    }

    // 用户没有企业 => 创建/加入企业
    if (!hasEnterprise(this.adminInfo)) {
      return (this.currentPage = Page.NO_ENT)
    }

    // 1. 用户所在的企业信息未完善 => 完善企业
    // 2. 企业信息已完善待审核
    if (
      !isEnterpriseComplete(this.adminInfo) ||
      isEnterprisePendingAudit(this.adminInfo)
    ) {
      return (this.currentPage = Page.ENT_IMPROVE)
    }
    redirectToHome()
  }

  // 前往完善企业信息
  private toImprove() {
    this.currentPage = Page.ENT_IMPROVE
  }

  private toggleIsTrial(isTrial = !this.isTrial) {
    this.isTrial = isTrial
  }
}
</script>
