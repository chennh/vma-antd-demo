<template>
  <div class="flex flex-column">
    <a-form-model ref="form"
                  :label-col="{span: 5}"
                  :wrapper-col="{span: 15}"
                  labelAlign="left"
                  :model="entity"
                  :rules="rules"
                  class="flex-1">
      <a-form-model-item label="Age"
                         prop="age">
        <a-input v-model.number="entity.age" />
      </a-form-model-item>
      <a-form-model-item label="图片"
                         prop="image">
        <VmaImageUpload v-model="entity.image" />
      </a-form-model-item>
      <a-form-model-item label="文件"
                         prop="file">
        <VmaUpload v-model="entity.file" />
      </a-form-model-item>
      <a-form-model-item label="标签多选"
                         prop="tagGroup">
        <VmaTagGroup :optionList="[{label: '教育'}, {label: '家装'}, {label: '医美'}]"
                     v-model="entity.tagGroup" />
      </a-form-model-item>
      <a-form-model-item label="标签单选"
                         prop="tag">
        <VmaTagGroup :optionList="[{label: '教育'}, {label: '家装'}, {label: '医美'}]"
                     v-model="entity.tag" />
      </a-form-model-item>
    </a-form-model>
    <div class="align-c">
      <a-button class="mr-10">取消</a-button>
      <a-button type="primary">确定</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FormMixin from '@/mixins/src/formMixin'

@Component
export default class DemoForm extends mixins(FormMixin) {
  private data() {
    return {
      entity: {
        age: 10,
        image: [],
        file: '',
        tag: '',
        tagGroup: [],
      },
    }
  }
}
</script>
