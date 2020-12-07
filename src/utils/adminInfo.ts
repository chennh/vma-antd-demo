import LoginBO from '@/api/api/v1.0/definitions/LoginBO'
import { LoginTypeEnum } from '../constants/index'

/**
 * 用户是否已登录
 * @param data
 */
export const hasLogin = (data: LoginBO): boolean => {
  return data && data.macKey ? true : false
}

/**
 * 用户是否有归属企业
 * @param data
 */
export const hasEnterprise = (data: LoginBO): boolean => {
  if (hasLogin(data)) {
    return data.entList && data.entList.length > 0
  }
  return false
}

/**
 * 用户当前的企业信息是否已完善
 * @param data
 */
export const isEnterpriseComplete = (data: LoginBO): boolean => {
  if (hasLogin(data)) {
    return data.enterpriseBo && data.enterpriseBo.isComplete === 1
  }
  return false
}

/**
 * 用户当前的企业是否正在待审核(已完善)
 * @param data
 */
export const isEnterprisePendingAudit = (data: LoginBO): boolean => {
  if (isEnterpriseComplete(data)) {
    return data.enterpriseBo && data.enterpriseBo.status === -1
  }
  return false
}

/**
 * 当前用户是否为企业用户
 * @param data
 */
export const isSystem = (data: LoginBO): boolean => {
  return data.type === LoginTypeEnum.SYSTEM
}
