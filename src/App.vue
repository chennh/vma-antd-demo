<template>
  <div id="app"
       style="height: 100%;"
       v-cloak>
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

@Component
export default class App extends Vue {
  private locale: any = zhCN
}
</script>
<style>
[v-cloak] {
  display: none;
}
</style>
