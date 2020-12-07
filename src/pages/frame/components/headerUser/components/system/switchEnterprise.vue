<template>
  <div class="flex flex-column">
    <a-radio-group v-model="entity.enterpriseId"
                   v-if="enterpriseList.length">
      <a-radio v-for="(v, i) in enterpriseList"
               :key="i"
               :value="v.id"
               style="display: block;"
               class="mb-5">
        {{v.name}}
      </a-radio>
    </a-radio-group>
    <a-empty v-else />
    <div class="align-c">
      <a-button class="mr-10"
                @click="cancel">取消</a-button>
      <a-button type="primary"
                @click="submit">确定</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FormMixin from '@/mixins/src/formMixin'
import { Getter } from 'vuex-class'
import { AccountApi } from '@/api/common/v1.0/accountApi'
import LoginStaffBO from '@/api/common/v1.0/definitions/LoginStaffBO'
import LoginEnterpriseBO from '@/api/common/v1.0/definitions/LoginEnterpriseBO'
import { frameActiveMenuSession } from '@/storage'

@Component
export default class SwitchEnterprise extends mixins(FormMixin) {
  @Getter
  private enterpriseList!: LoginEnterpriseBO[]
  @Getter
  private loginStaff!: LoginStaffBO

  protected data() {
    return {
      entity: {
        enterpriseId: '',
      },
    }
  }

  protected submit(): void {
    if (this.entity.enterpriseId !== this.loginStaff.enterpriseId) {
      AccountApi.switchEnt({
        id: this.entity.enterpriseId,
      }).then(() => {
        frameActiveMenuSession.remove()
        this.emitSubmit()
      })
    } else {
      this.emitCancel()
    }
  }

  @Watch('loginStaff', {
    immediate: true,
  })
  private watchLoginStaff(staff: LoginStaffBO) {
    this.entity.enterpriseId = staff.enterpriseId
  }
}
</script>
