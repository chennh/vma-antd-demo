

export default class VersionGetLastVersionResp {

  /**
   * 版本描述
   */
    public description!: string

  /**
   * app版本号
   */
    public devVersion!: number

  /**
   * 是否强制更新，1-是 0-否，默认1
   */
    public forceUpdate!: number

  /**
   * 热修复版本号
   */
    public hotfixVersion!: number

  /**
   * id
   */
    public id!: string

  /**
   * MD5
   */
    public md5!: string

  /**
   * 该版本是否可被跳过，如果有更新版本将直接跳过该版本，1-是 0-否，默认1
   */
    public passable!: number

  /**
   * 主版本号
   */
    public primaryVersion!: number

  /**
   * 次版本号
   */
    public secondVersion!: number

  /**
   * 静默安装，1-是 0-否，默认0
   */
    public silentInstall!: number

  /**
   * 特别标记版本
   */
    public specialVersion!: string

  /**
   * 版本进度，1-待验证 2-灰度测试 3-可正式上线
   */
    public step!: number

  /**
   * 版本标题
   */
    public title!: string

  /**
   * 下载地址
   */
    public url!: string

  /**
   * 版本号
   */
    public version!: string

}
