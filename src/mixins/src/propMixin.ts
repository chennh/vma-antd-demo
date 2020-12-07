import { Component, Vue, Prop, Model, Emit } from 'vue-property-decorator'

@Component
export default class PropMixin extends Vue {
  @Model('model')
  protected value!: any

  protected defualtProps: any = {}

  protected get computedProps() {
    return Object.assign({}, this.defualtProps, this.$attrs, this.$props)
  }

  protected get computedValue() {
    return this.value
  }

  protected set computedValue(val: any) {
    this.emitModel(val)
  }

  @Emit('model')
  protected emitModel(val: any) { }
}
