<template>
  <div>
    <h2>加入已有企业</h2>
    <a-form-model ref="form"
                  :label-col="{span: 6}"
                  :wrapper-col="{span: 18}"
                  labelAlign="left"
                  :model="entity"
                  :rules="rules"
                  class="flex-1">
      <a-alert type="info"
               showIcon
               style="padding-top: 4px; padding-bottom: 4px;"
               class="mb-20">
        <span slot="message">你正在申请加入[{{entity.enterpriseName}}] <a-button type="link"
                    @click="emitReselect">重新选择</a-button></span>
      </a-alert>
      <a-form-model-item label="姓名"
                         prop="staffName">
        <a-input v-model.trim="entity.staffName"
                 :maxLength="20"
                 placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="职位"
                         prop="position">
        <a-input v-model.trim="entity.position"
                 :maxLength="30"
                 placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="备注"
                         prop="remark">
        <a-input type="textarea"
                 v-model.trim="entity.remark"
                 :rows="5"
                 :maxLength="500"
                 placeholder="请输入" />
      </a-form-model-item>
    </a-form-model>
    <div class="align-c">
      <a-button type="primary"
                block
                size="large"
                @click="submit">申请加入</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FormMixin from '@/mixins/src/formMixin'
import { EnterpriseApi } from '@/api/api/v1.0/enterpriseApi'

@Component
export default class NoEntEnterApply extends mixins(FormMixin) {
  public rules = {
    staffName: [{ required: true, message: '请输入姓名' }],
  }

  protected saveOrUpdate(entity: any) {
    EnterpriseApi.joinApply(entity).then((data: any) => {
      this.emitSubmit(entity, data)
    })
  }

  @Emit('reselect')
  private emitReselect() {}
}
</script>
