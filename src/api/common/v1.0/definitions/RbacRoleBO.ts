import RbacResource from './RbacResource'
import RbacRoleRelateResource from './RbacRoleRelateResource'


export default class RbacRoleBO {

  /**
   * 创建时间
   */
    public createTime!: number

  /**
   * -
   */
    public id!: string

  /**
   * 角色名称
   */
    public name!: string

  /**
   * 资源
   */
    public resourceList!: RbacResource[]

  /**
   * 角色资源关联
   */
    public roleRelateResourceList!: RbacRoleRelateResource[]

  /**
   * 状态，1-启用 0-禁用
   */
    public status!: number

  /**
   * 类型
   */
    public type!: string

}
