<template>
  <div>
    <span v-if="!editorReady">编辑器加载中...</span>
    <ckeditor v-model="computedValue"
              :config="computedConfig"
              :editorUrl="editorUrl"
              :readOnly="disabled"
              @ready="emitReady"
              @focus="emitFocus"
              @blur="emitBlur"
              @input="emitInput"
              v-show="editorReady"
              ref="ckeditor" />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Emit,
  Model,
  Watch,
} from 'vue-property-decorator'
import config from './config'

@Component
export default class Editor extends Vue {
  @Prop({
    type: Object,
    default() {
      return {}
    },
  })
  public config!: any
  @Prop({
    type: [Array, String],
  })
  public toolbar!: string | any[]
  @Prop({
    type: Boolean,
    default: false,
  })
  private disabled!: boolean
  @Model('model')
  private value!: string

  private editorReady = false

  private editorUrl = '/static/js/ckeditor/v4.14.0/js/ckeditor.js'

  private get computedValue() {
    return this.value
  }

  private set computedValue(val: string) {
    this.emitModel(val)
  }

  private get computedConfig() {
    const mergedConfig = Object.assign({}, config, this.config)
    if (this.toolbar) {
      if (Array.isArray(this.toolbar)) {
        mergedConfig.toolbar = this.toolbar
      } else {
        mergedConfig.toolbar = require(`./toolbars/${this.toolbar}`).default
      }
    }
    return mergedConfig
  }

  @Emit('model')
  private emitModel(val: string) {}
  @Emit('ready')
  private emitReady(editor: any) {
    if (this.editorReady === false) {
      this.editorReady = true
    }
  }
  @Emit('focus')
  private emitFocus(evt: any, editor: any) {}
  @Emit('blur')
  private emitBlur(evt: any, editor: any) {
    if (editor) {
      this.emitModel(editor.getData())
    }
  }
  @Emit('input')
  private emitInput(content: string, evt: any, editor: any) {}
}
</script>
