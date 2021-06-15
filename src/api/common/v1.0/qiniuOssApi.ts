import axios, { AxiosRequestConfig } from 'axios'
import QiniuTokenBO from './definitions/QiniuTokenBO'

export class QiniuOssApi {

  /**
   * 获取七牛token
   *
   * @reutrn { Promise<QiniuTokenBO> }
   */
  public static getQiNiuToken(config?: AxiosRequestConfig): Promise<QiniuTokenBO> {
    return axios(Object.assign({
      url: `/common/v1.0/qiniu_oss/token`,
      method: 'get',
      responseType: 'json'
    }, config)) as any
  }

  /**
   * upload
   *
   * @param { FormData } data
   * @reutrn { Promise<string> }
   */
  public static upload(
    data: FormData,
    config?: AxiosRequestConfig): Promise<string> {
    return axios(Object.assign({
      url: `/common/v1.0/qiniu_oss/upload`,
      method: 'post',
      data,
      responseType: 'text'
    }, config)) as any
  }

}
