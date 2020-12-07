<template>
  <a-row class="mb-10">
    <div class="vma-block-header small">客户资料</div>
    <a-row v-for="(v, i) in list"
           :key="i">
      <a-card class="card-field"
              :class="{expand: v.checked}">
        <a-form-model class="form-thick">
          <a-form-model-item>
            <a-checkbox v-model="v.checked">{{v.name}}</a-checkbox>
          </a-form-model-item>
          <template v-if="v.checked && v.field">
            <VmaConstSelect :target="v.field.operationConst"
                            v-model="v.operation"
                            @change="() => v.data = {}"
                            class="mb-5" />
            <component :is="v.field.getComponent(v.operation)"
                       v-model="v.data" />
          </template>
        </a-form-model>
      </a-card>
    </a-row>
  </a-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FormMixin from '@/mixins/src/formMixin'
import { frameActiveMenuSession } from '@/storage'
import {
  FieldOperation,
  FieldType,
  Field,
} from '@/components/libs/field/index'

@Component
export default class DemoSearchMore extends mixins(FormMixin) {
  private list = [
    {
      name: '单行文本',
      type: FieldType.SINGLE_LINE_TEXT,
      checked: false,
      operation: '',
      data: {},
    },
    {
      name: '多行文本',
      type: FieldType.MULTIPLE_LINE_TEXT,
      checked: false,
      operation: '',
      data: {},
    },
    {
      name: '单选标签',
      type: FieldType.SINGLE_SELECT,
      checked: false,
      operation: '',
      data: {},
    },
    {
      name: '多选标签',
      type: FieldType.MULTIPLE_SELECT,
      checked: false,
      operation: '',
      data: {},
    },
    {
      name: '数字',
      type: FieldType.NUMBER,
      checked: false,
      operation: '',
      data: {},
    },
    {
      name: '日期',
      type: FieldType.DATE,
      checked: false,
      operation: '',
      data: {},
    },
    {
      name: '时间',
      type: FieldType.TIME,
      checked: false,
      operation: '',
      data: {},
    },
    {
      name: '日期+时间',
      type: FieldType.DATETIME,
      checked: false,
      operation: '',
      data: {},
    },
  ].map((v: any) => {
    v.field = Field.getField(v.type)
    return v
  })
}
</script>
