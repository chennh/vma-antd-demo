<template>
  <VmaFrameMain title="Demo">
    <template slot="header-title">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1"
                    tab="Tab 1" />
        <a-tab-pane key="2"
                    tab="Tab 2" />
        <a-tab-pane key="3"
                    tab="Tab 3" />
      </a-tabs>
    </template>
    <template slot="header-tools">
      <a-button type="link"
                icon="question-circle">
        Link
      </a-button>
    </template>

    <div class="flex flex-column">
      <div class="flex">
        <a-form-model layout="inline"
                      @submit.native.prevent>
          <a-form-model-item>
            <a-input-search placeholder="客户名称"
                            @pressEnter="search"
                            @search="search"
                            :maxLength="100" />
          </a-form-model-item>
          <a-form-model-item>
            <a-input-search placeholder="客户名称"
                            @pressEnter="search"
                            @search="search"
                            :maxLength="100" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="showSearchMore()">更多</a-button>
          </a-form-model-item>
        </a-form-model>
        <div class="flex-r">
          <a-button type="primary"
                    class="ml-5"
                    @click="showForm()">新建</a-button>
          <a-button class="ml-5"
                    @click="showDetail({})">详情</a-button>
          <a-button class="ml-5">查重工具</a-button>
        </div>
      </div>
      <a-alert type="info"
               class="mt-10">
        <div slot="message"
             class="flex">
          <a-button class="mr-5">打标签</a-button>
          <a-button class="mr-5">下发任务</a-button>
          <a-button class="mr-5">导出任务</a-button>
          <a-button class="mr-5">删除任务</a-button>
          <div class="flex-r">
            <a-button type="link"
                      class="ml-5">
              <a-icon type="reload" />刷新列表
            </a-button>
          </div>
        </div>
      </a-alert>
      <VmaFixedTable class="flex-1 mt-10"
                  :data-source="table.list">
        <a-table-column fixed>
          <VmaTableCheckAll slot="title"
                            :count="table.selection.length"
                            @check-current="handleTableCheckCurrent"
                            @check-total="handleTableCheckTotal"
                            @cancel="handleTableCheckCancel"
                            ref="checkAll" />
          <template slot-scope="scope">
            <a-checkbox :checked="table.selection.includes(scope)"
                        :disabled="table.selectDisabled"
                        @change="handleTableSelectionChange(scope)" />
          </template>
        </a-table-column>
        <a-table-column title="First Name"
                        data-index="firstName"
                        fixed />
        <a-table-column title="Last Name"
                        data-index="lastName"
                        fixed />
        <a-table-column title="Age"
                        data-index="age" />
        <a-table-column title="Address"
                        data-index="address" />
        <a-table-column title="Tags"
                        data-index="tags">
          <template slot-scope="tags">
            <span>
              <a-tag v-for="tag in tags"
                     :key="tag"
                     color="blue">{{ tag }}</a-tag>
            </span>
          </template>
        </a-table-column>
        <a-table-column key="action"
                        title="Action">
          <template slot-scope="text, record">
            <span>
              <a>Action 一 {{ record.firstName }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
            </span>
          </template>
        </a-table-column>
      </VmaFixedTable>
      <VmaPagination :total="pageData.total"
                     :current="params.current"
                     :pageSize="params.size"
                     @change="pageAdaptor" />
    </div>

    <a-modal :title="form.entity.id ? '编辑字段': '添加字段'"
             v-model="form.show"
             :maskClosable="false"
             :footer="null">
      <DemoForm v-if="form.show"
                :dataProp="form.entity"
                @submit="afterSubmitForm"
                @cancel="cancelForm" />
    </a-modal>

    <VmaDrawer v-model="detail.show"
               :mask="false">
      <DemoDetail v-if="detail.show"
                  :dataProp="detail.entity" />
    </VmaDrawer>

    <VmaSearchMore v-model="drawer.show">
      <DemoSearchMore />
    </VmaSearchMore>
  </VmaFrameMain>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import IndexMixin from '@/mixins/src/indexMixin'
import DemoForm from './form.vue'
import DemoDetail from './detail.vue'
import DemoSearchMore from './searchMore.vue'

@Component({
  components: {
    DemoForm,
    DemoDetail,
    DemoSearchMore
  }
})
export default class Demo extends mixins(IndexMixin) {
  public table = {
    list: Array(20)
      .fill(1)
      .map((v, i) => {
        return {
          id: i,
          firstName: 'Joe',
          lastName: 'Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      })
  }
}
</script>
