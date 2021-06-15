import RbacAccountBO from './RbacAccountBO'


export default class AccountLoginResp {

  /**
   * 账号权限
   */
    public accountBo!: RbacAccountBO

  /**
   * 账号类型
   */
    public accountType!: string

  /**
   * 头像
   */
    public avatar!: string

  /**
   * id
   */
    public id!: number

  /**
   * macKey
   */
    public macKey!: string

  /**
   * 姓名
   */
    public name!: string

  /**
   * 是否主账号 1-是 0-否
   */
    public primary!: number

}
