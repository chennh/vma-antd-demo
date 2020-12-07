<template>
  <div class="flex flex-column">
    <a-form-model ref="form"
                  :label-col="{span: 5}"
                  :wrapper-col="{span: 15}"
                  labelAlign="left"
                  :model="entity"
                  :rules="rules"
                  class="flex-1">
      <a-form-model-item label="头像"
                         prop="headIcon">
        <VmaImageUpload v-model="entity.headIcon">
          <a-avatar :src="entity.headIcon"
                    :size="54"
                    style="font-size: 32px;">
            <span v-if="!entity.headIcon">{{entity.staffName | lastChar}}</span>
          </a-avatar>
        </VmaImageUpload>
      </a-form-model-item>
      <a-form-model-item label="姓名"
                         prop="staffName">
        <a-input v-model.trim="entity.staffName"
                 :maxLength="20"
                 placeholder="请输入姓名" />
      </a-form-model-item>
      <a-form-model-item label="手机"
                         prop="mobilePhone">
        {{entity.mobilePhone}}
      </a-form-model-item>
      <a-form-model-item label="角色"
                         prop="roleName">
        {{entity.roleName}}
      </a-form-model-item>
    </a-form-model>
    <div class="align-c">
      <a-button class="mr-10"
                @click="cancel">取消</a-button>
      <a-button type="primary"
                @click="submit">确定</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FormMixin from '@/mixins/src/formMixin'
import { Getter } from 'vuex-class'
import LoginStaffBO from '@/api/common/v1.0/definitions/LoginStaffBO'
import { AccountApi } from '@/api/common/v1.0/accountApi'

@Component
export default class PersonalInfo extends mixins(FormMixin) {
  public rules = {
    staffName: [
      {
        required: true,
        message: '请输入姓名',
      },
    ],
  }

  @Getter
  private loginStaff!: LoginStaffBO

  protected saveOrUpdate(entity: any) {
    AccountApi.updateStaffMessage(Object.assign({}, this.entity)).then(() => {
      this.emitSubmit()
    })
  }

  @Watch('loginStaff', {
    immediate: true,
  })
  private watchLoginStaff(staff: LoginStaffBO) {
    Object.assign(this.entity, staff)
  }
}
</script>
