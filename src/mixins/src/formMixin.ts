import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { FormModel } from 'ant-design-vue'

@Component
export default class FormMixin extends Vue {
  // 详情数据
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  public dataProp: any

  // rest api
  public readonly api: any

  // 表单数据
  public entity: any = {}

  // 校验规则
  public rules: any = {}

  // 处于submit中
  public onLoading = false

  /**
   * 表单校验
   * @returns {Promise<boolean>}
   * @memberOf FormMixin
   */
  public validate(): Promise<boolean> {
    if (this.$refs.form) {
      const form = this.$refs.form as FormModel
      return Promise.resolve(form.validate()).then((res) => !!res)
    }
    return Promise.reject(new Error('ref form does not exist'))
  }

  /**
   * 读取数据
   * @returns {*}
   * @memberOf FormMixin
   */
  public getData(): any {
    return Object.assign({}, this.entity)
  }

  /**
   * 监听详情数据变化，并重新赋值给表单
   * @protected
   * @memberOf FormMixin
   */
  @Watch('dataProp')
  protected onDataPropChange() {
    this.get()
  }

  /**
   * emit取消表单
   * @protected
   * @memberOf FormMixin
   */
  @Emit('cancel')
  protected emitCancel() { }

  /**
   * emit提交表单
   * @protected
   * @param {*} [entity] 表单数据
   * @param {*} [data] 接口返回数据
   * @memberOf FormMixin
   */
  @Emit('submit')
  protected emitSubmit(entity?: any, data?: any) { }

  protected created(): void {
    this.get()
  }

  protected mounted(): void {
    // 初始化服务端数据完成后再执行ready
    new Promise(this.initData).then(() => {
      this.init()
    })
  }

  /**
   * 组件初始化
   * @protected
   * @param {Resolve} resolve
   * @memberOf FormMixin
   */
  protected initData(resolve: Resolve): void {
    resolve()
  }

  /**
   * 初始化
   * @protected
   * @memberOf FormMixin
   */
  protected init(): void {
    this.initReady()
  }

  /**
   * 初始化完成钩子
   * @protected
   * @memberOf FormMixin
   */
  protected initReady(): void { }

  /**
   * 详情数据赋值给表单
   * @protected
   * @memberOf FormMixin
   */
  protected get(): void {
    this.entity = Object.assign({}, this.entity, this.dataProp)
    this.afterGet(this.entity)
  }

  /**
   * entity赋值后钩子
   * @protected
   * @param {*} entity 详情数据
   * @memberOf FormMixin
   */
  protected afterGet(entity: any): void { }


  /**
   * 提交前钩子，返回false则不提交表单
   * @protected
   * @param {*} entity 表单数据
   * @returns {boolean}
   * @memberOf FormMixin
   */
  protected beforeSubmit(entity: any): boolean {
    return true
  }

  /**
   * 表单校验成功时调用接口
   * @protected
   * @param {*} entity 表单数据
   * @memberOf FormMixin
   */
  protected saveOrUpdate(entity: any) {
    return this.api[entity.id ? 'update' : 'save'](entity).then((data: any) => {
      this.emitSubmit(entity, data)
    })
  }

  /**
   * 提交表单
   * @protected
   * @memberOf FormMixin
   */
  protected submit(): void {
    if (this.onLoading) {
      return
    }
    this.onLoading = true
    this.validate().then(valid => {
      if (valid) {
        const entity = Object.assign({}, this.entity)
        if (this.beforeSubmit(entity) !== false) {
          return this.saveOrUpdate(entity)
        }
      }
    }).finally(() => {
      this.onLoading = false
    })
  }

  /**
   * 取消表单
   * @protected
   * @memberOf FormMixin
   */
  protected cancel(): void {
    this.emitCancel()
  }

  /**
   * 取消表单
   * @protected
   * @memberOf FormMixin
   */
  protected onCancel(): void {
    const obj = this
    this.$confirm({
      title: '确定不保存内容返回列表？',
      onOk() {
        obj.emitCancel()
      },
      onCancel() { }
    })
  }
}
