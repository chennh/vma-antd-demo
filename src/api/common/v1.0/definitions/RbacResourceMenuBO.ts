

export default class RbacResourceMenuBO {

  /**
   * 资源编码
   */
    public code!: string

  /**
   * 创建时间
   */
    public createTime!: number

  /**
   * 描述
   */
    public description!: string

  /**
   * -
   */
    public id!: string

  /**
   * 图标
   */
    public menuIcon!: string

  /**
   * 功能菜单  1：菜单  2：按钮
   */
    public menuType!: number

  /**
   * -
   */
    public mid!: string

  /**
   * 子节点
   */
    public node!: RbacResourceMenuBO[]

  /**
   * 父菜单id
   */
    public parentId!: string

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
   * 打开方式：0、默认打开方式；1、当前页，2、新窗口
   */
    public target!: number

  /**
   * 名称
   */
    public title!: string

  /**
   * 资源类型，1-菜单权限 2-功能权限 3-数据权限
   */
    public type!: number

  /**
   * 地址
   */
    public url!: string

}
