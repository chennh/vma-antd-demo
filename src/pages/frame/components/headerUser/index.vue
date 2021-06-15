<template>
  <div class="header-user">
    <span>
      <a-dropdown>
        <a class="ant-dropdown-link"
           @click="e => e.preventDefault()">
          <a-avatar :size="30"
                    :src="loginResp.avatar">{{loginResp.name | lastChar}}</a-avatar>
          <span class="header-user-name">{{loginResp.name}}</span>
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;"
               @click="modifyPasswordModule.show()">修改密码</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;"
               @click="logout">退出</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>

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
import { VueModule } from '@/utils'
import { AccountApi } from '@/api/common/v1.0/accountApi'
import { frameActiveMenuSession } from '@/storage'
import { Action, Getter, State } from 'vuex-class'
import * as actionTypes from '@/store/actionTypes'
import EventBus from '@/constants/eventBus'
import ModifyPassword from './components/modifyPassword.vue'
import AccountLoginResp from '@/api/common/v1.0/definitions/AccountLoginResp'

@Component({
  components: {
    ModifyPassword,
  },
})
export default class FrameHeaderUser extends Vue {
  @State
  private loginResp!: AccountLoginResp
  @Action(actionTypes.LOGOUT)
  private logout!: any

  private modifyPasswordModule = VueModule.create({
    submit: (target: any) => {
      this.success('修改密码成功')
      target.hide()
    },
  })

  protected created() {
    // 监听退出登录
    this.$onBus(EventBus.Frame.logout, () => {
      this.logout()
    })
  }
}
</script>
