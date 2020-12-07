<template>
  <div class="noent">
    <div class="noent-header">
      <div class="logo">
        <img :src="loginInfo.logo">
      </div>
      <div class="noent-headrt-tools">
        <a-button type="link"
                  @click="logout">退出登录</a-button>
      </div>
    </div>
    <div class="noent-body">
      <div class="noent-opts">
        <div class="noent-opt-item"
             @click="formModule.show()">
          <div class="noent-opt-item-title">
            <a-icon type="plus-circle"
                    theme="filled"
                    class="noent-opt-item-icon" />
            <h3>创建新企业
              <a-icon type="right" />
            </h3>
          </div>
          <p>如果你们公司未创建过企业，你可以去创建新企业</p>
        </div>
        <div class="noent-opt-item"
             @click="enterModule.show()">
          <div class="noent-opt-item-title">
            <a-icon type="right-square"
                    theme="filled"
                    class="noent-opt-item-icon" />
            <h3>加入已有企业
              <a-icon type="right" />
            </h3>
          </div>
          <p>如果你们公司已创建过企业，你可以加入这家企业</p>
        </div>
      </div>
    </div>

    <a-modal v-model="formModule.visible"
             :footer="null"
             :maskClosable="false"
             wrapClassName="modal-lg">
      <NoEntForm v-if="formModule.visible"
                 :dataProp="formModule.entity"
                 @submit="formModule.submit"
                 @cancel="formModule.cancel" />
    </a-modal>

    <a-modal v-model="enterModule.visible"
             :footer="null"
             :maskClosable="false"
             wrapClassName="modal-lg">
      <NoEntEnter v-if="enterModule.visible"
                  :dataProp="enterModule.entity"
                  @close="enterModule.cancel" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { VueModule } from '@/utils'
import { Component, Emit, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import NoEntForm from './form.vue'
import * as actionTypes from '@/store/actionTypes'
import NoEntEnter from './components/enter/index.vue'
import { loginInfo } from '@/config'

@Component({
  components: {
    NoEntForm,
    NoEntEnter,
  },
})
export default class NoEnt extends Vue {
  @Action(actionTypes.LOGOUT)
  private logout!: any
  @Action(actionTypes.REGET_ADMIN_INFO)
  private regetAdminInfo!: () => Promise<any>

  private formModule = VueModule.create({
    submit: (target: any) => {
      target.hide()
      this.regetAdminInfo()
    },
  })

  private enterModule = VueModule.create()
  private loginInfo = loginInfo

  @Emit('created')
  private emitCreated() {}
}
</script>
