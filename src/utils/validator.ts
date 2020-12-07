export default class Validator {
  public reg = null
  public msg = ''
  constructor(reg: any, msg: any) {
    this.reg = reg
    this.msg = msg
  }
  public valid(value: any) {
    // @ts-ignore
    return this.reg.test(value)
  }
  // 将reg的值替换为sign
  public replace(value: any, sign: any) {
    // @ts-ignore
    return String(value).replace(this.reg, sign)
  }
}

// 手机号码
export const mobile = new Validator(
  /^1\d{10}$/,
  '请输入正确的11位手机号码'
)

// 移动和固定电话
export const phone = new Validator(
  /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/,
  '请输入正确电话号码'
)

// email
export const email = new Validator(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  '请输入正确的email地址'
)

// 账号
export const account = new Validator(
  /^[\d|\w|_]{6,16}$/,
  '账号必须为6-16位字母、数字、下划线'
)

// 密码
export const password = new Validator(
  /^[\d|\w|_]{6,16}$/,
  '密码必须为6-16位字母、数字、下划线'
)

// 去除 除汉字，数字，空格，逗号（中英）外的所有其他字符
export const removeInvalidMarkGlobal = new Validator(
  /[^\u4e00-\u9fa5a-zA-Z,，\d\s]+/ig,
  '有效字符为汉字、字母、数字、空格、逗号（中英）'
)
// 把逗号（中）转为（英）
export const commaCNToENGlobal = new Validator(
  /，/ig,
  '有效字符为逗号（英）'
)

// 匹配域名
export const URL = new Validator(
  /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
  '请输入正确域名'
)

// 货币
export const currency = new Validator(
  /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
  '请输入正确的货币'
)

// 整数
export const integer = new Validator(
  /^-?\d+$/,
  '请输入正确的整数值'
)

// 正整数
export const positiveInteger = new Validator(
  /^[1-9]*[1-9][0-9]*$/,
  '请输入正确的正整数'
)

// 微信号 微信号只支持6-20个字母、数字、下划线和减号，而且必须以字母开头
export const wxNum = new Validator(
  /^[\d|\w|_-]{6,20}$/,
  '必须为6-20位字母、数字、下划线、连接符'
)

// 版本号
export const versionNum = new Validator(
  /^\d+\.\d+\.\d+$/,
  '版本号格式不正确,格式如 1.0.0'
)

// url地址
export const urlMatch = new Validator(
  /((ht)tps?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
  '地址不合法，请重新输入,须以http://或https://开头'
)
