<template>
  <div class="noent-form">
    <NoEntEnterSearch @select="selectEnt"
                      v-show="step === Step.SEARCH" />
    <NoEntEnterApply :dataProp="entity"
                     @reselect="goStep(Step.SEARCH)"
                     @submit="goStep(Step.SUCCESS)"
                     v-if="step === Step.APPLY" />
    <NoEntEnterSuccess :dataProp="entity"
                       @ok="emitClose"
                       v-else-if="step === Step.SUCCESS" />
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { EnterpriseApi } from '@/api/api/v1.0/enterpriseApi'
import JoinEnterpriseBO from '@/api/api/v1.0/definitions/JoinEnterpriseBO'
import NoEntEnterSearch from './components/search.vue'
import NoEntEnterApply from './components/apply.vue'
import NoEntEnterSuccess from './components/success.vue'

enum Step {
  SEARCH = 'SEARCH',
  APPLY = 'APPLY',
  SUCCESS = 'SUCCESS',
}

@Component({
  components: {
    NoEntEnterSearch,
    NoEntEnterApply,
    NoEntEnterSuccess,
  },
})
export default class NoEntEnter extends Vue {
  private step = Step.SEARCH
  private Step = Step

  private entity: JoinEnterpriseBO = new JoinEnterpriseBO()

  private selectEnt(ent: JoinEnterpriseBO) {
    this.entity = ent
    this.step = Step.APPLY
  }

  private goStep(step: Step) {
    this.step = step
  }

  @Emit('close')
  private emitClose() {}
}
</script>
