import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class FormMixin extends Vue {
  @Prop({
    default() {
      return {}
    }
  })
  public dataProp: any

  public entity: any = {}

  public rules: object = {}

  @Watch('dataProp')
  protected onDataPropChange(val: any) {
    // debugger
    this.get()
  }

  /**
   * emit取消表单
   * @protected
   * @memberOf FormMixin
   */
  @Emit('cancel')
  protected emitCancel() { }

  protected created(): void {
    this.get()
  }

  /**
   * data数据传递
   */
  protected get(): void {
    this.entity = Object.assign({}, this.entity, this.dataProp)
    this.afterGet(this.entity)
  }

  /**
   * entity赋值后钩子
   * @param entity
   */
  protected afterGet(entity: any): void { }

  /**
   * 取消详情
   * @protected
   * @memberOf FormMixin
   */
  protected cancel(): void {
    this.emitCancel()
  }
}
