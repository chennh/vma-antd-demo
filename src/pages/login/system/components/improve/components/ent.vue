<template>
  <a-form-model ref="form"
                :model="entity"
                :rules="rules">
    <div class="improve-ent">
      <div class="improve-ent-notify">
        <i class="iconfont icon-notice" />
        <div class="ant-popover ant-popover-placement-right">
          <div class="ant-popover-content">
            <div class="ant-popover-arrow"></div>
            <div role="tooltip"
                 class="ant-popover-inner">
              <div class="ant-popover-inner-content">
                已提交试用申请。销售经理会尽快联系你，请留意来电。回答3个问题，以便我们为你提供更好的服务~~
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>你的所属行业是？</h2>
      <VmaTagGroup white
                   optionKey="id"
                   size="large"
                   :optionList="industryList"
                   v-model="entity.industryId"
                   ref="industry" />
      <h2>你的团队有多少员工？</h2>
      <VmaTagGroup white
                   optionKey="id"
                   size="large"
                   :optionList="staffCountList"
                   v-model="entity.scaleId"
                   ref="scale" />
      <h2>你是如何了解到客迹这款产品的？</h2>
      <VmaTagGroup white
                   optionKey="id"
                   size="large"
                   :optionList="sourceList"
                   v-model="entity.channelId"
                   ref="channel" />
      <a-button type="primary"
                size="large"
                :disabled="disabled"
                block
                class="mt-30"
                @click="submit">提交</a-button>
    </div>
  </a-form-model>
</template>
<script lang="ts">
import CustomerParamOptions from '@/api/api/v1.0/definitions/CustomerParamOptions'
import { EnterpriseApi } from '@/api/api/v1.0/enterpriseApi'
import { AccountApi } from '@/api/common/v1.0/accountApi'
import { VmaTagGroup } from 'vma-vue-antd'
import { FormMixin } from '@/mixins'
import { VueModule } from '@/utils'
import { mixins } from 'vue-class-component'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class EntImproveEnt extends mixins(FormMixin) {
  private industryList: CustomerParamOptions[] = []
  private sourceList: CustomerParamOptions[] = []
  private staffCountList: CustomerParamOptions[] = []

  protected data() {
    return {
      entity: {
        industryId: '',
        industry: '',
        scaleId: '',
        scale: '',
        channelId: '',
        channel: '',
      },
    }
  }

  protected created() {
    AccountApi.enterpriseListByKey().then((data) => {
      this.industryList = (data.industry || []).map((v) =>
        Object.assign(v, { label: v.optionValue })
      )
      this.sourceList = (data.source || []).map((v) =>
        Object.assign(v, { label: v.optionValue })
      )
      this.staffCountList = (data.staffCount || []).map((v) =>
        Object.assign(v, { label: v.optionValue })
      )
    })
  }

  protected saveOrUpdate(entity: any) {
    const industryRef = this.$refs.industry as VmaTagGroup
    const scaleRef = this.$refs.scale as VmaTagGroup
    const channelRef = this.$refs.channel as VmaTagGroup
    const industryData = industryRef.getData(entity.industryId)
    const scaleData = scaleRef.getData(entity.scaleId)
    const channelData = channelRef.getData(entity.channelId)
    entity.industry = (industryData && industryData.label) || ''
    entity.scale = (scaleData && scaleData.label) || ''
    entity.channel = (channelData && channelData.label) || ''

    EnterpriseApi.perfectEnterprise(entity).then((data: any) => {
      this.emitSubmit(entity, data)
    })
  }

  private get disabled() {
    return !!(
      !this.entity.industryId ||
      !this.entity.scaleId ||
      !this.entity.channelId
    )
  }
}
</script>
