

export default class RbacResource {

  /**
   * 资源编码
   */
    public code!: string

  /**
   * 创建时间
   */
    public createTime!: number

  /**
   * -
   */
    public id!: string

  /**
   * 关联表ID
   */
    public relateId!: string

  /**
   * 关联类型
   */
    public relateType!: string

  /**
   * 状态，1-启用 0-禁用
   */
    public status!: number

  /**
   * 资源类型，1-菜单权限 2-功能权限 3-数据权限
   */
    public type!: number

}
