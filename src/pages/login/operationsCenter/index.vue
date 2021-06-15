<template>
  <login :loginType="loginType"
         ref="login" />
</template>
<script lang="ts">
import { LoginTypeEnum } from '@/constants'
import { Component, Vue } from 'vue-property-decorator'
import Login from '../components/login.vue'

@Component({
  components: {
    Login,
  },
})
export default class OemLogin extends Vue {
  private loginType = LoginTypeEnum.OPERATIONS_CENTER
}
</script>
