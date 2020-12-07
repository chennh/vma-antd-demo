<template>
  <div class="page404">
    <div class="page404-main">
      <p class="page404-title">非常抱歉，您要查看的页面没有办法找到</p>
      <a href="javascript: void(0);"
         class="page404-btn"
         @click="back">返回</a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Page404 extends Vue {
  private back() {
    window.history.back()
  }
}
</script>
<style lang="scss">
.page404 {
  width: 100%;
  height: 100%;
  background: #dff1f4;
  display: flex;
  justify-items: center;
  overflow: hidden;
}
.page404-main {
  width: 700px;
  height: 542px;
  margin: 0 auto;
  background: url('./images/error-bg.png') no-repeat 0 0;
  .page404-title {
    font-size: 14px;
    font-weight: bold;
    margin: 254px 0 0 218px;
    color: #d3d3d3;
  }
  .page404-btn {
    display: block;
    background: #000;
    width: 145px;
    height: 45px;
    font-size: 14px;
    margin: 95px 0 0 270px;
    line-height: 43px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    border-radius: 8px;
    &:hover {
      background: #666;
    }
  }
}
</style>
