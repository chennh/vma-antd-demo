import axios, { AxiosRequestConfig } from 'axios'
import AccountGetCaptchaParam from './params/AccountGetCaptchaParam'
import CaptchaResp from './definitions/CaptchaResp'
import AccountLoginResp from './definitions/AccountLoginResp'
import EncryptionResp from './definitions/EncryptionResp'
import AccountLoginReq from './definitions/AccountLoginReq'
import AccountModifyPasswordReq from './definitions/AccountModifyPasswordReq'

export class AccountApi {

  /**
   * 获取验证码
   *
   * @param { AccountGetCaptchaParam } params
   * @reutrn { Promise<CaptchaResp> }
   */
  public static getCaptcha(
    params: AccountGetCaptchaParam,
    config?: AxiosRequestConfig): Promise<CaptchaResp> {
    return axios(Object.assign({
      url: `/common/v1.0/account/captcha`,
      method: 'get',
      params,
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 获取当前登录用户
   *
   * @reutrn { Promise<AccountLoginResp> }
   */
  public static getCurrent(config?: AxiosRequestConfig): Promise<AccountLoginResp> {
    return axios(Object.assign({
      url: `/common/v1.0/account/current`,
      method: 'get',
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 获取加密串
   *
   * @reutrn { Promise<EncryptionResp> }
   */
  public static getEncryption(config?: AxiosRequestConfig): Promise<EncryptionResp> {
    return axios(Object.assign({
      url: `/common/v1.0/account/encryption`,
      method: 'get',
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 登录
   *
   * @param { AccountLoginReq } data
   * @reutrn { Promise<AccountLoginResp> }
   */
  public static login(
    data: AccountLoginReq,
    config?: AxiosRequestConfig): Promise<AccountLoginResp> {
    return axios(Object.assign({
      url: `/common/v1.0/account/login`,
      method: 'post',
      data,
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 退出
   *
   * @reutrn { Promise<void> }
   */
  public static logout(config?: AxiosRequestConfig): Promise<void> {
    return axios(Object.assign({
      url: `/common/v1.0/account/logout`,
      method: 'post',
      responseType: 'text'
    }, config)) as any
  }

  /**
   * 修改密码
   *
   * @param { AccountModifyPasswordReq } data
   * @reutrn { Promise<void> }
   */
  public static modifyPassword(
    data: AccountModifyPasswordReq,
    config?: AxiosRequestConfig): Promise<void> {
    return axios(Object.assign({
      url: `/common/v1.0/account/modify_password`,
      method: 'put',
      data,
      responseType: 'text'
    }, config)) as any
  }

}
