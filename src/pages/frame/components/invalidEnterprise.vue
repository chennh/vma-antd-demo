<template>
  <div class="invalid-e">
    <div class="invalid-e-account">
      <a-icon type="exclamation-circle"
              theme="filled"
              class="invalid-e-account-icon" />
      <p>此帐号已停用<br />
        如需订购请联系我们</p>
      <div class="invalid-e-account-btns">
        <a-button class="mr-15"
                  @click="logout">退出登录</a-button>
        <a-button @click="switchEnterpriseModule.show()">切换企业</a-button>
      </div>
    </div>
    <div class="invalid-e-kefu">
      <ContactUs />
    </div>

    <a-modal title="切换企业"
             v-model="switchEnterpriseModule.visible"
             :maskClosable="false"
             :footer="null">
      <SwitchEnterprise v-if="switchEnterpriseModule.visible"
                        @submit="switchEnterpriseModule.submit"
                        @cancel="switchEnterpriseModule.cancel" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import EventBus from '@/constants/eventBus'
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import * as actionTypes from '@/store/actionTypes'
import { Timer, VueModule } from '@/utils'
import loading from '@/components/libs/loading/index'
import { frameActiveMenuSession } from '@/storage'
import SwitchEnterprise from './headerUser/components/system/switchEnterprise.vue'
import ContactUs from '@/components/packages/common/contactUs.vue'

@Component({
  components: {
    SwitchEnterprise,
    ContactUs,
  },
})
export default class InvalidEnterprise extends Vue {
  @Action(actionTypes.LOGOUT)
  private logout!: any
  @Action(actionTypes.REGET_ADMIN_INFO)
  private regetAdminInfo!: () => Promise<any>

  private switchEnterpriseModule = VueModule.create({
    submit: (target: any) => {
      this.regetAdminInfo().then(() => {
        target.hide()
      })
    },
  })
}
</script>