<template>
  <div class="detail flex flex-column">
    <vma-block>
      <div class="flex center-v detail-head">
        <VmaUpload class="mr-10">
          <a-avatar :size="50"
                    icon="user" />
        </VmaUpload>
        <div class="flex-1">
          <p><b class="fs-20">名称</b>
            <a-icon type="form"
                    class="ml-5" />
            <span class="ml-25">互动指数: 10%</span>
          </p>
          <div class="ant-button-group mt-5">
            <a-button>打电话</a-button>
            <a-button>添加跟进记录</a-button>
            <a-button>下发任务</a-button>
            <a-button>新建订单</a-button>
            <a-button>改跟进人</a-button>
            <a-button>回收到公海</a-button>
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  1st item
                </a-menu-item>
                <a-menu-item key="2">
                  2nd item
                </a-menu-item>
                <a-menu-item key="3">
                  3rd item
                </a-menu-item>
              </a-menu>
              <a-button> 更多
                <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </div>
        </div>
      </div>
    </vma-block>
    <vma-block class="mt-10 detail-stage">
      <vma-clue :list="['新线索', '电话沟通', '已加微信', '产品演示', '合同报价', '已成交', '多次成交']"
                :step="3" />
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="1">已输单</a-menu-item>
          <a-menu-item key="2">无效客户</a-menu-item>
        </a-menu>
        <a-button size="small"
                  class="ml-20"> 结束
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </vma-block>
    <div class="flex-1 flex mt-10">
      <vma-block class="flex-1"
                 title="客户资料"
                 style="height: 100%;">
        <template slot="header">
          客户资料
          <div class="header-tools">
            <a-button size="small">编辑</a-button>
          </div>
        </template>

        <VmaDetailForm>
          <a-form-item label="来源">
            <a-tag>销售自拓</a-tag>
          </a-form-item>
          <div class="detail-title">基本信息</div>
          <a-form-item label="生日">1987-12-24</a-form-item>
          <a-form-item label="标签">
            <a-tag>D类</a-tag>
          </a-form-item>
          <a-form-item label="地址">武昌城市公园A左写字楼7层</a-form-item>
          <a-form-item label="公司">四木学堂</a-form-item>
          <a-form-item label="行业">
            <a-tag>教育</a-tag>
          </a-form-item>
          <a-form-item label="职位">客户总监</a-form-item>
          <a-form-item label="手机">10000000004</a-form-item>
          <a-form-item label="邮箱">huke3@163.com</a-form-item>
          <a-form-item label="微信号">huke3</a-form-item>
          <a-form-item label="微信昵称">泰山本山</a-form-item>
          <a-form-item label="性别">
            <a-tag>男</a-tag>
          </a-form-item>
          <a-form-item label="地区">江西省/南昌市</a-form-item>
        </VmaDetailForm>

        <div class="vma-block-header">跟进信息</div>
        <VmaDetailForm>
          <a-form-item label="客户状态">跟进中</a-form-item>
          <a-form-item label="跟进人">黄先生</a-form-item>
          <a-form-item label="协助人">黄先生</a-form-item>
          <a-form-item label="创建时间">2020-09-28 14:15</a-form-item>
          <a-form-item label="分配时间">2020-09-28 14:15</a-form-item>
        </VmaDetailForm>
      </vma-block>
      <vma-block class="flex-1 ml-10"
                 style="height: 100%;">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1"
                      tab="旅程">
            <a-form-model>
              <a-form-model-item>
                <a-input type="textarea"
                         :rows="4"
                         :maxLength="100" />
              </a-form-model-item>
              <a-form-model-item class="align-r mt-f10">
                <a-button size="small">取消</a-button>
                <a-button type="primary"
                          size="small"
                          class="ml-5">确定</a-button>
              </a-form-model-item>
            </a-form-model>
            <a-divider class="mt-f10" />
            <VmaLinkGroup :list="['全部', '客户动态', '员工跟进记录', '其他']" />
            <a-timeline class="padding-h-5">
              <a-timeline-item v-for="v in 5"
                               :key="v">
                <a-icon slot="dot"
                        theme="twoTone"
                        type="clock-circle-o"
                        style="font-size: 20px;" />
                <div class="flex">
                  <b>改协助人</b>
                  <div class="flex-r c-gray">今天 15:18</div>
                </div>
                <p class="mt-5">协助人：黄先生</p>
                <p class="c-gray mt-5">操作人：黄先生</p>
              </a-timeline-item>

            </a-timeline>
          </a-tab-pane>
          <a-tab-pane key="2"
                      tab="任务"
                      force-render>
            <VmaLinkGroup :list="['待处理的任务', '历史任务']" />
            <div class="mission">
              <a-checkbox class="mr-10" />
              <div class="mission-body">
                <div class="mission-title">
                  <a-icon type="phone"
                          theme="twoTone"
                          style="font-size: 20px;" />
                  打电话<span class="c-danger fs-14">&emsp;(已逾期)</span>
                </div>
                <div class="mt-10">任务说明：1.客户初次接触服务，请电话联系客户，询问客户基本信息，需求点； 2.主要获取客户信息：地区，所属行业，目前面临的问题，客户的他的需求</div>
                <div class="c-gray mt-5">时间：2020-09-28 14:15 至 2020-10-05 14:15</div>
                <div class="c-gray mt-5">处理人：黄先生</div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3"
                      tab="订单">
            <p>成交订单数：<em class="c-danger margin-h-5">0</em>个<span class="ml-25">成交订单金额：<em class="c-danger margin-h-5">￥ 0</em></span></p>
            <a-empty class="mt-30" />
          </a-tab-pane>
        </a-tabs>
      </vma-block>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import DetailMixin from '@/mixins/src/detailMixin'

@Component
export default class DemoDetail extends mixins(DetailMixin) {}
</script>
