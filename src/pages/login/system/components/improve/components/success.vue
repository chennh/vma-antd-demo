<template>
  <div class="noent-success mt-30">
    <img src="@/assets/images/noent/success.png"
         width="240">
    <p>你已创建<span v-if="enterprise">[{{enterprise.name}}]</span><span v-else>企业</span>成功<br />
      管理员审核通过，即可正常使用</p>
  </div>
</template>
<script lang="ts">
import LoginEnterpriseBO from '@/api/common/v1.0/definitions/LoginEnterpriseBO'
import { DetailMixin } from '@/mixins'
import { mixins } from 'vue-class-component'
import { Component, Emit, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class EntImproveSuccess extends mixins(DetailMixin) {
  @Getter
  private enterprise!: LoginEnterpriseBO
}
</script>
