<template>
  <div class="flex center align-c"
       style="height: 100%;">
    <div class="coming-soon-img">
      <img src="@/assets/images/comingsoon.png">
      <slot>
        <h2>敬请期待...</h2>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VmaComingSoon extends Vue {}
</script>
<style lang="scss" scoped>
.coming-soon-img {
  margin: 0 auto;
  padding: 20px 0;

  img {
    display: block;
    width: 300px;
  }

  h2 {
    margin-top: 20px;
    font-size: 30px;
    color: #666;
    font-weight: bold;
  }
}
</style>
