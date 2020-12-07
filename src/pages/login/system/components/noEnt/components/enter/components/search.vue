<template>
  <div style="padding-bottom: 150px;">
    <h2>加入已有企业</h2>
    <a-dropdown :trigger="['click']"
                :visible="visible">
      <a-input-search placeholder="请搜索完整的企业名称"
                      enter-button
                      v-model.trim="entity.enterpriseName"
                      :maxLength="100"
                      size="large"
                      @pressEnter="onSearch"
                      @search="onSearch" />
      <a-menu slot="overlay">
        <template v-if="resultList.length">
          <a-menu-item v-for="v in resultList"
                       :key="v.enterpriseId">
            <div class="enter-item"
                 @click="emitselect(v)">
              <div class="enter-btn">
                <a-button type="primary"
                          size="small">申请加入</a-button>
              </div>
              <div class="enter-ent">
                <h2>{{v.enterpriseName}}</h2>
                <p>{{v.ownerName}}</p>
              </div>
            </div>
          </a-menu-item>
        </template>
        <a-menu-item disabled
                     v-else>
          <span>无匹配结果</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { EnterpriseApi } from '@/api/api/v1.0/enterpriseApi'
import JoinEnterpriseBO from '@/api/api/v1.0/definitions/JoinEnterpriseBO'

@Component
export default class NoEntEnterSearch extends Vue {
  private entity = {
    enterpriseName: '',
  }
  private visible = false
  private resultList: JoinEnterpriseBO[] = []

  private onSearch() {
    if (this.entity.enterpriseName) {
      EnterpriseApi.getEnterpriseJoin(this.entity).then((data) => {
        this.visible = true
        this.resultList = data
      })
    }
  }

  @Emit('select')
  private emitselect(item: JoinEnterpriseBO) {
    this.visible = false
  }
}
</script>
