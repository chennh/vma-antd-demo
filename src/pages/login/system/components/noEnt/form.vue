<template>
  <div class="noent-form">
    <a-form-model ref="form"
                  :label-col="{span: 6}"
                  :wrapper-col="{span: 18}"
                  labelAlign="left"
                  :model="entity"
                  :rules="rules"
                  class="flex-1">
      <h2>创建新企业</h2>
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
      <a-form-model-item label="企业名称"
                         prop="enterpriseName">
        <a-input v-model.trim="entity.enterpriseName"
                 :maxLength="50"
                 placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="企业所在地"
                         prop="region">
        <RegionCascader v-model="entity.region"
                        ref="region" />
      </a-form-model-item>
    </a-form-model>
    <div class="align-c">
      <a-button type="primary"
                block
                size="large"
                @click="submit">提交申请</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FormMixin from '@/mixins/src/formMixin'
import RegionCascader from '@/components/packages/common/cascader/regionCascader.vue'
import { EnterpriseApi } from '@/api/api/v1.0/enterpriseApi'

@Component({
  components: {
    RegionCascader,
  },
})
export default class NoEntForm extends mixins(FormMixin) {
  public rules = {
    staffName: [{ required: true, message: '请输入姓名' }],
    enterpriseName: [{ required: true, message: '请输入企业名称' }],
    region: [{ required: true, type: 'array', message: '请选择企业所在地' }],
  }

  protected data() {
    return {
      entity: {
        region: [],
      },
    }
  }

  protected saveOrUpdate(entity: any) {
    const regionRef = this.$refs.region as RegionCascader
    const regionData = regionRef.getData(entity.region)
    entity.provinceId = regionData[0].value
    entity.provinceName = regionData[0].label
    entity.cityId = regionData[1].value
    entity.cityName = regionData[1].label
    delete entity.region
    EnterpriseApi.save(entity).then((data: any) => {
      this.emitSubmit(entity, data)
    })
  }
}
</script>
