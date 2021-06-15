import RbacResourceActionBO from './RbacResourceActionBO'
import RbacResourceDataBO from './RbacResourceDataBO'
import RbacResource from './RbacResource'
import RbacResourceMenuBO from './RbacResourceMenuBO'
import RbacRoleBO from './RbacRoleBO'


export default class RbacAccountBO {

  /**
   * 创建时间
   */
    public createTime!: number

  /**
   * -
   */
    public id!: string

  /**
   * -
   */
    public isAdmin!: number

  /**
   * 登录限制次数
   */
    public loginLimitNum!: number

  /**
   * 密码
   */
    public password!: string

  /**
   * -
   */
    public relateId!: string

  /**
   * -
   */
    public resourceActionList!: RbacResourceActionBO[]

  /**
   * -
   */
    public resourceData!: object

  /**
   * -
   */
    public resourceDataList!: RbacResourceDataBO[]

  /**
   * -
   */
    public resourceList!: RbacResource[]

  /**
   * -
   */
    public resourceMenuList!: RbacResourceMenuBO[]

  /**
   * -
   */
    public roleBoList!: RbacRoleBO[]

  /**
   * 密码盐
   */
    public salt!: string

  /**
   * 状态，1-启用，0-禁用
   */
    public status!: number

  /**
   * 用户名
   */
    public username!: string

}
