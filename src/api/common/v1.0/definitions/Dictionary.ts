

export default class Dictionary {

  /**
   * 类别，同group共同使用可分二级分组 数据库属性:varchar(32)
   */
    public category!: string

  /**
   * 创建时间 数据库属性:datetime
   */
    public createTime!: number

  /**
   * 分组 数据库属性:varchar(32)
   */
    public dictGroup!: string

  /**
   * 键 数据库属性:varchar(128)
   */
    public dictKey!: string

  /**
   * id 数据库属性:varchar(32)
   */
    public id!: string

  /**
   * 父级ID 数据库属性:varchar(32)
   */
    public parentId!: string

  /**
   * 关联ID 数据库属性:varchar(32)
   */
    public relateId!: string

  /**
   * 备注 数据库属性:varchar(256)
   */
    public remarks!: string

  /**
   * 状态，1-启用 0-禁用 数据库属性:int(2)
   */
    public status!: number

  /**
   * 字典标题 数据库属性:varchar(128)
   */
    public title!: string

  /**
   * 类型 数据库属性:varchar(32)
   */
    public type!: string

  /**
   * 更新时间 数据库属性:datetime
   */
    public updateTime!: number

  /**
   * 值 数据库属性:text
   */
    public value!: string

}
