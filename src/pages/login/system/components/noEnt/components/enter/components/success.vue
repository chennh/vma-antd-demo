<template>
  <div class="noent-success">
    <img src="@/assets/images/noent/success.png"
         width="240">
    <p>你已申请加入[{{entity.enterpriseName}}]<br />
      管理员审核通过，即可成为企业一员</p>
    <a-button type="primary"
              @click="emitOK">我知道了</a-button>
  </div>
</template>
<script lang="ts">
import { DetailMixin } from '@/mixins'
import { mixins } from 'vue-class-component'
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class NoEntEnterSuccess extends mixins(DetailMixin) {
  @Emit('ok')
  private emitOK() {}
}
</script>
