<template>
  <div class="header-user">
    <a-popover trigger="click"
               v-if="isSystem">
      <ContactUs slot="content"
                 style="width: 200px;" />
      <span class="header-user-contact">
        <a-icon type="message" />
        联系我们
      </span>
    </a-popover>
    <span>
      <a-dropdown>
        <a class="ant-dropdown-link"
           @click="e => e.preventDefault()">
          <a-avatar :size="30"
                    :src="loginStaff.headIcon">{{loginStaff.staffName | lastChar}}</a-avatar>
          <span class="header-user-name">{{loginStaff.staffName}}</span>
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <!-- 企业账号 -->
          <template v-if="isSystem">
            <a-menu-item>
              <a href="javascript:;"
                 @click="personalInfoModule.show()">个人信息</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;"
                 @click="switchEnterpriseModule.show()">切换企业</a>
            </a-menu-item>
          </template>
          <!-- 代理商/服务商/超级后台账号 -->
          <template v-else>
            <a-menu-item>
              <a href="javascript:;"
                 @click="modifyPasswordModule.show()">修改密码</a>
            </a-menu-item>
          </template>
          <a-menu-item>
            <a href="javascript:;"
               @click="logout">退出</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>

    <a-modal title="切换企业"
             v-model="switchEnterpriseModule.visible"
             :footer="null"
             :maskClosable="false"
             v-if="isSystem">
      <SwitchEnterprise v-if="switchEnterpriseModule.visible"
                        @submit="switchEnterpriseModule.submit"
                        @cancel="switchEnterpriseModule.cancel" />
    </a-modal>
    <a-modal title="个人信息"
             v-model="personalInfoModule.visible"
             :footer="null"
             :maskClosable="false"
             v-if="isSystem">
      <PersonalInfo v-if="personalInfoModule.visible"
                    @submit="personalInfoModule.submit"
                    @cancel="personalInfoModule.cancel" />
    </a-modal>

    <a-modal title="修改密码"
             v-model="modifyPasswordModule.visible"
             :footer="null"
             :maskClosable="false"
             v-if="!isSystem">
      <ModifyPassword v-if="modifyPasswordModule.visible"
                      @submit="modifyPasswordModule.submit"
                      @cancel="modifyPasswordModule.cancel" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Timer, VueModule } from '@/utils'
import loading from '@/components/libs/loading/index'
import { AccountApi } from '@/api/common/v1.0/accountApi'
import { frameActiveMenuSession } from '@/storage'
import { Action, Getter } from 'vuex-class'
import * as actionTypes from '@/store/actionTypes'
import LoginStaffBO from '@/api/common/v1.0/definitions/LoginStaffBO'
import EventBus from '@/constants/eventBus'
import SwitchEnterprise from './components/system/switchEnterprise.vue'
import PersonalInfo from './components/system/personalInfo.vue'
import LoginEnterpriseBO from '@/api/common/v1.0/definitions/LoginEnterpriseBO'
import PlatformLoginBO from '@/api/common/v1.0/definitions/PlatformLoginBO'
import ModifyPassword from './components/modifyPassword.vue'
import ContactUs from '@/components/packages/common/contactUs.vue'

@Component({
  components: {
    SwitchEnterprise,
    PersonalInfo,
    ModifyPassword,
    ContactUs,
  },
})
export default class FrameHeaderUser extends Vue {
  @Getter
  private loginStaff!: LoginStaffBO | PlatformLoginBO
  @Getter
  private isSystem!: boolean
  @Action(actionTypes.LOGOUT)
  private logout!: any
  @Action(actionTypes.REGET_ADMIN_INFO)
  private regetAdminInfo!: () => Promise<any>

  private switchEnterpriseModule = VueModule.create({
    submit: (target: any) => {
      this.regetAdminInfo().then(() => {
        loading.show()
        window.location.reload()
      })
    },
  })
  private personalInfoModule = VueModule.create({
    submit: (target: any) => {
      this.regetAdminInfo().then(() => {
        target.hide()
      })
    },
  })
  private modifyPasswordModule = VueModule.create({
    submit: (target: any) => {
      this.success('修改密码成功')
      target.hide()
    },
  })

  protected created() {
    // 监听切换企业
    this.$onBus(EventBus.Frame.switchEnterprise, () => {
      this.switchEnterpriseModule.show()
    })
    // 监听退出登录
    this.$onBus(EventBus.Frame.logout, () => {
      this.logout()
    })
  }
}
</script>
