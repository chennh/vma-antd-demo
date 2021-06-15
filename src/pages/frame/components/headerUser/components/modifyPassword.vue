<template>
  <div class="flex flex-column">
    <a-form-model ref="form"
                  :label-col="{span: 5}"
                  :wrapper-col="{span: 15}"
                  labelAlign="left"
                  :model="entity"
                  :rules="rules"
                  class="flex-1">
      <a-form-model-item label="原密码"
                         prop="oldPassword">
        <a-input type="password"
                 v-model.trim="entity.oldPassword"
                 :maxLength="16"
                 placeholder="请输入原密码" />
      </a-form-model-item>
      <a-form-model-item label="新密码"
                         prop="newPassword">
        <a-input type="password"
                 v-model.trim="entity.newPassword"
                 :maxLength="16"
                 placeholder="请输入新密码" />
      </a-form-model-item>
      <a-form-model-item label="确认新密码"
                         prop="reNewPassword">
        <a-input type="password"
                 v-model.trim="entity.reNewPassword"
                 :maxLength="16"
                 placeholder="请再次输入新密码" />
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
import { AccountApi } from '@/api/common/v1.0/accountApi'
import { passwordValidator, reValueValidator } from '@/assets/js/validators'

@Component
export default class ModifyPassword extends mixins(FormMixin) {
  protected data() {
    return {
      rules: {
        oldPassword: [{ required: true, message: '请输入原密码' }],
        newPassword: [
          { required: true, message: '请输入新密码' },
          { validator: passwordValidator },
        ],
        reNewPassword: [
          { required: true, message: '请再次输入新密码' },
          {
            validator: reValueValidator(() => this.entity.newPassword),
            message: '两次输入密码不一致',
          },
        ],
      },
    }
  }

  protected saveOrUpdate(entity: any) {
    AccountApi.modifyPassword(Object.assign({}, this.entity)).then(() => {
      this.emitSubmit()
    })
  }
}
</script>
