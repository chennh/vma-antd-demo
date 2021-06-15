<template>
  <router-view />
</template>
<script lang="ts">
import { LoginTypeEnum } from '@/constants'
import { loginTypeLocal } from '@/storage'
import { Component, Vue } from 'vue-property-decorator'
import * as loginTypes from '@/router/login/types'
import loginRouterWrapper from '@/router/login'
import { Route } from 'vue-router'

@Component
export default class Login extends Vue {
  private created() {
    this.autoGotoLogin()
  }

  private beforeRouteUpdate(to: Route, from: Route, next: any) {
    if (!loginRouterWrapper.isRouter(to.name)) {
      return this.autoGotoLogin()
    }
    next()
  }

  private autoGotoLogin() {
    if (!loginRouterWrapper.isRouter(this.$route.name)) {
      const loginType = loginTypeLocal.get()
      switch (loginType) {
        case LoginTypeEnum.SUPER:
          return this.gotoLogin(loginTypes.SUPER)
        case LoginTypeEnum.OPERATIONS_CENTER:
          return this.gotoLogin(loginTypes.OPERATIONS_CENTER)
        default:
          this.gotoLogin(loginTypes.OPERATIONS_CENTER)
      }
    }
  }

  private gotoLogin(routerName: string) {
    this.$router.push({
      name: routerName,
    })
  }
}
</script>
