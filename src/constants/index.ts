import {
  Constant,
  NumberConstant,
} from 'vma-assist/dist/static/js/tools/constant'

/*
 *  Constant
 *  constructor
 *    (data)                [{key: value} | Array] key-value对象/数组，当参数为数组时key为对应的数组index
    method
      拥有Map的所有方法...
      getValue(key)         [any] = Map.get(key)
      getKey(value)         [String] 根据value区key
      keyList()             [Array] key数组
      valueList()           [Array] value数组
      list()                [Array] key-value数组/构造参数是数组时返回valueList
      map()                 [Array] value-label数组

      set(key, value)       [void] 添加数据后，会将该key扩展到当前实例上，即可通过[instance.key]访问该value
 */

// 登录类型
export enum LoginTypeEnum {
  // 超级后台
  SUPER = 1,
  // 服务商后台
  OEM = 2,
  // 代理商后台
  AGENT = 3,
  // 企业后台
  SYSTEM = 4,
}

export const LOGIN_TYPE_CONST = new NumberConstant({
  [LoginTypeEnum.SUPER]: '超级后台',
  [LoginTypeEnum.OEM]: '服务商后台',
  [LoginTypeEnum.AGENT]: '代理商后台',
  [LoginTypeEnum.SYSTEM]: '企业后台',
})

export * from './src/resource'

export enum StatueEnum {
  ACTIVE = 1,
  INACTIVE = 0
}

export const STATUS_CONST = new NumberConstant({
  [StatueEnum.ACTIVE]: '启用',
  [StatueEnum.INACTIVE]: '禁用'
})

// 排序
export enum OrderEnum {
  DESC = 'desc',
  ASC = 'asc'
}

export class AntdOrder {
  public static getOrder(order: string): OrderEnum | '' {
    switch (order as AntdOrderEnum) {
      case AntdOrderEnum.ASC:
        return OrderEnum.ASC
      case AntdOrderEnum.DESC:
        return OrderEnum.DESC
      default:
        return ''
    }
  }
}

// antd的表格排序
export enum AntdOrderEnum {
  DESC = 'descend',
  ASC = 'ascend',
}
