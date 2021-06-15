<template>
  <VmaComingSoon>
    <h2>系统维护中，请稍后重试...</h2>
  </VmaComingSoon>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { redirectToLogin } from '@/router'
import { AccountApi } from '@/api/common/v1.0/accountApi'
import { Timer } from '@/utils'

@Component
export default class Maintain extends Vue {
  private timer = new Timer()

  private created() {
    this.timer.setInterval(() => {
      this.refresh()
    }, 5000)
    this.refresh()
  }

  private beforeDestroy() {
    this.timer.clear()
  }

  private async refresh() {
    try {
      await AccountApi.getCurrent({ loading: false, errorHandle: false })
      redirectToLogin()
    } catch (error) {
      if (error.response && error.response.status) {
        redirectToLogin()
      }
    }
  }
}
</script>
