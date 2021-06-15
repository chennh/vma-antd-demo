

export default class AccountLoginReq {

  /**
   * 账号
   */
    public account!: string

  /**
   * 账号类型: ORGANIZATION-机构 OPERATIONS_CENTER-运营中心 SUPER_MANAGE-超级后台
   */
    public accountType!: string

  /**
   * 验证码
   */
    public captchaCode!: string

  /**
   * 验证码索引
   */
    public captchaIndex!: string

  /**
   * 密码
   */
    public password!: string

  /**
   * 密钥索引
   */
    public randomIndex!: string

}
