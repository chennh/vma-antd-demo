<template>
  <Verify type="puzzle"
          :showButton="false"
          :imgUrl="computedImgUrl"
          :imgSize="{width:'100%',height:'200px'}"
          :barSize="{width:'100%',height:'40px'}"
          @success="emitSuccess" />
</template>
<script lang="ts">
import { randRange } from 'vma-assist'
import { Component, Emit, Vue } from 'vue-property-decorator'
import Verify from 'vue2-verify'

@Component({
  components: {
    Verify,
  },
})
export default class LoginVerify extends Vue {
  private imgUrls = [
    'https://qiniu.zhangyu.vmajy.com/Fpy6Yf5s9jfsUuVlszJcAa0l7zYv?attname=2.jpg',
    'https://qiniu.zhangyu.vmajy.com/FrqJewR8RWSxjBpx2bywGZNzQv6h?attname=3.jpeg',
  ]

  private get computedImgUrl() {
    return this.imgUrls[randRange(0, this.imgUrls.length - 1)]
  }

  @Emit('success')
  private emitSuccess() {}
}
</script>
<style>
.verify-img-panel {
  background-size: 100% !important;
}
</style>
