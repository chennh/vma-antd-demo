

export default class RbacResourceActionBO {

  /**
   * 资源编码
   */
    public code!: string

  /**
   * 创建时间
   */
    public createTime!: number

  /**
   * 分组
   */
    public group!: string

  /**
   * 分组序号
   */
    public groupSort!: number

  /**
   * -
   */
    public id!: string

  /**
   * -
   */
    public mid!: string

  /**
   * 1角色拥有 0不拥有
   */
    public possess!: number

  /**
   * 关联表ID
   */
    public relateId!: string

  /**
   * 关联类型
   */
    public relateType!: string

  /**
   * 序号
   */
    public sort!: number

  /**
   * 状态，1-启用 0-禁用
   */
    public status!: number

  /**
   * 名称
   */
    public title!: string

  /**
   * 资源类型，1-菜单权限 2-功能权限 3-数据权限
   */
    public type!: number

}
